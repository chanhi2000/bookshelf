import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as n,as as d,ao as a,at as s,au as o,al as u,aq as i,ar as h}from"./app-CpYYKbnj.js";const k={},f={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"};function m(c,e){const t=i("VPCard"),p=i("VidStack");return h(),l("div",null,[n("h1",f,[n("a",b,[n("span",null,d(c.$frontmatter.title)+" 관련",1)])]),a(t,s(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),e[1]||(e[1]=n("hr",null,null,-1)),a(t,s(o({title:"Fixing the keyboard: NotificationCenter | Hacking with iOS",desc:"Fixing the keyboard: NotificationCenter",link:"https://hackingwithswift.com/read/19/7/fixing-the-keyboard-notificationcenter",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(p,{src:"youtube/crjzwQ5yCAE"}),e[2]||(e[2]=u(`<p>Before we&#39;re done, there&#39;s a bug in our extension, and it&#39;s a bad one – or at least it&#39;s bad once you spot it. You see, when you tap to edit a text view, the iOS keyboard automatically appears so that user can start typing. But if you try typing lots, you&#39;ll notice that you can actually type underneath the keyboard because the text view hasn&#39;t adjusted its size because the keyboard appeared.</p><p>If you don&#39;t see a keyboard when you tap to edit, it probably means you have the Connect Hardware Keyboard setting turned on. Press <kbd>Shift</kbd>+<kbd>Cmd</kbd>+<kbd>K</kbd> to disable the hardware keyboard and use the on-screen one.</p><p>Having our view adjust to the presence of a keyboard is tricky, because there are a number of situations you need to cope with. For example, various keyboards are different heights, the user can rotate their device at will, they can connect a hardware keyboard when they need to, and there&#39;s even the QuickType bar that can be shown or hidden on demand.</p><p>In all the years I&#39;ve done iOS development, I&#39;ve seen at least a dozen ways of coping with keyboards, and few of them are easy. Even Apple&#39;s example solution requires fiddling around with constraints, which isn&#39;t ideal. I&#39;ve tried to put together a solution that copes with all possibilities and also requires as little code as possible. If you manage to find something even simpler, do let me know!</p><p>We can ask to be told when the keyboard state changes by using a new class called <code>NotificationCenter</code>. Behind the scenes, iOS is constantly sending out notifications when things happen – keyboard changing, application moving to the background, as well as any custom events that applications post. We can add ourselves as an observer for certain notifications and a method we name will be called when the notification occurs, and will even be passed any useful information.</p><p>When working with the keyboard, the notifications we care about are <code>keyboardWillHideNotification</code> and <code>keyboardWillChangeFrameNotification</code>. The first will be sent when the keyboard has finished hiding, and the second will be shown when any keyboard state change happens – including showing and hiding, but also orientation, QuickType and more.</p><p>It might sound like we don&#39;t need <code>keyboardWillHideNotification</code> if we have <code>keyboardWillChangeFrameNotification</code>, but in my testing just using <code>keyboardWillChangeFrameNotification</code> isn&#39;t enough to catch a hardware keyboard being connected. Now, that&#39;s an extremely rare case, but we might as well be sure!</p><p>To register ourselves as an observer for a notification, we get a reference to the default notification center. We then use the <code>addObserver()</code> method, which takes four parameters: the object that should receive notifications (it&#39;s <code>self</code>), the method that should be called, the notification we want to receive, and the object we want to watch. We&#39;re going to pass <code>nil</code> to the last parameter, meaning &quot;we don&#39;t care who sends the notification.&quot;</p><p>So, add this code to <code>viewDidLoad()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> notificationCenter <span class="token operator">=</span> <span class="token class-name">NotificationCenter</span><span class="token punctuation">.</span><span class="token keyword">default</span></span>
<span class="line">notificationCenter<span class="token punctuation">.</span><span class="token function">addObserver</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> selector<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>adjustForKeyboard<span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token class-name">UIResponder</span><span class="token punctuation">.</span>keyboardWillHideNotification<span class="token punctuation">,</span> object<span class="token punctuation">:</span> <span class="token nil constant">nil</span><span class="token punctuation">)</span></span>
<span class="line">notificationCenter<span class="token punctuation">.</span><span class="token function">addObserver</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> selector<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>adjustForKeyboard<span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token class-name">UIResponder</span><span class="token punctuation">.</span>keyboardWillChangeFrameNotification<span class="token punctuation">,</span> object<span class="token punctuation">:</span> <span class="token nil constant">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>adjustForKeyboard()</code> method is complicated, but that&#39;s because it has quite a bit of work to do. First, it will receive a parameter that is of type <code>Notification</code>. This will include the name of the notification as well as a <code>Dictionary</code> containing notification-specific information called <code>userInfo</code>.</p><p>When working with keyboards, the dictionary will contain a key called <code>UIResponder.keyboardFrameEndUserInfoKey</code> telling us the frame of the keyboard after it has finished animating. This will be of type <code>NSValue</code>, which in turn is of type <code>CGRect</code>. The <code>CGRect</code> struct holds both a <code>CGPoint</code> and a <code>CGSize</code>, so it can be used to describe a rectangle.</p><p>One of the quirks of Objective-C was that arrays and dictionaries couldn&#39;t contain structures like <code>CGRect</code>, so Apple had a special class called <code>NSValue</code> that acted as a wrapper around structures so they could be put into dictionaries and arrays. That&#39;s what&#39;s happening here: we&#39;re getting an <code>NSValue</code> object, but we know it contains a <code>CGRect</code> inside so we use its <code>cgRectValue</code> property to read that value.</p><p>Once we finally pull out the correct frame of the keyboard, we need to convert the rectangle to our view&#39;s co-ordinates. This is because rotation isn&#39;t factored into the frame, so if the user is in landscape we&#39;ll have the width and height flipped – using the <code>convert()</code> method will fix that.</p><p>The next thing we need to do in the <code>adjustForKeyboard()</code> method is to adjust the <code>contentInset</code> and <code>scrollIndicatorInsets</code> of our text view. These two essentially indent the edges of our text view so that it appears to occupy less space even though its constraints are still edge to edge in the view.</p><p>Finally, we&#39;re going to make the text view scroll so that the text entry cursor is visible. If the text view has shrunk this will now be off screen, so scrolling to find it again keeps the user experience intact.</p><p>It&#39;s not a lot of code, but it <em>is</em> complicated – par for the course on this project, it seems. Anyway, here&#39;s the method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">adjustForKeyboard</span><span class="token punctuation">(</span>notification<span class="token punctuation">:</span> <span class="token class-name">Notification</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> keyboardValue <span class="token operator">=</span> notification<span class="token punctuation">.</span>userInfo<span class="token operator">?</span><span class="token punctuation">[</span><span class="token class-name">UIResponder</span><span class="token punctuation">.</span>keyboardFrameEndUserInfoKey<span class="token punctuation">]</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">NSValue</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> keyboardScreenEndFrame <span class="token operator">=</span> keyboardValue<span class="token punctuation">.</span>cgRectValue</span>
<span class="line">    <span class="token keyword">let</span> keyboardViewEndFrame <span class="token operator">=</span> view<span class="token punctuation">.</span><span class="token function">convert</span><span class="token punctuation">(</span>keyboardScreenEndFrame<span class="token punctuation">,</span> from<span class="token punctuation">:</span> view<span class="token punctuation">.</span>window<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> notification<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token class-name">UIResponder</span><span class="token punctuation">.</span>keyboardWillHideNotification <span class="token punctuation">{</span></span>
<span class="line">        script<span class="token punctuation">.</span>contentInset <span class="token operator">=</span> <span class="token punctuation">.</span>zero</span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        script<span class="token punctuation">.</span>contentInset <span class="token operator">=</span> <span class="token class-name">UIEdgeInsets</span><span class="token punctuation">(</span>top<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">left</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> bottom<span class="token punctuation">:</span> keyboardViewEndFrame<span class="token punctuation">.</span>height <span class="token operator">-</span> view<span class="token punctuation">.</span>safeAreaInsets<span class="token punctuation">.</span>bottom<span class="token punctuation">,</span> <span class="token keyword">right</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    script<span class="token punctuation">.</span>scrollIndicatorInsets <span class="token operator">=</span> script<span class="token punctuation">.</span>contentInset</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> selectedRange <span class="token operator">=</span> script<span class="token punctuation">.</span>selectedRange</span>
<span class="line">    script<span class="token punctuation">.</span><span class="token function">scrollRangeToVisible</span><span class="token punctuation">(</span>selectedRange<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, setting the inset of a text view is done using the <code>UIEdgeInsets</code> struct, which needs insets for all four edges. I&#39;m using the text view&#39;s content inset for its <code>scrollIndicatorInsets</code> to save time.</p><p>Note there&#39;s a check in there for <code>UIKeyboardWillHide</code>, and that&#39;s the workaround for hardware keyboards being connected by explicitly setting the insets to be zero.</p>`,20))])}const w=r(k,[["render",m],["__file","07-fixing-the-keyboard-notificationcenter.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/read/19/07-fixing-the-keyboard-notificationcenter.html","title":"Fixing the keyboard: NotificationCenter","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Fixing the keyboard: NotificationCenter","description":"Article(s) > Fixing the keyboard: NotificationCenter","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Fixing the keyboard: NotificationCenter"},{"property":"og:description","content":"Fixing the keyboard: NotificationCenter"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/19/07-fixing-the-keyboard-notificationcenter.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/19/07-fixing-the-keyboard-notificationcenter.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Fixing the keyboard: NotificationCenter"}],["meta",{"property":"og:description","content":"Article(s) > Fixing the keyboard: NotificationCenter"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Fixing the keyboard: NotificationCenter\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.79,"words":1138},"filePathRelative":"hackingwithswift.com/read/19/07-fixing-the-keyboard-notificationcenter.md","excerpt":"\\n"}');export{w as comp,v as data};