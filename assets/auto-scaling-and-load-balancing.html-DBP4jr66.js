import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as f,am as a,as as y,ao as n,at as c,au as d,ap as i,al as r,an as t,aq as s,ar as b}from"./app-CpYYKbnj.js";const w={},v={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},S={class:"table-of-contents"},A={href:"https://lightcloud.substack.com/i/70277437/messaging-queues",target:"_blank",rel:"noopener noreferrer"},x={href:"https://lightcloud.substack.com/i/59017006/high-availability",target:"_blank",rel:"noopener noreferrer"};function T(h,e){const l=s("VPCard"),g=s("SiteInfo"),o=s("router-link"),u=s("FontIcon"),p=s("RouteLink");return b(),f("div",null,[a("h1",v,[a("a",k,[a("span",null,y(h.$frontmatter.title)+" 관련",1)])]),n(l,c(d({title:"System Design > Article(s)",desc:"Article(s)",link:"/academics/system-design/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n(l,c(d({title:"AWS > Article(s)",desc:"Article(s)",link:"/devops/aws/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),e[16]||(e[16]=a("hr",null,null,-1)),n(g,{name:"How Auto Scaling and Load Balancing Work in Software Architecture",desc:"While auto scaling and load balancing are two separate techniques in software architecture management, they are often implemented simultaneously. In the software architecture wild, one rarely exists without the other, as they complement each other to handle unpredictable changes in demand. This article will explain how auto scaling and load...",url:"https://freecodecamp.org/news/auto-scaling-and-load-balancing/",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/size/w1000/2024/06/image--13-.png"}),e[17]||(e[17]=a("p",null,"While auto scaling and load balancing are two separate techniques in software architecture management, they are often implemented simultaneously. In the software architecture wild, one rarely exists without the other, as they complement each other to handle unpredictable changes in demand.",-1)),e[18]||(e[18]=a("p",null,"This article will explain how auto scaling and load balancing work and why they're important to consider in your designs. It will also go through example architectures showing auto scaling and load balancing in action.",-1)),a("nav",S,[a("ul",null,[a("li",null,[n(o,{to:"#auto-scaling-explained"},{default:i(()=>e[0]||(e[0]=[t("Auto Scaling Explained")])),_:1}),a("ul",null,[a("li",null,[n(o,{to:"#dynamic-scaling"},{default:i(()=>e[1]||(e[1]=[t("Dynamic Scaling")])),_:1})]),a("li",null,[n(o,{to:"#scheduled-scaling"},{default:i(()=>e[2]||(e[2]=[t("Scheduled Scaling")])),_:1})]),a("li",null,[n(o,{to:"#why-use-auto-scaling"},{default:i(()=>e[3]||(e[3]=[t("Why Use Auto Scaling?")])),_:1})])])]),a("li",null,[n(o,{to:"#load-balancing-explained"},{default:i(()=>e[4]||(e[4]=[t("Load Balancing Explained")])),_:1}),a("ul",null,[a("li",null,[n(o,{to:"#why-use-load-balancing"},{default:i(()=>e[5]||(e[5]=[t("Why Use Load Balancing?")])),_:1})])])]),a("li",null,[n(o,{to:"#bringing-it-together-–-load-balancing-and-auto-scaling-in-action"},{default:i(()=>e[6]||(e[6]=[t("Bringing it Together – Load Balancing and Auto Scaling in Action")])),_:1})])])]),e[19]||(e[19]=r('<hr><h2 id="auto-scaling-explained" tabindex="-1"><a class="header-anchor" href="#auto-scaling-explained"><span>Auto Scaling Explained</span></a></h2><p>Auto scaling, as its name implies, is simply a way to automatically scale your compute instances. With most cloud providers like AWS, GCP and Azure, you select scaling policies that define how it will add or remove instances.</p><p>Scaling policies are simply rules that say how much you should increase or decrease the number of instances based on some predefined metric.</p><p>Scaling policies can be dynamic, for example, by adding new instances based on CPU utilisation of the existing instances. Scaling policies can also be based on a schedule, that is based on specific times of the day or the week when you anticipate higher or lower demand.</p><h3 id="dynamic-scaling" tabindex="-1"><a class="header-anchor" href="#dynamic-scaling"><span>Dynamic Scaling</span></a></h3><p>Dynamic scaling is ideal for when there is a large fluctuation of demand at unknown and unpredictable times. You know there may be a sudden surge or drop in demand on your instances, you just don’t know when.</p><p>Using a restaurant analogy, think of an instance as a chef doing the work of converting orders into meals. If you only have three chefs and don’t have large fluctuations in demand throughout the day or week, you have nothing to worry about.</p><p>But if your restaurant had a sale that was more popular than anticipated, or a large party of tourists were to suddenly descend upon the restaurant, how would you cope? What if you could add more chefs on the fly immediately when needed?</p><p>This is how dynamic auto scaling works. Dynamic scaling will cause chefs to spontaneously appear in the kitchen, ready to transform orders into delicious meals, based on a predefined metric that you can choose to measure how overworked the chefs are – that is, how much they are struggling to fulfill current orders.</p><p>Remember that these scaling policies are simply rules. These rules can be very simple, like:</p><blockquote><p>if CPU utilisation is &gt; 50%, add one more instance. If CPU utilisation is &lt;50%, remove an instance.</p></blockquote><p>These rules can also be more complex.</p><p>With AWS and GCP, for example, you can set a target tracking metric that will monitor the CPU performance of your scaling group and add or remove instances so that that the average CPU utilisation approximately matches your desired setting.</p><p>For example, if you specify that you want the average CPU utilisation of your scaling group to be at 60%, instances will be added or removed as required to approximately meet that target.</p><p>Using CPU utilisation to trigger a scaling action is one of the most popular patterns. But CPU utilisation is not the only metric you can use to scale. In some ways, it can actually be suboptimal to use CPU utilisation, especially if you want even more responsive scaling.</p><p>What if you could track another metric that anticipates the increase in CPU utilisation so you don’t have to wait for the inevitable increase in the CPU utilisation of your instances before a scaling action is triggered?</p>',17)),a("p",null,[e[8]||(e[8]=t("With GCP, for example, if you have an HTTP load balancer in front of your instances, you can configure your scaling to be triggered based on the number of requests hitting your load balancer. Similarly with AWS, if you have an ")),a("a",A,[n(u,{icon:"fas fa-globe"}),e[7]||(e[7]=t("SQS queue"))]),e[9]||(e[9]=t(" in front of your instances, you can scale based on the number of messages in the queue."))]),e[20]||(e[20]=r('<p>In both of these examples, something else anticipates a likely increase in future CPU utilisation, so setting a scaling action to be triggered based on this is a way of creating more responsive scaling.</p><p>Bringing back our restaurant analogy, this would be like calling in more chefs to the kitchen once you see a large queue outside the restaurant. This is a more responsive way of dealing with a sudden surge in demand compared to waiting until your chefs are overwhelmed with orders.</p><h3 id="scheduled-scaling" tabindex="-1"><a class="header-anchor" href="#scheduled-scaling"><span>Scheduled Scaling</span></a></h3><p>Scheduled scaling is ideal for when there is a large fluctuation in demand at known times.</p><p>Using the restaurant analogy again, your scaling policy can be based on a schedule. So for example, if you know evenings and weekends are busier than mornings and weekdays, your scaling policy will ensure that there are more chefs during periods of higher expected demand.</p><p>With AWS and GCP, you can set a scheduled scaling policy to add or remove instances at specific times.</p><h3 id="why-use-auto-scaling" tabindex="-1"><a class="header-anchor" href="#why-use-auto-scaling"><span>Why Use Auto Scaling?</span></a></h3><p>Auto scaling solves the age old problem of capacity planning. Trying to accurately forecast how much compute will be required in the future is fraught with errors. Too little capacity, and your website is down during periods of high demand, costing you money and reputation. Too much capacity, and you are paying for unused instances.</p><p>Capacity planning is fundamentally a forecasting problem. And humans are not great at accurately forecasting the future. Before cloud providers like AWS, GCP, and Azure existed, companies needed to plan capacity based on expected future demand. This planning process was often just disguised guesswork. You had to pay upfront for servers and hope you didn’t significantly under or overestimate how many servers you needed.</p><p>The problem with forecasting arises because we have a misguided faith in the precise measurement of the unknowable future. Humans have been making inaccurate forecasts for a long time. As far back as 600 BC, the Greek philosopher Thales was so intent on counting the stars that he kept falling into potholes on the road.</p><p>Some things are fundamentally unknowable, and that is ok. Auto scaling removes the need to accurately forecast future demand since you can automatically increase or decrease the number of instances you have based on your scaling policy.</p><p>By using auto scaling, you get to improve the resilience of your architecture and reduce costs. These are the two main reasons to use auto scaling in your designs.</p><h4 id="improve-resilience-improve-resilience" tabindex="-1"><a class="header-anchor" href="#improve-resilience-improve-resilience"><span>-improve-resilience&quot;&gt;Improve Resilience</span></a></h4><p>Being able to automatically and immediately increase the number of instances in response to growing demand reduces the chances that your instances are under excessive load and at risk of poor performance. This improves the resilience of your architecture.</p><p>Auto scaling is, however, not only about scaling. It can also be used to maintain a set number of instances. This is a great way of creating self healing architectures.</p><p>With AWS, you can set your minimum, maximum, and desired number of compute instances, without any scaling policy. AWS will simply attempt to maintain the desired number of instances specified by you. So if you set the min, max, and desired all equal to one, AWS will maintain one instance for you. If this instance fails, another will be automatically created to replace the failed instance to restore your desired capacity.</p>',16)),a("p",null,[e[11]||(e[11]=t("This is a cheap and easy way of ensuring ")),a("a",x,[n(u,{icon:"fas fa-globe"}),e[10]||(e[10]=t("high availability"))]),e[12]||(e[12]=t(" without having multiple instances in different availability zones."))]),e[21]||(e[21]=r('<figure><img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F263f0886-2617-480a-af2b-232e97270a24_1559x914.png" alt="Self healing in action, figuratively" tabindex="0" loading="lazy"><figcaption>Self healing in action, figuratively</figcaption></figure><p>The ability to create self healing architectures is a really strong argument to almost always place your instances in an auto scaling group. AWS and GCP do not, as of this writing, charge you for the privilege of using auto scaling. You only pay for the underlying infrastructure that is created to support your instances.</p><p>So, even if there is no requirement to be able to scale instances based on the demand thrown at them, having instances in an auto scaling group is a cheap and easy way of creating a self healing architecture.</p><h4 id="reduce-cost" tabindex="-1"><a class="header-anchor" href="#reduce-cost"><span>Reduce Cost</span></a></h4><p>Previous examples have been about scaling up the number of instances to meet higher demand. But equally as important is the ability to scale down during periods of lower demand.</p><p>Auto scaling allows you to do this using scheduled or dynamic scaling policies. This is a great way of ensuring that you are not paying for more than you need to.</p><hr><h2 id="load-balancing-explained" tabindex="-1"><a class="header-anchor" href="#load-balancing-explained"><span>Load Balancing Explained</span></a></h2>',8)),a("p",null,[e[14]||(e[14]=t("Load balancers accept connections from clients and distribute the requests across target instances. The distribution of requests is usually done on layer 7 (application layer) or layer 4 (transport layer). These layers are a theoretical model that organises computer networking into 7 layers and is ")),n(p,{to:"/freecodecamp.org/osi-model-networking-layers-explained-in-plain-english.html"},{default:i(()=>e[13]||(e[13]=[t("know as the OSI model")])),_:1}),e[15]||(e[15]=t("."))]),n(l,c(d({title:"The OSI Model – The 7 Layers of Networking Explained in Plain English",desc:"By Chloe Tucker This article explains the Open Systems Interconnection (OSI) model and the 7 layers of networking, in plain English. The OSI model is a conceptual framework that is used to describe how a network functions. In plain English, the OSI m...",link:"/freecodecamp.org/osi-model-networking-layers-explained-in-plain-english.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),e[22]||(e[22]=r('<p>I won&#39;t go into too much detail on the OSI model here, but for now, what is important to know is that most load balancers can work on the application layer or transport layer. This means that they work with layer 7 protocols like HTTP(S) or layer 4 protocols like TCP, UDP, SMTP, SSH.</p><p>The example in this section will only cover the more popular layer 7 application load balancers that work with HTTP/HTTPS.</p><p>While the low level implementation details and use cases between layer 7 and layer 4 load balancers are different, the principles remain the same. Load balancers are used to distribute incoming traffic across a number of target instances</p><p>The distribution of the requests among the target instances typically uses a round robin algorithm where requests are sent to each instance sequentially. So, request #1 goes to instance #1, request #2 to instance #2, request #3 to instance #3, request #4 again comes to instance #1, and so on.</p><p>While other balancing algorithms exist, the round robin algorithm is the most popular one used by most cloud providers for load balancing.</p><figure><img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c5a66a2-31da-471e-a753-44b75dd78708_1898x1490.png" alt="A simple view of how load balancers distribute requests" tabindex="0" loading="lazy"><figcaption>A simple view of how load balancers distribute requests</figcaption></figure><p>The diagram above is a logical depiction of how load balancers work. It only shows one load balancer, which is not a very resilient design. This logical abstraction is easy to illustrate, but is not accurate.</p><p>Behind the scenes, multiple load balancer nodes are deployed into each subnet within an availability zone. The load balancer is created with a single DNS record that points at all the elastic load balancer nodes created – that is, this single DNS record points at all of the IP addresses of the actual nodes deployed. All incoming requests are distributed equally across all the load balancer nodes and the load balancer nodes in turn equally distribute requests to target instances. In this way, you don’t have a single point of failure.</p><p>A more realistic, albeit more complex, representation of how load balancers work is shown below. In this example, requests will come to any of the load balancer nodes deployed across the three subnets and then they are equally distributed across the target instances.</p><figure><img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14072032-eb00-4b67-b253-1e293331b732_1938x1665.png" alt="A more accurate view of how load balancers distribute requests" tabindex="0" loading="lazy"><figcaption>A more accurate view of how load balancers distribute requests</figcaption></figure><h3 id="why-use-load-balancing" tabindex="-1"><a class="header-anchor" href="#why-use-load-balancing"><span>Why Use Load Balancing?</span></a></h3><p>Load balancers ensure that traffic is distributed among the target instances. This spreads out the load and prevents a single instance from being overloaded with an excessive number of requests.</p><p>Load balancers also create a loosely coupled architecture. Loose coupling is generally sought because it mans that users don&#39;t have to be aware of the instances, or instances don&#39;t need to be aware of other instances.</p><p>What exactly does being “aware” mean? Since user requests are first sent to the load balancer, users are not aware of the instances actually responding to their request. All communication is done via the load balancer, so it becomes easy to change the type and number of instances without the user being aware of it. The load balancer is aware of the instances in its target so it can send the request to all relevant instances.</p><hr><h2 id="bringing-it-together-–-load-balancing-and-auto-scaling-in-action" tabindex="-1"><a class="header-anchor" href="#bringing-it-together-–-load-balancing-and-auto-scaling-in-action"><span>Bringing it Together – Load Balancing and Auto Scaling in Action</span></a></h2><p>The diagram below shows load balancing and auto scaling used for a three tiered web application consisting of web, application, and database tiers. Each of these tiers have separate instances/infrastructure.</p><figure><img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27dcd71d-6672-4f40-9dd4-1389a42869d7_1405x1923.png" alt="Load balancing and auto scaling used for a three tiered web application consisting of web, application, and database tiers." tabindex="0" loading="lazy"><figcaption>Load balancing and auto scaling used for a three tiered web application consisting of web, application, and database tiers.</figcaption></figure><p>The instances in the web and application tiers are in separate auto scaling groups. There is also a load balancer between the user and the web tier, and between the web tier and the application tier.</p><p>By having a load balancer between the user and the web tier, the web tier can scale independently, using the auto scaling feature to add or remove instances as needed.</p><p>The user does not need to know which instance to connect to as the connection is through a load balancer. This is loose coupling in action. The same logic applies between the web tier and application tier. Without the load balancer, the instances in the two tiers would be tightly coupled, making scaling difficult.</p><p>The database tier in this case is an RDS database with one master and two standby nodes. All reads and writes go to the master node and if this node fails, there is an automatic failover to one of the standby instances.</p><p>Auto scaling ensures:</p><ol><li><strong>Resilience</strong>, as it can automatically and immediately increase the number of instances in response to growing demand. It can also self heal, so even if you don’t anticipate the need for immediate and automatic scaling based on changes to demand, self healing is almost always desired as it increases the availability of your architecture</li><li><strong>Cost control</strong>, as it has the ability to scale in and reduce the number of instances used during periods of lower demand can save you money</li></ol><p>Load balancing ensures:</p><ol><li><strong>Distribution of load</strong>, as it prevents a single node being overloaded with requests</li><li><strong>Loose coupling</strong>, as it removes the need for awareness between users and instances, and between instances themselves. This allows for instances to scale independently</li></ol><p>Thank you for reading!</p>',27))])}const F=m(w,[["render",T],["__file","auto-scaling-and-load-balancing.html.vue"]]),W=JSON.parse('{"path":"/freecodecamp.org/auto-scaling-and-load-balancing.html","title":"How Auto Scaling and Load Balancing Work in Software Architecture","lang":"en-US","frontmatter":{"lang":"en-US","title":"How Auto Scaling and Load Balancing Work in Software Architecture","description":"Article(s) > How Auto Scaling and Load Balancing Work in Software Architecture","icon":"fas fa-pen-ruler","category":["Design","System","Amazon","AWS","Article(s)"],"tag":["blog","freecodecamp.org","design","system","amazon","aws","amazon-web-services"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How Auto Scaling and Load Balancing Work in Software Architecture"},{"property":"og:description","content":"How Auto Scaling and Load Balancing Work in Software Architecture"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/auto-scaling-and-load-balancing.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/auto-scaling-and-load-balancing.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How Auto Scaling and Load Balancing Work in Software Architecture"}],["meta",{"property":"og:description","content":"Article(s) > How Auto Scaling and Load Balancing Work in Software Architecture"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/size/w1000/2024/06/image--13-.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/size/w1000/2024/06/image--13-.png"}],["meta",{"name":"twitter:image:alt","content":"How Auto Scaling and Load Balancing Work in Software Architecture"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"design"}],["meta",{"property":"article:tag","content":"system"}],["meta",{"property":"article:tag","content":"amazon"}],["meta",{"property":"article:tag","content":"aws"}],["meta",{"property":"article:tag","content":"amazon-web-services"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How Auto Scaling and Load Balancing Work in Software Architecture\\",\\"image\\":[\\"https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F263f0886-2617-480a-af2b-232e97270a24_1559x914.png\\",\\"https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c5a66a2-31da-471e-a753-44b75dd78708_1898x1490.png\\",\\"https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14072032-eb00-4b67-b253-1e293331b732_1938x1665.png\\",\\"https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27dcd71d-6672-4f40-9dd4-1389a42869d7_1405x1923.png\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/academics/system-design/articles/README.md","date":"2024-06-17T00:00:00.000Z","isOriginal":false,"cover":"https://freecodecamp.org/news/content/images/size/w1000/2024/06/image--13-.png"},"headers":[{"level":2,"title":"Auto Scaling Explained","slug":"auto-scaling-explained","link":"#auto-scaling-explained","children":[{"level":3,"title":"Dynamic Scaling","slug":"dynamic-scaling","link":"#dynamic-scaling","children":[]},{"level":3,"title":"Scheduled Scaling","slug":"scheduled-scaling","link":"#scheduled-scaling","children":[]},{"level":3,"title":"Why Use Auto Scaling?","slug":"why-use-auto-scaling","link":"#why-use-auto-scaling","children":[]}]},{"level":2,"title":"Load Balancing Explained","slug":"load-balancing-explained","link":"#load-balancing-explained","children":[{"level":3,"title":"Why Use Load Balancing?","slug":"why-use-load-balancing","link":"#why-use-load-balancing","children":[]}]},{"level":2,"title":"Bringing it Together – Load Balancing and Auto Scaling in Action","slug":"bringing-it-together-–-load-balancing-and-auto-scaling-in-action","link":"#bringing-it-together-–-load-balancing-and-auto-scaling-in-action","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":5}]},"readingTime":{"minutes":9.02,"words":2707},"filePathRelative":"freecodecamp.org/auto-scaling-and-load-balancing.md","localizedDate":"June 17, 2024","excerpt":"\\n"}');export{F as comp,W as data};