import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as s,as as h,ao as e,at as l,au as c,al as t,an as a,aq as p,ar as m}from"./app-CpYYKbnj.js";const g={},b={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"};function f(u,n){const i=p("VPCard"),r=p("VidStack"),o=p("FontIcon");return m(),k("div",null,[s("h1",b,[s("a",v,[s("span",null,h(u.$frontmatter.title)+" 관련",1)])]),e(i,l(c({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[11]||(n[11]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[12]||(n[12]=s("hr",null,null,-1)),e(i,l(c({title:"Building the environment: SKTexture and filling a path | Hacking with iOS",desc:"Building the environment: SKTexture and filling a path",link:"https://hackingwithswift.com/read/29/2/building-the-environment-sktexture-and-filling-a-path",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e(r,{src:"youtube/T6Qg0qnNtSA"}),n[13]||(n[13]=t("<p>We&#39;re going to start by making the game environment, which means building the night-time, high-rise skyscraper scene that forms the backdrop for the game. We&#39;re going to do most of this with an <code>SKSpriteNode</code> subclass for buildings that sets up physics, draws the building graphic, and ultimately handles the building being hit by stray bananas. Are you ready to flex your Core Graphics muscle a little?</p><p>Add a new file, choosing iOS &gt; Source &gt; Cocoa Touch Class, name it &quot;BuildingNode&quot; and make it a subclass of <code>SKSpriteNode</code>. Open the new file for editing, and add <code>import SpriteKit</code> just above the UIKit import.</p><p>Initially, this class needs to have three methods:</p><ol><li><code>setup()</code> will do the basic work required to make this thing a building: setting its name, texture, and physics.</li><li><code>configurePhysics()</code> will set up per-pixel physics for the sprite&#39;s current texture.</li><li><code>drawBuilding()</code> will do the Core Graphics rendering of a building, and return it as a <code>UIImage</code>.</li></ol><p>In amongst those three points was one small thing that you may have missed: &quot;the sprite&#39;s <em>current</em> texture.&quot; This tells you that the texture will change as bits get blown off by those exploding bananas. To make this work, we&#39;re going to keep a copy of the building&#39;s texture as a <code>UIImage</code> so that we can modify it later.</p>",5)),s("p",null,[n[0]||(n[0]=a("Before we dive into the code we need to define some collision bitmasks. This is identical to project 26, except now we need only three categories: buildings, bananas and players. In the case of buildings, the only thing they'll collide with is a banana, which triggers our explosion. So, go back to ")),e(o,{icon:"fa-brands fa-swift"}),n[1]||(n[1]=s("code",null,"GameScene.swift",-1)),n[2]||(n[2]=a(" and add this enum just above the ")),n[3]||(n[3]=s("code",null,"GameScene",-1)),n[4]||(n[4]=a(" class definition:"))]),n[14]||(n[14]=t(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">enum</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">:</span> <span class="token class-name">UInt32</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> banana <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">case</span> building <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line">    <span class="token keyword">case</span> player <span class="token operator">=</span> <span class="token number">4</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[n[5]||(n[5]=a("OK, back to ")),e(o,{icon:"fa-brands fa-swift"}),n[6]||(n[6]=s("code",null,"BuildingNode.swift",-1)),n[7]||(n[7]=a(". Please add this code to the class – it's a property followed by two methods:"))]),n[15]||(n[15]=t(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> currentImage<span class="token punctuation">:</span> <span class="token class-name">UIImage</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;building&quot;</span></span></span>
<span class="line"></span>
<span class="line">    currentImage <span class="token operator">=</span> <span class="token function">drawBuilding</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> size<span class="token punctuation">)</span></span>
<span class="line">    texture <span class="token operator">=</span> <span class="token class-name">SKTexture</span><span class="token punctuation">(</span>image<span class="token punctuation">:</span> currentImage<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">configurePhysics</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">configurePhysics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>texture<span class="token punctuation">:</span> texture<span class="token operator">!</span><span class="token punctuation">,</span> size<span class="token punctuation">:</span> size<span class="token punctuation">)</span></span>
<span class="line">    physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>isDynamic <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">    physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>categoryBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>building<span class="token punctuation">.</span>rawValue</span>
<span class="line">    physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>contactTestBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>banana<span class="token punctuation">.</span>rawValue</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is using the same &quot;don&#39;t override the initializer&quot; hack from project 14, because quite frankly if I wanted to explain to you how and why Swift&#39;s initialization system worked I&#39;d probably have to add another whole book to this series! Instead, we&#39;ll be creating the sprites as red-colored blocks of the right size, then drawing buildings into them.</p><p>As you can see in that code, it calls a <code>drawBuilding()</code> method that returns a <code>UIImage</code>, which then gets saved into the property and converted into a texture. It also calls <code>configurePhysics()</code> rather than putting the code straight into its method. Both of these two methods are separate because they will be called every time the building is hit, so we&#39;ll be using them in two different places.</p><p>That was the easy bit: you already know about bitmasks, per-pixel physics, textures and so on. The next method is <code>drawBuilding()</code> and it&#39;s going to get harder because we&#39;re going to use Core Graphics. You <em>did</em> read project 27, right? If so, this will be a cinch.</p><p>This method needs to:</p><ol><li>Create a new Core Graphics context the size of our building.</li><li>Fill it with a rectangle that&#39;s one of three colors.</li><li>Draw windows all over the building in one of two colors: there&#39;s either a light on (yellow) or not (gray).</li><li>Pull out the result as a <code>UIImage</code> and return it for use elsewhere.</li></ol><p>There&#39;s nothing complicated in there, but just to keep you on your toes I&#39;m going to introduce a new way to create colors: hue, saturation and brightness, or HSB. Using this method of creating colors you specify values between 0 and 1 to control how saturated a color is (from 0 = gray to 1 = pure color) and brightness (from 0 = black to 1 = maximum brightness), and 0 to 1 for hue.</p><p>&quot;Hue&quot; is a value from 0 to 1 also, but it represents a position on a color wheel, like using a color picker on your Mac. Hues 0 and 1 both represent red, with all other colors lying in between.</p><p>Now, programmers often look at HSB and think it&#39;s much clumsier than straight RGB, but there are reasons for both. The helpful thing about HSB is that if you keep the saturation and brightness constant, changing the hue value will cycle through all possible colors – it&#39;s an easy way to generate matching pastel colors, for example.</p><p>There&#39;s one more thing you need to know, but you&#39;ll be pleased to know it&#39;s a fairly basic Swift feature that we just haven&#39;t needed to use so far. It&#39;s a function called <code>stride()</code>, which lets you loop from one number to another with a specific interval. We&#39;re going to use this to count from the left edge of the building to the right edge in intervals of 40, to position our windows. We&#39;ll also do this vertically, to position the windows across the whole height of the building. To make it a little more attractive, we&#39;ll actually indent the left and right edges by 10 points.</p><p>By itself, <code>stride()</code> looks like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">for</span> row <span class="token keyword">in</span> <span class="token function">stride</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span> to<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">(</span>size<span class="token punctuation">.</span>height <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> by<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That means &quot;count from 10 up to the height of the building minus 10, in intervals of 40.&quot; So, it will go 10, 50, 90, 130, and so on. Note that <code>stride()</code> has two variants: <code>stride(from:to:by:)</code> and <code>stride(from:through:by)</code>. The first counts up to but <em>excluding</em> the <code>to</code> parameter, whereas the second counts up to and <em>including</em> the <code>through</code> parameter. We&#39;ll be using <code>stride(from:to:by:)</code> below.</p><p>Now add this code for <code>drawBuilding()</code>, with numbered comments lining up to the list above:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">drawBuilding</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> <span class="token class-name">CGSize</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">UIImage</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 1</span></span>
<span class="line">    <span class="token keyword">let</span> renderer <span class="token operator">=</span> <span class="token class-name">UIGraphicsImageRenderer</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> size<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> img <span class="token operator">=</span> renderer<span class="token punctuation">.</span>image <span class="token punctuation">{</span> ctx <span class="token keyword">in</span></span>
<span class="line">        <span class="token comment">// 2</span></span>
<span class="line">        <span class="token keyword">let</span> rectangle <span class="token operator">=</span> <span class="token class-name">CGRect</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> width<span class="token punctuation">:</span> size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> height<span class="token punctuation">:</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">let</span> color<span class="token punctuation">:</span> <span class="token class-name">UIColor</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">switch</span> <span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token operator">...</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">            color <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">(</span>hue<span class="token punctuation">:</span> <span class="token number">0.502</span><span class="token punctuation">,</span> saturation<span class="token punctuation">:</span> <span class="token number">0.98</span><span class="token punctuation">,</span> brightness<span class="token punctuation">:</span> <span class="token number">0.67</span><span class="token punctuation">,</span> alpha<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">            color <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">(</span>hue<span class="token punctuation">:</span> <span class="token number">0.999</span><span class="token punctuation">,</span> saturation<span class="token punctuation">:</span> <span class="token number">0.99</span><span class="token punctuation">,</span> brightness<span class="token punctuation">:</span> <span class="token number">0.67</span><span class="token punctuation">,</span> alpha<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">            color <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">(</span>hue<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> saturation<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> brightness<span class="token punctuation">:</span> <span class="token number">0.67</span><span class="token punctuation">,</span> alpha<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        color<span class="token punctuation">.</span><span class="token function">setFill</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        ctx<span class="token punctuation">.</span>cgContext<span class="token punctuation">.</span><span class="token function">addRect</span><span class="token punctuation">(</span>rectangle<span class="token punctuation">)</span></span>
<span class="line">        ctx<span class="token punctuation">.</span>cgContext<span class="token punctuation">.</span><span class="token function">drawPath</span><span class="token punctuation">(</span>using<span class="token punctuation">:</span> <span class="token punctuation">.</span>fill<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 3</span></span>
<span class="line">        <span class="token keyword">let</span> lightOnColor <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">(</span>hue<span class="token punctuation">:</span> <span class="token number">0.190</span><span class="token punctuation">,</span> saturation<span class="token punctuation">:</span> <span class="token number">0.67</span><span class="token punctuation">,</span> brightness<span class="token punctuation">:</span> <span class="token number">0.99</span><span class="token punctuation">,</span> alpha<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">let</span> lightOffColor <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">(</span>hue<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> saturation<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> brightness<span class="token punctuation">:</span> <span class="token number">0.34</span><span class="token punctuation">,</span> alpha<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">for</span> row <span class="token keyword">in</span> <span class="token function">stride</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span> to<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">(</span>size<span class="token punctuation">.</span>height <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> by<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> col <span class="token keyword">in</span> <span class="token function">stride</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span> to<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">(</span>size<span class="token punctuation">.</span>width <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> by<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token class-name">Bool</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    lightOnColor<span class="token punctuation">.</span><span class="token function">setFill</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                    lightOffColor<span class="token punctuation">.</span><span class="token function">setFill</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                ctx<span class="token punctuation">.</span>cgContext<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token class-name">CGRect</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> col<span class="token punctuation">,</span> y<span class="token punctuation">:</span> row<span class="token punctuation">,</span> width<span class="token punctuation">:</span> <span class="token number">15</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 4</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> img</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The only things new in there – and they are so tiny you probably didn&#39;t even notice – is my use of <code>.fill</code> rather than <code>.stroke</code> to draw the rectangles, and my use of <code>Bool.random()</code> to generate either true or false randomly.</p><p>That&#39;s the <code>BuildingNode</code> class finished for now; we&#39;ll return to it later to add a method that will be called whenever it gets hit by a banana.</p>`,17)),s("p",null,[n[8]||(n[8]=a("Go back to ")),e(o,{icon:"fa-brands fa-swift"}),n[9]||(n[9]=s("code",null,"GameScene.swift",-1)),n[10]||(n[10]=a(" because we have a small amount of work to do in order to use these new building nodes to build the night sky scene."))]),n[16]||(n[16]=t(`<p>First, add a property that will store an array of buildings. We&#39;ll be using this to figure out where to place players later on:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> buildings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token class-name">BuildingNode</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>At this point, the <code>didMove(to:)</code> method needs to do only two things: give the scene a dark blue color to represent the night sky, then call a method called <code>createBuildings()</code> that will create the buildings. Here it is:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">didMove</span><span class="token punctuation">(</span>to view<span class="token punctuation">:</span> <span class="token class-name">SKView</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    backgroundColor <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">(</span>hue<span class="token punctuation">:</span> <span class="token number">0.669</span><span class="token punctuation">,</span> saturation<span class="token punctuation">:</span> <span class="token number">0.99</span><span class="token punctuation">,</span> brightness<span class="token punctuation">:</span> <span class="token number">0.67</span><span class="token punctuation">,</span> alpha<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">createBuildings</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>All those HSB values aren&#39;t an accident, by the way – I&#39;ve chosen them so they look similar to the original design.</p><p>The <code>createBuildings()</code> method is the important one here, and calling it will finish our background scene. It needs to move horizontally across the screen, filling space with buildings of various sizes until it hits the far edge of the screen. I&#39;m going to make it start at -15 rather than the left edge so that the buildings look like they keep on going past the screen&#39;s edge. I&#39;m also going to leave a 2-point gap between the buildings to distinguish their edges slightly more.</p><p>Each building needs to be a random size. For the height, it can be anything between 300 and 600 points high; for the width, I want to make sure it divides evenly into 40 so that our window-drawing code is simple, so we&#39;ll generate a random number between 2 and 4 then multiply that by 40 to give us buildings that are 80, 120 or 160 points wide.</p><p>As I said earlier, we&#39;ll be creating each building node with a solid red color to begin with, then drawing over it with the building texture once it&#39;s generated. Remember: SpriteKit positions nodes based on their center, so we need to do a little division of width and height to place these buildings correctly. Here&#39;s the <code>createBuildings()</code> method – please put this directly beneath <code>didMove(to:)</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">createBuildings</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> currentX<span class="token punctuation">:</span> <span class="token class-name">CGFloat</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">15</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">while</span> currentX <span class="token operator">&lt;</span> <span class="token number">1024</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> size <span class="token operator">=</span> <span class="token class-name">CGSize</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token operator">...</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">40</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">300</span><span class="token operator">...</span><span class="token number">600</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        currentX <span class="token operator">+=</span> size<span class="token punctuation">.</span>width <span class="token operator">+</span> <span class="token number">2</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">let</span> building <span class="token operator">=</span> <span class="token class-name">BuildingNode</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>red<span class="token punctuation">,</span> size<span class="token punctuation">:</span> size<span class="token punctuation">)</span></span>
<span class="line">        building<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token class-name">CGPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> currentX <span class="token operator">-</span> <span class="token punctuation">(</span>size<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> size<span class="token punctuation">.</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">        building<span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">addChild</span><span class="token punctuation">(</span>building<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        buildings<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>building<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Make sure you select the lowest-spec iPad from the list of simulator options, then press Play to see the results of your hard work – a random set of buildings will be generated each time you run the game. Well done!</p><figure><img src="https://hackingwithswift.com/img/books/hws/29-1@2x.png" alt="Because we draw the buildings in code, our game level is different every time it runs." tabindex="0" loading="lazy"><figcaption>Because we draw the buildings in code, our game level is different every time it runs.</figcaption></figure>`,11))])}const x=d(g,[["render",f],["__file","02-building-the-environment-sktexture-and-filling-a-path.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/read/29/02-building-the-environment-sktexture-and-filling-a-path.html","title":"Building the environment: SKTexture and filling a path","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Building the environment: SKTexture and filling a path","description":"Article(s) > Building the environment: SKTexture and filling a path","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Building the environment: SKTexture and filling a path"},{"property":"og:description","content":"Building the environment: SKTexture and filling a path"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/29/02-building-the-environment-sktexture-and-filling-a-path.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/29/02-building-the-environment-sktexture-and-filling-a-path.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Building the environment: SKTexture and filling a path"}],["meta",{"property":"og:description","content":"Article(s) > Building the environment: SKTexture and filling a path"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/29-1@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Building the environment: SKTexture and filling a path\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/29-1@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":6.27,"words":1881},"filePathRelative":"hackingwithswift.com/read/29/02-building-the-environment-sktexture-and-filling-a-path.md","excerpt":"\\n"}');export{x as comp,I as data};