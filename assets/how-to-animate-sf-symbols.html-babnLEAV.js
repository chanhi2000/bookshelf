import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as s,as as m,ao as a,at as e,au as i,al as o,an as l,aq as c,ar as d}from"./app-CpYYKbnj.js";const v={},b={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-animate-sf-symbols-1.zip",target:"_blank",rel:"noopener noreferrer"},h={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-animate-sf-symbols-2.zip",target:"_blank",rel:"noopener noreferrer"},w={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-animate-sf-symbols-3.zip",target:"_blank",rel:"noopener noreferrer"},y={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-animate-sf-symbols-4.zip",target:"_blank",rel:"noopener noreferrer"},S={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-animate-sf-symbols-5.zip",target:"_blank",rel:"noopener noreferrer"},q={class:"hint-container details"};function x(u,n){const t=c("VPCard"),p=c("FontIcon");return d(),k("div",null,[s("h1",b,[s("a",g,[s("span",null,m(u.$frontmatter.title)+" 관련",1)])]),a(t,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[6]||(n[6]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[7]||(n[7]=s("hr",null,null,-1)),a(t,e(i({title:"How to animate SF Symbols | SwiftUI by Example",desc:"How to animate SF Symbols",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-animate-sf-symbols",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[8]||(n[8]=o(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 17</strong></p><p>SwiftUI provides the <code>symbolEffect()</code> modifier to add built-in animation effects for SF Symbols and produce a real touch of delight with almost no effort.</p><p>For example, we could animate a dog icon up and down with a gentle bounce whenever a button is pressed:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> petCount <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span> <span class="token punctuation">{</span></span>
<span class="line">            petCount <span class="token operator">+=</span> <span class="token number">1</span></span>
<span class="line">        <span class="token punctuation">}</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Pet the Dog&quot;</span></span><span class="token punctuation">,</span> systemImage<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;dog&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>bounce<span class="token punctuation">,</span> value<span class="token punctuation">:</span> petCount<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),s("blockquote",null,[s("p",null,[s("a",f,[a(p,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=l("Download this as an Xcode project"))])])]),n[9]||(n[9]=o(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-1~dark.gif" alt="A button saying Pet the Dog, where the dog icon bounces up then down as the button is pressed." tabindex="0" loading="lazy"><figcaption>A button saying Pet the Dog, where the dog icon bounces up then down as the button is pressed.</figcaption></figure><p>You could also try <code>.pulse</code> to animate the opacity, but where things get <em>really</em> clever is when you use SF Symbols that have multiple layers because these can be animated individually or together.</p><p>By default, layers are animated individually, so code like this produces a wave-like effect on the “mail.stack” icon:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> isFavorite <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span> <span class="token punctuation">{</span></span>
<span class="line">            isFavorite<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Activate Inbox Zero&quot;</span></span><span class="token punctuation">,</span> systemImage<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;mail.stack&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>bounce<span class="token punctuation">.</span>down<span class="token punctuation">,</span> value<span class="token punctuation">:</span> isFavorite<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",h,[a(p,{icon:"fas fa-file-zipper"}),n[1]||(n[1]=l("Download this as an Xcode project"))])])]),n[10]||(n[10]=o(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-2~dark.gif" alt="A button saying Activate Inbox Zero, where an inbox icon has a tiered animation effect when pressed." tabindex="0" loading="lazy"><figcaption>A button saying Activate Inbox Zero, where an inbox icon has a tiered animation effect when pressed.</figcaption></figure><p>Honestly, there are so many variations available, and you can even add extra options to get customize speed and repeat count.</p><p>For example, this animates the symbol three times at 3x speed:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> isFavorite <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span> <span class="token punctuation">{</span></span>
<span class="line">            isFavorite<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Activate Inbox Zero&quot;</span></span><span class="token punctuation">,</span> systemImage<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;mail.stack&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>bounce<span class="token punctuation">,</span> options<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">repeat</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> isFavorite<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",w,[a(p,{icon:"fas fa-file-zipper"}),n[2]||(n[2]=l("Download this as an Xcode project"))])])]),n[11]||(n[11]=o(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-3~dark.gif" alt="A button saying Activate Inbox Zero, which has a fluttering animation when pressed" tabindex="0" loading="lazy"><figcaption>A button saying Activate Inbox Zero, which has a fluttering animation when pressed</figcaption></figure><p>The variable color animation is particularly powerful, because SF Symbols lets you control how the animation displays each layer – <code>.variableColor.iterative</code> colors one layer at a time, <code>.variableColor.cumulative</code> adds each new layer to the previously colored layers, and you can add <code>reversing</code> to either of those to make the animation play forward then backward.</p><p>Here&#39;s one larger example that shows off a range of possibilities:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> animationsRunning <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Start Animations&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            withAnimation <span class="token punctuation">{</span></span>
<span class="line">                animationsRunning<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">HStack</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>iterative<span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>cumulative<span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>reversing<span class="token punctuation">.</span>iterative<span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>reversing<span class="token punctuation">.</span>cumulative<span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">HStack</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>iterative<span class="token punctuation">,</span> options<span class="token punctuation">:</span> <span class="token punctuation">.</span>repeating<span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>cumulative<span class="token punctuation">,</span> options<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">repeat</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>reversing<span class="token punctuation">.</span>iterative<span class="token punctuation">,</span> options<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;square.stack.3d.up&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>variableColor<span class="token punctuation">.</span>reversing<span class="token punctuation">.</span>cumulative<span class="token punctuation">,</span> options<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">repeat</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> animationsRunning<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",y,[a(p,{icon:"fas fa-file-zipper"}),n[3]||(n[3]=l("Download this as an Xcode project"))])])]),n[12]||(n[12]=o(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-4~dark.gif" alt="A grid of icons that animate in various ways when activated. Some animate their layers individually, some animate their layers cumulatively, and some repeat." tabindex="0" loading="lazy"><figcaption>A grid of icons that animate in various ways when activated. Some animate their layers individually, some animate their layers cumulatively, and some repeat.</figcaption></figure><p>And finally, if you&#39;re keeping your views the same and are merely changing their content – if you&#39;re switching the icon for a fixed label based on user interaction, for example – then you should use the <code>contentTransition()</code> modifier along with one of the options for switching icons.</p><p>For example, this uses the <code>.replace</code> transition to make one icon fade out and another arrive:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> isFavorite <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Button</span> <span class="token punctuation">{</span></span>
<span class="line">                withAnimation <span class="token punctuation">{</span></span>
<span class="line">                    isFavorite<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Toggle Favorite&quot;</span></span><span class="token punctuation">,</span> systemImage<span class="token punctuation">:</span> isFavorite <span class="token operator">?</span> <span class="token string-literal"><span class="token string">&quot;checkmark&quot;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;heart&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">contentTransition</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">symbolEffect</span><span class="token punctuation">(</span><span class="token punctuation">.</span>replace<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",S,[a(p,{icon:"fas fa-file-zipper"}),n[4]||(n[4]=l("Download this as an Xcode project"))])])]),n[13]||(n[13]=s("figure",null,[s("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-5~dark.gif",alt:"A button saying Toggle Favorite, which animates smoothly between a checkmark and a heart when pressed",tabindex:"0",loading:"lazy"}),s("figcaption",null,"A button saying Toggle Favorite, which animates smoothly between a checkmark and a heart when pressed")],-1)),s("details",q,[n[5]||(n[5]=s("summary",null,"Similar solutions…",-1)),a(t,e(i({title:"How to get custom colors and transparency with SF Symbols | SwiftUI by Example",desc:"How to get custom colors and transparency with SF Symbols",link:"/hackingwithswift.com/swiftui/how-to-get-custom-colors-and-transparency-with-sf-symbols.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to render images using SF Symbols | SwiftUI by Example",desc:"How to render images using SF Symbols",link:"/hackingwithswift.com/swiftui/how-to-render-images-using-sf-symbols.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to animate the size of text | SwiftUI by Example",desc:"How to animate the size of text",link:"/hackingwithswift.com/swiftui/how-to-animate-the-size-of-text.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to animate changes in binding values | SwiftUI by Example",desc:"How to animate changes in binding values",link:"/hackingwithswift.com/swiftui/how-to-animate-changes-in-binding-values.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const A=r(v,[["render",x],["__file","how-to-animate-sf-symbols.html.vue"]]),E=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-animate-sf-symbols.html","title":"How to animate SF Symbols","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to animate SF Symbols","description":"Article(s) > How to animate SF Symbols","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to animate SF Symbols"},{"property":"og:description","content":"How to animate SF Symbols"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-animate-sf-symbols.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-animate-sf-symbols.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to animate SF Symbols"}],["meta",{"property":"og:description","content":"Article(s) > How to animate SF Symbols"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-1~dark.gif"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to animate SF Symbols\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-1~dark.gif\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-2~dark.gif\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-3~dark.gif\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-4~dark.gif\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-animate-sf-symbols-5~dark.gif\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.41,"words":1024},"filePathRelative":"hackingwithswift.com/swiftui/how-to-animate-sf-symbols.md","excerpt":"\\n"}');export{A as comp,E as data};