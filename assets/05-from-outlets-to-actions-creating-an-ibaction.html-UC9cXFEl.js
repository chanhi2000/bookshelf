import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as e,as as m,ao as o,at as c,au as r,an as n,al as l,aq as a,ar as g}from"./app-CpYYKbnj.js";const w={},f={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"};function b(p,t){const s=a("VPCard"),d=a("VidStack"),i=a("FontIcon");return g(),h("div",null,[e("h1",f,[e("a",k,[e("span",null,m(p.$frontmatter.title)+" 관련",1)])]),o(s,c(r({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[10]||(t[10]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[11]||(t[11]=e("hr",null,null,-1)),o(s,c(r({title:"From outlets to actions: creating an IBAction | Hacking with iOS",desc:"From outlets to actions: creating an IBAction",link:"https://hackingwithswift.com/read/2/5/from-outlets-to-actions-creating-an-ibaction",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o(d,{src:"youtube/LYSIFwBeVvE"}),e("p",null,[t[0]||(t[0]=n(`I said we'd return to Interface Builder, and now the time has come: we're going to connect the "tap" action of our `)),t[1]||(t[1]=e("code",null,"UIButtons",-1)),t[2]||(t[2]=n(" to some code. So, select ")),o(i,{icon:"iconfont icon-xcode"}),t[3]||(t[3]=e("code",null,"Main.storyboard",-1)),t[4]||(t[4]=n(", then change to the assistant editor so you can see the code alongside the layout."))]),t[12]||(t[12]=l(`<div class="hint-container warning"><p class="hint-container-title">Warning</p><p>please read the following text very carefully. In my haste I screw this up all the time, and I don&#39;t want it to confuse you!</p></div><p>Select the first button, then <kbd>Ctrl</kbd>+drag from it down to the space in your code immediately after the end of the <code>askQuestion()</code> method. If you&#39;re doing it correctly, you should see a tooltip saying, &quot;Insert Outlet, Action, or Outlet Collection.&quot; When you let go, you&#39;ll see the same popup you normally see when creating outlets, but here&#39;s the catch: <strong>don&#39;t choose outlet</strong>.</p><figure><img src="https://hackingwithswift.com/img/books/hws/2-13@2x.png" alt="Creating an action in the Xcode assistant editor is very similar to creating an outlet." tabindex="0" loading="lazy"><figcaption>Creating an action in the Xcode assistant editor is very similar to creating an outlet.</figcaption></figure><p>That&#39;s right: where it says &quot;Connection: Outlet&quot; at the top of the popup, I want you to change that to be “Action”. If you choose Outlet here (which I do all too often because I&#39;m in a rush), you&#39;ll cause problems for yourself!</p><p>When you choose Action rather than Outlet, the popup changes a little. You&#39;ll still get asked for a name, but now you&#39;ll see an Event field, and the Type field has changed from <code>UIButton</code> to <code>Any</code>. Please change Type back to <code>UIButton</code>, then enter <code>buttonTapped</code> for the name, and click Connect.</p><p>Here&#39;s what Xcode will write for you:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@IBAction</span> <span class="token keyword">func</span> <span class="token function-definition function">buttonTapped</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> sender<span class="token punctuation">:</span> <span class="token class-name">UIButton</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>…and again, notice the gray circle with a ring around it on the left, signifying this has a connection in Interface Builder.</p><p>Before we look at what this is doing, I want you to make two more connections. This time it&#39;s a bit different, because we&#39;re connecting the other two flag buttons to the same <code>buttonTapped()</code> method. To do that, select each of the remaining two buttons, then <kbd>Ctrl</kbd>-drag onto the <code>buttonTapped()</code> method that was just created. The whole method will turn blue signifying that it&#39;s going to be connected, so you can just let go to make it happen. If the method flashes after you let go, it means the connection was made.</p><p>So, what do we have? Well, we have a single method called <code>buttonTapped()</code>, which is connected to all three <code>UIButton</code>s. The event used for the attachment is called <code>TouchUpInside</code>, which is the iOS way of saying, &quot;the user touched this button, then released their finger while they were still over it&quot; – i.e., the button was tapped.</p><p>Again, Xcode has inserted an attribute to the start of this line so it knows that this is relevant to Interface Builder, and this time it&#39;s <code>@IBAction</code>. <code>@IBAction</code> is similar to <code>@IBOutlet</code>, but goes the other way: <code>@IBOutlet</code> is a way of connecting code to storyboard layouts, and <code>@IBAction</code> is a way of making storyboard layouts trigger code.</p><p>This method takes one parameter, called <code>sender</code>. It&#39;s of type <code>UIButton</code> because we know that&#39;s what will be calling the method. And this is important: all three buttons are calling the same method, so it&#39;s important we know which button was tapped so we can judge whether the answer was correct.</p><p>But how do we know whether the correct button was tapped? Right now, all the buttons look the same, but behind the scenes all views have a special identifying number that we can set, called its Tag. This can be any number you want, so we&#39;re going to give our buttons the numbers 0, 1 and 2. This isn&#39;t a coincidence: our code is already set to put flags 0, 1 and 2 into those buttons, so if we give them the same tags we know exactly what flag was tapped.</p><p>Select the second flag (not the first one!), then look in the attributes inspector (<kbd>Alt</kbd>+<kbd>Cmd</kbd>+<kbd>4</kbd>) for the input box marked Tag. You might need to scroll down, because <code>UIButton</code>s have lots of properties to work with! Once you find it (it&#39;s about two-thirds of the way down, just above the color and alpha properties), make sure it&#39;s set to 1.</p><figure><img src="https://hackingwithswift.com/img/books/hws/2-14@2x.png" alt="Setting a tag in Interface Builder is a quick and easy way to distinguish your views." tabindex="0" loading="lazy"><figcaption>Setting a tag in Interface Builder is a quick and easy way to distinguish your views.</figcaption></figure><p>Now choose the third flag and set its tag to be 2. We don&#39;t need to change the tag of the first flag because 0 is the default.</p>`,16)),e("p",null,[t[5]||(t[5]=n("We're done with Interface Builder for now, so go back to the standard editor and select ")),o(i,{icon:"fa-brands fa-swift"}),t[6]||(t[6]=e("code",null,"ViewController.swift",-1)),t[7]||(t[7]=n(" – it's time to finish up by filling in the contents of the ")),t[8]||(t[8]=e("code",null,"buttonTapped()",-1)),t[9]||(t[9]=n(" method."))]),t[13]||(t[13]=l(`<p>This method needs to do three things:</p><ol><li>Check whether the answer was correct.</li><li>Adjust the player&#39;s score up or down.</li><li>Show a message telling them what their new score is.</li></ol><p>The first task is quite simple, because each button has a tag matching its position in the array, and we stored the position of the correct answer in the <code>correctAnswer</code> variable. So, the answer is correct if <code>sender.tag</code> is equal to <code>correctAnswer</code>.</p><p>The second task is also simple, because you&#39;ve already met the <code>+=</code> operator that adds to a value. We&#39;ll be using that and its counterpart, <code>-=</code>, to add or subtract score as needed. The third task is more complicated, so we&#39;re going to come to it in a minute.</p><p>Put this code into the <code>buttonTapped()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> title<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> sender<span class="token punctuation">.</span>tag <span class="token operator">==</span> correctAnswer <span class="token punctuation">{</span></span>
<span class="line">    title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Correct&quot;</span></span></span>
<span class="line">    score <span class="token operator">+=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Wrong&quot;</span></span></span>
<span class="line">    score <span class="token operator">-=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now for the tough bit: we&#39;re going to use a new data type called <code>UIAlertController()</code>. This is used to show an alert with options to the user. To make this work you&#39;re going to need to use a <em>closure</em> – something you’ve learned about in theory, but at last finally get to use in practice.</p><p>If you remember, closures is a special kind of code block that can be used like a variable – Swift literally takes a copy of the block of code so that it can be called later. Swift also copies anything referenced inside the code, so you need to be careful how you use them. We&#39;re going to be using closures extensively later, but for now we’ll take two shortcuts.</p><p>Enter this just before the end of the <code>buttonTapped()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> ac <span class="token operator">=</span> <span class="token class-name">UIAlertController</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> title<span class="token punctuation">,</span> message<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Your score is </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">score</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">.&quot;</span></span><span class="token punctuation">,</span> preferredStyle<span class="token punctuation">:</span> <span class="token punctuation">.</span>alert<span class="token punctuation">)</span></span>
<span class="line">ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Continue&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> askQuestion<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">present</span><span class="token punctuation">(</span>ac<span class="token punctuation">,</span> animated<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>That code will produce an error for a moment, but that’s OK.</strong></p><p>The <code>title</code> variable was set in our if statement to be either &quot;correct&quot; or &quot;wrong&quot;, and you&#39;ve already learned about string interpolation, so the first new thing there is the <code>.alert</code> parameter being used for <code>preferredStyle</code>. <code>UIAlertController()</code> gives us two kinds of style: <code>.alert</code>, which pops up a message box over the center of the screen, and <code>.actionSheet</code>, which slides options up from the bottom. They are similar, but Apple recommends you use <code>.alert</code> when telling users about a situation change, and <code>.actionSheet</code> when asking them to choose from a set of options.</p><p>The second line uses the <code>UIAlertAction</code> data type to add a button to the alert that says &quot;Continue&quot;, and gives it the style “default&quot;. There are three possible styles: <code>.default</code>, <code>.cancel</code>, and <code>.destructive</code>. What these look like depends on iOS, but it&#39;s important you use them appropriately because they provide subtle user interface hints to users.</p><p>The sting in the tail is at the end of that line: <code>handler: askQuestion</code>. The <code>handler</code> parameter is looking for a closure, which is some code that it can execute when the button is tapped. You can write custom code in there if you want, but in our case we want the game to continue when the button is tapped, so we pass in <code>askQuestion</code> so that iOS will call our <code>askQuestion()</code> method.</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>We must use <code>askQuestion</code> and not <code>askQuestion()</code>. If you use the former, it means &quot;here&#39;s the name of the method to run,&quot; but if you use the latter it means &quot;run the <code>askQuestion()</code> method now, and it will tell you the name of the method to run.&quot;</p></div><p>There are many good reasons to use closures, but in the example here just passing in <code>askQuestion</code> is a neat shortcut – although it does break something that we&#39;ll need to fix in a moment.</p><p>The final line calls <code>present()</code>, which takes two parameters: a view controller to present and whether to animate the presentation. It has an optional third parameter that is another closure that should be executed when the presentation animation has finished, but we don’t need it here. We send our <code>UIAlertController</code> for the first parameter, and true for the second because animation is always nice.</p><p>Before the code completes, there&#39;s a problem, and Xcode is probably telling you what it is: “Cannot convert value of type ‘() -&gt; ()’ to expected argument type ‘((UIAlertAction) -&gt; Void)?’.”</p><p>This is a good example of Swift&#39;s terrible error messages, and it&#39;s something I&#39;m afraid you&#39;ll have to get used to. What it <em>means</em> to say is that using a method for this closure is fine, but Swift wants the method to accept a <code>UIAlertAction</code> parameter saying which <code>UIAlertAction</code> was tapped.</p><p>To make this problem go away, we need to change the way the <code>askQuestion()</code> method is defined. So, scroll up and change <code>askQuestion()</code> from this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">askQuestion</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>…to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">askQuestion</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token class-name">UIAlertAction</span><span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That will fix the <code>UIAlertAction</code> error. However, it will introduce <em>another</em> problem: when the app first runs, we call <code>askQuestion()</code> inside <code>viewDidLoad()</code>, and we don&#39;t pass it a parameter. There are two ways to fix this:</p><ol><li>When using <code>askQuestion()</code> in <code>viewDidLoad()</code>, we could send it the parameter <code>nil</code> to mean &quot;there is no <code>UIAlertAction</code> for this.&quot;</li><li>We could redefine <code>askQuestion()</code> so that the action has a default parameter of <code>nil</code>, meaning that if it isn&#39;t specified it automatically becomes <code>nil</code>.</li></ol><p>There&#39;s no right or wrong answer here, so I&#39;ll show you both and you can choose. If you want to go with the first option, change the <code>askQuestion()</code> call in <code>viewDidLoad()</code> to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">askQuestion</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token nil constant">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And if you want to go with the second option, change the <code>askQuestion()</code> method definition to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">askQuestion</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token class-name">UIAlertAction</span><span class="token operator">!</span> <span class="token operator">=</span> <span class="token nil constant">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now, go ahead and run your program in the simulator, because it&#39;s done!</p><figure><img src="https://hackingwithswift.com/img/books/hws/2-15@2x.png" alt="Tapping buttons now works - you see whether you were right or wrong." tabindex="0" loading="lazy"><figcaption>Tapping buttons now works - you see whether you were right or wrong.</figcaption></figure>`,31))])}const I=u(w,[["render",b],["__file","05-from-outlets-to-actions-creating-an-ibaction.html.vue"]]),A=JSON.parse('{"path":"/hackingwithswift.com/read/02/05-from-outlets-to-actions-creating-an-ibaction.html","title":"From outlets to actions: creating an IBAction","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"From outlets to actions: creating an IBAction","description":"Article(s) > From outlets to actions: creating an IBAction","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > From outlets to actions: creating an IBAction"},{"property":"og:description","content":"From outlets to actions: creating an IBAction"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/02/05-from-outlets-to-actions-creating-an-ibaction.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/02/05-from-outlets-to-actions-creating-an-ibaction.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"From outlets to actions: creating an IBAction"}],["meta",{"property":"og:description","content":"Article(s) > From outlets to actions: creating an IBAction"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/2-13@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"From outlets to actions: creating an IBAction\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/2-13@2x.png\\",\\"https://hackingwithswift.com/img/books/hws/2-14@2x.png\\",\\"https://hackingwithswift.com/img/books/hws/2-15@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":6.64,"words":1991},"filePathRelative":"hackingwithswift.com/read/02/05-from-outlets-to-actions-creating-an-ibaction.md","excerpt":"\\n"}');export{I as comp,A as data};