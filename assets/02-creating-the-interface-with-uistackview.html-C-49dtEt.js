import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as e,as as u,ao as i,at as n,au as r,an as o,al as g,aq as s,ar as w}from"./app-CpYYKbnj.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function k(c,t){const a=s("VPCard"),l=s("FontIcon");return w(),d("div",null,[e("h1",m,[e("a",f,[e("span",null,u(c.$frontmatter.title)+" 관련",1)])]),i(a,n(r({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[3]||(t[3]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[4]||(t[4]=e("hr",null,null,-1)),i(a,n(r({title:"Creating the interface with UIStackView | Hacking with iOS",desc:"Creating the interface with UIStackView",link:"https://hackingwithswift.com/read/34/2/creating-the-interface-with-uistackview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[5]||(t[5]=e("p",null,[o("Once you start using UIStackView it's hard to stop, so naturally I wanted it in this project even though we're making a game. The nature of 4IR games is that you have rows and columns, and we're going to create a "),e("code",null,"UIStackView"),o(" to host the columns. If I didn't want to animate the chips falling into the board we'd be using stack views for the columns too!")],-1)),e("p",null,[t[0]||(t[0]=o("Open ")),i(l,{icon:"iconfont icon-xcode"}),t[1]||(t[1]=e("code",null,"Main.storyboard",-1)),t[2]||(t[2]=o(" in Interface Builder, then embed the existing view controller inside a navigation controller. Now select the navigation controller you just created, find its Navigation Bar in the document outline, then deselect Translucent in the attributes inspector – we don't want our game going behind the navigation bar, after all."))]),t[6]||(t[6]=g('<p>From the object library drag a Horizontal Stack View into your view controller, then resize it to fill the entire view up to the bottom of the navigation bar. When that&#39;s done, go to Editor &gt; Resolve Auto Layout Issues &gt; Reset to Suggested Constraints to add in the Auto Layout constraints required to keep it filling the view.</p><p>Now drag seven buttons into the stack view. By default, the stack view will show the first one large and all the others as small as possible, but you should select the stack view, go to the attributes inspector, then change Distribution to Fill Equally. While you&#39;re there, give Spacing a value of 2.</p><p>These seven buttons will be used to store the columns in our game, so to make them stand out I&#39;d like you to select them all and give them all a white background color. Button background color is quite a way down the attributes inspector, so you will need to scroll to find it. Now clear the text for all the buttons, making them just large white spaces that respond to taps.</p><p>Now I need you to select each of the buttons in order and give them increasing Tag values. The one on the far left can keep its Tag of 0, but the second one should have a Tag of 1, then 2, 3, 4, 5 and 6. This will be used to identify which button was tapped later on.</p><p>To make the buttons stand out as columns, select the view itself (you might need to use the document outline view for this) then give it a gray background color. Don&#39;t try to give the stack view a background color – it&#39;s doesn&#39;t actually do any drawing, so your background color will be ignored.</p><figure><img src="https://hackingwithswift.com/img/books/hws/34-1@2x.png" alt="Your user interface should have seven buttons inside a stack view, placed over a gray background" tabindex="0" loading="lazy"><figcaption>Your user interface should have seven buttons inside a stack view, placed over a gray background</figcaption></figure><p>There are two more things to do in Interface Builder before we can get on with some code. The first is to create IBOutlets for those buttons so we can control them from code, but rather than create individual outlets we&#39;re going to use something called an <code>IBOutletCollection</code>. These are just IBOutlet arrays that work like normal Swift arrays, except in IB you connect multiple outlets to the same thing.</p><p>To create an outlet collection, switch to the assistant editor by pressing <kbd>Alt</kbd>+<kbd>Cmd</kbd>+<kbd>Return</kbd>, then <kbd>Ctrl</kbd>+drag from the first button on the left from IB into your source code, just before the <code>viewDidLoad()</code> line. When you release the action/outlet menu will appear, and I&#39;d like you to choose Outlet Collection. Note: if you see only Outlet and Outlet Collection in the list (i.e., Action is missing) it means you probably selected the stack view rather than a button, so try again!</p><p>Name the outlet collection <code>columnButtons</code> and click Connect. Now <kbd>Ctrl</kbd>+drag from the other six buttons, but this time connect them to the same <code>@IBOutlet</code> that was just created – you need to hover over the <code>var columnButtons: [UIButton]!</code> part in order for this to work.</p><figure><img src="https://hackingwithswift.com/img/books/hws/34-2@2x.png" alt="Creating an IBOutletCollection in Interface Builder puts all your outlets into a single array" tabindex="0" loading="lazy"><figcaption>Creating an IBOutletCollection in Interface Builder puts all your outlets into a single array</figcaption></figure><p>The second change to make is to hook up an IBAction for those buttons. We set each of them to have their own Tag because we&#39;re going to use the same action for seven buttons – the tag will be used to figure out which button was tapped.</p><p>So, <kbd>Ctrl</kbd>+drag from the first button into some free space inside the class, then create an action called <code>makeMove</code>. Make sure you change the Type value to be <code>UIButton</code> rather than <code>Any</code> – this will be used later. Now <kbd>Ctrl</kbd>+drag from the other six buttons onto that <code>makeMove()</code> method, and we&#39;re done with Interface Builder.</p>',12))])}const v=h(p,[["render",k],["__file","02-creating-the-interface-with-uistackview.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/read/34/02-creating-the-interface-with-uistackview.html","title":"Creating the interface with UIStackView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Creating the interface with UIStackView","description":"Article(s) > Creating the interface with UIStackView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Creating the interface with UIStackView"},{"property":"og:description","content":"Creating the interface with UIStackView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/02-creating-the-interface-with-uistackview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/02-creating-the-interface-with-uistackview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Creating the interface with UIStackView"}],["meta",{"property":"og:description","content":"Article(s) > Creating the interface with UIStackView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/34-1@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Creating the interface with UIStackView\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/34-1@2x.png\\",\\"https://hackingwithswift.com/img/books/hws/34-2@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.1,"words":930},"filePathRelative":"hackingwithswift.com/read/34/02-creating-the-interface-with-uistackview.md","excerpt":"\\n"}');export{v as comp,I as data};