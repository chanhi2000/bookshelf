import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as r,ao as a,at as n,au as i,al as l,aq as h,ar as d}from"./app-CpYYKbnj.js";const u={},m={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"};function g(o,e){const s=h("VPCard");return d(),c("div",null,[t("h1",m,[t("a",k,[t("span",null,r(o.$frontmatter.title)+" 관련",1)])]),a(s,n(i({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(s,n(i({title:"Optimizing SpriteKit physics | Hacking with iOS",desc:"Optimizing SpriteKit physics",link:"https://hackingwithswift.com/read/36/7/optimizing-spritekit-physics",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=l(`<p>If you play our game on a real device, you’ll notice a problem: whenever new rocks are created off-screen, the game freezes briefly. It’s not a lot – maybe a tenth of a second depending on your device – but it’s still enough to be noticeable. You might also notice there’s a short delay the first time the player dies – try watching the particle system and you’ll see it’s far from smooth, at least the first time.</p><p>Both of these are optimization problems, and both can be fixed with a small amount of thinking. I know you might be tempted to move on to the next project, but trust me – spending a little time adding extra polish is good for you!</p><p>The reason our game pauses when rocks are created is because SpriteKit loads the rock texture and calculates pixel-perfect collisions for it. Although it’s an implementation detail – i.e., something we shouldn’t need to think about – SpriteKit will actually cache its textures for us, so although we can and should cache our rock texture it’s not the big problem here.</p><p>Instead, it’s that pesky pixel-perfect collision calculation: scanning the rock texture to see which pixels are transparent, so SpriteKit knows which parts we can crash into.</p><p>Now, if you think about it this pixel scanning doesn’t need to take place every time we create a new rock. In fact, it only needs to be run <em>once</em>: figure out the shape of the rock, then use copies of that physics body for all new rocks in the future. As all the rocks have the same shape, this means we do the work once and every future rock creation is effectively free.</p><p>To make that happen we need to add two new properties to our game scene: one to store the rock texture, and one to store the rock physics body. Add these now:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> rockTexture <span class="token operator">=</span> <span class="token class-name">SKTexture</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;rock&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">var</span> rockPhysics<span class="token punctuation">:</span> <span class="token class-name">SKPhysicsBody</span><span class="token operator">!</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Next, in <code>didMove(to:)</code> we need to create an <code>SKPhysicsBody</code> from our rock texture and store it in that <code>rockPhysics</code> property for later on:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">rockPhysics <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>texture<span class="token punctuation">:</span> rockTexture<span class="token punctuation">,</span> size<span class="token punctuation">:</span> rockTexture<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now for the important part: now that we have our rock physics calculated, we should use <em>that</em> for the <code>topRock</code> and <code>bottomRock</code> physics bodies in the <code>createRocks()</code> method. Now, we can’t just assign it directly, because SpriteKit needs all its physics bodies to be unique. However, we can call <em>copy()</em> on our original to create a new instance, then typecast that as an <code>SKPhysicsBody</code>.</p><p>So, please modify the physics code in <code>createRocks()</code> to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">topRock<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> rockPhysics<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">SKPhysicsBody</span></span>
<span class="line">bottomRock<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> rockPhysics<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">SKPhysicsBody</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>That will remove the speed bump when creating new rocks, which means our game should stay nice and smooth while playing.</p><p>As for the other problem – the little speed bump when the player first dies – this is solved with another cache, this time for the player’s explosion. Even though this won’t be used in our game, this will force SpriteKit to preload the texture and keep it in memory, so it’s already there when it’s really needed.</p><p>So, please add this third property now:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> explosion <span class="token operator">=</span> <span class="token class-name">SKEmitterNode</span><span class="token punctuation">(</span>fileNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;PlayerExplosion&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Done!</p>`,17))])}const w=p(u,[["render",g],["__file","07-optimizing-spritekit-physics.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/read/36/07-optimizing-spritekit-physics.html","title":"Optimizing SpriteKit physics","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Optimizing SpriteKit physics","description":"Article(s) > Optimizing SpriteKit physics","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Optimizing SpriteKit physics"},{"property":"og:description","content":"Optimizing SpriteKit physics"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/36/07-optimizing-spritekit-physics.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/36/07-optimizing-spritekit-physics.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Optimizing SpriteKit physics"}],["meta",{"property":"og:description","content":"Article(s) > Optimizing SpriteKit physics"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Optimizing SpriteKit physics\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.24,"words":671},"filePathRelative":"hackingwithswift.com/read/36/07-optimizing-spritekit-physics.md","excerpt":"\\n"}');export{w as comp,b as data};