import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as t,as as g,ao as o,at as m,au as f,ap as i,al as l,an as n,aq as a,ar as b}from"./app-CpYYKbnj.js";const v={},y={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},P={class:"table-of-contents"},A={href:"https://cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://openapis.org/",target:"_blank",rel:"noopener noreferrer"},T={href:"https://linkedin.com/in/abaradwaj/",target:"_blank",rel:"noopener noreferrer"};function k(d,e){const p=a("VPCard"),s=a("router-link"),c=a("SiteInfo"),r=a("FontIcon");return b(),u("div",null,[t("h1",y,[t("a",w,[t("span",null,g(d.$frontmatter.title)+" 관련",1)])]),o(p,m(f({title:"System Design > Article(s)",desc:"Article(s)",link:"/academics/system-design/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t("nav",P,[t("ul",null,[t("li",null,[o(s,{to:"#what-is-a-web-api"},{default:i(()=>e[0]||(e[0]=[n("What is a Web API?")])),_:1})]),t("li",null,[o(s,{to:"#approaches-to-developing-web-apis"},{default:i(()=>e[1]||(e[1]=[n("Approaches to Developing Web APIs")])),_:1})]),t("li",null,[o(s,{to:"#understanding-the-requirements-and-objectives"},{default:i(()=>e[2]||(e[2]=[n("Understanding the Requirements and Objectives")])),_:1})]),t("li",null,[o(s,{to:"#defining-the-resources-and-endpoints"},{default:i(()=>e[3]||(e[3]=[n("Defining the Resources and Endpoints")])),_:1})]),t("li",null,[o(s,{to:"#using-http-methods-and-status-codes"},{default:i(()=>e[4]||(e[4]=[n("Using HTTP Methods and Status Codes")])),_:1})]),t("li",null,[o(s,{to:"#versioning-strategies"},{default:i(()=>e[5]||(e[5]=[n("Versioning Strategies")])),_:1})]),t("li",null,[o(s,{to:"#security-considerations"},{default:i(()=>e[6]||(e[6]=[n("Security Considerations")])),_:1})]),t("li",null,[o(s,{to:"#documentation"},{default:i(()=>e[7]||(e[7]=[n("Documentation")])),_:1})]),t("li",null,[o(s,{to:"#sorting-filtering-and-pagination-strategies"},{default:i(()=>e[8]||(e[8]=[n("Sorting, Filtering and Pagination Strategies")])),_:1})]),t("li",null,[o(s,{to:"#monitoring-usage-logging-and-health"},{default:i(()=>e[9]||(e[9]=[n("Monitoring Usage, Logging, and Health")])),_:1})]),t("li",null,[o(s,{to:"#conclusion"},{default:i(()=>e[10]||(e[10]=[n("Conclusion")])),_:1})])])]),e[22]||(e[22]=t("hr",null,null,-1)),o(c,{name:"How to Design and Develop Web APIs: Essential Guidelines for Developers",desc:"Software applications have made our lives easier and better in many ways. We use them almost daily, and some people find themselves using applications more frequently than they interact with other people. But how do applications interact with each ot...",url:"https://freecodecamp.org/how-to-design-and-develop-web-apis-essential-guidelines",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ZM55FiQB8ig/upload/709f2a6f6de426904c95b785196f8736.jpeg"}),e[23]||(e[23]=l('<p>Software applications have made our lives easier and better in many ways. We use them almost daily, and some people find themselves using applications more frequently than they interact with other people.</p><p>But how do applications interact with each other? Well, they do it through APIs – Application Programming Interfaces. In this article, you’ll learn what APIs are. We’ll specifically focus on Web APIs and their design and development.</p><hr><h2 id="what-is-a-web-api" tabindex="-1"><a class="header-anchor" href="#what-is-a-web-api"><span>What is a Web API?</span></a></h2><p>Web APIs are a type of API designed to be used over the web. In other words, web-based software applications, systems, and services use Web APIs to exchange information over the internet. They send requests and receive responses, typically in formats such as JSON or XML.</p><p>Web APIs play a crucial role in modern software development for the following reasons:</p><ol><li><strong>Interoperability</strong>: APIs are technology-agnostic, meaning they allow different software systems to communicate with each other regardless of the technology stack. This enables developers to integrate various applications seamlessly.</li><li><strong>Scalability</strong>: Web APIs support modular development, enabling different components of an application to be built, debugged, and scaled independently. This greatly improves the system&#39;s scalability.</li><li><strong>Flexibility and Extensibility</strong>: By following standard practices and well-defined rules, Web APIs help applications extend their functionality. They are also flexible enough to allow developers to create dynamic applications.</li></ol><hr><h2 id="approaches-to-developing-web-apis" tabindex="-1"><a class="header-anchor" href="#approaches-to-developing-web-apis"><span>Approaches to Developing Web APIs</span></a></h2><p>Web APIs can be developed using various methods based on the requirements. Here are some commonly followed approaches:</p><ul><li><strong>REST</strong>: Representational State Transfer (REST) APIs use the HTTP protocol to perform operations. They operate in a stateless manner, meaning each request must include all the necessary information for the receiver to process and respond.</li><li><strong>SOAP</strong>: Simple Object Access Protocol uses XML to exchange information in a structured way.</li><li><strong>GraphQL</strong>: used for querying and manipulating APIs.</li><li><strong>gRPC</strong>: a Remote Procedure Call framework that uses HTTP/2 for transporting information.</li></ul><p>In the upcoming sections, we will explore the design and development of APIs, focusing on REST APIs as the protocol central to our discussion.</p><hr><h2 id="understanding-the-requirements-and-objectives" tabindex="-1"><a class="header-anchor" href="#understanding-the-requirements-and-objectives"><span>Understanding the Requirements and Objectives</span></a></h2><p>In any software development process, it&#39;s crucial to understand the requirements and intended use-case before starting. This helps you plan and estimate the cost, time, and other resources you’ll need for the project.</p><p>The same applies when building RESTful APIs. You need to determine if the applications will exchange information in a stateless manner, if the entities involved can be represented as resources, and if the services are flexible enough to work with different data formats.</p><hr><h2 id="defining-the-resources-and-endpoints" tabindex="-1"><a class="header-anchor" href="#defining-the-resources-and-endpoints"><span>Defining the Resources and Endpoints</span></a></h2><p>REST APIs revolve around <em>resources</em>, which are entities representing the data or objects in the system. Each resource is identified by a unique URI called a <em>resource identifier</em>. These resources can be accessed and manipulated via <em>endpoints</em>, which are specific URLs that receive and process requests from the client.</p><p>Best practices suggest using nouns for resources in the endpoints instead of verbs that might indicate an operation on the resource.</p><p>Consider the following example: <code>https://api.example.com/products</code></p><p>The endpoint follows the best practice of using a noun for the resource (in this case, <code>products</code>). Notice how I used the plural form - products? It is also advisable to use plurals if you are working with a collection of objects.</p><p>However, the following endpoint <code>https://api.example.com/add-product</code> is not recommended because it uses a verb and tries to describe an action on the resource. This approach can become complicated for more complex operations.</p><p>Another important aspect of standard endpoint naming convention is using a hierarchical structure. This helps to clearly represent the relationship between resources.</p><p>For example: <code>https://api.example.com/categories/{categoryId}/products/{productId}</code>.<br> Here, we define an endpoint that maintains a clear hierarchy between the <code>category</code> and <code>product</code> resources.</p><hr><h2 id="using-http-methods-and-status-codes" tabindex="-1"><a class="header-anchor" href="#using-http-methods-and-status-codes"><span>Using HTTP Methods and Status Codes</span></a></h2>',27)),t("p",null,[e[12]||(e[12]=n("In REST APIs, ")),t("a",A,[o(r,{icon:"fa-brands fa-cloudflare"}),e[11]||(e[11]=n("HTTP"))]),e[13]||(e[13]=n(" is used for communication between the client and the server. HTTP has standard methods that are primarily used to perform operations on resources. Below is a list of these methods along with their purposes:"))]),e[24]||(e[24]=l('<ul><li><code>GET</code>: Fetch the details of the resource. These details are returned by the server in the response message body.</li><li><code>POST</code>: Create a new resource. The details of the resource to be created are sent in the request message body.</li><li><code>PUT</code>: Create or update a resource, depending on its availability. The details of the resource to be created or updated are sent in the request message body.</li><li><code>DELETE</code>: Remove a resource.</li><li><code>PATCH</code>: Partially update a resource. The changes to be made to the resource are sent in the request message body.</li></ul><p>The recommended approach to developing a well-defined REST API is to use these HTTP methods correctly for performing the corresponding CRUD (Create, Read, Update, Delete) operations on the resource. Also, you should make sure that the API responds back to the client with an appropriate HTTP status code in the response message body.</p><p>Status codes reflect the end result of a request. Below are some of the common HTTP status codes you can use:</p><ul><li><code>200</code> OK</li><li><code>201</code> Created</li><li><code>204</code> No Content</li><li><code>400</code> Bad Request</li><li><code>401</code> Unauthorized</li><li><code>403</code> Forbidden</li><li><code>404</code> Not Found</li><li><code>500</code> Internal Server Error</li><li><code>503</code> Service Unavailable</li><li><code>504</code> Gateway Timeout</li></ul><p>Use a suitable HTTP status code that accurately represents the outcome of the request your API endpoint is processing. You can also implement custom HTTP status code to describe application-specific behavior.</p><hr><h2 id="versioning-strategies" tabindex="-1"><a class="header-anchor" href="#versioning-strategies"><span>Versioning Strategies</span></a></h2><p>Over time, the API you develop will evolve, and you will make changes to it. This is where versioning strategies become important. You must ensure that the clients already using your APIs are not affected by the changes you make.</p><p>Maintaining different versions will make your APIs backward compatible and allow clients to use the preferred version of the API based on their needs. An excerpt from this <a href="https://postman.com/api-platform/api-versioning/" target="_blank" rel="noopener noreferrer">informative blog on the Postman website</a> explains when it is ideal to version your APIs:</p><blockquote><p>“You should version your API whenever you make a change that will require consumers to modify their codebase in order to continue using the API. This type of change is known as a “breaking change,” and it can be made to an API&#39;s input and output data structures, success and error feedback, and security mechanisms.“</p></blockquote><p>API versioning can be done in different ways. Here are some methods:</p><ul><li><strong>URI Versioning</strong>: Include the version number in the URL path. For example, <a href="https://api.example.com/v1/products" target="_blank" rel="noopener noreferrer"><code>https://api.example.com/v1/products</code></a>.</li><li><strong>Query Parameter Versioning</strong>: Specify the version number as a query parameter in the URL. For example, <a href="https://api.example.com/products?version=1" target="_blank" rel="noopener noreferrer"><code>https://api.example.com/products?version=1</code></a>.</li><li><strong>Header Versioning</strong>: Include the version number in the HTTP headers of the request. For example, using a custom header like <code>X-API-Version: 1</code>.</li><li><strong>Content Negotiation</strong>: Specify the version in the <code>Accept</code> header of the request, often using media types. For example, <code>Accept: application/vnd.example.v1+json</code>.</li><li><strong>Embedded Versioning</strong>: Embed the version number within the media type of the response. For example, <code>application/vnd.example.product-v1+json</code>.</li></ul><hr><h2 id="security-considerations" tabindex="-1"><a class="header-anchor" href="#security-considerations"><span>Security Considerations</span></a></h2><p>Another important aspect to consider when developing an API is security. Here are some key points to remember:</p><ol><li>Implement HTTPS to encrypt the information exchanged between the client and the server.</li><li>Implement authentication and authorization to ensure that only users with the right privileges can perform operations on the resources. Common methods include Basic authentication, Bearer or Token authentication, JWT, and OAuth 2.0. Also, implement role-based access control to manage resource access.</li><li>Implement input validation and sanitization to prevent vulnerability attacks like SQL injection and Cross-Site Scripting (XSS).</li><li>Implement rate limiting and throttling to control the number of requests a client can make to the server within a specific time frame. This helps prevent excessive load on the server.</li></ol><hr><h2 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation"><span>Documentation</span></a></h2><p>One key but often overlooked aspect of API development is documentation. It is crucial to document your API so users understand its features and functionalities.</p>',19)),t("p",null,[e[15]||(e[15]=n("The documentation must be comprehensive, easy to understand, and follow standard practices. Include examples of request and response bodies, HTTP status codes used, and more. You can follow the ")),t("a",I,[o(r,{icon:"fas fa-globe"}),e[14]||(e[14]=n("Open API specification"))]),e[16]||(e[16]=n(" for describing your RESTful APIs."))]),e[25]||(e[25]=l('<hr><h2 id="sorting-filtering-and-pagination-strategies" tabindex="-1"><a class="header-anchor" href="#sorting-filtering-and-pagination-strategies"><span>Sorting, Filtering and Pagination Strategies</span></a></h2><p>The API you develop might cause performance issues if it returns too many records. It&#39;s inefficient to retrieve large amounts of data and then sort or filter it.</p><p>To address this, you should enable sorting and filtering of records. You should also implement pagination to break down the number of records being fetched and set a limit for easier navigation and processing.</p><hr><h2 id="monitoring-usage-logging-and-health" tabindex="-1"><a class="header-anchor" href="#monitoring-usage-logging-and-health"><span>Monitoring Usage, Logging, and Health</span></a></h2><p>It’s a good idea to log your API requests and responses to help with debugging. Monitoring API usage will help you understand the overall performance and behavior of the application. Performing regular health checks can help you take necessary action if there are any issues. All these steps will make the API more robust and reliable.</p><hr><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion</span></a></h2><p>APIs, specifically Web APIs, are essential for software applications to communicate over the internet.</p><p>This article explained what Web APIs are, why they’re important, and different approaches for developing them, focusing on REST APIs. You also learned about key topics like defining resources and endpoints, using standard HTTP methods and status codes, versioning strategies, security considerations, documentation, and more.</p>',11)),t("p",null,[e[20]||(e[20]=n("If you found this article interesting, feel free to check out my other articles on freeCodeCamp and connect with me on ")),t("a",T,[e[17]||(e[17]=n("LinkedIn (")),o(r,{icon:"fa-brands fa-linkedin"}),e[18]||(e[18]=t("code",null,"abaradwaj",-1)),e[19]||(e[19]=n(")"))]),e[21]||(e[21]=n("."))])])}const D=h(v,[["render",k],["__file","how-to-design-and-develop-web-apis-essential-guidelines.html.vue"]]),E=JSON.parse('{"path":"/freecodecamp.org/how-to-design-and-develop-web-apis-essential-guidelines.html","title":"How to Design and Develop Web APIs: Essential Guidelines for Developers","lang":"en-US","frontmatter":{"lang":"en-US","title":"How to Design and Develop Web APIs: Essential Guidelines for Developers","description":"Article(s) > How to Design and Develop Web APIs: Essential Guidelines for Developers","icon":"fas fa-pen-ruler","category":["Design","System","Article(s)"],"tag":["blog","freecodecamp.org","design","system"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to Design and Develop Web APIs: Essential Guidelines for Developers"},{"property":"og:description","content":"How to Design and Develop Web APIs: Essential Guidelines for Developers"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-and-develop-web-apis-essential-guidelines.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-and-develop-web-apis-essential-guidelines.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to Design and Develop Web APIs: Essential Guidelines for Developers"}],["meta",{"property":"og:description","content":"Article(s) > How to Design and Develop Web APIs: Essential Guidelines for Developers"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ZM55FiQB8ig/upload/709f2a6f6de426904c95b785196f8736.jpeg"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ZM55FiQB8ig/upload/709f2a6f6de426904c95b785196f8736.jpeg"}],["meta",{"name":"twitter:image:alt","content":"How to Design and Develop Web APIs: Essential Guidelines for Developers"}],["meta",{"property":"article:author","content":"Anjan Baradwaj"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"design"}],["meta",{"property":"article:tag","content":"system"}],["meta",{"property":"article:published_time","content":"2024-10-07T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to Design and Develop Web APIs: Essential Guidelines for Developers\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ZM55FiQB8ig/upload/709f2a6f6de426904c95b785196f8736.jpeg\\"],\\"datePublished\\":\\"2024-10-07T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Anjan Baradwaj\\"}]}"]],"prev":"/academics/system-design/articles/README.md","date":"2024-10-07T00:00:00.000Z","isOriginal":false,"author":"Anjan Baradwaj","cover":"https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ZM55FiQB8ig/upload/709f2a6f6de426904c95b785196f8736.jpeg"},"headers":[{"level":2,"title":"What is a Web API?","slug":"what-is-a-web-api","link":"#what-is-a-web-api","children":[]},{"level":2,"title":"Approaches to Developing Web APIs","slug":"approaches-to-developing-web-apis","link":"#approaches-to-developing-web-apis","children":[]},{"level":2,"title":"Understanding the Requirements and Objectives","slug":"understanding-the-requirements-and-objectives","link":"#understanding-the-requirements-and-objectives","children":[]},{"level":2,"title":"Defining the Resources and Endpoints","slug":"defining-the-resources-and-endpoints","link":"#defining-the-resources-and-endpoints","children":[]},{"level":2,"title":"Using HTTP Methods and Status Codes","slug":"using-http-methods-and-status-codes","link":"#using-http-methods-and-status-codes","children":[]},{"level":2,"title":"Versioning Strategies","slug":"versioning-strategies","link":"#versioning-strategies","children":[]},{"level":2,"title":"Security Considerations","slug":"security-considerations","link":"#security-considerations","children":[]},{"level":2,"title":"Documentation","slug":"documentation","link":"#documentation","children":[]},{"level":2,"title":"Sorting, Filtering and Pagination Strategies","slug":"sorting-filtering-and-pagination-strategies","link":"#sorting-filtering-and-pagination-strategies","children":[]},{"level":2,"title":"Monitoring Usage, Logging, and Health","slug":"monitoring-usage-logging-and-health","link":"#monitoring-usage-logging-and-health","children":[]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":5.99,"words":1798},"filePathRelative":"freecodecamp.org/how-to-design-and-develop-web-apis-essential-guidelines.md","localizedDate":"October 7, 2024","excerpt":"\\n","copyright":{"author":"Anjan Baradwaj"}}');export{D as comp,E as data};