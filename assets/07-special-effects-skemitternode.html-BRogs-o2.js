import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as t,as as h,ao as a,at as o,au as n,al as d,aq as s,ar as u}from"./app-CpYYKbnj.js";const m={},f={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function w(l,e){const i=s("VPCard"),r=s("VidStack");return u(),p("div",null,[t("h1",f,[t("a",g,[t("span",null,h(l.$frontmatter.title)+" 관련",1)])]),a(i,o(n({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(i,o(n({title:"Special effects: SKEmitterNode | Hacking with iOS",desc:"Special effects: SKEmitterNode",link:"https://hackingwithswift.com/read/11/07-special-effects-skemitternode",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(r,{src:"youtube/cv-G8dzQlug"}),e[2]||(e[2]=d(`<p>Our current <code>destroy()</code> method does nothing much, it just removes the ball from the game. But I made it a method for a reason, and that&#39;s so that we can add some special effects now, in one place, so that however a ball gets destroyed the same special effects are used.</p><p>Perhaps unsurprisingly, it&#39;s remarkably easy to create special effects with SpriteKit. In fact, it has a built-in particle editor to help you create effects like fire, snow, rain and smoke almost entirely through a graphical editor. I already created an example particle effect for you (which you can customize soon, don&#39;t worry!) so let&#39;s take a look at the code first.</p><p>Modify your <code>destroy()</code> method to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">destroy</span><span class="token punctuation">(</span>ball<span class="token punctuation">:</span> <span class="token class-name">SKNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> fireParticles <span class="token operator">=</span> <span class="token class-name">SKEmitterNode</span><span class="token punctuation">(</span>fileNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;FireParticles&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        fireParticles<span class="token punctuation">.</span>position <span class="token operator">=</span> ball<span class="token punctuation">.</span>position</span>
<span class="line">        <span class="token function">addChild</span><span class="token punctuation">(</span>fireParticles<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    ball<span class="token punctuation">.</span><span class="token function">removeFromParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>SKEmitterNode</code> class is new and powerful: it&#39;s designed to create high-performance particle effects in SpriteKit games, and all you need to do is provide it with the filename of the particles you designed and it will do the rest. Once we have an <code>SKEmitterNode</code> object to work with, we position it where the ball was then use <code>addChild()</code> to add it to the scene.</p><p>If you run the app now, you&#39;ll see the balls explode in a fireball when they touch a slot – a pretty darn amazing effect given how little code was written!</p><p>But the real fun is yet to come, because the code for this project is now all done and you get to play with the particle editor. In Xcode, look in the Content folder you dragged in and select the FireParticles.sks file to load the particle editor.</p><p>The particle editor is split in two: the center area shows how the current particle effect looks, and the right pane shows one of three inspectors. Of those three inspectors, only the third is useful because that&#39;s where you&#39;ll see all the options you can use to change the way your particles look.</p><p>At the time of writing, Xcode&#39;s particle editor is a little buggy, so I suggest you change the Maximum value to 0 before beginning otherwise you might see nothing at all.</p><p>Confused by all the options? Here&#39;s what they do:</p><ul><li>Particle Texture: what image to use for your particles.</li><li>Particles Birthrate: how fast to create new particles.</li><li>Particles Maximum: the maximum number of particles this emitter should create before finishing.</li><li>Lifetime Start: the basic value for how many seconds each particle should live for.</li><li>Lifetime Range: how much, plus or minus, to vary lifetime.</li><li>Position Range X/Y: how much to vary the creation position of particles from the emitter node&#39;s position.</li><li>Angle Start: which angle you want to fire particles, in degrees, where 0 is to the right and 90 is straight up.</li><li>Angle Range: how many degrees to randomly vary particle angle.</li><li>Speed Start: how fast each particle should move in its direction.</li><li>Speed Range: how much to randomly vary particle speed.</li><li>Acceleration X/Y: how much to affect particle speed over time. This can be used to simulate gravity or wind.</li><li>Alpha Start: how transparent particles are when created.</li><li>Alpha Range: how much to randomly vary particle transparency.</li><li>Alpha Speed: how much to change particle transparency over time. A negative value means &quot;fade out.&quot;</li><li>Scale Start / Range / Speed: how big particles should be when created, how much to vary it, and how much it should change over time. A negative value means &quot;shrink slowly.&quot;</li><li>Rotation Start / Range / Speed: what Z rotation particles should have, how much to vary it, and how much they should spin over time.</li><li>Color Blend Factor / Range / Speed: how much to color each particle, how much to vary it, and how much it should change over time.</li></ul><div class="hint-container note"><p class="hint-container-title">Note</p><p>Once you&#39;ve finished editing your particles, make sure you put a maximum value back on them otherwise they&#39;ll never go away!</p></div><p>It&#39;s worth adding that you can create particles from one of Xcode&#39;s built-in particle template. Add a new file, but this time choose &quot;Resource&quot; under the iOS heading, then choose &quot;SpriteKit Particle File&quot; to see the list of options.</p>`,13))])}const v=c(m,[["render",w],["__file","07-special-effects-skemitternode.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/read/11/07-special-effects-skemitternode.html","title":"Special effects: SKEmitterNode","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Special effects: SKEmitterNode","description":"Article(s) > Special effects: SKEmitterNode","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Special effects: SKEmitterNode"},{"property":"og:description","content":"Special effects: SKEmitterNode"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/07-special-effects-skemitternode.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/07-special-effects-skemitternode.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Special effects: SKEmitterNode"}],["meta",{"property":"og:description","content":"Article(s) > Special effects: SKEmitterNode"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Special effects: SKEmitterNode\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.8,"words":839},"filePathRelative":"hackingwithswift.com/read/11/07-special-effects-skemitternode.md","excerpt":"\\n"}');export{v as comp,S as data};