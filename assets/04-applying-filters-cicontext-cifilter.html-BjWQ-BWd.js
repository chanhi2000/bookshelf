import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as s,as as k,ao as a,at as o,au as i,an as t,al as m,aq as e,ar as h}from"./app-CpYYKbnj.js";const g={},f={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"};function w(c,n){const p=e("VPCard"),l=e("VidStack"),u=e("FontIcon");return h(),d("div",null,[s("h1",f,[s("a",y,[s("span",null,k(c.$frontmatter.title)+" 관련",1)])]),a(p,o(i({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[3]||(n[3]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[4]||(n[4]=s("hr",null,null,-1)),a(p,o(i({title:"Applying filters: CIContext, CIFilter | Hacking with iOS",desc:"Applying filters: CIContext, CIFilter",link:"https://hackingwithswift.com/read/13/4/applying-filters-cicontext-cifilter",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(l,{src:"youtube/9Qm6M7qlOOQ"}),n[5]||(n[5]=s("p",null,"You're probably getting tired of hearing me saying this, but Core Image is yet another super-fast and super-powerful framework from Apple. It does only one thing, which is to apply filters to images that manipulate them in various ways.",-1)),n[6]||(n[6]=s("p",null,[t("One downside to Core Image is it's not very "),s("em",null,"guessable"),t(", so you need to know what you're doing otherwise you'll waste a lot of time. It's also not able to rely on large parts of Swift's type safety, so you need to be careful when using it because the compiler won't help you as much as you're used to.")],-1)),s("p",null,[n[0]||(n[0]=t("To get started, import CoreImage by adding this line near the top of ")),a(u,{icon:"fa-brands fa-swift"}),n[1]||(n[1]=s("code",null,"ViewController.swift",-1)),n[2]||(n[2]=t(":"))]),n[7]||(n[7]=m(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">CoreImage</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>We need to add two more properties to our class, so put these underneath the <code>currentImage</code> property:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> context<span class="token punctuation">:</span> <span class="token class-name">CIContext</span><span class="token operator">!</span></span>
<span class="line"><span class="token keyword">var</span> currentFilter<span class="token punctuation">:</span> <span class="token class-name">CIFilter</span><span class="token operator">!</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>The first is a Core Image context, which is the Core Image component that handles rendering. We create it here and use it throughout our app, because creating a context is computationally expensive so we don&#39;t want to keep doing it.</p><p>The second is a Core Image filter, and will store whatever filter the user has activated. This filter will be given various input settings before we ask it to output a result for us to show in the image view.</p><p>We want to create both of these in <code>viewDidLoad()</code>, so put this just before the end of the method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">context <span class="token operator">=</span> <span class="token class-name">CIContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">currentFilter <span class="token operator">=</span> <span class="token class-name">CIFilter</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CISepiaTone&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>That creates a default Core Image context, then creates an example filter that will apply a sepia tone effect to images. It&#39;s just for now; we&#39;ll let users change it soon enough.</p><p>To begin with, we&#39;re going to let users drag the slider up and down to add varying amounts of sepia effect to the image they select.</p><p>To do that, we need to set our <code>currentImage</code> property as the input image for the <code>currentFilter</code> Core Image filter. We&#39;re then going to call a method (as yet unwritten) called <code>applyProcessing()</code>, which will do the actual Core Image manipulation.</p><p>So, add this to the end of the <code>didFinishPickingMediaWithInfo</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> beginImage <span class="token operator">=</span> <span class="token class-name">CIImage</span><span class="token punctuation">(</span>image<span class="token punctuation">:</span> currentImage<span class="token punctuation">)</span></span>
<span class="line">currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>beginImage<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputImageKey</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token function">applyProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You’ll get an error for <code>applyProcessing()</code> because we haven’t written it yet, but we’ll get there soon.</p><p>The <code>CIImage</code> data type is, for the sake of this project, just the Core Image equivalent of <code>UIImage</code>. Behind the scenes it&#39;s a bit more complicated than that, but really it doesn&#39;t matter.</p><p>As you can see, we can create a <code>CIImage</code> from a <code>UIImage</code>, and we send the result into the current Core Image Filter using the <code>kCIInputImageKey</code>. There are lots of Core Image key constants like this; at least this one is somewhat self-explanatory!</p><p>We also need to call the (still unwritten!) <code>applyProcessing()</code> method when the slider is dragged around, so modify the <code>intensityChanged()</code> method to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@IBAction</span> <span class="token keyword">func</span> <span class="token function-definition function">intensityChanged</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> sender<span class="token punctuation">:</span> <span class="token keyword">Any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">applyProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With these changes, <code>applyProcessing()</code> is called as soon as the image is first imported, then whenever the slider is moved. Now it&#39;s time to write the initial version of the <code>applyProcessing()</code> method, so put this just before the end of your class:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">applyProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> image <span class="token operator">=</span> currentFilter<span class="token punctuation">.</span>outputImage <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line">    currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>intensity<span class="token punctuation">.</span>value<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputIntensityKey</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> cgimg <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createCGImage</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> from<span class="token punctuation">:</span> image<span class="token punctuation">.</span>extent<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> processedImage <span class="token operator">=</span> <span class="token class-name">UIImage</span><span class="token punctuation">(</span>cgImage<span class="token punctuation">:</span> cgimg<span class="token punctuation">)</span></span>
<span class="line">        imageView<span class="token punctuation">.</span>image <span class="token operator">=</span> processedImage</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That&#39;s only five lines, none of which are terribly taxing.</p><p>The first line safely reads the output image from our current filter. This should always exist, but there’s no harm being safe.</p><p>The second line uses the value of our <code>intensity</code> slider to set the <code>kCIInputIntensityKey</code> value of our current Core Image filter. For sepia toning a value of 0 means &quot;no effect&quot; and 1 means &quot;fully sepia.&quot;</p><p>The third line is where the hard work happens: it creates a new data type called <code>CGImage</code> from the output image of the current filter. We need to specify which part of the image we want to render, but using <code>image.extent</code> means &quot;all of it.&quot; Until this method is called, no actual processing is done, so this is the one that does the real work. This returns an optional <code>CGImage</code> so we need to check and unwrap with <code>if let</code>.</p><p>The fourth line creates a new <code>UIImage</code> from the <code>CGImage</code>, and line five assigns that <code>UIImage</code> to our image view. Yes, I know that <code>UIImage</code>, <code>CGImage</code> and <code>CIImage</code> all sound the same, but they are different under the hood and we have no choice but to use them here.</p><p>You can now press <kbd>Cmd</kbd>+<kbd>R</kbd> to run the project as-is, then import a picture and make it sepia toned. It might be a little slow in the simulator, but I can promise you it runs brilliantly on devices - Core Image is extraordinarily fast.</p><p>Adding a sepia effect isn&#39;t very interesting, and I want to help you explore some of the other options presented by Core Image. So, we&#39;re going to make the &quot;Change Filter&quot; button work: it will show a <code>UIAlertController</code> with a selection of filters, and when the user selects one it will update the image.</p><p>First, here&#39;s the new <code>changeFilter()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@IBAction</span> <span class="token keyword">func</span> <span class="token function-definition function">changeFilter</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> sender<span class="token punctuation">:</span> <span class="token keyword">Any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> ac <span class="token operator">=</span> <span class="token class-name">UIAlertController</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Choose filter&quot;</span></span><span class="token punctuation">,</span> message<span class="token punctuation">:</span> <span class="token nil constant">nil</span><span class="token punctuation">,</span> preferredStyle<span class="token punctuation">:</span> <span class="token punctuation">.</span>actionSheet<span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CIBumpDistortion&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> setFilter<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CIGaussianBlur&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> setFilter<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CIPixellate&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> setFilter<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CISepiaTone&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> setFilter<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CITwirlDistortion&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> setFilter<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CIUnsharpMask&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> setFilter<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;CIVignette&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> handler<span class="token punctuation">:</span> setFilter<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Cancel&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span>cancel<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">present</span><span class="token punctuation">(</span>ac<span class="token punctuation">,</span> animated<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That&#39;s seven different Core Image filters plus one cancel button, but no new code. When tapped, each of the filter buttons will call the <code>setFilter()</code> method, which we need to make. This method should update our <code>currentFilter</code> property with the filter that was chosen, set the <code>kCIInputImageKey</code> key again (because we just changed the filter), then call <code>applyProcessing()</code>.</p><p>Each <code>UIAlertAction</code> has its title set to a different Core Image filter, and because our <code>setFilter()</code> method must accept as its only parameter the action that was tapped, we can use the action&#39;s title to create our new Core Image filter. Here&#39;s the <code>setFilter()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">setFilter</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token class-name">UIAlertAction</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token comment">// make sure we have a valid image before continuing!</span></span>
<span class="line">    <span class="token keyword">guard</span> currentImage <span class="token operator">!=</span> <span class="token nil constant">nil</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// safely read the alert action&#39;s title</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> actionTitle <span class="token operator">=</span> action<span class="token punctuation">.</span>title <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    currentFilter <span class="token operator">=</span> <span class="token class-name">CIFilter</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> actionTitle<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> beginImage <span class="token operator">=</span> <span class="token class-name">CIImage</span><span class="token punctuation">(</span>image<span class="token punctuation">:</span> currentImage<span class="token punctuation">)</span></span>
<span class="line">    currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>beginImage<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputImageKey</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">applyProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>But don&#39;t run the project yet! Our current code has a problem, and it&#39;s this line:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>intensity<span class="token punctuation">.</span>value<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputIntensityKey</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That sets the intensity of the current filter. But the problem is that not all filters have an intensity setting. If you try this using the <code>CIBumpDistortion</code> filter, the app will crash because it doesn&#39;t know what to do with a setting for the key <code>kCIInputIntensityKey</code>.</p><p>All the filters and the keys they use are described fully in Apple&#39;s documentation, but for this project we&#39;re going to take a shortcut. There are four input keys we&#39;re going to manipulate across seven different filters. Sometimes the keys mean different things, and sometimes the keys don&#39;t exist, so we&#39;re going to apply only the keys that do exist with some cunning code.</p><p>Each filter has an <code>inputKeys</code> property that returns an array of all the keys it can support. We&#39;re going to use this array in conjunction with the <code>contains()</code> method to see if each of our input keys exist, and, if it does, use it. Not all of them expect a value between 0 and 1, so I sometimes multiply the slider&#39;s value to make the effect more pronounced.</p><p>Change your <code>applyProcessing()</code> method to be this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">applyProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> inputKeys <span class="token operator">=</span> currentFilter<span class="token punctuation">.</span>inputKeys</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> inputKeys<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token constant">kCIInputIntensityKey</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>intensity<span class="token punctuation">.</span>value<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputIntensityKey</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> inputKeys<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token constant">kCIInputRadiusKey</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>intensity<span class="token punctuation">.</span>value <span class="token operator">*</span> <span class="token number">200</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputRadiusKey</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> inputKeys<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token constant">kCIInputScaleKey</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>intensity<span class="token punctuation">.</span>value <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputScaleKey</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> inputKeys<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token constant">kCIInputCenterKey</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> currentFilter<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token class-name">CIVector</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> currentImage<span class="token punctuation">.</span>size<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> currentImage<span class="token punctuation">.</span>size<span class="token punctuation">.</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token constant">kCIInputCenterKey</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> cgimg <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createCGImage</span><span class="token punctuation">(</span>currentFilter<span class="token punctuation">.</span>outputImage<span class="token operator">!</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> currentFilter<span class="token punctuation">.</span>outputImage<span class="token operator">!</span><span class="token punctuation">.</span>extent<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> processedImage <span class="token operator">=</span> <span class="token class-name">UIImage</span><span class="token punctuation">(</span>cgImage<span class="token punctuation">:</span> cgimg<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>imageView<span class="token punctuation">.</span>image <span class="token operator">=</span> processedImage</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using this method, we check each of our four keys to see whether the current filter supports it, and, if so, we set the value. The first three all use the value from our <code>intensity</code> slider in some way, which will produce some interesting results. If you wanted to improve this app later, you could perhaps add three sliders.</p><p>If you run your app now, you should be able to choose from various filters then watch them distort your image in weird and wonderful ways. Note that some of them – such as the Gaussian blur – will run very slowly in the simulator, but quickly on devices. If we wanted to do more complex processing (not least chaining filters together!) you can add configuration options to the <code>CIContext</code> to make it run even faster; another time, perhaps.</p>`,40))])}const b=r(g,[["render",w],["__file","04-applying-filters-cicontext-cifilter.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/read/13/04-applying-filters-cicontext-cifilter.html","title":"Applying filters: CIContext, CIFilter","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Applying filters: CIContext, CIFilter","description":"Article(s) > Applying filters: CIContext, CIFilter","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Applying filters: CIContext, CIFilter"},{"property":"og:description","content":"Applying filters: CIContext, CIFilter"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/13/04-applying-filters-cicontext-cifilter.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/13/04-applying-filters-cicontext-cifilter.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Applying filters: CIContext, CIFilter"}],["meta",{"property":"og:description","content":"Article(s) > Applying filters: CIContext, CIFilter"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Applying filters: CIContext, CIFilter\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":5.63,"words":1690},"filePathRelative":"hackingwithswift.com/read/13/04-applying-filters-cicontext-cifilter.md","excerpt":"\\n"}');export{b as comp,C as data};