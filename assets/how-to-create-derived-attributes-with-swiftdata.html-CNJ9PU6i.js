import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as s,as as c,ao as t,at as e,au as o,al as r,aq as d,ar as u}from"./app-CpYYKbnj.js";const m={},h={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"};function w(i,a){const n=d("VPCard");return u(),l("div",null,[s("h1",h,[s("a",k,[s("span",null,c(i.$frontmatter.title)+" 관련",1)])]),t(n,e(o({title:"SwiftData by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftdata/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[0]||(a[0]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),a[1]||(a[1]=s("hr",null,null,-1)),t(n,e(o({title:"How to create derived attributes with SwiftData | SwiftData by Example",desc:"How to create derived attributes with SwiftData",link:"https://hackingwithswift.com/quick-start/swiftdata/how-to-create-derived-attributes-with-swiftdata",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a[2]||(a[2]=r(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>Derived attributes were a power feature of Core Data, allowing us to automatically calculate or update some properties dynamically. Sadly they don’t exist in SwiftData, however we can sort of work around this with some extra effort.</p><div class="hint-container important"><p class="hint-container-title">Important</p><p>Derived attributes in Core Data are extremely efficient because they are implemented as triggers at the database level. Our workarounds are nothing like as efficient!</p></div><p>We have three options here.</p><p>The first option is the simplest: we derive the value ourselves as a computed property, which at least puts the functionality in place until we hopefully get official support for real derived attributes in the future.</p><p>For example, in Core Data it was common to use derivations like <code>@count</code> or <code>@sum</code>, so we can implement these by hand:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@Model</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">School</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> students<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Student</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> studentCount<span class="token punctuation">:</span> <span class="token class-name">Int</span> <span class="token punctuation">{</span></span>
<span class="line">        students<span class="token punctuation">.</span>count</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>students<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Student</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>students <span class="token operator">=</span> students</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute atrule">@Model</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If that were implemented as a derived attribute, Core Data would be able to calculate the number of students directly rather than fetching the whole array then returning its <code>count</code> property, but like I said it’s just a workaround.</p><p>That option works well for some derived attributes, but in my experience the most common thing I want to derive is some kind of <code>lastModified</code> property that automatically updates whenever any value is changed.</p><p>That wouldn’t work with a simple computed property, so here there’s a second option: create a generic <code>update()</code> method that can adjust any value inside your model, but while doing automatically updates some other value.</p><p>For example, this code creates a <code>Player</code> class with a <code>lastModified</code> property, along with an <code>update()</code> method that can adjust any value while also changing <code>lastUpdated</code> to the current date and time:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@Model</span> <span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> score<span class="token punctuation">:</span> <span class="token class-name">Int</span></span>
<span class="line">    <span class="token keyword">var</span> lastModified<span class="token punctuation">:</span> <span class="token class-name">Date</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span> score<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>score <span class="token operator">=</span> score</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>lastModified <span class="token operator">=</span> <span class="token punctuation">.</span>now</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">update</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>keyPath<span class="token punctuation">:</span> <span class="token class-name">ReferenceWritableKeyPath</span><span class="token operator">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> to value<span class="token punctuation">:</span> <span class="token class-name">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">[</span>keyPath<span class="token punctuation">:</span> keyPath<span class="token punctuation">]</span> <span class="token operator">=</span> value</span>
<span class="line">        lastModified <span class="token operator">=</span> <span class="token punctuation">.</span>now</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With that in place, we can use <code>user.update(keyPath: \\.score, to: 10)</code> to change the <code>score</code> property and also update <code>lastModified</code>.</p><div class="hint-container note"><p class="hint-container-title">Note</p><p>SwiftData properties do not support <code>willSet</code> or <code>didSet</code> property observers, so we’re effectively bouncing our changes through a new method in lieu of using <code>didSet</code>.</p></div><p>A third option is to create a new <code>@Transient</code> attribute for the values you want. Unlike regular SwiftData properties, <code>@Transient</code> properties <em>do</em> support <code>willSet</code> and <code>didSet</code> property observers, but honestly this is more trouble than it’s worth – you’d need transient properties for everything you want to watch, so you’re creating a huge amount of work for yourself.</p><p>Let’s hope we either get regular <code>didSet</code> and <code>willSet</code> support soon, or, better yet, actual derived attributes implemented at the database level…</p>`,16))])}const b=p(m,[["render",w],["__file","how-to-create-derived-attributes-with-swiftdata.html.vue"]]),g=JSON.parse('{"path":"/hackingwithswift.com/swiftdata/how-to-create-derived-attributes-with-swiftdata.html","title":"How to create derived attributes with SwiftData","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create derived attributes with SwiftData","description":"Article(s) > How to create derived attributes with SwiftData","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftdata","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create derived attributes with SwiftData"},{"property":"og:description","content":"How to create derived attributes with SwiftData"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftdata/how-to-create-derived-attributes-with-swiftdata.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftdata/how-to-create-derived-attributes-with-swiftdata.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create derived attributes with SwiftData"}],["meta",{"property":"og:description","content":"Article(s) > How to create derived attributes with SwiftData"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftdata"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2023-09-30T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create derived attributes with SwiftData\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-30T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2023-09-30T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.05,"words":614},"filePathRelative":"hackingwithswift.com/swiftdata/how-to-create-derived-attributes-with-swiftdata.md","localizedDate":"2023년 9월 30일","excerpt":"\\n"}');export{b as comp,g as data};