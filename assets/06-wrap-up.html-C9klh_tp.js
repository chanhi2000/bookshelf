import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as e,as as g,ao as o,at as r,au as l,ap as s,an as i,al as m,aq as h,ar as w}from"./app-CpYYKbnj.js";const y={},f={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},b={class:"table-of-contents"};function v(u,t){const a=h("VPCard"),n=h("router-link"),p=h("VidStack");return w(),d("div",null,[e("h1",f,[e("a",k,[e("span",null,g(u.$frontmatter.title)+" 관련",1)])]),o(a,r(l({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e("nav",b,[e("ul",null,[e("li",null,[o(n,{to:"#review-what-you-learned"},{default:s(()=>t[0]||(t[0]=[i("Review what you learned")])),_:1})]),e("li",null,[o(n,{to:"#challenge"},{default:s(()=>t[1]||(t[1]=[i("Challenge")])),_:1})]),e("li",null,[o(n,{to:"#hints"},{default:s(()=>t[2]||(t[2]=[i("Hints")])),_:1})])])]),t[3]||(t[3]=e("hr",null,null,-1)),o(a,r(l({title:"Wrap up | Hacking with iOS",desc:"Wrap up",link:"https://hackingwithswift.com/read/7/6/wrap-up",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o(p,{src:"youtube/utUpNqglZGs"}),t[4]||(t[4]=e("p",null,"As your Swift skill increases, I hope you're starting to feel the balance of these projects move away from explaining the basics and toward presenting and dissecting code.",-1)),t[5]||(t[5]=e("p",null,[i("In this project you learned how to download JSON using Swift’s Data type, then use the Codable protocol to convert that data into Swift objects we defined. Working with JSON is something you're going to be doing time and time again in your Swift career, and you've cracked it in about an hour of work – while also learning about "),e("code",null,"UITabBarController"),i(", "),e("code",null,"UIStoryboard"),i(", and more.")],-1)),t[6]||(t[6]=e("p",null,"Good job!",-1)),t[7]||(t[7]=e("hr",null,null,-1)),t[8]||(t[8]=e("h2",{id:"review-what-you-learned",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#review-what-you-learned"},[e("span",null,"Review what you learned")])],-1)),t[9]||(t[9]=e("p",null,"Anyone can sit through a tutorial, but it takes actual work to remember what was taught. It’s my job to make sure you take as much from these tutorials as possible, so I’ve prepared a short review to help you check your learning.",-1)),o(a,r(l({title:"Review – Project 7: Whitehouse Petitions – Hacking with Swift",desc:"Interactive tests that help gauge your progress learning Swift",link:"https://hackingwithswift.com/review/hws/project-7-whitehouse-petitions",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[10]||(t[10]=m('<hr><h2 id="challenge" tabindex="-1"><a class="header-anchor" href="#challenge"><span>Challenge</span></a></h2><p>One of the best ways to learn is to write your own code as often as possible, so here are three ways you should try extending this app to make sure you fully understand what’s going on:</p><ol><li>Add a Credits button to the top-right corner using <code>UIBarButtonItem</code>. When this is tapped, show an alert telling users the data comes from the We The People API of the Whitehouse.</li><li>Let users filter the petitions they see. This involves creating a second array of filtered items that contains only petitions matching a string the user entered. Use a <code>UIAlertController</code> with a text field to let them enter that string. This is a tough one, so I’ve included some hints below if you get stuck.</li><li>Experiment with the HTML – this isn’t a HTML or CSS tutorial, but you can find lots of resources online to give you enough knowledge to tinker with the layout a little.</li></ol><hr><h2 id="hints" tabindex="-1"><a class="header-anchor" href="#hints"><span>Hints</span></a></h2><p>It is <em>vital</em> to your learning that you try the challenges above yourself, and not just for a handful of minutes before you give up.</p><p>Every time you try something wrong, you learn that it’s wrong and you’ll remember that it’s wrong. By the time you find the <em>correct</em> solution, you’ll remember it much more thoroughly, while also remembering a lot of the wrong turns you took.</p><p>This is what I mean by “there is no learning without struggle”: if something comes easily to you, it can go just as easily. But when you have to really mentally fight for something, it will stick much longer.</p><p>But if you’ve already worked hard at the challenges above and are still struggling to implement them, I’m going to write some hints below that should guide you to the correct answer.</p><p><strong>If you ignore me and read these hints without having spent at least 30 minutes trying the challenges above, the only person you’re cheating is yourself.</strong></p><p>Still here? OK. The second challenge here is to let users filter the petitions they see. To solve this you need to do a number of things:</p><ol><li>Have one property to store all petitions, and one to store filtered petitions. This means the user can filter the petitions several times and you don’t have to keep redownloading your JSON.</li><li>At first your filtered petitions array will be the same as the main petitions array, so just assign one to the other when your data is ready.</li><li>Your table view should load all its data from the filtered petitions array.</li><li>You’ll need a bar button item to show an alert controller that the user can type into.</li><li>Once that’s done, go through all the items in your petitions array, adding any you want to the filtered petition.</li></ol><p>The important part here is the last one: how do you decide whether a petition matches the user’s search? One option is to use <code>contains()</code> to check whether the petition title or body text contains the user’s search string – try it and see how you get on!</p>',14))])}const I=c(y,[["render",v],["__file","06-wrap-up.html.vue"]]),W=JSON.parse('{"path":"/hackingwithswift.com/read/07/06-wrap-up.html","title":"Wrap up","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Wrap up","description":"Article(s) > Wrap up","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Wrap up"},{"property":"og:description","content":"Wrap up"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/06-wrap-up.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/06-wrap-up.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Wrap up"}],["meta",{"property":"og:description","content":"Article(s) > Wrap up"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Wrap up\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/read/08/overview.md","isOriginal":false},"headers":[{"level":2,"title":"Review what you learned","slug":"review-what-you-learned","link":"#review-what-you-learned","children":[]},{"level":2,"title":"Challenge","slug":"challenge","link":"#challenge","children":[]},{"level":2,"title":"Hints","slug":"hints","link":"#hints","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.78,"words":834},"filePathRelative":"hackingwithswift.com/read/07/06-wrap-up.md","excerpt":"\\n"}');export{I as comp,W as data};