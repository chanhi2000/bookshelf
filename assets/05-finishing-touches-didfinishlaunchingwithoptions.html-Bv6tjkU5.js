import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as s,as as h,ao as t,at as l,au as p,an as a,al as r,aq as o,ar as g}from"./app-CpYYKbnj.js";const m={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function b(c,n){const i=o("VPCard"),u=o("VidStack"),e=o("FontIcon");return g(),k("div",null,[s("h1",w,[s("a",f,[s("span",null,h(c.$frontmatter.title)+" 관련",1)])]),t(i,l(p({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[32]||(n[32]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[33]||(n[33]=s("hr",null,null,-1)),t(i,l(p({title:"Rendering a petition: loadHTMLString | Hacking with iOS",desc:"Rendering a petition: loadHTMLString",link:"https://hackingwithswift.com/read/7/5/finishing-touches-didfinishlaunchingwithoptions",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t(u,{src:"youtube/9VorfMsbKQQ"}),n[34]||(n[34]=s("p",null,[a("Before this project is finished, we're going to make two changes. First, we're going to add another tab to the "),s("code",null,"UITabBarController"),a(" that will show popular petitions, and second we're going to make our loading code a little more resilient by adding error messages.")],-1)),n[35]||(n[35]=s("p",null,[a("As I said previously, we can't really put the second tab into our storyboard because both tabs will host a "),s("code",null,"ViewController"),a(" and doing so would require us to duplicate the view controllers in the storyboard. You can do that if you really want, but please don't – it's a maintenance nightmare!")],-1)),n[36]||(n[36]=s("p",null,"Instead, we're going to leave our current storyboard configuration alone, then create the second view controller using code. This isn't something you've done before, but it's not hard and we already took the first step, as you'll see.",-1)),s("p",null,[n[0]||(n[0]=a("Open the file ")),t(e,{icon:"fa-brands fa-swift"}),n[1]||(n[1]=s("code",null,"AppDelegate.swift",-1)),n[2]||(n[2]=a(". This has been in all our projects so far, but it's not one we've had to work with until now. Look for the ")),n[3]||(n[3]=s("code",null,"didFinishLaunchingWithOptions",-1)),n[4]||(n[4]=a(" method, which should be at the top of the file. This gets called by iOS when the app has finished loading and is ready to be used, and we're going to hijack it to insert a second ")),n[5]||(n[5]=s("code",null,"ViewController",-1)),n[6]||(n[6]=a(" into our tab bar."))]),n[37]||(n[37]=r(`<p>It should already have some default Apple code in there, but we&#39;re going to add some more just before the <code>return true</code> line:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> tabBarController <span class="token operator">=</span> window<span class="token operator">?</span><span class="token punctuation">.</span>rootViewController <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">UITabBarController</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> storyboard <span class="token operator">=</span> <span class="token class-name">UIStoryboard</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Main&quot;</span></span><span class="token punctuation">,</span> bundle<span class="token punctuation">:</span> <span class="token nil constant">nil</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> vc <span class="token operator">=</span> storyboard<span class="token punctuation">.</span><span class="token function">instantiateViewController</span><span class="token punctuation">(</span>withIdentifier<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;NavController&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    vc<span class="token punctuation">.</span>tabBarItem <span class="token operator">=</span> <span class="token class-name">UITabBarItem</span><span class="token punctuation">(</span>tabBarSystemItem<span class="token punctuation">:</span> <span class="token punctuation">.</span>topRated<span class="token punctuation">,</span> tag<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">    tabBarController<span class="token punctuation">.</span>viewControllers<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>vc<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Every line of that is new, so let&#39;s dig in deeper:</p>`,3)),s("ul",null,[n[16]||(n[16]=s("li",null,[a("Our storyboard automatically creates a window in which all our view controllers are shown. This window needs to know what its initial view controller is, and that gets set to its "),s("code",null,"rootViewController"),a(" property. This is all handled by our storyboard.")],-1)),n[17]||(n[17]=s("li",null,[a("In the Single View App template, the root view controller is the "),s("code",null,"ViewController"),a(", but we embedded ours inside a navigation controller, then embedded "),s("em",null,"that"),a(" inside a tab bar controller. So, for us the root view controller is a "),s("code",null,"UITabBarController"),a(".")],-1)),s("li",null,[n[7]||(n[7]=a("We need to create a new ")),n[8]||(n[8]=s("code",null,"ViewController",-1)),n[9]||(n[9]=a(" by hand, which first means getting a reference to our ")),t(e,{icon:"iconfont icon-xcode"}),n[10]||(n[10]=s("code",null,"Main.storyboard",-1)),n[11]||(n[11]=a(" file. This is done using the ")),n[12]||(n[12]=s("code",null,"UIStoryboard",-1)),n[13]||(n[13]=a(" class, as shown. You don't need to provide a bundle, because ")),n[14]||(n[14]=s("code",null,"nil",-1)),n[15]||(n[15]=a(' means "use my current app bundle."'))]),n[18]||(n[18]=s("li",null,[a("We create our view controller using the "),s("code",null,"instantiateViewController()"),a(' method, passing in the storyboard ID of the view controller we want. Earlier we set our navigation controller to have the storyboard ID of "NavController", so we pass that in.')],-1)),n[19]||(n[19]=s("li",null,[a("We create a "),s("code",null,"UITabBarItem"),a(' object for the new view controller, giving it the "Top Rated" icon and the tag 1. That tag will be important in a moment.')],-1)),n[20]||(n[20]=s("li",null,[a("We add the new view controller to our tab bar controller's "),s("code",null,"viewControllers"),a(" array, which will cause it to appear in the tab bar.")],-1))]),n[38]||(n[38]=s("p",null,[a("So, the code creates a duplicate "),s("code",null,"ViewController"),a(" wrapped inside a navigation controller, gives it a new tab bar item to distinguish it from the existing tab, then adds it to the list of visible tabs. This lets us use the same class for both tabs without having to duplicate things in the storyboard.")],-1)),s("p",null,[n[21]||(n[21]=a("The reason we gave a tag of 1 to the new ")),n[22]||(n[22]=s("code",null,"UITabBarItem",-1)),n[23]||(n[23]=a(" is because it's an easy way to identify it. Remember, both tabs contain a ")),n[24]||(n[24]=s("code",null,"ViewController",-1)),n[25]||(n[25]=a(", which means the same code is executed. Right now that means both will download the same JSON feed, which makes having two tabs pointless. But if you modify ")),n[26]||(n[26]=s("code",null,"urlString",-1)),n[27]||(n[27]=a(" in ")),t(e,{icon:"fa-brands fa-swift"}),n[28]||(n[28]=s("code",null,"ViewController.swift",-1)),n[29]||(n[29]=a("’s ")),n[30]||(n[30]=s("code",null,"viewDidLoad()",-1)),n[31]||(n[31]=a(" method to this, it will work much better:"))]),n[39]||(n[39]=r(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> urlString<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> navigationController<span class="token operator">?</span><span class="token punctuation">.</span>tabBarItem<span class="token punctuation">.</span>tag <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// urlString = &quot;https://api.whitehouse.gov/v1/petitions.json?limit=100&quot;</span></span>
<span class="line">    urlString <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;https://hackingwithswift.com/samples/petitions-1.json&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// urlString = &quot;https://api.whitehouse.gov/v1/petitions.json?signatureCountFloor=10000&amp;limit=100&quot;</span></span>
<span class="line">    urlString <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;https://hackingwithswift.com/samples/petitions-2.json&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That adjusts the code so that the first instance of <code>ViewController</code> loads the original JSON, and the second loads only petitions that have at least 10,000 signatures. Once again I’ve provided cached copies of the Whitehouse API data in case it changes or goes away in the future – use whichever one you prefer.</p><p>The project is almost done, but we&#39;re going to make one last change. Our current loading code isn&#39;t very resilient: we have a couple of <code>if</code> statements checking that things are working correctly, but no <code>else</code> statements showing an error message if there&#39;s a problem.</p><p>This is easily fixed by adding a new <code>showError()</code> method that creates a <code>UIAlertController</code> showing a general failure message:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">showError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> ac <span class="token operator">=</span> <span class="token class-name">UIAlertController</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Loading error&quot;</span></span><span class="token punctuation">,</span> message<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;There was a problem loading the feed; please check your connection and try again.&quot;</span></span><span class="token punctuation">,</span> preferredStyle<span class="token punctuation">:</span> <span class="token punctuation">.</span>alert<span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;OK&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">present</span><span class="token punctuation">(</span>ac<span class="token punctuation">,</span> animated<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can now adjust the JSON downloading and parsing code to call this error method everywhere a condition fails, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> urlString<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">Data</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">parse</span><span class="token punctuation">(</span>json<span class="token punctuation">:</span> data<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">showError</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">showError</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alternatively we could rewrite this to be a little cleaner by inserting <code>return</code> after the call to <code>parse()</code>. This means that the method would exit if parsing was reached, so we get to the end of the method it means parsing <em>wasn’t</em> reached and we can show the error. Try this instead:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> urlString<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">Data</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">parse</span><span class="token punctuation">(</span>json<span class="token punctuation">:</span> data<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">showError</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Both approaches are perfectly valid – do whichever you prefer.</p><p>Regardless of which you opt for, now that error messages are shown when the app hits problems we’re done – good job!</p>`,11))])}const S=d(m,[["render",b],["__file","05-finishing-touches-didfinishlaunchingwithoptions.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/read/07/05-finishing-touches-didfinishlaunchingwithoptions.html","title":"Rendering a petition: loadHTMLString","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Rendering a petition: loadHTMLString","description":"Article(s) > Rendering a petition: loadHTMLString","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Rendering a petition: loadHTMLString"},{"property":"og:description","content":"Rendering a petition: loadHTMLString"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/05-finishing-touches-didfinishlaunchingwithoptions.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/05-finishing-touches-didfinishlaunchingwithoptions.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Rendering a petition: loadHTMLString"}],["meta",{"property":"og:description","content":"Article(s) > Rendering a petition: loadHTMLString"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Rendering a petition: loadHTMLString\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.7,"words":1109},"filePathRelative":"hackingwithswift.com/read/07/05-finishing-touches-didfinishlaunchingwithoptions.md","excerpt":"\\n"}');export{S as comp,T as data};