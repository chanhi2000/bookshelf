import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as n,as as m,ao as a,at as p,au as i,al as l,an as t,aq as e,ar as h}from"./app-CpYYKbnj.js";const v={},g={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"};function y(c,s){const o=e("VPCard"),r=e("VidStack"),u=e("FontIcon");return h(),k("div",null,[n("h1",g,[n("a",b,[n("span",null,m(c.$frontmatter.title)+" 관련",1)])]),a(o,p(i({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[5]||(s[5]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),s[6]||(s[6]=n("hr",null,null,-1)),a(o,p(i({title:"Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask | Hacking with iOS",desc:"Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask",link:"https://hackingwithswift.com/read/26/2/loading-a-level-categorybitmask-collisionbitmask-contacttestbitmask",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(r,{src:"youtube/MLMIdhpnd_Y"}),s[7]||(s[7]=l(`<p>We&#39;re going to start by looking at the biggest method in the project, and perhaps even the entire Hacking with Swift series. It&#39;s called <code>loadLevel()</code> and is responsible for loading a level file from disk and creating SpriteKit nodes onscreen.</p><p>The method isn&#39;t long because it&#39;s complicated, it&#39;s long just because it does a lot. When you finish this project one of the suggested ways to improve the code is to split this method off into smaller chunks, so you should pay close attention to how it works!</p><p>At the core of the method it loads a level file from disk, then splits it up by line. Each line will become one row of level data on the screen, so the method will loop over every character in the row and see what letter it is. Our game will recognize five possible options: a space will mean empty space, &quot;x&quot; means a wall, &quot;v&quot; means a vortex (deadly to players), &quot;s&quot; means a star (awards points), and &quot;f&quot; means level finish.</p><p>Using this kind of very simple level text format means that you can write your levels in a text editor, and visually see exactly how they will look in your game. You&#39;ve already tackled most of the code required for the skeleton of <code>loadLevel()</code>, but there are a few things I want to highlight:</p><ul><li>We&#39;ll be using the <code>enumerated()</code> method again. In case you&#39;ve forgotten, this loops over an array, extracting each item and its position in the array.</li><li>We&#39;ll be positioning items as we go. Each square in the game world occupies a 64x64 space, so we can find its position by multiplying its row and column by 64. But: remember that SpriteKit calculates its positions from the center of objects, so we need to add 32 to the X and Y coordinates in order to make everything lines up on our screen.</li><li>You might also remember that SpriteKit uses an inverted Y axis to UIKit, which means for SpriteKit Y:0 is the bottom of the screen whereas for UIKit Y:0 is the top. When it comes to loading level rows, this means we need to read them in reverse so that the last row is created at the bottom of the screen and so on upwards.</li></ul><p>Here&#39;s the initial code for <code>loadLevel()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">loadLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> levelURL <span class="token operator">=</span> <span class="token class-name">Bundle</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>forResource<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;level1&quot;</span></span><span class="token punctuation">,</span> withExtension<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;txt&quot;</span></span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">fatalError</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Could not find level1.txt in the app bundle.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> levelString <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">String</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> levelURL<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">fatalError</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Could not load level1.txt from the app bundle.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> lines <span class="token operator">=</span> levelString<span class="token punctuation">.</span><span class="token function">components</span><span class="token punctuation">(</span>separatedBy<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;\\n&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">(</span>row<span class="token punctuation">,</span> line<span class="token punctuation">)</span> <span class="token keyword">in</span> lines<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enumerated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">for</span> <span class="token punctuation">(</span>column<span class="token punctuation">,</span> letter<span class="token punctuation">)</span> <span class="token keyword">in</span> line<span class="token punctuation">.</span><span class="token function">enumerated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">let</span> position <span class="token operator">=</span> <span class="token class-name">CGPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">64</span> <span class="token operator">*</span> column<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">32</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">64</span> <span class="token operator">*</span> row<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">32</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">if</span> letter <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;x&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token comment">// load wall</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> letter <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;v&quot;</span></span>  <span class="token punctuation">{</span></span>
<span class="line">                <span class="token comment">// load vortex</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> letter <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;s&quot;</span></span>  <span class="token punctuation">{</span></span>
<span class="line">                <span class="token comment">// load star</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> letter <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;f&quot;</span></span>  <span class="token punctuation">{</span></span>
<span class="line">                <span class="token comment">// load finish</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> letter <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot; &quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token comment">// this is an empty space – do nothing!</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">fatalError</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Unknown level letter: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">letter</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There are lots of comments in there where we&#39;re going to do work to load the various level components. Much of the code for these is the same: load in an image, position it, give it a physics body, then add it to the scene. But they do vary, because we want the player to be able to collide with some, we want to notified of collisions with some, and so on.</p><p>But first: we&#39;re going to be using the <code>categoryBitMask</code>, <code>contactTestBitMask</code> and <code>collisionBitMask</code> properties in their fullest for this project, because we have very precise rules that make the game work. To clarify, here&#39;s what each of them mean:</p><ul><li>The <code>categoryBitMask</code> property is a number defining the type of object this is for considering collisions.</li><li>The <code>collisionBitMask</code> property is a number defining what categories of object this node should collide with,</li><li>The <code>contactTestBitMask</code> property is a number defining which collisions we want to be notified about.</li></ul><p>They all do very different things, although the distinction might seem fine before you fully understand. Category is simple enough: every node you want to reference in your collision bitmasks or your contact test bitmasks must have a category attached. If you give a node a collision bitmask but not a contact test bitmask, it means they will bounce off each other but you won&#39;t be notified. If you do the opposite (contact test but not collision) it means they won&#39;t bounce off each other but you will be told when they overlap.</p><p>By default, physics bodies have a collision bitmask that means &quot;everything&quot;, so everything bounces off everything else. By default, they also have a contact test bitmask that means &quot;nothing&quot;, so you&#39;ll never get told about collisions.</p><p>A bitmask is a complicated beast to explain, but what it means in practice is that you can combine values together. In our game, vortexes, stars and the finish flag all have the player set for their contact test bitmask, and the player has star <em>and</em> vortex <em>and</em> finish flag.</p>`,13)),n("p",null,[s[0]||(s[0]=t("SpriteKit expects these three bitmasks to be described using a ")),s[1]||(s[1]=n("code",null,"UInt32",-1)),s[2]||(s[2]=t(". It's a particular way of storing numbers, but rather than using numbers we're going to use enums with a raw value. This means we can refer to the various options using names. Put this enum definition above your class in ")),a(u,{icon:"fa-brands fa-swift"}),s[3]||(s[3]=n("code",null,"GameScene.swift",-1)),s[4]||(s[4]=t(":"))]),s[8]||(s[8]=l(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">enum</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">:</span> <span class="token class-name">UInt32</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> player <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">case</span> wall <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line">    <span class="token keyword">case</span> star <span class="token operator">=</span> <span class="token number">4</span></span>
<span class="line">    <span class="token keyword">case</span> vortex <span class="token operator">=</span> <span class="token number">8</span></span>
<span class="line">    <span class="token keyword">case</span> finish <span class="token operator">=</span> <span class="token number">16</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note that your bitmasks should start at 1 then double each time. With that, let&#39;s start replacing the comments in the <code>loadLevel()</code> method with real code. First, here&#39;s how to create a wall – replace the <code>// load wall</code> comment with this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;block&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>position <span class="token operator">=</span> position</span>
<span class="line"></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>rectangleOf<span class="token punctuation">:</span> node<span class="token punctuation">.</span>size<span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>categoryBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>wall<span class="token punctuation">.</span>rawValue</span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>isDynamic <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>It uses rectangle physics, it&#39;s not dynamic because the walls should be fixed… this is all child&#39;s play to you now, right? When assigning a value to <code>categoryBitMask</code> we can’t use our enum directly because it expects to receive a <code>UInt32</code>. So, we’re getting the number from the enum using its <code>rawValue</code> property.</p><p>Next, replace the <code>// load vortex</code> comment with this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;vortex&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;vortex&quot;</span></span></span>
<span class="line">node<span class="token punctuation">.</span>position <span class="token operator">=</span> position</span>
<span class="line">node<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SKAction</span><span class="token punctuation">.</span><span class="token function">repeatForever</span><span class="token punctuation">(</span><span class="token class-name">SKAction</span><span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span>byAngle<span class="token punctuation">:</span> <span class="token punctuation">.</span>pi<span class="token punctuation">,</span> duration<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>circleOfRadius<span class="token punctuation">:</span> node<span class="token punctuation">.</span>size<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>isDynamic <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>categoryBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>vortex<span class="token punctuation">.</span>rawValue</span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>contactTestBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>player<span class="token punctuation">.</span>rawValue</span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>collisionBitMask <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is a little more interesting, because it uses <code>rotate(byAngle:)</code> and <code>repeatForever()</code> to make each vortex rotate around and around for as long the game lasts. It also sets the <code>contactTestBitMask</code> property to the value of the player&#39;s category, which means we want to be notified when these two touch.</p><p>The code to load stars and the finish flag are almost identical and quite trivial for you at this point, so here&#39;s the code to load stars:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;star&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;star&quot;</span></span></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>circleOfRadius<span class="token punctuation">:</span> node<span class="token punctuation">.</span>size<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>isDynamic <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>categoryBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>star<span class="token punctuation">.</span>rawValue</span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>contactTestBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>player<span class="token punctuation">.</span>rawValue</span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>collisionBitMask <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">node<span class="token punctuation">.</span>position <span class="token operator">=</span> position</span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And the code to load the finish flag:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;finish&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;finish&quot;</span></span></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>circleOfRadius<span class="token punctuation">:</span> node<span class="token punctuation">.</span>size<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>isDynamic <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>categoryBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>finish<span class="token punctuation">.</span>rawValue</span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>contactTestBitMask <span class="token operator">=</span> <span class="token class-name">CollisionTypes</span><span class="token punctuation">.</span>player<span class="token punctuation">.</span>rawValue</span>
<span class="line">node<span class="token punctuation">.</span>physicsBody<span class="token operator">?</span><span class="token punctuation">.</span>collisionBitMask <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">node<span class="token punctuation">.</span>position <span class="token operator">=</span> position</span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That completes the method. It&#39;s long, but it&#39;s quite repetitive – there are several ways it could be refactored into something neater, but that would be cheating for later!</p><p>To see the fruits of your labor, add a call to <code>loadLevel()</code> in <code>didMove(to:)</code> then run your game. Remember to use the lowest-spec iPad simulator you can find in order to help it run quickly!</p><figure><img src="https://hackingwithswift.com/img/books/hws/26-1@2x.png" alt="Our code has successfully parsed the level text file into something playable." tabindex="0" loading="lazy"><figcaption>Our code has successfully parsed the level text file into something playable.</figcaption></figure><p>To finish off the level-loading code, we should add a background picture. You&#39;ve done this many times so far, so please just go ahead and put this code into <code>didMove(to:)</code>, <em>before</em> the <code>loadLevel()</code> call:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> background <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;background.jpg&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">background<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token class-name">CGPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">512</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">384</span><span class="token punctuation">)</span></span>
<span class="line">background<span class="token punctuation">.</span>blendMode <span class="token operator">=</span> <span class="token punctuation">.</span>replace</span>
<span class="line">background<span class="token punctuation">.</span>zPosition <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span></span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>background<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16))])}const B=d(v,[["render",y],["__file","02-loading-a-level-categorybitmask-collisionbitmask-contacttestbitmask.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/read/26/02-loading-a-level-categorybitmask-collisionbitmask-contacttestbitmask.html","title":"Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask","description":"Article(s) > Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask"},{"property":"og:description","content":"Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/26/02-loading-a-level-categorybitmask-collisionbitmask-contacttestbitmask.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/26/02-loading-a-level-categorybitmask-collisionbitmask-contacttestbitmask.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask"}],["meta",{"property":"og:description","content":"Article(s) > Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/26-1@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Loading a level: categoryBitMask, collisionBitMask, contactTestBitMask\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/26-1@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":5.12,"words":1536},"filePathRelative":"hackingwithswift.com/read/26/02-loading-a-level-categorybitmask-collisionbitmask-contacttestbitmask.md","excerpt":"\\n"}');export{B as comp,q as data};