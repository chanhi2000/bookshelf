import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as t,as as d,ao as n,at as s,au as o,al as u,aq as i,ar as h}from"./app-CpYYKbnj.js";const w={},m={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,e){const a=i("VPCard"),r=i("VidStack");return h(),p("div",null,[t("h1",m,[t("a",k,[t("span",null,d(c.$frontmatter.title)+" 관련",1)])]),n(a,s(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(a,s(o({title:"Pick a word, any word: UIAlertController | Hacking with iOS",desc:"Pick a word, any word: UIAlertController",link:"https://hackingwithswift.com/read/5/3/pick-a-word-any-word-uialertcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n(r,{src:"youtube/tngJVuM6big"}),e[2]||(e[2]=u(`<p>This game will prompt the user to enter a word that can be made from the eight-letter prompt word. For example, if the eight-letter word is &quot;agencies&quot;, the user could enter &quot;cease.&quot; We&#39;re going to solve this with <code>UIAlertController</code>, because it&#39;s a nice fit, and also gives me the chance to introduce some new teaching. I&#39;m all about ulterior motives!</p><p>Add this code to <code>viewDidLoad()</code>, just after the call to <code>super</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">navigationItem<span class="token punctuation">.</span>rightBarButtonItem <span class="token operator">=</span> <span class="token class-name">UIBarButtonItem</span><span class="token punctuation">(</span>barButtonSystemItem<span class="token punctuation">:</span> <span class="token punctuation">.</span>add<span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>promptForAnswer<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That created a new UIBarButtonItem using the &quot;add&quot; system item, and configured it to run a method called <code>promptForAnswer()</code> when tapped – we haven’t created it yet, so you’ll get a compiler error for a few minutes as you read on. This new method will show a <code>UIAlertController</code> with space for the user to enter an answer, and when the user clicks Submit to that alert controller the answer is checked to make sure it&#39;s valid.</p><p>Before I give you the code, let me explain what you need to know.</p><p>You see, we&#39;re about to use a closure, and things get a little complicated. As a reminder, these are chunks of code that can be treated like a variable – we can send the closure somewhere, where it gets stored away and executed later. To make this work, Swift takes a copy of the code and captures any data it references, so it can use them later.</p><p>But there&#39;s a problem: what if the closure references the view controller? Then what could happen is a strong reference cycle: the view controller owns an object that owns a closure that owns the view controller, and nothing could ever be destroyed.</p><p>I&#39;m going to try (and likely fail!) to give you a metaphorical example, so please bear with me. Imagine if you built two cleaning robots, red and blue. You told the red robot, &quot;don&#39;t stop cleaning until the blue robot stops,&quot; and you told the blue robot &quot;don&#39;t stop cleaning until the red robot stops.&quot;</p><p>When would they stop cleaning? The answer is “never”, because neither will make the first move.</p><p>This is the problem we are facing with a strong reference cycle: object A owns object B, and object B owns a closure that referenced object A. And when closures are created, they capture everything they use, thus object B owns object A.</p><p>Strong reference cycles used to be hard to find, but you&#39;ll be glad to know Swift makes them trivial. In fact, Swift makes it so easy that you will use its solution even when you&#39;re not sure if there&#39;s a cycle simply because you might as well.</p><p>So, please brace yourself: we&#39;re about to take our first look at actual closures. The syntax will hurt. And when you finally understand it, you&#39;ll come across examples online that make your brain hurt all over again.</p><p>Ready? Here&#39;s the <code>promptForAnswer()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">promptForAnswer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> ac <span class="token operator">=</span> <span class="token class-name">UIAlertController</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Enter answer&quot;</span></span><span class="token punctuation">,</span> message<span class="token punctuation">:</span> <span class="token nil constant">nil</span><span class="token punctuation">,</span> preferredStyle<span class="token punctuation">:</span> <span class="token punctuation">.</span>alert<span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addTextField</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> submitAction <span class="token operator">=</span> <span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Submit&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">weak</span> <span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token keyword">weak</span> ac<span class="token punctuation">]</span> action <span class="token keyword">in</span></span>
<span class="line">        <span class="token keyword">guard</span> <span class="token keyword">let</span> answer <span class="token operator">=</span> ac<span class="token operator">?</span><span class="token punctuation">.</span>textFields<span class="token operator">?</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>text <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>answer<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span>submitAction<span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">present</span><span class="token punctuation">(</span>ac<span class="token punctuation">,</span> animated<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That code won’t build just yet, so don’t worry if you see errors – we’ll fix them soon. But first, let’s talk about what the code above does. It introduces quite a few new things, but before we look at them let&#39;s eliminate the easy stuff.</p><ul><li>It needs to be called from a <code>UIBarButtonItem</code> action, so we must mark it <code>@objc</code>. Hopefully you’re starting to sense when this is needed, but don’t worry if you forget – Xcode will always complain loudly if <code>@objc</code> is required and not present!</li><li>Creating a new <code>UIAlertController</code>: we did that in project 2.</li><li>The <code>addTextField()</code> method just adds an editable text input field to the <code>UIAlertController</code>. We could do more with it, but it&#39;s enough for now.</li><li>The <code>addAction()</code> method is used to add a <code>UIAlertAction</code> to a <code>UIAlertController</code>. We used this in project 2 also.</li><li>The <code>present()</code> method is also from project 2. Clearly project 2 was brilliant!</li></ul><p>That leaves the tricky stuff: creating <code>submitAction</code>. These handful of lines of code demonstrate no fewer than four new things to learn, all of which are important. I&#39;m going to sort them easiest first, starting with <code>UITextField</code>.</p><p><code>UITextField</code> is a simple editable text box that shows the keyboard so the user can enter something. We added a single text field to the <code>UIAlertController</code> using its <code>addTextField()</code> method, and we now read out the value that was inserted.</p><p>Next up is <em>trailing closure syntax</em>. We covered this while you were learning the Swift fundamentals, but now you can see it in action: rather than specifying a <code>handler</code> parameter, we pass the code we want to run in braces <em>after</em> the method call.</p><p>Next, <code>action in</code>. If you remember project 2, we had to modify the <code>askQuestion()</code> method so that it accepted a <code>UIAlertAction</code> parameter saying what button was tapped, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">askQuestion</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token class-name">UIAlertAction</span><span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>We had no choice but to do that, because the <code>handler</code> parameter for <code>UIAlertAction</code> expects a method that takes itself as a parameter, and we also added a default value of “nil” so we could call it ourselves – hence the <code>!</code> part. And that&#39;s what&#39;s happening here: we&#39;re giving the <code>UIAlertAction</code> some code to execute when it is tapped, and it wants to know that that code accepts a parameter of type <code>UIAlertAction</code>.</p><p>The <code>in</code> keyword is important: everything before that describes the closure; everything after that <em>is</em> the closure. So <code>action in</code> means that it accepts one parameter in, of type <code>UIAlertAction</code>.</p><p>In our current project, we could simplify this even further: we don&#39;t make any reference to the <code>action</code> parameter inside the closure, which means we don&#39;t need to give it a name at all. In Swift, to leave a parameter unnamed you just use an underscore character, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token omit keyword">_</span> <span class="token keyword">in</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Fourth is <code>weak</code>. Swift &quot;captures&quot; any constants and variables that are used in a closure, based on the values of the closure&#39;s surrounding context. That is, if you create an integer, a string, an array and another class outside of the closure, then use them inside the closure, Swift captures them.</p><p>This is important, because the closure references the variables, and might even change them. But I haven&#39;t said yet what &quot;capture&quot; actually means, and that&#39;s because it depends what kind of data you&#39;re using. Fortunately, Swift hides it all away so you don&#39;t have to worry about it…</p><p>…except for those strong reference cycles I mentioned. <em>Those</em> you need to worry about. That&#39;s where objects can&#39;t even be destroyed because they all hold tightly on to each other – known as <em>strong referencing</em>.</p><p>Swift&#39;s solution is to let you declare that some variables aren&#39;t held onto quite so tightly. It&#39;s a two-step process, and it&#39;s so easy you&#39;ll find yourself doing it for everything just in case. In the event that Xcode thinks you’re taking it a bit too far, you’ll get a warning saying you can relax a bit.</p><p>First, you must tell Swift what variables you don&#39;t want strong references for. This is done in one of two ways: <code>unowned</code> or <code>weak</code>. These are somewhat equivalent to implicitly unwrapped optionals (unowned) and regular optionals (weak): a weakly owned reference might be <code>nil</code>, so you need to unwrap it or use optional chaining; an unowned reference is one you&#39;re certifying cannot be <code>nil</code> and so doesn&#39;t need to be unwrapped, however you&#39;ll hit a problem if you were wrong.</p><p>In our code we use this: <code>[weak self, weak ac]</code>. That declares <code>self</code> (the current view controller) and <code>ac</code> (our <code>UIAlertController</code>) to be captured as weak references inside the closure. It means the closure can use them, but won&#39;t create a strong reference cycle because we&#39;ve made it clear the closure doesn&#39;t own either of them.</p><p>But that&#39;s not enough for Swift. Inside our method we&#39;re calling the <code>submit()</code> method of our view controller. We haven&#39;t created it yet, but you should be able to see it&#39;s going to take the answer the user entered and try it out in the game.</p><p>This <code>submit()</code> method is external to the closure’s current context, so when you&#39;re writing it you might not realize that calling <code>submit()</code> implicitly requires that <code>self</code> be captured by the closure. That is, the closure can&#39;t call <code>submit()</code> if it doesn&#39;t capture the view controller.</p><p>We&#39;ve already declared that <code>self</code> is weakly owned by the closure, but Swift wants us to be absolutely sure we know what we&#39;re doing: every call to a method or property of the current view controller must prefixed with &quot;<code>self?.</code>”, as in <code>self?.submit()</code>.</p><p>In project 1, I told you there were two trains of thought regarding use of <code>self</code>, and said, &quot;The first group of people never like to use <code>self.</code> unless it&#39;s required, because when it&#39;s required it&#39;s actually important and meaningful, so using it in places where it isn&#39;t required can confuse matters.&quot;</p><p>Implicit capture of <code>self</code> in closures is that place when using <code>self</code> is required and meaningful: Swift won&#39;t let you avoid it here. By restricting your use of <code>self</code> to closures you can easily check your code doesn’t have any reference cycles by searching for &quot;self&quot; – there ought not to be too many to look through!</p><figure><img src="https://hackingwithswift.com/img/books/hws/5-2@2x.png" alt="You can add multiple text fields to an alert controller, which is perfect for accepting quick user input." tabindex="0" loading="lazy"><figcaption>You can add multiple text fields to an alert controller, which is perfect for accepting quick user input.</figcaption></figure><p>I realize all that sounds very dense, but let’s take a look at the code again:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> submitAction <span class="token operator">=</span> <span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Submit&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">weak</span> <span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token keyword">weak</span> ac<span class="token punctuation">]</span> action <span class="token keyword">in</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> answer <span class="token operator">=</span> ac<span class="token operator">?</span><span class="token punctuation">.</span>textFields<span class="token operator">?</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>text <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">self</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>answer<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Hopefully you can start to see how it breaks down:</p><ul><li>We use trailing closure syntax to provide some code to run when the alert action is selected.</li><li>That code will use <code>self</code> and <code>ac</code> so we declare them as being <code>weak</code> so that Swift won’t create a strong reference cycle.</li><li>The closure expects to receive a <code>UIAlertAction</code> as its parameter, so we write that inside the opening brace.</li><li>Everything after <code>in</code> is the actual code of the closure.</li><li>Inside the closure we need to reference methods on our view controller using <code>self</code> so that we’re clearly acknowledging the possibility of a strong reference cycle.</li></ul><p>It’s complicated and I’m not going to pretend otherwise, but we are going to be coming back to this repeatedly in the future – you’ll have more than enough chance to understand it better.</p><p>Before we move on, let&#39;s make your code compile again because right now it&#39;s calling <code>self?.submit()</code> and we haven&#39;t made that method yet. So, add this new method somewhere in the class:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">submit</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> answer<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>That&#39;s right, it&#39;s empty – but it&#39;s enough to make the code compile cleanly so we can carry on.</p>`,45))])}const b=l(w,[["render",f],["__file","03-pick-a-word-any-word-uialertcontroller.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/read/05/03-pick-a-word-any-word-uialertcontroller.html","title":"Pick a word, any word: UIAlertController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Pick a word, any word: UIAlertController","description":"Article(s) > Pick a word, any word: UIAlertController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Pick a word, any word: UIAlertController"},{"property":"og:description","content":"Pick a word, any word: UIAlertController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/03-pick-a-word-any-word-uialertcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/03-pick-a-word-any-word-uialertcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Pick a word, any word: UIAlertController"}],["meta",{"property":"og:description","content":"Article(s) > Pick a word, any word: UIAlertController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/5-2@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Pick a word, any word: UIAlertController\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/5-2@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":6.89,"words":2068},"filePathRelative":"hackingwithswift.com/read/05/03-pick-a-word-any-word-uialertcontroller.md","excerpt":"\\n"}');export{b as comp,v as data};