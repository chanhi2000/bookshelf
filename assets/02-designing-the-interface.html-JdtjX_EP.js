import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as g,am as t,as as u,ao as i,at as s,au as l,an as o,al as p,aq as n,ar as w}from"./app-CpYYKbnj.js";const f={},m={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"};function b(h,e){const a=n("VPCard"),c=n("VidStack"),r=n("FontIcon");return w(),g("div",null,[t("h1",m,[t("a",y,[t("span",null,u(h.$frontmatter.title)+" 관련",1)])]),i(a,s(l({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[6]||(e[6]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[7]||(e[7]=t("hr",null,null,-1)),i(a,s(l({title:"Designing the interface | Hacking with iOS",desc:"Designing the interface",link:"https://hackingwithswift.com/read/13/2/designing-the-interface",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),i(c,{src:"youtube/tT-hyQeUDNk"}),t("p",null,[e[0]||(e[0]=o("Select your ")),i(r,{icon:"iconfont icon-xcode"}),e[1]||(e[1]=t("code",null,"Main.storyboard",-1)),e[2]||(e[2]=o(" file to open Interface Builder, then embed the view controller inside a navigation controller."))]),e[8]||(e[8]=p('<p>Bring up the object library, then search for &quot;UIView&quot; and drag a view into your controller – this is a regular view, not a view controller or a storyboard reference. If Interface Builder is already using the iPhone 8 sizing, give the new view a width of 375 and height of 470, with X:0 and Y:64. If you’re not sure, look for the words “View as: iPhone 8” at the bottom of Interface Builder – if you see something else, click it and select iPhone 8 and Portrait.</p><p>All being well, using 375x470 and X:0 Y:64 should place the view just below the navigation controller, occupying most of the screen. In the attributes inspector, give the view the background color &quot;Dark Gray Color&quot;.</p><p>Create an image view, and place it inside the view you just created. I&#39;d like you to indent it by 10 points on every side – i.e., width 355, height 450, X:10, Y:10. Change the image&#39;s view mode from &quot;Scale to fill&quot; to &quot;Aspect Fit&quot;. Don&#39;t place any more views inside the gray view – everything else should be placed directly on the main (white) view.</p><p>That&#39;s the top part of the UI complete. For the bottom part, start by creating a label with width 72, height 21, X:16, Y:562. Give it the text &quot;Intensity&quot; and make it right-aligned. Now drop a slider next to it, giving it width 262, X:96, Y:558. You can&#39;t adjust the height for sliders, so leave it at the default.</p><p>Finally, place two buttons. The first button should be 120 wide and 44 high, with X:16, Y:605. Give it the title &quot;Change Filter&quot;. The second button should be 60 wide by 44 high, with X:300, Y:605. Give it the title &quot;Save&quot;.</p><p>In the picture below you can see how your finished layout should look.</p><figure><img src="https://hackingwithswift.com/img/books/hws/13-1@2x.png" alt="Your finished layout should have an image view taking up most of the space, with a slider and two buttons beneath it." tabindex="0" loading="lazy"><figcaption>Your finished layout should have an image view taking up most of the space, with a slider and two buttons beneath it.</figcaption></figure><p>So that&#39;s the basic layout complete, but of course we need to add Auto Layout constraints because we need it all to resize smoothly on various devices. But, you know, I&#39;m feeling lazy – how about we make Auto Layout do the work for us this time?</p><p>Select the view controller by clicking on &quot;View Controller&quot; in the document outline, then go to the Editor menu and choose Resolve Auto Layout Issues &gt; Reset To Suggested Constraints.</p><figure><img src="https://hackingwithswift.com/img/books/hws/13-2@2x.png" alt="Using Add Missing Constraints can be a real time saver when using Auto Layout." tabindex="0" loading="lazy"><figcaption>Using Add Missing Constraints can be a real time saver when using Auto Layout.</figcaption></figure><p>That&#39;s it! Your Auto Layout is done: Xcode just added the ideal constraints everywhere so that your interface resizes perfectly. Don&#39;t believe me? Try giving the image view a red background color (temporarily!), then launching it in any device and rotating the screen. You should see everything (including the red box) be positioned and resized correctly.</p><p>Make sure you switch the image view back to having a clear background color.</p><p>That was remarkably easy, and is another example of Apple doing a lot of hard work for you. Using Xcode to make your Auto Layout rules can be a real help, but it won&#39;t be right all the time. After all, it just takes its best guess as to your intentions. It will also frequently add more constraints than strictly necessary for the job, so use it with care.</p><p>Before we leave Interface Builder, I&#39;d like you to add an outlet for the image view and the slider, called respectively <code>imageView</code> and <code>intensity</code>. Please also create actions from the two buttons, calling methods <code>changeFilter()</code> and <code>save()</code>. You can leave these methods with no code inside them for now.</p><p>Finally, we want the user interface to update when the slider is dragged, so please create an action from the slider. It should give you the &quot;Value Changed&quot; event rather than Touch Up Inside, and that&#39;s what we want. Call the action&#39;s method <code>intensityChanged()</code>.</p>',15)),t("p",null,[e[3]||(e[3]=o("That's it for the storyboard, so bring up ")),i(r,{icon:"fa-brands fa-swift"}),e[4]||(e[4]=t("code",null,"ViewController.swift",-1)),e[5]||(e[5]=o(" and let's start coding…"))])])}const x=d(f,[["render",b],["__file","02-designing-the-interface.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/read/13/02-designing-the-interface.html","title":"Designing the interface","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Designing the interface","description":"Article(s) > Designing the interface","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Designing the interface"},{"property":"og:description","content":"Designing the interface"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/13/02-designing-the-interface.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/13/02-designing-the-interface.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Designing the interface"}],["meta",{"property":"og:description","content":"Article(s) > Designing the interface"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/13-1@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Designing the interface\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/13-1@2x.png\\",\\"https://hackingwithswift.com/img/books/hws/13-2@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.87,"words":860},"filePathRelative":"hackingwithswift.com/read/13/02-designing-the-interface.md","excerpt":"\\n"}');export{x as comp,I as data};