import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as p,ao as s,at as u,au as m,ap as r,al as g,aq as n,ar as f,an as a}from"./app-CpYYKbnj.js";const T={},b={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},v={class:"table-of-contents"};function O(i,e){const l=n("VPCard"),o=n("router-link"),d=n("SiteInfo");return f(),c("div",null,[t("h1",b,[t("a",w,[t("span",null,p(i.$frontmatter.title)+" 관련",1)])]),s(l,u(m({title:"Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples",desc:"When you interact with websites or apps, a lot happens behind the scenes. A key part of this process is how your browser or app talks to a server. HTTPS methods define what action needs to happen – it could be fetching data, sending information, or m...",link:"/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),t("nav",v,[t("ul",null,[t("li",null,[s(o,{to:"#retrieving-supported-methods"},{default:r(()=>e[0]||(e[0]=[a("Retrieving Supported Methods")])),_:1})]),t("li",null,[s(o,{to:"#how-options-is-used-in-cross-origin-resource-sharing-cors"},{default:r(()=>e[1]||(e[1]=[a("How OPTIONS is Used in Cross-Origin Resource Sharing (CORS)")])),_:1}),t("ul",null,[t("li",null,[s(o,{to:"#cors-and-preflight-requests"},{default:r(()=>e[2]||(e[2]=[a("CORS and Preflight Requests")])),_:1})]),t("li",null,[s(o,{to:"#simplified-workflow"},{default:r(()=>e[3]||(e[3]=[a("Simplified Workflow:")])),_:1})])])]),t("li",null,[s(o,{to:"#use-cases-for-the-options-method"},{default:r(()=>e[4]||(e[4]=[a("Use Cases for the OPTIONS Method")])),_:1})])])]),e[5]||(e[5]=t("hr",null,null,-1)),s(d,{name:"Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples",desc:"When you interact with websites or apps, a lot happens behind the scenes. A key part of this process is how your browser or app talks to a server. HTTPS methods define what action needs to happen – it could be fetching data, sending information, or m...",url:"https://freecodecamp.org/news/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"}),e[6]||(e[6]=g(`<p>The OPTIONS method is used to find out what actions are allowed on a specific resource. It allows a client (like a browser or an API) to ask the server, &quot;What operations can I perform on this resource?&quot; In response, the server lists the HTTP methods it supports for that resource, such as GET, POST, PUT, DELETE, and so on.</p><p>OPTIONS doesn’t perform any operation on the resource itself. Instead, it provides information about what the client can do. This makes it useful when you want to check what actions are allowed before actually making a request that changes or retrieves data.</p><p>For example, if you’re working with an API and want to see if it supports a DELETE method on a particular endpoint, you can send an OPTIONS request to get that information without affecting the resource.</p><hr><h2 id="retrieving-supported-methods" tabindex="-1"><a class="header-anchor" href="#retrieving-supported-methods"><span>Retrieving Supported Methods</span></a></h2><ol><li><strong>Sending an OPTIONS Request</strong>: The client sends an OPTIONS request to a server, typically targeting a specific URL. This request serves as an inquiry about what actions are permitted on the resource at that endpoint.</li><li><strong>Server’s Response</strong>: The server responds with an <code>Allow</code> header that lists the available HTTP methods for the resource. For example, it might return <code>Allow: GET, POST, DELETE</code>, meaning those methods can be used.</li><li><strong>Testing for Methods</strong>: If you&#39;re unsure whether a particular method (like PATCH or DELETE) is supported by a server, you can send an OPTIONS request first to check. This avoids attempting methods that the server doesn’t support, which could result in errors.</li></ol><div class="hint-container info"><p class="hint-container-title">Example:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">OPTIONS /api/resource HTTP/1.1</span>
<span class="line">Host: example.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Server Response:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">HTTP/1.1 200 OK</span>
<span class="line">Allow: GET, POST, DELETE</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></div><hr><h2 id="how-options-is-used-in-cross-origin-resource-sharing-cors" tabindex="-1"><a class="header-anchor" href="#how-options-is-used-in-cross-origin-resource-sharing-cors"><span>How OPTIONS is Used in Cross-Origin Resource Sharing (CORS)</span></a></h2><p>One of the most common uses of the OPTIONS method is in handling <strong>Cross-Origin Resource Sharing (CORS)</strong>. CORS is a security feature that ensures resources on one domain aren’t accessed improperly by web pages from another domain.</p><h3 id="cors-and-preflight-requests" tabindex="-1"><a class="header-anchor" href="#cors-and-preflight-requests"><span>CORS and Preflight Requests</span></a></h3><p>When a browser needs to make a cross-origin request (for example, a request from <code>domainA.com</code> to <code>api.domainB.com</code>), the browser first sends an <strong>OPTIONS request</strong>, known as a <strong>preflight request</strong>, to the target server. The preflight request checks whether the actual request is allowed under the server’s CORS policy.</p><h4 id="_1-preflight-request" tabindex="-1"><a class="header-anchor" href="#_1-preflight-request"><span>1. Preflight Request</span></a></h4><p>The browser sends an OPTIONS request before the actual request (such as a POST or PUT). This request asks the server which methods are allowed, which domains can access the resource, and whether specific headers or credentials are permitted.</p><h4 id="_2-server-s-response" tabindex="-1"><a class="header-anchor" href="#_2-server-s-response"><span>2. Server’s Response</span></a></h4><p>The server responds with CORS headers, such as <code>Access-Control-Allow-Methods</code>, <code>Access-Control-Allow-Origin</code>, and <code>Access-Control-Allow-Headers</code>. This tells the browser whether the request can proceed and what methods or domains are allowed.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Example Response:</span>
<span class="line"></span>
<span class="line">    HTTP/1.1 204 No Content</span>
<span class="line">    Access-Control-Allow-Origin: https://domainA.com</span>
<span class="line">    Access-Control-Allow-Methods: GET, POST</span>
<span class="line">    Access-Control-Allow-Headers: Content-Type</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-ensuring-security" tabindex="-1"><a class="header-anchor" href="#_3-ensuring-security"><span>3. Ensuring Security</span></a></h4><p>CORS and the preflight OPTIONS request ensure that cross-origin requests are only allowed when the server permits it. Without this security step, websites could make unauthorized requests to other domains.</p><h4 id="_4-handling-complex-requests" tabindex="-1"><a class="header-anchor" href="#_4-handling-complex-requests"><span>4. Handling Complex Requests</span></a></h4><p>If a request includes custom headers, uses HTTP methods other than simple ones like GET or POST, or sends credentials like cookies, the browser automatically sends an OPTIONS preflight request. If the server denies the request (that is, returns headers disallowing the action), the browser blocks the request.</p><h3 id="simplified-workflow" tabindex="-1"><a class="header-anchor" href="#simplified-workflow"><span>Simplified Workflow:</span></a></h3><ul><li><strong>Browser</strong>: &quot;Can I make this request to <code>api.domainB.com</code>?&quot;</li><li><strong>Server</strong>: &quot;Yes, you can use <code>GET</code> and <code>POST</code>, but only from <code>domainA.com</code> and with these headers.&quot;</li><li><strong>Browser</strong>: Proceeds with the actual request if the response permits.</li></ul><hr><h2 id="use-cases-for-the-options-method" tabindex="-1"><a class="header-anchor" href="#use-cases-for-the-options-method"><span>Use Cases for the OPTIONS Method</span></a></h2><ul><li><strong>Discovering Available Methods</strong>: Useful for developers to check which HTTP methods a resource supports before performing an operation.</li><li><strong>CORS Preflight</strong>: Critical in web security to ensure that cross-origin requests are properly authorized.</li><li><strong>Improving API Efficiency</strong>: APIs can expose the supported methods for a resource via OPTIONS, making it easier for clients to understand what operations can be performed.</li></ul><p>The OPTIONS method is thus essential in web applications for managing request permissions and improving security, particularly in cross-domain scenarios.</p>`,27))])}const k=h(T,[["render",O],["__file","options-method.html.vue"]]),y=JSON.parse('{"path":"/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/options-method.html","title":"OPTIONS Method","lang":"en-US","frontmatter":{"lang":"en-US","title":"OPTIONS Method","description":"Article(s) > (7/9) Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples","category":["JavaScript","Article(s)"],"tag":["blog","freecodecamp.org","js","javascript"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > (7/9) Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples"},{"property":"og:description","content":"OPTIONS Method"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/options-method.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/options-method.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"OPTIONS Method"}],["meta",{"property":"og:description","content":"Article(s) > (7/9) Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"}],["meta",{"name":"twitter:image:alt","content":"OPTIONS Method"}],["meta",{"property":"article:author","content":"Ashutosh Krishna"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:tag","content":"javascript"}],["meta",{"property":"article:published_time","content":"2024-10-02T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OPTIONS Method\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png\\"],\\"datePublished\\":\\"2024-10-02T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ashutosh Krishna\\"}]}"]],"date":"2024-10-02T00:00:00.000Z","isOriginal":false,"author":"Ashutosh Krishna","cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"},"headers":[{"level":2,"title":"Retrieving Supported Methods","slug":"retrieving-supported-methods","link":"#retrieving-supported-methods","children":[]},{"level":2,"title":"How OPTIONS is Used in Cross-Origin Resource Sharing (CORS)","slug":"how-options-is-used-in-cross-origin-resource-sharing-cors","link":"#how-options-is-used-in-cross-origin-resource-sharing-cors","children":[{"level":3,"title":"CORS and Preflight Requests","slug":"cors-and-preflight-requests","link":"#cors-and-preflight-requests","children":[]},{"level":3,"title":"Simplified Workflow:","slug":"simplified-workflow","link":"#simplified-workflow","children":[]}]},{"level":2,"title":"Use Cases for the OPTIONS Method","slug":"use-cases-for-the-options-method","link":"#use-cases-for-the-options-method","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3.22,"words":967},"filePathRelative":"freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/options-method.md","localizedDate":"October 2, 2024","excerpt":"\\n","copyright":{"author":"Ashutosh Krishna"}}');export{k as comp,y as data};