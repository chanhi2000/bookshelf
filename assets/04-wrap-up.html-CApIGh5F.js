import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as g,am as t,as as m,ao as a,at as r,au as s,ap as c,an as o,al as w,aq as n,ar as f}from"./app-CpYYKbnj.js";const y={},k={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"},b={class:"table-of-contents"},S={href:"https://gum.co/advanced-ios-1",target:"_blank",rel:"noopener noreferrer"};function A(h,e){const i=n("VPCard"),l=n("router-link"),p=n("VidStack"),d=n("FontIcon");return f(),g("div",null,[t("h1",k,[t("a",v,[t("span",null,m(h.$frontmatter.title)+" 관련",1)])]),a(i,r(s({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t("nav",b,[t("ul",null,[t("li",null,[a(l,{to:"#review-what-you-learned"},{default:c(()=>e[0]||(e[0]=[o("Review what you learned")])),_:1})]),t("li",null,[a(l,{to:"#challenge"},{default:c(()=>e[1]||(e[1]=[o("Challenge")])),_:1})])])]),e[5]||(e[5]=t("hr",null,null,-1)),a(i,r(s({title:"Wrap up | Hacking with iOS",desc:"Wrap up",link:"https://hackingwithswift.com/read/21/4/wrap-up",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(p,{src:"youtube/iAMuDXSi2Cc"}),e[6]||(e[6]=t("p",null,"That was easy, right? And yet it's such a great feature to have, because now your app can talk to users even when it isn't running. You want to show a step count for how far they've walked? Use a notification. You want to trigger an alert because it's their turn to play in a game? Use a notification. You want to send them marketing messages to make them buy more stuff? Actually, just don't do that, you bad person.",-1)),t("p",null,[e[3]||(e[3]=o("We’ve only scratched the surface of what notifications can do, but if you’d like to explore more advanced topics – such as attaching pictures or letting the user type responses rather than tapping buttons – see my book ")),t("a",S,[a(d,{icon:"fas fa-globe"}),e[2]||(e[2]=o("Advanced iOS: Volume One"))]),e[4]||(e[4]=o("."))]),e[7]||(e[7]=t("p",null,"We’ll be coming back to notifications again in project 33, where CloudKit is used to create and deliver remote notifications when server data has changed.",-1)),e[8]||(e[8]=t("hr",null,null,-1)),e[9]||(e[9]=t("h2",{id:"review-what-you-learned",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#review-what-you-learned"},[t("span",null,"Review what you learned")])],-1)),e[10]||(e[10]=t("p",null,"Anyone can sit through a tutorial, but it takes actual work to remember what was taught. It’s my job to make sure you take as much from these tutorials as possible, so I’ve prepared a short review to help you check your learning.",-1)),a(i,r(s({title:"Review – Project 21: Local Notifications – Hacking with Swift",desc:"Interactive tests that help gauge your progress learning Swift",link:"https://hackingwithswift.com/review/hws/project-21-local-notifications",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[11]||(e[11]=w('<hr><h2 id="challenge" tabindex="-1"><a class="header-anchor" href="#challenge"><span>Challenge</span></a></h2><p>One of the best ways to learn is to write your own code as often as possible, so here are three ways you should try your new knowledge to make sure you fully understand what’s going on:</p><ol><li>Update the code in <code>didReceive</code> so that it shows different instances of <code>UIAlertController</code> depending on which action identifier was passed in.</li><li>For a harder challenge, add a second <code>UNNotificationAction</code> to the <code>alarm</code> category of project 21. Give it the title “Remind me later”, and make it call <code>scheduleLocal()</code> so that the same alert is shown in 24 hours. (For the purpose of these challenges, a time interval notification with 86400 seconds is good enough – that’s roughly how many seconds there are in a day, excluding summer time changes and leap seconds.)</li><li>And for an even harder challenge, update project 2 so that it reminds players to come back and play every day. This means scheduling a week of notifications ahead of time, each of which launch the app. When the app is finally launched, make sure you call <code>removeAllPendingNotificationRequests()</code> to clear any un-shown alerts, then make new alerts for future days.</li></ol>',4))])}const R=u(y,[["render",A],["__file","04-wrap-up.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/read/21/04-wrap-up.html","title":"Wrap up","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Wrap up","description":"Article(s) > Wrap up","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Wrap up"},{"property":"og:description","content":"Wrap up"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/21/04-wrap-up.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/21/04-wrap-up.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Wrap up"}],["meta",{"property":"og:description","content":"Article(s) > Wrap up"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Wrap up\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/read/22/overview.md","isOriginal":false},"headers":[{"level":2,"title":"Review what you learned","slug":"review-what-you-learned","link":"#review-what-you-learned","children":[]},{"level":2,"title":"Challenge","slug":"challenge","link":"#challenge","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.9,"words":569},"filePathRelative":"hackingwithswift.com/read/21/04-wrap-up.md","excerpt":"\\n"}');export{R as comp,C as data};