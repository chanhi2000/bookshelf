import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as a,as as c,ao as t,at as s,au as o,al as p,aq as d,ar as u}from"./app-CpYYKbnj.js";const h={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function k(i,e){const n=d("VPCard");return u(),r("div",null,[a("h1",g,[a("a",w,[a("span",null,c(i.$frontmatter.title)+" 관련",1)])]),t(n,s(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),e[1]||(e[1]=a("hr",null,null,-1)),t(n,s(o({title:"Adding a CAGradientLayer with IBDesignable and IBInspectable | Hacking with iOS",desc:"Adding a CAGradientLayer with IBDesignable and IBInspectable",link:"https://hackingwithswift.com/read/37/4/adding-a-cagradientlayer-with-ibdesignable-and-ibinspectable",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=p(`<p>Magic is really the art of misdirection: making people focus their attention on one thing in order to stop them focusing on something else. In our case, we don&#39;t want users to suspect that your Apple Watch is helping you find the star, so we&#39;re going to overload them with misdirection so that they suspect everything else before they think of your watch.</p><p>The first thing we&#39;re going to do is add a background to our view. This is going to be a simple gradient, but we&#39;re going to make the gradient change color slowly between red and blue. This has no impact on your ability to find the star, but if it makes your friends suspect that the trick is to tap a card when the background is red then it has fulfilled its job of misdirection.</p><p>Making gradients in iOS isn&#39;t hard thanks to a special <code>CALayer</code> subclass called <code>CAGradientLayer</code>. That being said, working with layers directly isn&#39;t pleasant, because they can&#39;t take part in things like Auto Layout and they can&#39;t be used inside Interface Builder.</p><p>So, I&#39;m going to teach you how to wrap a gradient inside a <code>UIView</code>, while also adding the benefits of letting you control the gradient right from within Interface Builder. What&#39;s more, you&#39;ll be amazed at how easy it is.</p><p>Add a new Cocoa Touch class to your project. Make it a subclass of <code>UIView</code> then name it <code>GradientView</code>. We need this class to have a top and bottom color for our gradient, but we also want those values to be visible (and editable) inside Interface Builder. This is done using two new keywords: <code>@IBDesignable</code> and <code>@IBInspectable</code>.</p><p>The first of those, <code>@IBDesignable</code>, means that Xcode should build the class and make it draw inside Interface Builder whenever changes are made. This means any custom drawing you do will be reflected inside Interface Builder, just like it would when your app runs for real.</p><p>The second new keyword, <code>@IBInspectable</code>, exposes a property from your class as an editable value inside Interface Builder. Xcode knows how to handle various data types in meaningful ways, so strings will have an editable text box, booleans will have a checkbox, and colors will have a color selection palette.</p><p>Other than defining properties for the top and bottom colors of the gradient, the <code>GradientView</code> class needs to do only two other things to be complete: when iOS asks it what kind of layer to use for drawing it should return <code>CAGradientLayer</code>, and when iOS tells the view to layout its subviews it should apply the colors to the gradient.</p><p>Using this approach means the entire class is just 12 lines of code, <em>including</em> whitespace and closing braces. Here&#39;s the code for the <code>GradientView</code> class:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@IBDesignable</span> <span class="token keyword">class</span> <span class="token class-name">GradientView</span><span class="token punctuation">:</span> <span class="token class-name">UIView</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@IBInspectable</span> <span class="token keyword">var</span> topColor<span class="token punctuation">:</span> <span class="token class-name">UIColor</span> <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>white</span>
<span class="line">    <span class="token attribute atrule">@IBInspectable</span> <span class="token keyword">var</span> bottomColor<span class="token punctuation">:</span> <span class="token class-name">UIColor</span> <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>black</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">override</span> <span class="token keyword">class</span> <span class="token keyword">var</span> layerClass<span class="token punctuation">:</span> <span class="token class-name">AnyClass</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">CAGradientLayer</span><span class="token punctuation">.</span><span class="token keyword">self</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">layoutSubviews</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token punctuation">(</span>layer <span class="token keyword">as</span><span class="token operator">!</span> <span class="token class-name">CAGradientLayer</span><span class="token punctuation">)</span><span class="token punctuation">.</span>colors <span class="token operator">=</span> <span class="token punctuation">[</span>topColor<span class="token punctuation">.</span>cgColor<span class="token punctuation">,</span> bottomColor<span class="token punctuation">.</span>cgColor<span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With that new class in place, it&#39;s time to return to Interface Builder and add it to our layout. To do this, draw out another <code>UIView</code>, but make sure it stretches from edge to edge this time and add some Auto Layout rules to make sure it stays edge to edge. Finally, go to the Editor menu and choose Arrange &gt; Send To Back to make sure the new view sits behind the card container.</p><p>For iPhones with rectangular screens, what we’ve done is good enough – that gradient view will now fill the screen. But the iPhone X has rounded screen edges, so the safe area insets will automatically kick in, pushing our gradient view away from the edges. This isn’t what we want, and we need to fix this right here in IB.</p><p>So, select the main view for the view controller – the one that contains the gradient view – and uncheck Safe Area Relative Margins and Safe Area Layout Guide in the size inspector. That should make the gradient view run edge to edge nicely!</p><p>We want this new view to be a <code>GradientView</code>, which is done by changing its class. Press <kbd>Alt</kbd>+<kbd>Cmd</kbd>+<kbd>3</kbd> to bring up the identity inspector on the right, then look at the very top for a dropdown list of classes you can use for the new view. Look in there for &quot;GradientView&quot;, and you&#39;ll see &quot;Designables: Updating&quot; appear.</p><p>After a few seconds, you should see a white to black gradient appear in Interface Builder, which shows the default colors we set. But we made those colors inspectable, so if you press <kbd>Alt</kbd>+<kbd>Cmd</kbd>+<kbd>4</kbd> to go to the Attributes Inspector you should see &quot;Top Color&quot; and &quot;Bottom Color&quot; ready for you to choose – yes, Xcode has correctly converted <code>topColor</code> into &quot;Top Color&quot; thanks to our property naming convention.</p><p>We&#39;ll be applying red and blue colors separately to the gradient, so please set &quot;Top Color&quot; to be &quot;Dark Gray Color&quot;, and &quot;Bottom Color&quot; to be &quot;Black Color&quot;. Finally, set the alpha value for the gradient view to be 0.9, so a little bit of the background view shows through.</p><p>Before we&#39;re done with Interface Builder (for real this time!) please use the Assistant Editor to create an outlet for this new gradient view called <code>gradientView</code>. We don&#39;t need this just now, but it&#39;s important in the next chapter.</p><p>If everything is correct, your interface should look like the screenshot below. As before, I&#39;ve colored my container view so you can see it, but yours should have Clear Color for its background color.</p><figure><img src="https://hackingwithswift.com/img/books/hws/37-3@2x.png" alt=" plus IBDesignable make great Interface Builder buddies" tabindex="0" loading="lazy"><figcaption><code>CAGradientLayer</code> plus IBDesignable make great Interface Builder buddies</figcaption></figure><p>With all those interface changes in place, we can animate the background color of the main view in just a handful of lines of code. To make this work, we&#39;ll be using three animation options: <code>.allowUserInteraction</code> (so the user can tap cards), <code>.autoreverse</code> to make the view go back to its original color, and <code>.repeat</code> to make the animation loop back and forward forever.</p><p>Place this animation code somewhere in <code>viewDidLoad()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">view<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>red</span>
<span class="line"></span>
<span class="line"><span class="token class-name">UIView</span><span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span>withDuration<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> delay<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> options<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">.</span>allowUserInteraction<span class="token punctuation">,</span> <span class="token punctuation">.</span>autoreverse<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token keyword">repeat</span><span class="token punctuation">]</span><span class="token punctuation">,</span> animations<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">self</span><span class="token punctuation">.</span>view<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>blue</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note that we need to give the view an initial red color to make the animation smooth, but you can put that in Interface Builder if you prefer.</p>`,23))])}const f=l(h,[["render",k],["__file","04-adding-a-cagradientlayer-with-ibdesignable-and-ibinspectable.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/read/37/04-adding-a-cagradientlayer-with-ibdesignable-and-ibinspectable.html","title":"Adding a CAGradientLayer with IBDesignable and IBInspectable","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Adding a CAGradientLayer with IBDesignable and IBInspectable","description":"Article(s) > Adding a CAGradientLayer with IBDesignable and IBInspectable","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Adding a CAGradientLayer with IBDesignable and IBInspectable"},{"property":"og:description","content":"Adding a CAGradientLayer with IBDesignable and IBInspectable"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/37/04-adding-a-cagradientlayer-with-ibdesignable-and-ibinspectable.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/37/04-adding-a-cagradientlayer-with-ibdesignable-and-ibinspectable.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Adding a CAGradientLayer with IBDesignable and IBInspectable"}],["meta",{"property":"og:description","content":"Article(s) > Adding a CAGradientLayer with IBDesignable and IBInspectable"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/37-3@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Adding a CAGradientLayer with IBDesignable and IBInspectable\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/37-3@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.13,"words":1238},"filePathRelative":"hackingwithswift.com/read/37/04-adding-a-cagradientlayer-with-ibdesignable-and-ibinspectable.md","excerpt":"\\n"}');export{f as comp,y as data};