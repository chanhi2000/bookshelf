import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as u,ao as a,at as t,au as o,al as d,aq as i,ar as h}from"./app-CpYYKbnj.js";const k={},m={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"};function w(p,n){const e=i("VPCard"),c=i("VidStack");return h(),r("div",null,[s("h1",m,[s("a",v,[s("span",null,u(p.$frontmatter.title)+" 관련",1)])]),a(e,t(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[0]||(n[0]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[1]||(n[1]=s("hr",null,null,-1)),a(e,t(o({title:"Shaping up for action: CGPath and UIBezierPath | Hacking with iOS",desc:"Shaping up for action: CGPath and UIBezierPath",link:"https://hackingwithswift.com/read/23/3/shaping-up-for-action-cgpath-and-uibezierpath",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(c,{src:"youtube/ztVwxIpMwiI"}),n[2]||(n[2]=d(`<p>Like I already explained, we&#39;re going to keep an array of the user&#39;s swipe points so that we can draw a shape resembling their slicing. To make this work, we&#39;re going to need four new methods, two of which you&#39;ve met already. They are: <code>touchesBegan()</code>, <code>touchesMoved()</code>, <code>touchesEnded()</code> and <code>redrawActiveSlice()</code>. You already know how <code>touchesBegan()</code> and <code>touchesMoved()</code> works, and the other &quot;touches&quot; methods all work the same way.</p><p>First things first: add this new property to your class so that we can store swipe points:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> activeSlicePoints <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token class-name">CGPoint</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>We&#39;re going to tackle the two easiest methods first: <code>touchesMoved()</code> and <code>touchesEnded()</code>. All the <code>touchesMoved()</code> method needs to do is figure out where in the scene the user touched, add that location to the slice points array, then redraw the slice shape, so that&#39;s easy enough:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">touchesMoved</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> touches<span class="token punctuation">:</span> <span class="token class-name">Set</span><span class="token operator">&lt;</span><span class="token class-name">UITouch</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> with event<span class="token punctuation">:</span> <span class="token class-name">UIEvent</span><span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> touch <span class="token operator">=</span> touches<span class="token punctuation">.</span>first <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">let</span> location <span class="token operator">=</span> touch<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">    activeSlicePoints<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>location<span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">redrawActiveSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>When the user finishes touching the screen, <code>touchesEnded()</code> will be called. I&#39;m going to make this method fade out the slice shapes over a quarter of a second. We <em>could</em> remove them immediately but that looks ugly, and leaving them sitting there for no reason would rather destroy the effect. So, fading it is – add this <code>touchesEnded()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">touchesEnded</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> touches<span class="token punctuation">:</span> <span class="token class-name">Set</span><span class="token operator">&lt;</span><span class="token class-name">UITouch</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> with event<span class="token punctuation">:</span> <span class="token class-name">UIEvent</span><span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    activeSliceBG<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SKAction</span><span class="token punctuation">.</span><span class="token function">fadeOut</span><span class="token punctuation">(</span>withDuration<span class="token punctuation">:</span> <span class="token number">0.25</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    activeSliceFG<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SKAction</span><span class="token punctuation">.</span><span class="token function">fadeOut</span><span class="token punctuation">(</span>withDuration<span class="token punctuation">:</span> <span class="token number">0.25</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You haven&#39;t used the <code>fadeOut(withDuration:)</code> action before, but I think it&#39;s pretty obvious what it does!</p><p>So far this is all easy stuff, but we&#39;re going to look at an interesting method now: <code>touchesBegan()</code>. One we’ve read out the touch from the <code>UITouch</code> set, this needs to do several things:</p><ol><li>Remove all existing points in the <code>activeSlicePoints</code> array, because we&#39;re starting fresh.</li><li>Get the touch location and add it to the <code>activeSlicePoints</code> array.</li><li>Call the (as yet unwritten) <code>redrawActiveSlice()</code> method to clear the slice shapes.</li><li>Remove any actions that are currently attached to the slice shapes. This will be important if they are in the middle of a <code>fadeOut(withDuration:)</code> action.</li><li>Set both slice shapes to have an alpha value of 1 so they are fully visible.</li></ol><p>We can convert that to code with ease – in fact, I&#39;ve put numbered comments in the code below so you can match them up to the points above:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">touchesBegan</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> touches<span class="token punctuation">:</span> <span class="token class-name">Set</span><span class="token operator">&lt;</span><span class="token class-name">UITouch</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> with event<span class="token punctuation">:</span> <span class="token class-name">UIEvent</span><span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> touch <span class="token operator">=</span> touches<span class="token punctuation">.</span>first <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 1  </span></span>
<span class="line">    activeSlicePoints<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 2</span></span>
<span class="line">    <span class="token keyword">let</span> location <span class="token operator">=</span> touch<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">    activeSlicePoints<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>location<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 3</span></span>
<span class="line">    <span class="token function">redrawActiveSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 4</span></span>
<span class="line">    activeSliceBG<span class="token punctuation">.</span><span class="token function">removeAllActions</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    activeSliceFG<span class="token punctuation">.</span><span class="token function">removeAllActions</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 5</span></span>
<span class="line">    activeSliceBG<span class="token punctuation">.</span>alpha <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    activeSliceFG<span class="token punctuation">.</span>alpha <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, there&#39;s some challenge there but not a whole lot. Where it gets interesting is the <code>redrawActiveSlice()</code> method, because this is going to use a <code>UIBezierPath</code> that will be used to connect our swipe points together into a single line.</p><p>As with the previous method, let&#39;s take a look at what <code>redrawActiveSlice()</code> needs to do:</p><ol><li>If we have fewer than two points in our array, we don&#39;t have enough data to draw a line so it needs to clear the shapes and exit the method.</li><li>If we have more than 12 slice points in our array, we need to remove the oldest ones until we have at most 12 – this stops the swipe shapes from becoming too long.</li><li>It needs to start its line at the position of the first swipe point, then go through each of the others drawing lines to each point.</li><li>Finally, it needs to update the slice shape paths so they get drawn using their designs – i.e., line width and color.</li></ol><p>To make this work, you&#39;re going to need to know that an <code>SKShapeNode</code> object has a property called <code>path</code> which describes the shape we want to draw. When it&#39;s <code>nil</code>, there&#39;s nothing to draw; when it&#39;s set to a valid path, that gets drawn with the <code>SKShapeNode</code>&#39;s settings. <code>SKShapeNode</code> expects you to use a data type called <code>CGPath</code>, but we can easily create that from a <code>UIBezierPath</code>.</p><p>Drawing a complex path using <code>UIBezierPath</code> is a cinch: we&#39;ll use its <code>move(to:)</code> method to position the start of our lines, then loop through our <code>activeSlicePoints</code> array and call the path&#39;s <code>addLine(to:)</code> method for each point.</p><p>To stop the array storing more than 12 slice points, we’re going new method called <code>removeFirst()</code>, which lets us remove a certain number of items from the start of an array. In this case we know we want at most 12, so we can subtract 12 from our current count to see how many excess we have, and pass that to <code>removeFirst()</code>.</p><p>I&#39;m going to insert numbered comments into the code again to help you match up the goals with the code more easily:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">redrawActiveSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 1</span></span>
<span class="line">    <span class="token keyword">if</span> activeSlicePoints<span class="token punctuation">.</span>count <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span></span>
<span class="line">        activeSliceBG<span class="token punctuation">.</span>path <span class="token operator">=</span> <span class="token nil constant">nil</span></span>
<span class="line">        activeSliceFG<span class="token punctuation">.</span>path <span class="token operator">=</span> <span class="token nil constant">nil</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 2</span></span>
<span class="line">    <span class="token keyword">if</span> activeSlicePoints<span class="token punctuation">.</span>count <span class="token operator">&gt;</span> <span class="token number">12</span> <span class="token punctuation">{</span></span>
<span class="line">        activeSlicePoints<span class="token punctuation">.</span><span class="token function">removeFirst</span><span class="token punctuation">(</span>activeSlicePoints<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">12</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 3</span></span>
<span class="line">    <span class="token keyword">let</span> path <span class="token operator">=</span> <span class="token class-name">UIBezierPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    path<span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span>to<span class="token punctuation">:</span> activeSlicePoints<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token number">1</span> <span class="token operator">..&lt;</span> activeSlicePoints<span class="token punctuation">.</span>count <span class="token punctuation">{</span></span>
<span class="line">        path<span class="token punctuation">.</span><span class="token function">addLine</span><span class="token punctuation">(</span>to<span class="token punctuation">:</span> activeSlicePoints<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 4</span></span>
<span class="line">    activeSliceBG<span class="token punctuation">.</span>path <span class="token operator">=</span> path<span class="token punctuation">.</span>cgPath</span>
<span class="line">    activeSliceFG<span class="token punctuation">.</span>path <span class="token operator">=</span> path<span class="token punctuation">.</span>cgPath</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>At this point, we have something you can run: press <kbd>Cmd</kbd>+<kbd>R</kbd> to run the game, then tap and swipe around on the screen to see the slice effect – I think you&#39;ll agree that <code>SKShapeNode</code> is pretty powerful!</p><figure><img src="https://hackingwithswift.com/img/books/hws/23-2@2x.png" alt="As the player swipes, their slices light up the screen in a bright yellow curve." tabindex="0" loading="lazy"><figcaption>As the player swipes, their slices light up the screen in a bright yellow curve.</figcaption></figure><p>Before we&#39;re done with the slice effect, we&#39;re going to add one more thing: a &quot;swoosh&quot; sound that plays as you swipe around. You&#39;ve already seen the <code>playSoundFileNamed()</code> method of <code>SKAction</code>, but we&#39;re going to use it a little differently here.</p><p>You see, if we just played a swoosh every time the player moved, there would be 100 sounds playing at any given time – one for every small movement they made. Instead, we want only one swoosh to play at once, so we&#39;re going to set to true a property called <code>isSwooshSoundActive</code>, make the <code>waitForCompletion</code> of our <code>SKAction</code> true, then use a completion closure for <code>runAction()</code> so that <code>isSwooshSoundActive</code> is set to false.</p><p>So, when the player first swipes we set <code>isSwooshSoundActive</code> to be true, and only when the swoosh sound has finished playing do we set it back to false again. This will allow us to ensure only one swoosh sound is playing at a time.</p><p>First, give your class this new property:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> isSwooshSoundActive <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now we need to check whether that&#39;s false when <code>touchesMoved()</code> is called, and, if it is false, call a new method called <code>playSwooshSound()</code>. Add this to code just before the end of <code>touchesMoved()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token operator">!</span>isSwooshSoundActive <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">playSwooshSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>I&#39;ve provided you with three different swoosh sounds, all of which are effectively the same just at varying pitches. The <code>playSwooshSound()</code> method needs to set <code>isSwooshSoundActive</code> to be true (so that no other swoosh sounds are played until we&#39;re ready), play one of the three sounds, then when the sound has finished set <code>isSwooshSoundActive</code> to be false again so that another swoosh sound can play.</p><p>By playing our sound with <code>waitForCompletion</code> set to true, SpriteKit automatically ensures the completion closure given to <code>runAction()</code> isn&#39;t called until the sound has finished, so this solution is perfect.</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">playSwooshSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    isSwooshSoundActive <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> randomNumber <span class="token operator">=</span> <span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token operator">...</span><span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> soundName <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;swoosh</span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">randomNumber</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">.caf&quot;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> swooshSound <span class="token operator">=</span> <span class="token class-name">SKAction</span><span class="token punctuation">.</span><span class="token function">playSoundFileNamed</span><span class="token punctuation">(</span>soundName<span class="token punctuation">,</span> waitForCompletion<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">run</span><span class="token punctuation">(</span>swooshSound<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">weak</span> <span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token keyword">in</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token operator">?</span><span class="token punctuation">.</span>isSwooshSoundActive <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you try running the game now you should hear only one swipe sound at a time.</p>`,33))])}const b=l(k,[["render",w],["__file","03-shaping-up-for-action-cgpath-and-uibezierpath.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/read/23/03-shaping-up-for-action-cgpath-and-uibezierpath.html","title":"Shaping up for action: CGPath and UIBezierPath","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Shaping up for action: CGPath and UIBezierPath","description":"Article(s) > Shaping up for action: CGPath and UIBezierPath","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Shaping up for action: CGPath and UIBezierPath"},{"property":"og:description","content":"Shaping up for action: CGPath and UIBezierPath"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/23/03-shaping-up-for-action-cgpath-and-uibezierpath.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/23/03-shaping-up-for-action-cgpath-and-uibezierpath.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Shaping up for action: CGPath and UIBezierPath"}],["meta",{"property":"og:description","content":"Article(s) > Shaping up for action: CGPath and UIBezierPath"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/23-2@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Shaping up for action: CGPath and UIBezierPath\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/23-2@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.85,"words":1455},"filePathRelative":"hackingwithswift.com/read/23/03-shaping-up-for-action-cgpath-and-uibezierpath.md","excerpt":"\\n"}');export{b as comp,y as data};