import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as s,as as h,ao as n,at as o,au as i,an as p,al as m,aq as t,ar as k}from"./app-CpYYKbnj.js";const g={},f={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"};function y(c,e){const a=t("VPCard"),l=t("VidStack"),r=t("FontIcon");return k(),u("div",null,[s("h1",f,[s("a",b,[s("span",null,h(c.$frontmatter.title)+" 관련",1)])]),n(a,o(i({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[3]||(e[3]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),e[4]||(e[4]=s("hr",null,null,-1)),n(a,o(i({title:"Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody | Hacking with iOS",desc:"Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody",link:"https://hackingwithswift.com/read/11/2/falling-boxes-skspritenode-uitouch-skphysicsbody",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n(l,{src:"youtube/f1Bf1ORCLb4"}),e[5]||(e[5]=s("p",null,`The first thing you should do is run your game and see what a default SpriteKit template game looks like. You should see a large gray window saying "Hello, World!", and when you tap two spinning boxes should appear. In the bottom right is a node count (how many things are on screen right now) and a frame rate. You're aiming for 60 frames per second all the time, if possible.`,-1)),s("p",null,[e[0]||(e[0]=p("From the project navigator please find and open ")),n(r,{icon:"fa-brands fa-swift"}),e[1]||(e[1]=s("code",null,"GameScene.swift",-1)),e[2]||(e[2]=p(", and replace its entire contents with this:"))]),e[6]||(e[6]=m(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">SpriteKit</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">GameScene</span><span class="token punctuation">:</span> <span class="token class-name">SKScene</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">didMove</span><span class="token punctuation">(</span>to view<span class="token punctuation">:</span> <span class="token class-name">SKView</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">touchesBegan</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> touches<span class="token punctuation">:</span> <span class="token class-name">Set</span><span class="token operator">&lt;</span><span class="token class-name">UITouch</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> with event<span class="token punctuation">:</span> <span class="token class-name">UIEvent</span><span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That removes almost all the code, because it’s just not needed.</p><p>SpriteKit’s equivalent of Interface Builder is called the Scene Editor, and it’s where that big “Hello World” label is. Select GameScene.sks to open the scene editor now, then click on the “Hello World” label and delete it.</p><p>While you’re in the scene editor, there’s one more change I’d like to make, and it will help simplify our positioning slightly. With the scene selected, look in the attributes inspector (note: its icon is different here!) for Anchor Point. This determines what coordinates SpriteKit uses to position children and it’s X:0.5 Y:0.5 by default.</p><p>This is <em>different</em> to UIKit: it means “position me based on my center”, whereas UIKit positions things based on their top-left corner. This is usually fine, but when working with the main scene it’s easiest to set this value to X:0 Y:0. So, please make that change now – anchor point should 0 for both X and Y.</p><div class="hint-container note"><p class="hint-container-title">Note</p><p>SpriteKit considers Y:0 to be the bottom of the screen whereas UIKit considers it to be the top – hurray for uniformity!</p></div><p>I’d also like you to change the size of the scene, which is just above the anchor point. This is probably 750x1334 by default; please change it to 1024x768 to match iPad landscape size.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>The 9.7-inch iPad is 1024 points wide and 768 high, but the 10.5-inch and 12.9-inch are both larger. Helpfully, SpriteKit takes care of this for us: we just asked for a 1024x768 canvas and it will give us one regardless of what device our game runs on – nice!</p></div><p>The last change I’d like you to make is to select Actions.sks and tap your backspace button to delete it – select “Move to Trash” when Xcode asks you what you want to do.</p><p>All these changes have effectively cleaned the project, resetting it back to a vanilla state that we can build on.</p><p>With the template stuff deleted, I&#39;d like you to import the assets for the project. If you haven&#39;t already downloaded the code for this project, please do so now. You should copy the entire Content folder from the example project into your own, making sure the &quot;Copy items if needed&quot; box is checked.</p><p>Let&#39;s kick off this project by ditching the plain background and replacing it with a picture. If you want to place an image in your game, the class to use is called <code>SKSpriteNode</code>, and it can load any picture from your app bundle just like <code>UIImage</code>.</p><p>To place a background image, we need to load the file called background.jpg, then position it in the center of the screen. Remember, unlike UIKit SpriteKit positions things based on their center – i.e., the point 0,0 refers to the horizontal and vertical center of a node. And also unlike UIKit, SpriteKit&#39;s Y axis starts at the bottom edge, so a higher Y number places a node higher on the screen. So, to place the background image in the center of a landscape iPad, we need to place it at the position X:512, Y:384.</p><p>We&#39;re going to do two more things, both of which are only needed for this background. First, we&#39;re going to give it the blend mode <code>.replace</code>. Blend modes determine how a node is drawn, and SpriteKit gives you many options. The <code>.replace</code> option means &quot;just draw it, ignoring any alpha values,&quot; which makes it fast for things without gaps such as our background. We&#39;re also going to give the background a <code>zPosition</code> of -1, which in our game means &quot;draw this behind everything else.&quot;</p><p>To add any node to the current screen, you use the <code>addChild()</code> method. As you might expect, SpriteKit doesn&#39;t use <code>UIViewController</code> like our UIKit apps have done. Yes, there is a view controller in your project, but it&#39;s there to host your SpriteKit game. The equivalent of screens in SpriteKit are called <em>scenes</em>.</p><p>When you add a node to your scene, it becomes part of the node tree. Using <code>addChild()</code> you can add nodes to other nodes to make a more complicated tree, but in this game we&#39;re going to keep it simple.</p><p>Add this code to the <code>didMove(to:)</code> method, which is sort of the equivalent of SpriteKit&#39;s <code>viewDidLoad()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> background <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>imageNamed<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;background.jpg&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">background<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token class-name">CGPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">512</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">384</span><span class="token punctuation">)</span></span>
<span class="line">background<span class="token punctuation">.</span>blendMode <span class="token operator">=</span> <span class="token punctuation">.</span>replace</span>
<span class="line">background<span class="token punctuation">.</span>zPosition <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span></span>
<span class="line"><span class="token function">addChild</span><span class="token punctuation">(</span>background<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you run the app now you&#39;ll see a dark blue image for the background rather than plain gray – hardly a massive improvement, but this is just the beginning.</p><figure><img src="https://hackingwithswift.com/img/books/hws/11-1@2x.png" alt="The very start of our game just has a large plain background image. Don&#39;t worry, it gets more fun – honest!" tabindex="0" loading="lazy"><figcaption>The very start of our game just has a large plain background image. Don&#39;t worry, it gets more fun – honest!</figcaption></figure><p>Let&#39;s do something a bit more interesting, so add this to the <code>touchesBegan()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> touch <span class="token operator">=</span> touches<span class="token punctuation">.</span>first <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> location <span class="token operator">=</span> touch<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> box <span class="token operator">=</span> <span class="token class-name">SKSpriteNode</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>red<span class="token punctuation">,</span> size<span class="token punctuation">:</span> <span class="token class-name">CGSize</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">64</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    box<span class="token punctuation">.</span>position <span class="token operator">=</span> location</span>
<span class="line">    <span class="token function">addChild</span><span class="token punctuation">(</span>box<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We haven&#39;t used <code>touchesBegan()</code> before, so the first two lines needs to be explained. This method gets called (in UIKit and SpriteKit) whenever someone starts touching their device. It&#39;s possible they started touching with multiple fingers at the same time, so we get passed a new data type called <code>Set</code>. This is just like an array, except each object can appear only once.</p><p>We want to know where the screen was touched, so we use a conditional typecast plus <code>if let</code> to pull out any of the screen touches from the <code>touches</code> set, then use its <code>location(in:)</code> method to find out where the screen was touched in relation to <code>self</code> - i.e., the game scene. <code>UITouch</code> is a UIKit class that is also used in SpriteKit, and provides information about a touch such as its position and when it happened.</p><p>The third line is also new, but it&#39;s still <code>SKSpriteNode</code>. We&#39;re just writing some example code for now, so this line generates a node filled with a color (red) at a size (64x64). The <code>CGSize</code> struct is new, but also simple: it just holds a width and a height in a single structure.</p><p>The code sets the new box&#39;s position to be where the tap happened, then adds it to the scene. No more talk: press <kbd>Cmd</kbd>+<kbd>R</kbd> to make sure this all works, then tap around the screen to make boxes appear.</p><p>OK, I admit: that&#39;s still quite boring. Let&#39;s make it even more interesting – are you ready to see quite how powerful SpriteKit is? Just before setting the position of our new box, add this line:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">box<span class="token punctuation">.</span>physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>rectangleOf<span class="token punctuation">:</span> <span class="token class-name">CGSize</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">64</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And just before the end of <code>didMove(to:)</code>, add this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">physicsBody <span class="token operator">=</span> <span class="token class-name">SKPhysicsBody</span><span class="token punctuation">(</span>edgeLoopFrom<span class="token punctuation">:</span> frame<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>The first line of code adds a physics body to the box that is a rectangle of the same size as the box. The second line of code adds a physics body to the whole scene that is a line on each edge, effectively acting like a container for the scene.</p><p>If you run the scene now, I hope you can&#39;t help but be impressed: you can tap on the screen to create boxes, but now they&#39;ll fall to the ground and bounce off. They&#39;ll also stack up as you tap more often, and fall over realistically if your aim isn&#39;t spot on.</p><p>This is the power of SpriteKit: it&#39;s so fast and easy to make games that there really is nothing holding you back. But we&#39;re just getting warmed up!</p>`,33))])}const S=d(g,[["render",y],["__file","02-falling-boxes-skspritenode-uitouch-skphysicsbody.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/read/11/02-falling-boxes-skspritenode-uitouch-skphysicsbody.html","title":"Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody","description":"Article(s) > Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody"},{"property":"og:description","content":"Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/02-falling-boxes-skspritenode-uitouch-skphysicsbody.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/02-falling-boxes-skspritenode-uitouch-skphysicsbody.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody"}],["meta",{"property":"og:description","content":"Article(s) > Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/11-1@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Falling boxes: SKSpriteNode, UITouch, SKPhysicsBody\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/11-1@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":5.2,"words":1560},"filePathRelative":"hackingwithswift.com/read/11/02-falling-boxes-skspritenode-uitouch-skphysicsbody.md","excerpt":"\\n"}');export{S as comp,x as data};