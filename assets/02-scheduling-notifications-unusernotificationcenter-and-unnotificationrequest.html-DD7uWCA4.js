import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as s,as as h,ao as a,at as p,au as c,an as t,al as k,aq as e,ar as m}from"./app-CpYYKbnj.js";const g={},f={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"};function b(l,n){const o=e("VPCard"),r=e("VidStack"),i=e("FontIcon");return m(),d("div",null,[s("h1",f,[s("a",v,[s("span",null,h(l.$frontmatter.title)+" 관련",1)])]),a(o,p(c({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[6]||(n[6]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[7]||(n[7]=s("hr",null,null,-1)),a(o,p(c({title:"Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest | Hacking with iOS",desc:"Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest",link:"https://hackingwithswift.com/read/21/2/scheduling-notifications-unusernotificationcenter-and-unnotificationrequest",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(r,{src:"youtube/QD_mVOeOaGA"}),s("p",null,[n[0]||(n[0]=t("We only need two buttons to control the entire user interface for this project, and the easiest way to do that is using navigation bar buttons. So, open ")),a(i,{icon:"iconfont icon-xcode"}),n[1]||(n[1]=s("code",null,"Main.storyboard",-1)),n[2]||(n[2]=t(" in Interface Builder and embed the view controller inside a navigation controller – and that’s it for the interface."))]),s("p",null,[n[3]||(n[3]=t("Open ")),a(i,{icon:"fa-brands fa-swift"}),n[4]||(n[4]=s("code",null,"ViewController.swift",-1)),n[5]||(n[5]=t(" and add these two method stubs:"))]),n[8]||(n[8]=k(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">registerLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">scheduleLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now add this code to <code>viewDidLoad()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">navigationItem<span class="token punctuation">.</span>leftBarButtonItem <span class="token operator">=</span> <span class="token class-name">UIBarButtonItem</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Register&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span>plain<span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>registerLocal<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">navigationItem<span class="token punctuation">.</span>rightBarButtonItem <span class="token operator">=</span> <span class="token class-name">UIBarButtonItem</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Schedule&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span>plain<span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> <span class="token other-directive property">#selector</span><span class="token punctuation">(</span>scheduleLocal<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>OK, time to explain how this project needs to work. First, you can&#39;t post messages to the user&#39;s lock screen unless you have their permission. This is a sensible restriction – it would, after all, be awfully annoying if any app could bother you when it pleased.</p><p>So, in order to send local notifications in our app, we first need to request permission, and that&#39;s what we&#39;ll put in the <code>registerLocal()</code> method. You register your settings based on what you actually need, and that&#39;s done with a method called <code>requestAuthorization()</code> on <code>UNUserNotificationCenter</code>. For this example we&#39;re going to request an alert (a message to show), along with a badge (for our icon) and a sound (because users just <em>love</em> those.)</p><p>You also need to provide a closure that will be executed when the user has granted or denied your permissions request. This will be given two parameters: a boolean that will be true if permission was granted, and an <code>Error?</code> containing a message if something went wrong.</p><p>All this functionality is contained in the UserNotifications framework, so before continuing add this <code>import</code> line now:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">UserNotifications</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>OK, let’s go – change your <code>registerLocal()</code> method to be this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">registerLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> center <span class="token operator">=</span> <span class="token class-name">UNUserNotificationCenter</span><span class="token punctuation">.</span><span class="token function">current</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    center<span class="token punctuation">.</span><span class="token function">requestAuthorization</span><span class="token punctuation">(</span>options<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">.</span>alert<span class="token punctuation">,</span> <span class="token punctuation">.</span>badge<span class="token punctuation">,</span> <span class="token punctuation">.</span>sound<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>granted<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token keyword">in</span></span>
<span class="line">        <span class="token keyword">if</span> granted <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Yay!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;D&#39;oh&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Helpful tip: if you want to test allowing or denying permission, just reset the simulator and run the app again to get a clean slate. Choose the Hardware menu then “Erase all Content and Settings&quot; to make this happen.</p><figure><img src="https://hackingwithswift.com/img/books/hws/21-1@2x.png" alt="When you request permission to show notifications, iOS shows an alert like this one." tabindex="0" loading="lazy"><figcaption>When you request permission to show notifications, iOS shows an alert like this one.</figcaption></figure><p>Once we have user permission, it&#39;s time to fill in the <code>scheduleLocal()</code> method. This will configure all the data needed to schedule a notification, which is three things: content (what to show), a trigger (when to show it), and a request (the combination of content and trigger.)</p><p>Before I dive into the code, there are a few extra things I want to discuss.</p><p>First, the reason a notification request is split into two smaller components is because they are interchangeable. For example, the trigger – when to show the notification – can be a calendar trigger that shows the notification at an exact time, it can be an interval trigger that shows the notification after a certain time interval has lapsed, or it can be a geofence that shows the notification based on the user’s location.</p><p>I’ll be demonstrating both calendar and interval triggers here, but to do calendar triggers requires learning another new data type called <code>DateComponents</code>. We’re going to start with a calendar notification, which is where you specify a day, a month, an hour, a minute, or any combination of those to produce specific times. For example, if you specify hour 8 and minute 30, and <em>don’t</em> specify a day, it means either “8:30 tomorrow” or “8:30 every day” depending on whether you ask for the notification to be repeated.</p><p>So, we could create a repeating alarm at 10:30am every morning like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> dateComponents <span class="token operator">=</span> <span class="token class-name">DateComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">dateComponents<span class="token punctuation">.</span>hour <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">dateComponents<span class="token punctuation">.</span>minute <span class="token operator">=</span> <span class="token number">30</span></span>
<span class="line"><span class="token keyword">let</span> trigger <span class="token operator">=</span> <span class="token class-name">UNCalendarNotificationTrigger</span><span class="token punctuation">(</span>dateMatching<span class="token punctuation">:</span> dateComponents<span class="token punctuation">,</span> repeats<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>When it comes to <em>what</em> to show, we need to use the class <code>UNMutableNotificationContent</code>. This has lots of properties that customize the way the alert looks and works – we’ll be using these:</p><ul><li>The <code>title</code> property is used for the main title of the alert. This should be a couple of words at most.</li><li>The <code>body</code> property should contain your main text.</li><li>If you want to specify a sound you can create a custom <code>UNNotificationSound</code> object and attach it to the <code>sound</code> property, or just use <code>UNNotificationSound.default</code>.</li><li>To attach custom data to the notification, e.g. an internal ID, use the <code>userInfo</code> dictionary property.</li><li>You can also attach custom actions by specifying the <code>categoryIdentifier</code> property.</li></ul><p>Putting those all together, we could create some notification content like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> content <span class="token operator">=</span> <span class="token class-name">UNMutableNotificationContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">content<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Title goes here&quot;</span></span></span>
<span class="line">content<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Main text goes here&quot;</span></span></span>
<span class="line">content<span class="token punctuation">.</span>categoryIdentifier <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;customIdentifier&quot;</span></span></span>
<span class="line">content<span class="token punctuation">.</span>userInfo <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;customData&quot;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;fizzbuzz&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">content<span class="token punctuation">.</span>sound <span class="token operator">=</span> <span class="token class-name">UNNotificationSound</span><span class="token punctuation">.</span><span class="token keyword">default</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The combination of content and trigger is enough to be combined into a request, but here notifications get clever: as well as content and a trigger, each notification also has a unique identifier. This is just a string you create, but it <em>does</em> need to be unique because it lets you update or remove notifications programmatically.</p><p>Apple’s example for this is an app that displays live sports scores to the user. When something interesting happens, what the user really wants is for the existing notification to be updated with new information, rather than have multiple notifications from the same app over time.</p><p>For technique project we don’t care what name is used for each notification, but we do want it to be unique. So, we’ll be using the <code>UUID</code> class to generate unique identifiers – we’ve used this before, so hopefully you’re familiar.</p><p>OK, enough talk – time for some code. Change the <code>scheduleLocal()</code> method to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">scheduleLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> center <span class="token operator">=</span> <span class="token class-name">UNUserNotificationCenter</span><span class="token punctuation">.</span><span class="token function">current</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> content <span class="token operator">=</span> <span class="token class-name">UNMutableNotificationContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    content<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Late wake up call&quot;</span></span></span>
<span class="line">    content<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;The early bird catches the worm, but the second mouse gets the cheese.&quot;</span></span></span>
<span class="line">    content<span class="token punctuation">.</span>categoryIdentifier <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;alarm&quot;</span></span></span>
<span class="line">    content<span class="token punctuation">.</span>userInfo <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;customData&quot;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;fizzbuzz&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">    content<span class="token punctuation">.</span>sound <span class="token operator">=</span> <span class="token class-name">UNNotificationSound</span><span class="token punctuation">.</span><span class="token keyword">default</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> dateComponents <span class="token operator">=</span> <span class="token class-name">DateComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    dateComponents<span class="token punctuation">.</span>hour <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">    dateComponents<span class="token punctuation">.</span>minute <span class="token operator">=</span> <span class="token number">30</span></span>
<span class="line">    <span class="token keyword">let</span> trigger <span class="token operator">=</span> <span class="token class-name">UNCalendarNotificationTrigger</span><span class="token punctuation">(</span>dateMatching<span class="token punctuation">:</span> dateComponents<span class="token punctuation">,</span> repeats<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> request <span class="token operator">=</span> <span class="token class-name">UNNotificationRequest</span><span class="token punctuation">(</span>identifier<span class="token punctuation">:</span> <span class="token function">UUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>uuidString<span class="token punctuation">,</span> content<span class="token punctuation">:</span> content<span class="token punctuation">,</span> trigger<span class="token punctuation">:</span> trigger<span class="token punctuation">)</span></span>
<span class="line">    center<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you want to test out your notifications, there are two more things that will help.</p><p>First, you can cancel pending notifications – i.e., notifications you have scheduled that have yet to be delivered because their trigger hasn’t been met – using the <code>center.removeAllPendingNotificationRequests()</code> method, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">center<span class="token punctuation">.</span><span class="token function">removeAllPendingNotificationRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Second, chances are you’ll find the interval trigger far easier to test with than the calendar trigger, because you can set it to a low number like 5 seconds to have your notification trigger almost immediately.</p><p>To do that, replace the existing trigger with this code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> trigger <span class="token operator">=</span> <span class="token class-name">UNTimeIntervalNotificationTrigger</span><span class="token punctuation">(</span>timeInterval<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span> repeats<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>With that small change you should be able to click Schedule in the simulator, then press <kbd>Cmd</kbd>+<kbd>L</kbd> to lock the device and have it show an alert just a few seconds later.</p>`,34))])}const N=u(g,[["render",b],["__file","02-scheduling-notifications-unusernotificationcenter-and-unnotificationrequest.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/read/21/02-scheduling-notifications-unusernotificationcenter-and-unnotificationrequest.html","title":"Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest","description":"Article(s) > Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest"},{"property":"og:description","content":"Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/21/02-scheduling-notifications-unusernotificationcenter-and-unnotificationrequest.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/21/02-scheduling-notifications-unusernotificationcenter-and-unnotificationrequest.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest"}],["meta",{"property":"og:description","content":"Article(s) > Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/21-1@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Scheduling notifications: UNUserNotificationCenter and UNNotificationRequest\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/21-1@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.34,"words":1303},"filePathRelative":"hackingwithswift.com/read/21/02-scheduling-notifications-unusernotificationcenter-and-unnotificationrequest.md","excerpt":"\\n"}');export{N as comp,q as data};