import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as s,as as m,ao as e,at as p,au as l,an as a,al as c,aq as o,ar as h}from"./app-CpYYKbnj.js";const g={},w={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"};function f(r,n){const i=o("VPCard"),u=o("VidStack"),t=o("FontIcon");return h(),k("div",null,[s("h1",w,[s("a",v,[s("span",null,m(r.$frontmatter.title)+" 관련",1)])]),e(i,p(l({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[9]||(n[9]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[10]||(n[10]=s("hr",null,null,-1)),e(i,p(l({title:"Importing photos again | Hacking with iOS",desc:"Importing photos again",link:"https://hackingwithswift.com/read/25/2/importing-photos-again",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e(u,{src:"youtube/Uw1C0JCEprA"}),n[11]||(n[11]=s("p",null,[a("We've used the "),s("code",null,"UIImagePickerController"),a(" class twice now: once in project 10 and again in project 13, so I hope you're already comfortable with it. We also used a collection view in project 10, but we haven't used it since so you might not be quite so familiar with it.")],-1)),s("p",null,[n[0]||(n[0]=a("We need to use a collection view controller, just like in project 10. So, start by opening ")),e(t,{icon:"fa-brands fa-swift"}),n[1]||(n[1]=s("code",null,"ViewController.swift",-1)),n[2]||(n[2]=a(" and changing this line:"))]),n[12]||(n[12]=c(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ViewController</span><span class="token punctuation">:</span> <span class="token class-name">UIViewController</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>To this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ViewController</span><span class="token punctuation">:</span> <span class="token class-name">UICollectionViewController</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,3)),s("p",null,[n[3]||(n[3]=a("Now open ")),e(t,{icon:"iconfont icon-xcode"}),n[4]||(n[4]=s("code",null,"Main.storyboard",-1)),n[5]||(n[5]=a(" in Interface Builder, then delete the existing view controller and replace it with a new collection view controller. Use the attributes inspector to make it the initial view controller, use the identity inspector to give it the class “ViewController”, then finally embed it inside a navigation controller."))]),n[13]||(n[13]=s("p",null,'With the collection view selected, set cell size to be 145 wide and 145 high, and give all four section insets a value of 10. Click inside the prototype cell that Xcode made for you and give it the reuse identifier "ImageView". Finally, drop an image view into the cell so that it occupies all its space, and give it the tag 1000.',-1)),n[14]||(n[14]=s("p",null,"All the constraints in this project can be made automatically, so select the collection view using the document outline then go to the Editor menu and choose Resolve Auto Layout Issues > Reset to Suggested Constraints.",-1)),s("p",null,[n[6]||(n[6]=a("We’re done with Interface Builder, so open up ")),e(t,{icon:"fa-brands fa-swift"}),n[7]||(n[7]=s("code",null,"ViewController.swift",-1)),n[8]||(n[8]=a(" because it’s time to write the code. Note that almost all of this has been covered in other projects, so we're not going to waste much time here when there are far more interesting things around the corner!"))]),n[15]||(n[15]=c(`<p>To start, add a right bar button item that uses the system&#39;s camera icon and calls an <code>importPicture()</code> method that we&#39;ll write shortly. I&#39;m also going to customize the title of the view controller so that it isn&#39;t empty, so here&#39;s the new <code>viewDidLoad()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Selfie Share&quot;</span></span></span>
<span class="line">    navigationItem<span class="token punctuation">.</span>rightBarButtonItem <span class="token operator">=</span> <span class="token class-name">UIBarButtonItem</span><span class="token punctuation">(</span>barButtonSystemItem<span class="token punctuation">:</span> <span class="token punctuation">.</span>camera<span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>importPicture<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next, let&#39;s make the collection view work correctly, starting with the easy stuff: make your view controller conform to the <code>UINavigationControllerDelegate</code> and <code>UIImagePickerControllerDelegate</code> protocols, because we need those to work with the image picker.</p><p>We will store all our apps images inside a <code>UIImage</code> array, so please add this property now:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> images <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token class-name">UIImage</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>We&#39;re going to use that array to know how many items are in our collection view, so you should know to write this method yourself:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">collectionView</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> collectionView<span class="token punctuation">:</span> <span class="token class-name">UICollectionView</span><span class="token punctuation">,</span> numberOfItemsInSection section<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Int</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> images<span class="token punctuation">.</span>count</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next comes the only thing out of the ordinary in all this code, which is the <code>cellForItemAt</code> method for our collection view. To get us through this part of the project as quickly as possible, I took a shortcut: when it comes to configuring cells to look correct, we can dequeue using the identifier &quot;ImageView&quot; then find the <code>UIImageView</code> inside them without a property.</p><p>I asked you to set the tag of the image view to be 1000, and here&#39;s why: all <code>UIView</code> subclasses have a method called <code>viewWithTag()</code>, which searches for any views inside itself (or indeed itself) with that tag number. We can find our image view just by using this method, although I&#39;ll still use <code>if let</code> and a conditional typecast to be sure.</p><p>Here&#39;s the code for <code>cellForItemAt</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">collectionView</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> collectionView<span class="token punctuation">:</span> <span class="token class-name">UICollectionView</span><span class="token punctuation">,</span> cellForItemAt indexPath<span class="token punctuation">:</span> <span class="token class-name">IndexPath</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">UICollectionViewCell</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> cell <span class="token operator">=</span> collectionView<span class="token punctuation">.</span><span class="token function">dequeueReusableCell</span><span class="token punctuation">(</span>withReuseIdentifier<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;ImageView&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">for</span><span class="token punctuation">:</span> indexPath<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> imageView <span class="token operator">=</span> cell<span class="token punctuation">.</span><span class="token function">viewWithTag</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">UIImageView</span> <span class="token punctuation">{</span></span>
<span class="line">        imageView<span class="token punctuation">.</span>image <span class="token operator">=</span> images<span class="token punctuation">[</span>indexPath<span class="token punctuation">.</span>item<span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> cell</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That makes the collection view work just fine, but we still need three more methods in order to get our basic app ready, and these are the methods to handle the image picker. If this code isn&#39;t identical to the code we&#39;ve previously written, it might as well be – check project 10 if your memory is bad!</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">importPicture</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> picker <span class="token operator">=</span> <span class="token class-name">UIImagePickerController</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    picker<span class="token punctuation">.</span>allowsEditing <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">    picker<span class="token punctuation">.</span>delegate <span class="token operator">=</span> <span class="token keyword">self</span></span>
<span class="line">    <span class="token function">present</span><span class="token punctuation">(</span>picker<span class="token punctuation">,</span> animated<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">imagePickerController</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> picker<span class="token punctuation">:</span> <span class="token class-name">UIImagePickerController</span><span class="token punctuation">,</span> didFinishPickingMediaWithInfo info<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">UIImagePickerController</span><span class="token punctuation">.</span><span class="token class-name">InfoKey</span> <span class="token punctuation">:</span> <span class="token keyword">Any</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> image <span class="token operator">=</span> info<span class="token punctuation">[</span><span class="token punctuation">.</span>editedImage<span class="token punctuation">]</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">UIImage</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">dismiss</span><span class="token punctuation">(</span>animated<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    images<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> at<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">    collectionView<span class="token punctuation">.</span><span class="token function">reloadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Done – no more boring old code now. At this point you can run the app if you want, but there&#39;s no need to other than being sure your code works – this is just a cut-down version of project 10 so far.</p>`,14))])}const I=d(g,[["render",f],["__file","02-importing-photos-again.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/read/25/02-importing-photos-again.html","title":"Importing photos again","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Importing photos again","description":"Article(s) > Importing photos again","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Importing photos again"},{"property":"og:description","content":"Importing photos again"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/25/02-importing-photos-again.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/25/02-importing-photos-again.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Importing photos again"}],["meta",{"property":"og:description","content":"Article(s) > Importing photos again"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Importing photos again\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.01,"words":904},"filePathRelative":"hackingwithswift.com/read/25/02-importing-photos-again.md","excerpt":"\\n"}');export{I as comp,V as data};