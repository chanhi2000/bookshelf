import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as a,as as m,ao as t,at as l,au as c,an as s,al as o,aq as i,ar as h}from"./app-CpYYKbnj.js";const g={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function b(r,n){const p=i("VPCard"),u=i("VidStack"),e=i("FontIcon");return h(),k("div",null,[a("h1",w,[a("a",f,[a("span",null,m(r.$frontmatter.title)+" 관련",1)])]),t(p,l(c({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[19]||(n[19]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),n[20]||(n[20]=a("hr",null,null,-1)),t(p,l(c({title:"Up and running with MapKit | Hacking with iOS",desc:"Up and running with MapKit",link:"https://hackingwithswift.com/read/16/2/up-and-running-with-mapkit",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t(u,{src:"youtube/R9lb373n5JI"}),n[21]||(n[21]=a("p",null,'The default map view works great out of the box – you can pan around, zoom in and out, and so on. If you were wondering, you need to hold down Option to trigger a virtual "pinch" gesture – just click and drag as if you were moving one finger, and the other "finger" will move in the opposite direction.',-1)),a("p",null,[n[0]||(n[0]=s("Using the assistant editor, please create an outlet for your map view called ")),n[1]||(n[1]=a("code",null,"mapView",-1)),n[2]||(n[2]=s(". You should also set your view controller to be the delegate of the map view by ")),n[3]||(n[3]=a("kbd",null,"Ctrl",-1)),n[4]||(n[4]=s("-dragging from the map view to the orange and white view controller button just above the layout area. You will also need to add ")),n[5]||(n[5]=a("code",null,"import MapKit",-1)),n[6]||(n[6]=s(" to ")),t(e,{icon:"fa-brands fa-swift"}),n[7]||(n[7]=a("code",null,"ViewController.swift",-1)),n[8]||(n[8]=s(" so it understands what ")),n[9]||(n[9]=a("code",null,"MKMapView",-1)),n[10]||(n[10]=s(" is."))]),n[22]||(n[22]=o('<div class="hint-container note"><p class="hint-container-title">Note</p><p>If you don’t set the map’s delegate, the rest of this project won’t work too well.</p></div><p>With that done, we&#39;re going to add some annotations to our map. Annotations are objects that contain a title, a subtitle and a position. The first two are both strings, the third is a new data type called <code>CLLocationCoordinate2D</code>, which is a structure that holds a latitude and longitude for where the annotation should be placed.</p><p>Map annotations are described not as a class, but as a protocol. This is something you haven&#39;t seen before, because so far protocols have all been about methods. But if we want to conform to the <code>MKAnnotation</code> protocol, which is the one we need to adopt in order to create map annotations, it states that we <em>must</em> have a coordinate in our annotation. That makes sense, because there&#39;s no point in having an annotation on a map if we don&#39;t know where it is. The title and subtitle are optional, but we&#39;ll provide them anyway.</p><p>Create a new file and choose iOS &gt; Source &gt; Cocoa Touch Class. Make it a subclass of <code>NSObject</code> and name it “Capital”. With map annotations, you can&#39;t use structs, and you must inherit from <code>NSObject</code> because it needs to be interactive with Apple&#39;s Objective-C code.</p>',4)),a("p",null,[n[11]||(n[11]=s("Change the contents of ")),t(e,{icon:"fa-brands fa-swift"}),n[12]||(n[12]=a("code",null,"Capital.swift",-1)),n[13]||(n[13]=s(" to this:"))]),n[23]||(n[23]=o(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">MapKit</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token class-name">UIKit</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Capital</span><span class="token punctuation">:</span> <span class="token class-name">NSObject</span><span class="token punctuation">,</span> <span class="token class-name">MKAnnotation</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> title<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token operator">?</span></span>
<span class="line">    <span class="token keyword">var</span> coordinate<span class="token punctuation">:</span> <span class="token class-name">CLLocationCoordinate2D</span></span>
<span class="line">    <span class="token keyword">var</span> info<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span> coordinate<span class="token punctuation">:</span> <span class="token class-name">CLLocationCoordinate2D</span><span class="token punctuation">,</span> info<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>coordinate <span class="token operator">=</span> coordinate</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>info <span class="token operator">=</span> info</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There are our three properties, along with a basic initializer that just copies in the data it&#39;s given. Again, we need to use <code>self.</code> here because the parameters being passed in are the same name as our properties. I&#39;ve added <code>import MapKit</code> to the file because that&#39;s where <code>MKAnnotation</code> and <code>CLLocationCoordinate2D</code> are defined.</p><p>With this custom subclass, we can create capital cities by passing in their name, coordinate and information – I&#39;ll be using the <code>info</code> property to hold one priceless (read: off-the-cuff, I sucked at geography) informational nugget about each city. You&#39;re welcome to do better!</p>`,3)),a("p",null,[n[14]||(n[14]=s("Put these lines into the ")),n[15]||(n[15]=a("code",null,"viewDidLoad()",-1)),n[16]||(n[16]=s(" method of ")),t(e,{icon:"fa-brands fa-swift"}),n[17]||(n[17]=a("code",null,"ViewController.swift",-1)),n[18]||(n[18]=s(":"))]),n[24]||(n[24]=o(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> london <span class="token operator">=</span> <span class="token class-name">Capital</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;London&quot;</span></span><span class="token punctuation">,</span> coordinate<span class="token punctuation">:</span> <span class="token class-name">CLLocationCoordinate2D</span><span class="token punctuation">(</span>latitude<span class="token punctuation">:</span> <span class="token number">51.507222</span><span class="token punctuation">,</span> longitude<span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">0.1275</span><span class="token punctuation">)</span><span class="token punctuation">,</span> info<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Home to the 2012 Summer Olympics.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">let</span> oslo <span class="token operator">=</span> <span class="token class-name">Capital</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Oslo&quot;</span></span><span class="token punctuation">,</span> coordinate<span class="token punctuation">:</span> <span class="token class-name">CLLocationCoordinate2D</span><span class="token punctuation">(</span>latitude<span class="token punctuation">:</span> <span class="token number">59.95</span><span class="token punctuation">,</span> longitude<span class="token punctuation">:</span> <span class="token number">10.75</span><span class="token punctuation">)</span><span class="token punctuation">,</span> info<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Founded over a thousand years ago.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">let</span> paris <span class="token operator">=</span> <span class="token class-name">Capital</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Paris&quot;</span></span><span class="token punctuation">,</span> coordinate<span class="token punctuation">:</span> <span class="token class-name">CLLocationCoordinate2D</span><span class="token punctuation">(</span>latitude<span class="token punctuation">:</span> <span class="token number">48.8567</span><span class="token punctuation">,</span> longitude<span class="token punctuation">:</span> <span class="token number">2.3508</span><span class="token punctuation">)</span><span class="token punctuation">,</span> info<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Often called the City of Light.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">let</span> rome <span class="token operator">=</span> <span class="token class-name">Capital</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Rome&quot;</span></span><span class="token punctuation">,</span> coordinate<span class="token punctuation">:</span> <span class="token class-name">CLLocationCoordinate2D</span><span class="token punctuation">(</span>latitude<span class="token punctuation">:</span> <span class="token number">41.9</span><span class="token punctuation">,</span> longitude<span class="token punctuation">:</span> <span class="token number">12.5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> info<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Has a whole country inside it.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">let</span> washington <span class="token operator">=</span> <span class="token class-name">Capital</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Washington DC&quot;</span></span><span class="token punctuation">,</span> coordinate<span class="token punctuation">:</span> <span class="token class-name">CLLocationCoordinate2D</span><span class="token punctuation">(</span>latitude<span class="token punctuation">:</span> <span class="token number">38.895111</span><span class="token punctuation">,</span> longitude<span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">77.036667</span><span class="token punctuation">)</span><span class="token punctuation">,</span> info<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Named after George himself.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>These <code>Capital</code> objects conform to the <code>MKAnnotation</code> protocol, which means we can send it to map view for display using the <code>addAnnotation()</code> method. Put this just before the end of <code>viewDidLoad()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">mapView<span class="token punctuation">.</span><span class="token function">addAnnotation</span><span class="token punctuation">(</span>london<span class="token punctuation">)</span></span>
<span class="line">mapView<span class="token punctuation">.</span><span class="token function">addAnnotation</span><span class="token punctuation">(</span>oslo<span class="token punctuation">)</span></span>
<span class="line">mapView<span class="token punctuation">.</span><span class="token function">addAnnotation</span><span class="token punctuation">(</span>paris<span class="token punctuation">)</span></span>
<span class="line">mapView<span class="token punctuation">.</span><span class="token function">addAnnotation</span><span class="token punctuation">(</span>rome<span class="token punctuation">)</span></span>
<span class="line">mapView<span class="token punctuation">.</span><span class="token function">addAnnotation</span><span class="token punctuation">(</span>washington<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alternatively, you can add multiple annotations at once using the <code>addAnnotations()</code> method. Using this, you would replace those five lines with this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">mapView<span class="token punctuation">.</span><span class="token function">addAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">[</span>london<span class="token punctuation">,</span> oslo<span class="token punctuation">,</span> paris<span class="token punctuation">,</span> rome<span class="token punctuation">,</span> washington<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That creates an array out of the annotations and sends it in one lump to the map view.</p><p>If you run your program now, you&#39;ll see pins on the map for each city, and you can tap any of them to see the city name. But where&#39;s the <code>info</code> property? To show more information, we need to customize the view used to show the annotations.</p><figure><img src="https://hackingwithswift.com/img/books/hws/16-2@2x.png" alt="Our pins are visible on the map, but they don&#39;t do anything more than just show each city&#39;s name." tabindex="0" loading="lazy"><figcaption>Our pins are visible on the map, but they don&#39;t do anything more than just show each city&#39;s name.</figcaption></figure>`,8))])}const C=d(g,[["render",b],["__file","02-up-and-running-with-mapkit.html.vue"]]),M=JSON.parse('{"path":"/hackingwithswift.com/read/16/02-up-and-running-with-mapkit.html","title":"Up and running with MapKit","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Up and running with MapKit","description":"Article(s) > Up and running with MapKit","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Up and running with MapKit"},{"property":"og:description","content":"Up and running with MapKit"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/16/02-up-and-running-with-mapkit.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/16/02-up-and-running-with-mapkit.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Up and running with MapKit"}],["meta",{"property":"og:description","content":"Article(s) > Up and running with MapKit"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/16-2@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Up and running with MapKit\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/16-2@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.07,"words":920},"filePathRelative":"hackingwithswift.com/read/16/02-up-and-running-with-mapkit.md","excerpt":"\\n"}');export{C as comp,M as data};