import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as g,am as t,as as f,ao as a,at as h,au as p,ap as s,al as w,an as o,ak as b,aq as r,ar as y}from"./app-CpYYKbnj.js";const k={},I={id:"frontmatter-title-관련",tabindex:"-1"},P={class:"header-anchor",href:"#frontmatter-title-관련"},A={class:"table-of-contents"},v={class:"hint-container info"},T={href:"https://linkedin.com/in/tooba-jamal/",target:"_blank",rel:"noopener noreferrer"};function x(d,e){const l=r("VPCard"),n=r("router-link"),c=r("SiteInfo"),i=r("RouteLink"),u=r("FontIcon");return y(),g("div",null,[t("h1",I,[t("a",P,[t("span",null,f(d.$frontmatter.title)+" 관련",1)])]),a(l,h(p({title:"API > Article(s)",desc:"Article(s)",link:"/explore/api/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t("nav",A,[t("ul",null,[t("li",null,[a(n,{to:"#what-is-an-api"},{default:s(()=>e[0]||(e[0]=[o("What is an API?")])),_:1})]),t("li",null,[a(n,{to:"#how-do-apis-work"},{default:s(()=>e[1]||(e[1]=[o("How Do APIs Work?")])),_:1}),t("ul",null,[t("li",null,[a(n,{to:"#http-methods"},{default:s(()=>e[2]||(e[2]=[o("HTTP methods")])),_:1})]),t("li",null,[a(n,{to:"#http-status-codes"},{default:s(()=>e[3]||(e[3]=[o("HTTP status codes")])),_:1})])])]),t("li",null,[a(n,{to:"#types-of-apis"},{default:s(()=>e[4]||(e[4]=[o("Types of APIs")])),_:1})]),t("li",null,[a(n,{to:"#conclusion"},{default:s(()=>e[5]||(e[5]=[o("Conclusion")])),_:1})])])]),e[24]||(e[24]=t("hr",null,null,-1)),a(c,{name:"What is an API and How Does it Work? APIs for Beginners",desc:"When I started learning to code, the term API would always haunt me. I couldn't make sense of what it actually meant because I would hear people talking about APIs in different contexts.  The biggest challenge was that I couldn't find resources to le...",url:"https://freecodecamp.org/news/how-apis-work",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/2022/12/api-article.png"}),e[25]||(e[25]=w('<p>When I started learning to code, the term API would always haunt me. I couldn&#39;t make sense of what it actually meant because I would hear people talking about APIs in different contexts.</p><p>The biggest challenge was that I couldn&#39;t find resources to learn about APIs in simple terms.</p><p>Now that I know how APIs work, I decided to write this guide for any newbies out there who are struggling to make sense of this not-so-complicated but still confusing topic in web development and software engineering.</p><hr><h2 id="what-is-an-api" tabindex="-1"><a class="header-anchor" href="#what-is-an-api"><span>What is an API?</span></a></h2><p>API stands for Application Programming Interface. The application can be any software that performs a specific task and the interface is a point where two applications communicate.</p><p>One application acts as a client and the other acts as a server. A client asks for some resource, say for example a photo, and the server sends that photo to the client.</p><p>The client here can be your mobile phone, desktop or laptop computer, or any device you use to surf the internet. And the server is a bigger computer that stores the data you want (a photo in our case).</p><figure><img src="https://freecodecamp.org/news/content/images/2022/12/unsplash-1.png" alt="Unsplash search example" tabindex="0" loading="lazy"><figcaption>Unsplash search example</figcaption></figure><p>Suppose I want a nature photograph to upload to my travel blog. I might go onto the Unsplash website, type &quot;nature: in the search bar, and it would return a large number of nature photographs.</p><p>That&#39;s an API working behind the scenes to make the conversation between Unsplash and me happen.</p><hr><h2 id="how-do-apis-work" tabindex="-1"><a class="header-anchor" href="#how-do-apis-work"><span>How Do APIs Work?</span></a></h2><p>Computers follow a protocol to communicate with each other. A protocol is nothing but a set of rules that computers follow to communicate. Any computer that doesn&#39;t follow the protocol breaks the communication thread.</p><p>You might have used Bluetooth to share data back in the day. Bluetooth is nothing but a protocol for mobile devices to communicate with each other at a shorter distance.</p><p>When you ask your friend to send you photos of their last trip, your device acts as a client, and your friend&#39;s device (the one that sends photos) is the server.</p><p>This is just an example of a protocol. We have a large number of protocols in the world of computer science – one for almost anything.</p><p>On the web, we use the HTTP protocol (which stands for Hyper Text Transfer Protocol). APIs available on the web use the HTTP protocol for a number of reasons - it&#39;s easy to use and it&#39;s popular, for example.</p><p>Communications that take place over the <strong>HTTP protocol</strong> are also known as the request-response cycle because this is exactly how the protocol works. The client sends a request to the server and the server responds to the client regarding that request.</p><p>Unlike humans, computers have to be rigid to communicate with each other or they break the communication. For this reason, a client (requesting computer/ device) needs a set of information to send with the request so the server responds accordingly. This information includes:</p><ol><li>URL – a web address where you want to make a request</li><li>Method – whether you want data already stored somewhere or want to save new data in a database</li><li>Header – all the relevant information about your request including in what format the client device expects to receive the data</li><li>Body – the body contains the actual request data</li></ol><p>In our Unsplash example, the URL is <a href="https://unsplash.com/s/photos/england" target="_blank" rel="noopener noreferrer">https://unsplash.com/s/photos/nature</a>. The method is GET because we want the server to get nature images back. The header includes information like the format our computer expects to get and accept – like language meaning, the language of the device, our operating system, and so on. The body includes the data we need to send to the server, the nature keyword for example.</p><p>There are four types of methods for HTTP requests which we will get back to in a moment. For now, just know that a method indicates what you want to do with the data available on the server. For example, whether you want that data as documents or you want to save a new entry in data saved somewhere.</p><p>When a client makes a request, the server responds to that request. The response might be the data the client requested or an error.</p><p>Just like a response, a request has a structure including a URL, status code, header and body. In a request, we have a method, which has four types. And in the response, we have a status code which indicates whether a request has been accepted or declined.</p><h3 id="http-methods" tabindex="-1"><a class="header-anchor" href="#http-methods"><span>HTTP methods</span></a></h3><p>There are four available HTTP methods, and each has its unique functionality.</p><ol><li>GET: as already discussed, this indicates that the client is requesting data to be sent from the server.</li><li>POST: this method tells the server that the client wants to create a new entry in a database. For example, saving a new blog post in a database of all previous blogs.</li><li>DELETE: as the name suggests, the client wants to delete a data record from a database.</li><li>PUT: this method is used when a client wants to update or edit a data record. For example, changing your Facebook password.</li></ol><h3 id="http-status-codes" tabindex="-1"><a class="header-anchor" href="#http-status-codes"><span>HTTP status codes</span></a></h3><p>There is a huge list of HTTP status codes, but let&#39;s look at a few of the most common:</p><ol><li>200 OK: this indicates that the request was successfully fulfilled by the server</li><li>201 CREATED: the data entry that you requested to create was created</li><li>404 NOT FOUND: this indicates that the resource you requested wasn&#39;t found by the server</li><li>500 INTERNAL SERVER ERROR: this means that an error occured at the server&#39;s end and it couldn&#39;t fulfill your request</li></ol><p>There is no need to memorize these status codes, as the list is huge and you will subconsciously learn them as you encounter them in your development journey.</p><p>Still, there is a range of status codes that indicates a generic response, as you can see here:</p><ol><li>100s: Informational responses, indicating the request&#39;s progress</li><li>200s: Success, indicating the request&#39;s success</li><li>300s: Redirection, indicating the request had to redirect somewhere else</li><li>400s: Client errors, indicating errors that occurred on the client side</li><li>500s: Server errors, when the server fails to respond to a valid client request</li></ol><hr><h2 id="types-of-apis" tabindex="-1"><a class="header-anchor" href="#types-of-apis"><span>Types of APIs</span></a></h2><p>Remember how I told you that I got confused when people would talk about APIs in different contexts? That&#39;s because we have different types of APIs available as well.</p><p>The ones we talked about in this article are web APIs that use the HTTP protocol. Developers can use them to create a better user experience for their users.</p><p>Other types include internal APIs that are hidden from external users and that are used within a company only.</p><p>There are also open APIs that are available to be used by anyone for free (like the open weather map API). You can have partner APIs that are shared among business partners only to carry out their business tasks, and composite APIs that sequentially combine multiple API requests into a single API call to reduce server load and create a faster experience.</p>',40)),t("div",v,[e[18]||(e[18]=t("p",{class:"hint-container-title"},"Resources to learn more about APIs",-1)),t("p",null,[e[7]||(e[7]=o("If you want to learn more about how to design APIs, ")),a(i,{to:"/freecodecamp.org/rest-api-design-best-practices-build-a-rest-api.html"},{default:s(()=>e[6]||(e[6]=[o("here's a full book for you to get started")])),_:1}),e[8]||(e[8]=o("."))]),t("p",null,[e[10]||(e[10]=o("And you can learn more about ")),a(i,{to:"/freecodecamp.org/what-is-an-api-and-how-to-test-it.html"},{default:s(()=>e[9]||(e[9]=[o("types of APIs, testing tools, and documentation here")])),_:1}),e[11]||(e[11]=o("."))]),t("p",null,[e[13]||(e[13]=o("Here's a tutorial that'll ")),a(i,{to:"/freecodecamp.org/rest-api-tutorial-rest-client-rest-service-and-api-calls-explained-with-code-examples.html"},{default:s(()=>e[12]||(e[12]=[o("teach you all about REST APIs")])),_:1}),e[14]||(e[14]=o("."))]),t("p",null,[e[16]||(e[16]=o("And here's a ")),a(i,{to:"/freecodecamp.org/fetch-api-cheatsheet.html"},{default:s(()=>e[15]||(e[15]=[o("Fetch API cheatsheet")])),_:1}),e[17]||(e[17]=o(" to get you started learning about Fetch."))])]),e[26]||(e[26]=t("hr",null,null,-1)),e[27]||(e[27]=t("h2",{id:"conclusion",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#conclusion"},[t("span",null,"Conclusion")])],-1)),e[28]||(e[28]=t("p",null,"An API is an interface for two computers to communicate in order to carry out tasks on the internet.",-1)),e[29]||(e[29]=t("p",null,"APIs follow the HTTP protocol to communicate, which has a specific request and response structure.",-1)),e[30]||(e[30]=t("p",null,"Different methods exist to perform different tasks and numerous status codes are available that indicate whether the request is successful, declined, or in a pending state.",-1)),t("p",null,[e[22]||(e[22]=o("Interested in connecting on LinkedIn? Hit me up at ")),t("a",T,[e[19]||(e[19]=o("Tooba Jamal (")),a(u,{icon:"fa-brands fa-linkedin"}),e[20]||(e[20]=t("code",null,"tooba-jamal",-1)),e[21]||(e[21]=o(")"))]),e[23]||(e[23]=o("."))]),b(" TODO: add ARTICLE CARD "),a(l,h(p({title:"What is an API and How Does it Work? APIs for Beginners",desc:"When I started learning to code, the term API would always haunt me. I couldn't make sense of what it actually meant because I would hear people talking about APIs in different contexts.  The biggest challenge was that I couldn't find resources to le...",link:"https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-apis-work.html",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16)])}const q=m(k,[["render",x],["__file","how-apis-work.html.vue"]]),D=JSON.parse('{"path":"/freecodecamp.org/how-apis-work.html","title":"What is an API and How Does it Work? APIs for Beginners","lang":"en-US","frontmatter":{"lang":"en-US","title":"What is an API and How Does it Work? APIs for Beginners","description":"Article(s) > What is an API and How Does it Work? APIs for Beginners","icon":"iconfont icon-api","category":["API","Swagger","Article(s)"],"tag":["blog","freecodecamp.org","api","swagger"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is an API and How Does it Work? APIs for Beginners"},{"property":"og:description","content":"What is an API and How Does it Work? APIs for Beginners"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-apis-work.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-apis-work.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is an API and How Does it Work? APIs for Beginners"}],["meta",{"property":"og:description","content":"Article(s) > What is an API and How Does it Work? APIs for Beginners"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/2022/12/api-article.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/2022/12/api-article.png"}],["meta",{"name":"twitter:image:alt","content":"What is an API and How Does it Work? APIs for Beginners"}],["meta",{"property":"article:author","content":"Tooba Jamal"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"api"}],["meta",{"property":"article:tag","content":"swagger"}],["meta",{"property":"article:published_time","content":"2022-12-06T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is an API and How Does it Work? APIs for Beginners\\",\\"image\\":[\\"https://freecodecamp.org/news/content/images/2022/12/unsplash-1.png\\"],\\"datePublished\\":\\"2022-12-06T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Tooba Jamal\\"}]}"]],"prev":"/explore/api/articles/README.md","date":"2022-12-06T00:00:00.000Z","isOriginal":false,"author":"Tooba Jamal","cover":"https://freecodecamp.org/news/content/images/2022/12/api-article.png"},"headers":[{"level":2,"title":"What is an API?","slug":"what-is-an-api","link":"#what-is-an-api","children":[]},{"level":2,"title":"How Do APIs Work?","slug":"how-do-apis-work","link":"#how-do-apis-work","children":[{"level":3,"title":"HTTP methods","slug":"http-methods","link":"#http-methods","children":[]},{"level":3,"title":"HTTP status codes","slug":"http-status-codes","link":"#http-status-codes","children":[]}]},{"level":2,"title":"Types of APIs","slug":"types-of-apis","link":"#types-of-apis","children":[]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":5.59,"words":1678},"filePathRelative":"freecodecamp.org/how-apis-work.md","localizedDate":"December 6, 2022","excerpt":"\\n","copyright":{"author":"Tooba Jamal"}}');export{q as comp,D as data};