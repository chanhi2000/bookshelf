import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as d,ao as a,at as t,au as o,al as u,aq as p,ar as k}from"./app-CpYYKbnj.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"};function g(i,n){const e=p("VPCard"),l=p("VidStack");return k(),r("div",null,[s("h1",m,[s("a",b,[s("span",null,d(i.$frontmatter.title)+" 관련",1)])]),a(e,t(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[0]||(n[0]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[1]||(n[1]=s("hr",null,null,-1)),a(e,t(o({title:"Scores on the board: SKLabelNode | Hacking with iOS",desc:"Scores on the board: SKLabelNode",link:"https://hackingwithswift.com/read/11/06-scores-on-the-board-sklabelnode",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(l,{src:"youtube/kSMS0h9qR7s"}),n[2]||(n[2]=u(`<p>To make a score show on the screen we need to do two things: create a score integer that tracks the value itself, then create a new node type, <code>SKLabelNode</code>, that displays the value to players.</p><p>The <code>SKLabelNode</code> class is somewhat similar to <code>UILabel</code> in that it has a <code>text</code> property, a font, a position, an alignment, and so on. Plus we can use Swift&#39;s string interpolation to set the text of the label easily, and we&#39;re even going to use the property observers you learned about in project 8 to make the label update itself when the score value changes.</p><p>Declare these properties at the top of your class:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> scoreLabel<span class="token punctuation">:</span> <span class="token class-name">SKLabelNode</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> score <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">didSet</span> <span class="token punctuation">{</span></span>
<span class="line">        scoreLabel<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Score: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">score</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We&#39;re going to use the Chalkduster font, then align the label to the right and position it on the top-right edge of the scene. Put this code into your <code>didMove(to:)</code> method, just before the end:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">scoreLabel <span class="token operator">=</span> <span class="token class-name">SKLabelNode</span><span class="token punctuation">(</span>fontNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Chalkduster&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">scoreLabel<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Score: 0&quot;</span></span></span>
<span class="line">scoreLabel<span class="token punctuation">.</span>horizontalAlignmentMode <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token keyword">right</span></span>
<span class="line">scoreLabel<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token class-name">CGPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">980</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">700</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>scoreLabel<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That places the label into the scene, and the property observer automatically updates the label as the <code>score</code> value changes. But it&#39;s not complete yet because we don&#39;t ever modify the player&#39;s score. Fortunately, we already have places in the <code>collisionBetween()</code> method where we can do exactly that, so modify the method to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">collisionBetween</span><span class="token punctuation">(</span>ball<span class="token punctuation">:</span> <span class="token class-name">SKNode</span><span class="token punctuation">,</span> object<span class="token punctuation">:</span> <span class="token class-name">SKNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> object<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;good&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">destroy</span><span class="token punctuation">(</span>ball<span class="token punctuation">:</span> ball<span class="token punctuation">)</span></span>
<span class="line">        score <span class="token operator">+=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> object<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;bad&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">destroy</span><span class="token punctuation">(</span>ball<span class="token punctuation">:</span> ball<span class="token punctuation">)</span></span>
<span class="line">        score <span class="token operator">-=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>+=</code> and <code>-=</code> operators add or subtract one to the variable depending on whether a good or bad slot was struck. When we change the variable, the property observer will spot the change and update the label.</p><p>We have a score, so that means players have the achievement they were craving, right? Well, no. Clearly all it takes to get a number even higher than Gangnam Style&#39;s YouTube views is to sit and tap at the top of the screen directly above a green slot.</p><p>Let&#39;s add some actual challenge: we&#39;re going to let you place obstacles between the top of the scene and the slots at the bottom, so that players have to position their balls exactly correctly to bounce off things in the right ways.</p><p>To make this work, we&#39;re going to add two more properties. The first one will hold a label that says either &quot;Edit&quot; or &quot;Done&quot;, and one to hold a boolean that tracks whether we&#39;re in editing mode or not. Add these two alongside the score properties from earlier:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> editLabel<span class="token punctuation">:</span> <span class="token class-name">SKLabelNode</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> editingMode<span class="token punctuation">:</span> <span class="token class-name">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">didSet</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> editingMode <span class="token punctuation">{</span></span>
<span class="line">            editLabel<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Done&quot;</span></span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            editLabel<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Edit&quot;</span></span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then add this to <code>didMove(to:)</code> to create the edit label in the top-left corner of the scene:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">editLabel <span class="token operator">=</span> <span class="token class-name">SKLabelNode</span><span class="token punctuation">(</span>fontNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Chalkduster&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">editLabel<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Edit&quot;</span></span></span>
<span class="line">editLabel<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token class-name">CGPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">80</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">700</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>editLabel<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That&#39;s pretty much identical to creating the score label, so nothing to see here. We&#39;re using a property observer again to automatically change the editing label&#39;s text when edit mode is changed.</p><p>But what <em>is</em> new is detecting whether the user tapped the edit/done button or is trying to create a ball. To make this work, we&#39;re going to ask SpriteKit to give us a list of all the nodes at the point that was tapped, and check whether it contains our edit label. If it does, we&#39;ll flip the value of our <code>editingMode</code> boolean; if it doesn&#39;t, we want to execute the previous ball-creation code.</p><p>We&#39;re going to insert this change just after <code>let location =</code> and before <code>let ball =</code>, i.e. right here:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> location <span class="token operator">=</span> touch<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// new code to go here!</span></span>
<span class="line"><span class="token keyword">let</span> ball <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;ballRed&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Change that to be:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> location <span class="token operator">=</span> touch<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> objects <span class="token operator">=</span> <span class="token function">nodes</span><span class="token punctuation">(</span>at<span class="token punctuation">:</span> location<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> objects<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>editLabel<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    editingMode<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> ball <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;ballRed&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// rest of ball code</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Did you notice I slipped in a small but important new method there? <code>editingMode.toggle()</code> changes <code>editingMode</code> to true if it’s currently false, and to false if it was true. We could have written <code>editingMode = !editingMode</code> there and it would do the same thing, but <code>toggle()</code> is both shorter and clearer. That change will be picked up by the property observer, and the label will be updated to reflect the change.</p><p>Obviously the <code>// rest of ball code</code> comment is where the rest of the ball-creating code goes, but note that you need to add the new closing brace after you&#39;ve created the ball, to close the <code>else</code> block.</p><p>Now that we have a boolean telling us whether we&#39;re in editing mode or not, we&#39;re going to extend <code>touchesBegan()</code> even further so that if we&#39;re in editing mode we add blocks to the screen of random sizes, and if we&#39;re not it drops a ball.</p><p>To get the structure right, this is what you want to have:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> objects<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>editLabel<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    editingMode<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> editingMode <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// create a box</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// create a ball</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>// create a ball</code> comment is where your current ball creation code goes. The <code>// create a box</code> comment is what we&#39;re going to write in just a moment.</p><p>First, we&#39;re going to use a new property on nodes called <code>zRotation</code>. When creating the background image, we gave it a Z position, which adjusts its depth on the screen, front to back. If you imagine sticking a skewer through the Z position – i.e., going directly into your screen – and through a node, then you can imagine Z rotation: it rotates a node on the screen as if it had been skewered straight through the screen.</p><p>To create randomness we’re going to be using both <code>Int.random(in:)</code> for integer values and <code>CGFloat.random(in:)</code> for <code>CGFloat</code> values, with the latter being used to create random red, green, and blue values for a <code>UIColor</code>. So, replace the <code>// create a box</code> comment with this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> size <span class="token operator">=</span> <span class="token class-name">CGSize</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">16</span><span class="token operator">...</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">let</span> box <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token class-name">UIColor</span><span class="token punctuation">(</span>red<span class="token punctuation">:</span> <span class="token class-name">CGFloat</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token operator">...</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> green<span class="token punctuation">:</span> <span class="token class-name">CGFloat</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token operator">...</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> blue<span class="token punctuation">:</span> <span class="token class-name">CGFloat</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token operator">...</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> alpha<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> size<span class="token punctuation">:</span> size<span class="token punctuation">)</span></span>
<span class="line">box<span class="token punctuation">.</span>zRotation <span class="token operator">=</span> <span class="token class-name">CGFloat</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token operator">...</span><span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line">box<span class="token punctuation">.</span>position <span class="token operator">=</span> location</span>
<span class="line"></span>
<span class="line">box<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>rectangleOf<span class="token punctuation">:</span> box<span class="token punctuation">.</span>size<span class="token punctuation">)</span></span>
<span class="line">box<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>isDynamic <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>box<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, we create a size with a height of 16 and a width between 16 and 128, then create an <code>SKSpriteNode</code> with the random size we made along with a random color, then give the new box a random rotation and place it at the location that was tapped on the screen. For a physics body, it&#39;s just a rectangle, but we need to make it non-dynamic so the boxes don&#39;t move when hit.</p><p>At this point, we almost have a game: you can tap Edit, place as many blocks as you want, then tap Done and try to score by dropping balls. It&#39;s not perfect because we don&#39;t force the Y position of new balls to be the top of the screen, but that&#39;s something you can fix yourself – how else would you learn, right?</p><figure><img src="https://hackingwithswift.com/img/books/hws/11-3@2x.png" alt="Once the edit button has been tapped, users can create as many obstacles as they want." tabindex="0" loading="lazy"><figcaption>Once the edit button has been tapped, users can create as many obstacles as they want.</figcaption></figure>`,33))])}const f=c(h,[["render",g],["__file","06-scores-on-the-board-sklabelnode.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/read/11/06-scores-on-the-board-sklabelnode.html","title":"Scores on the board: SKLabelNode","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Scores on the board: SKLabelNode","description":"Article(s) > Scores on the board: SKLabelNode","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Scores on the board: SKLabelNode"},{"property":"og:description","content":"Scores on the board: SKLabelNode"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/06-scores-on-the-board-sklabelnode.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/06-scores-on-the-board-sklabelnode.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Scores on the board: SKLabelNode"}],["meta",{"property":"og:description","content":"Article(s) > Scores on the board: SKLabelNode"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/11-3@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Scores on the board: SKLabelNode\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/11-3@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.56,"words":1369},"filePathRelative":"hackingwithswift.com/read/11/06-scores-on-the-board-sklabelnode.md","excerpt":"\\n"}');export{f as comp,y as data};