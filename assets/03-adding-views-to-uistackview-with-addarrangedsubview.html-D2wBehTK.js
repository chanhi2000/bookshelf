import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as n,as as w,ao as a,at as i,au as o,al as p,an as s,aq as l,ar as h}from"./app-CpYYKbnj.js";const k={},v={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function g(c,e){const t=l("VPCard"),r=l("FontIcon");return h(),u("div",null,[n("h1",v,[n("a",m,[n("span",null,w(c.$frontmatter.title)+" 관련",1)])]),a(t,i(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[7]||(e[7]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),e[8]||(e[8]=n("hr",null,null,-1)),a(t,i(o({title:"Adding views to UIStackView with addArrangedSubview() | Hacking with iOS",desc:"Adding views to UIStackView with addArrangedSubview()",link:"https://hackingwithswift.com/read/31/3/adding-views-to-uistackview-with-addarrangedsubview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[9]||(e[9]=p(`<p>With our storyboard designed, it&#39;s time to write the code. As you know, our plan is to produce an app where the user can have multiple web views visible at one time, stacked together and usable in their own right. We have one address bar, so the user will need to tap a web view to select it, then enter a URL to visit.</p><p>To make this interface work, we need two buttons in our navigation bar: one to add a new web view, and one to delete whichever one the user doesn&#39;t want any more. We&#39;re also going to use the title space in the navigation bar to show the page title of whichever web view is currently active.</p><p>So, modify your <code>viewDidLoad()</code> method to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">setDefaultTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> add <span class="token operator">=</span> <span class="token class-name">UIBarButtonItem</span><span class="token punctuation">(</span>barButtonSystemItem<span class="token punctuation">:</span> <span class="token punctuation">.</span>add<span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>addWebView<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> delete <span class="token operator">=</span> <span class="token class-name">UIBarButtonItem</span><span class="token punctuation">(</span>barButtonSystemItem<span class="token punctuation">:</span> <span class="token punctuation">.</span>trash<span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>deleteWebView<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    navigationItem<span class="token punctuation">.</span>rightBarButtonItems <span class="token operator">=</span> <span class="token punctuation">[</span>delete<span class="token punctuation">,</span> add<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That uses three new methods we haven&#39;t created yet, and we’ll fix them in turn starting with the missing <code>setDefaultTitle()</code> method. This is a fairly simple method in this project, but you&#39;re welcome to extend it later to add more interesting information for users prompting them to get started. Put this method directly beneath <code>viewDidLoad()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">setDefaultTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Multibrowser&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The second missing method, <code>addWebView()</code>, is responsible for adding a new <code>WKWebView</code> to our <code>UIStackView</code>. This is done using a method on the stack view called <code>addArrangedSubview()</code> and <em>not</em> <code>addSubview()</code>. That&#39;s worth repeating, because it&#39;s extremely important: <strong>you do not call <code>addSubview()</code> on <code>UIStackView</code></strong>. The stack view has its own subviews that it manages invisibly to you. Instead, you add to its arranged subviews array, and the stack view will arrange them as needed.</p><p>So, our first draft of <code>addWebView()</code> is pretty easy: we create a new <code>WKWebView</code>, set our view controller to be the web view&#39;s delegate, add it to the stack view, then point it at an example URL to get things started.</p><p>First, add an import for <code>WebKit</code> so we can use <code>WKWebView</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">WebKit</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,10)),n("p",null,[e[0]||(e[0]=s("Now here’s the code for ")),e[1]||(e[1]=n("code",null,"addWebView()",-1)),e[2]||(e[2]=s(" – put this into ")),a(r,{icon:"fa-brands fa-swift"}),e[3]||(e[3]=n("code",null,"ViewController.swift",-1)),e[4]||(e[4]=s(", just below ")),e[5]||(e[5]=n("code",null,"setDefaultTitle()",-1)),e[6]||(e[6]=s(":"))]),e[10]||(e[10]=p(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">addWebView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> webView <span class="token operator">=</span> <span class="token class-name">WKWebView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    webView<span class="token punctuation">.</span>navigationDelegate <span class="token operator">=</span> <span class="token keyword">self</span></span>
<span class="line"></span>
<span class="line">    stackView<span class="token punctuation">.</span><span class="token function">addArrangedSubview</span><span class="token punctuation">(</span>webView<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hackingwithswift.com&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line">    webView<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">URLRequest</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> url<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can&#39;t assign <code>self</code> to <code>webView.navigationDelegate</code> without conforming to the <code>WKNavigationDelegate</code> delegate, so please add that. While you&#39;re there, you should also add <code>UITextFieldDelegate</code> and <code>UIGestureRecognizerDelegate</code> – we&#39;ll be using these later. So, your view controller&#39;s class should start like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ViewController</span><span class="token punctuation">:</span> <span class="token class-name">UIViewController</span><span class="token punctuation">,</span> <span class="token class-name">WKNavigationDelegate</span><span class="token punctuation">,</span> <span class="token class-name">UITextFieldDelegate</span><span class="token punctuation">,</span> <span class="token class-name">UIGestureRecognizerDelegate</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Notice that we don&#39;t need to give the web view a frame or any Auto Layout constraints – that&#39;s all handled for us by <code>UIStackView</code>.</p><p>Remember, iOS apps can only load HTTPS websites by default, and you need to enable App Transport Security exceptions if you want to load non-secure websites. If you want to learn how to do that, <a href="https://hackingwithswift.com/example-code/system/how-to-handle-the-https-requirements-in-ios-9-with-app-transport-security" target="_blank" rel="noopener noreferrer">see my guide to App Transport Security</a>.</p><p>To make the project build cleanly, I want you to create an empty <code>deleteWebView()</code> method now:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">deleteWebView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>With that in place you can run the project now and try clicking + a couple of times to add new web views, and you&#39;ll see them stack up beautifully. Stack views are amazing, right? If you find that the web views aren&#39;t appearing correctly, make sure you have set the Distribution attribute of the stack view to be Fill Equally.</p><figure><img src="https://hackingwithswift.com/img/books/hws/31-4@2x.png" alt="Our app so far: users can add multiple web views, and the UIStackView automatically fits them in equally." tabindex="0" loading="lazy"><figcaption>Our app so far: users can add multiple web views, and the UIStackView automatically fits them in equally.</figcaption></figure><p>Now that you can see why stack views are perfectly suited to our project, you may notice a major flaw in the plan: how does the user control each web view? And how do they know which one is currently being controlled?</p><p>We&#39;re going to fix both these problems at once using something brilliant in its simplicity: we&#39;re going to let users tap on a web view to activate it, then highlight the selected web view in blue so the user knows what&#39;s in control. When a web view is activated we also want to show its page title in the navigation bar, and if the user enters a new URL in the address bar it will be loaded inside the active web view.</p><p>We&#39;re going to draw a blue line around the selected web view so readers can clearly see their current status. To make things easier, we&#39;ll draw a blue line around every one of the web views, but because the default line width is 0 it won&#39;t be visible until we say so. I&#39;m going to put the code to select web views inside a method so that it can be called when we create a new web view (so that each new web view starts life active) and also when a web view is tapped.</p><p>As for handling taps, we&#39;ll do that by adding a <code>UITapGestureRecognizer</code> to each web view as it&#39;s created. This has one minor complication, but it&#39;s easily fixed: <code>WKWebView</code> already has a pile of gesture recognizers attached to it, and it will catch and consume any taps before our own gesture recognizer. The fix is easy, though, and it&#39;s just a matter of telling iOS we want our recognizer and the built-in ones to work at the same time.</p><p>So, add this code to the end of <code>addWebView()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">webView<span class="token punctuation">.</span>layer<span class="token punctuation">.</span>borderColor <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>blue<span class="token punctuation">.</span>cgColor</span>
<span class="line"><span class="token function">selectWebView</span><span class="token punctuation">(</span>webView<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> recognizer <span class="token operator">=</span> <span class="token class-name">UITapGestureRecognizer</span><span class="token punctuation">(</span>target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>webViewTapped<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">recognizer<span class="token punctuation">.</span>delegate <span class="token operator">=</span> <span class="token keyword">self</span></span>
<span class="line">webView<span class="token punctuation">.</span><span class="token function">addGestureRecognizer</span><span class="token punctuation">(</span>recognizer<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We haven&#39;t written <code>selectWebView()</code> yet, but before we do I just want to recap its job. This method will get called whenever we want to activate a web view, meaning that we want it to be the one used to navigate to any URL the user requests, and we also want it to be highlighted so the user knows which view is in control.</p><p>We&#39;re going to track the active web view inside a property called <code>activeWebView</code>, so add this now:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">weak</span> <span class="token keyword">var</span> activeWebView<span class="token punctuation">:</span> <span class="token class-name">WKWebView</span><span class="token operator">?</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>It&#39;s <code>weak</code> because it might go away at any time if the user deletes it.</p><p>With that property created, the <code>selectWebView()</code> method is straightforward: it needs to loop through the array of web views belonging to the stack view, updating each of them to have a zero-width border line, then set the newly selected one to have a border width of three points. Here&#39;s the code – place it below <code>addWebView()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">selectWebView</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> webView<span class="token punctuation">:</span> <span class="token class-name">WKWebView</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> view <span class="token keyword">in</span> stackView<span class="token punctuation">.</span>arrangedSubviews <span class="token punctuation">{</span></span>
<span class="line">        view<span class="token punctuation">.</span>layer<span class="token punctuation">.</span>borderWidth <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    activeWebView <span class="token operator">=</span> webView</span>
<span class="line">    webView<span class="token punctuation">.</span>layer<span class="token punctuation">.</span>borderWidth <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There are two more things to do before our app starts to become useful: we need to implement the <code>webViewTapped()</code> method so that our tap gesture recognizers start working, then we need to detect when users have entered a new URL so we can navigate to it.</p><p>First up, here&#39;s the <code>webViewTapped()</code> method that gets called by the tap gesture recognizers when they are triggered:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">webViewTapped</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> recognizer<span class="token punctuation">:</span> <span class="token class-name">UITapGestureRecognizer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> selectedWebView <span class="token operator">=</span> recognizer<span class="token punctuation">.</span>view <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">WKWebView</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">selectWebView</span><span class="token punctuation">(</span>selectedWebView<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Like I said, you need to tell iOS we want these gesture recognizers to trigger alongside the recognizers built into the <code>WKWebView</code>, so add this too:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">gestureRecognizer</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> gestureRecognizer<span class="token punctuation">:</span> <span class="token class-name">UIGestureRecognizer</span><span class="token punctuation">,</span> shouldRecognizeSimultaneouslyWith otherGestureRecognizer<span class="token punctuation">:</span> <span class="token class-name">UIGestureRecognizer</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We already set our view controller to be the delegate of the <code>UITapGestureRecognizers</code> we create for the web views, which means that new method will automatically tell iOS to trigger all gesture recognizers at the same time.</p><p>Finally, at least for this chapter, we need to detect when the user enters a new URL in the address bar. We already set this view controller to be the delegate of the address bar, so we&#39;ll get sent the <code>textFieldShouldReturn()</code> delegate method when the user presses Return on their iPad keyboard. We then need to make sure we have an active web view and that there&#39;s a URL to navigate to, and make it happen. We&#39;re also going to call <code>resignFirstResponder()</code> on the text field so that the keyboard hides.</p><p>Put this into your code, below <code>selectWebView()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">textFieldShouldReturn</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> textField<span class="token punctuation">:</span> <span class="token class-name">UITextField</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> webView <span class="token operator">=</span> activeWebView<span class="token punctuation">,</span> <span class="token keyword">let</span> address <span class="token operator">=</span> addressBar<span class="token punctuation">.</span>text <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> address<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            webView<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">URLRequest</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> url<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    textField<span class="token punctuation">.</span><span class="token function">resignFirstResponder</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Notice that there are a few <code>if lets</code> in there to make sure all the data is unwrapped safely, and particularly important is the URL: if you try to enter a URL without “https://“ iOS will reject it. That&#39;s something you can fix later!</p><p>At this point your project should compile, although we still haven&#39;t added any code to the delete navigation button so don&#39;t tap it just yet. You can, though, click + a few times to add some web views, then select one and enter a URL to navigate.</p>`,32))])}const y=d(k,[["render",g],["__file","03-adding-views-to-uistackview-with-addarrangedsubview.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/read/31/03-adding-views-to-uistackview-with-addarrangedsubview.html","title":"Adding views to UIStackView with addArrangedSubview()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Adding views to UIStackView with addArrangedSubview()","description":"Article(s) > Adding views to UIStackView with addArrangedSubview()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Adding views to UIStackView with addArrangedSubview()"},{"property":"og:description","content":"Adding views to UIStackView with addArrangedSubview()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/31/03-adding-views-to-uistackview-with-addarrangedsubview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/31/03-adding-views-to-uistackview-with-addarrangedsubview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Adding views to UIStackView with addArrangedSubview()"}],["meta",{"property":"og:description","content":"Article(s) > Adding views to UIStackView with addArrangedSubview()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/31-4@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Adding views to UIStackView with addArrangedSubview()\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/31-4@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":5.6,"words":1680},"filePathRelative":"hackingwithswift.com/read/31/03-adding-views-to-uistackview-with-addarrangedsubview.md","excerpt":"\\n"}');export{y as comp,V as data};