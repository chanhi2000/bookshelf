import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as s,as as k,ao as e,at as v,au as g,ap as o,al as i,an as a,aq as p,ar as h}from"./app-CpYYKbnj.js";const f={},b={id:"frontmatter-title-관련",tabindex:"-1"},S={class:"header-anchor",href:"#frontmatter-title-관련"},w={class:"table-of-contents"},y={href:"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format",target:"_blank",rel:"noopener noreferrer"},q={href:"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events",target:"_blank",rel:"noopener noreferrer"},E={href:"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#creating_an_eventsource_instance",target:"_blank",rel:"noopener noreferrer"};function x(r,n){const u=p("VPCard"),t=p("router-link"),c=p("SiteInfo"),l=p("FontIcon");return h(),m("div",null,[s("h1",b,[s("a",S,[s("span",null,k(r.$frontmatter.title)+" 관련",1)])]),e(u,v(g({title:"Go > Article(s)",desc:"Article(s)",link:"/programming/go/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",w,[s("ul",null,[s("li",null,[e(t,{to:"#what-are-server-sent-events"},{default:o(()=>n[0]||(n[0]=[a("What are Server-Sent Events?")])),_:1}),s("ul",null,[s("li",null,[e(t,{to:"#benefits-of-sse"},{default:o(()=>n[1]||(n[1]=[a("Benefits of SSE")])),_:1})])])]),s("li",null,[e(t,{to:"#how-to-implement-sse-in-go"},{default:o(()=>n[2]||(n[2]=[a("How to Implement SSE in Go")])),_:1}),s("ul",null,[s("li",null,[e(t,{to:"#key-components-of-the-sse-implementation"},{default:o(()=>n[3]||(n[3]=[a("Key Components of the SSE Implementation")])),_:1})]),s("li",null,[e(t,{to:"#how-to-receive-the-events-on-the-client-side"},{default:o(()=>n[4]||(n[4]=[a("How to Receive the Events on the Client Side")])),_:1})])])]),s("li",null,[e(t,{to:"#best-practices-for-sse-in-golang"},{default:o(()=>n[5]||(n[5]=[a("Best Practices for SSE in Golang")])),_:1}),s("ul",null,[s("li",null,[e(t,{to:"#event-formatting"},{default:o(()=>n[6]||(n[6]=[a("Event Formatting")])),_:1})]),s("li",null,[e(t,{to:"#reconnection-strategy-and-error-handling"},{default:o(()=>n[7]||(n[7]=[a("Reconnection Strategy and Error Handling")])),_:1})]),s("li",null,[e(t,{to:"#load-balancing"},{default:o(()=>n[8]||(n[8]=[a("Load Balancing")])),_:1})])])]),s("li",null,[e(t,{to:"#use-cases-for-sse"},{default:o(()=>n[9]||(n[9]=[a("Use Cases for SSE")])),_:1})]),s("li",null,[e(t,{to:"#conclusion"},{default:o(()=>n[10]||(n[10]=[a("Conclusion")])),_:1})])])]),n[22]||(n[22]=s("hr",null,null,-1)),e(c,{name:"How to Implement Server-Sent Events in Go",desc:"Server-Sent Events (SSE) is a powerful technology that enables real-time, unidirectional communication from servers to clients. In this article, we'll explore how to implement SSE in Go, discussing its benefits, use cases, and providing practical exa...",url:"https://freecodecamp.org/news/how-to-implement-server-sent-events-in-go/",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1724762290560/de9c7afd-2a81-4bd6-aa12-da92a759ebdb.png"}),n[23]||(n[23]=i(`<p>Server-Sent Events (SSE) is a powerful technology that enables real-time, unidirectional communication from servers to clients.</p><p>In this article, we&#39;ll explore how to implement SSE in Go, discussing its benefits, use cases, and providing practical examples. By the end, you should know the basics of building real-time applications with efficient, unidirectional communication.</p><hr><h2 id="what-are-server-sent-events" tabindex="-1"><a class="header-anchor" href="#what-are-server-sent-events"><span>What are Server-Sent Events?</span></a></h2><p>SSE is a web technology that allows servers to push data to clients over a single HTTP connection.</p><p>Unlike WebSockets, SSE is unidirectional, making it simpler to implement and ideal for scenarios where real-time updates from the server are required, but client-to-server communication is not necessary.</p><p>Developing a web application that uses SSE is straightforward. You&#39;ll need a bit of code on the server to stream events to the front-end, but the client side code works almost identically to websockets when it comes to handling incoming events. This is a one-way connection, so you can&#39;t send events from a client to a server.</p><h3 id="benefits-of-sse" tabindex="-1"><a class="header-anchor" href="#benefits-of-sse"><span>Benefits of SSE</span></a></h3><ol><li><strong>Simplicity</strong>: SSE is easier to implement compared to WebSockets.</li><li><strong>Native browser support</strong>: Most modern browsers support SSE out of the box.</li><li><strong>Automatic reconnection</strong>: Clients automatically attempt to reconnect if the connection is lost.</li><li><strong>Efficient</strong>: Uses a single HTTP connection, reducing overhead.</li></ol><hr><h2 id="how-to-implement-sse-in-go" tabindex="-1"><a class="header-anchor" href="#how-to-implement-sse-in-go"><span>How to Implement SSE in Go</span></a></h2><p>For our example here, we&#39;ll create a simple SSE server in Go which just sends the data to the client every second with a current timestamp. The client can then connect to our server on port 8080 and receive these messages.</p><p>A real example could be something more sophisticated like sending notifications, displaying progress bar updates, and so on.</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">&quot;fmt&quot;</span></span>
<span class="line">    <span class="token string">&quot;net/http&quot;</span></span>
<span class="line">    <span class="token string">&quot;time&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sseHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Set http headers required for SSE</span></span>
<span class="line">    w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/event-stream&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Cache-Control&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;no-cache&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Connection&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;keep-alive&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// You may need this locally for CORS requests</span></span>
<span class="line">    w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Allow-Origin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Create a channel for client disconnection</span></span>
<span class="line">    clientGone <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    rc <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewResponseController</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span></span>
<span class="line">    t <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTicker</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">defer</span> t<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token operator">&lt;-</span>clientGone<span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Client disconnected&quot;</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token operator">&lt;-</span>t<span class="token punctuation">.</span>C<span class="token punctuation">:</span></span>
<span class="line">            <span class="token comment">// Send an event to the client</span></span>
<span class="line">            <span class="token comment">// Here we send only the &quot;data&quot; field, but there are few others</span></span>
<span class="line">            <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;data: The time is %s\\n\\n&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>UnixDate<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            err <span class="token operator">=</span> rc<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/events&quot;</span><span class="token punctuation">,</span> sseHandler<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;server is running on :8080&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="key-components-of-the-sse-implementation" tabindex="-1"><a class="header-anchor" href="#key-components-of-the-sse-implementation"><span>Key Components of the SSE Implementation</span></a></h3>`,15)),s("p",null,[n[12]||(n[12]=a("The ")),s("a",y,[e(l,{icon:"fa-brands fa-firefox"}),n[11]||(n[11]=a("event stream"))]),n[13]||(n[13]=a(" is a simple stream of text data which must be encoded using UTF-8. Messages in the event stream are separated by a pair of newline characters – ")),n[14]||(n[14]=s("code",null,"\\n\\n",-1)),n[15]||(n[15]=a(". A colon as the first character of a line is in essence a comment, and is ignored."))]),n[24]||(n[24]=i(`<p>In our server it is done here:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">rc <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewResponseController</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;data: The time is %s\\n\\n&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>UnixDate<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// To make sure that the data is sent immediately</span></span>
<span class="line">rc<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The server that sends events needs to respond using the MIME type <code>text/event-stream</code>. We do it by setting the response header here:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/event-stream&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>You may have noticed that we set few other headers as well. One is to keep the HTTP connection open, and another to bypass CORS:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Cache-Control&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;no-cache&quot;</span><span class="token punctuation">)</span></span>
<span class="line">w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Connection&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;keep-alive&quot;</span><span class="token punctuation">)</span></span>
<span class="line">w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Allow-Origin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And the last important piece is to detect the disconnect. In Go, we&#39;ll receive it as a message in a specified channel:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">clientGone <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>clientGone<span class="token punctuation">:</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Client disconnected&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)),s("p",null,[n[17]||(n[17]=a("Each message received has some combination of the following fields, one per line. In our server we send only the data field which is enough, as other fields are optional. More details ")),s("a",q,[e(l,{icon:"fa-brands fa-firefox"}),n[16]||(n[16]=a("here"))]),n[18]||(n[18]=a("."))]),n[25]||(n[25]=i('<ul><li><strong>event</strong> – a string identifying the type of event described.</li><li><strong>data</strong> – the data field for the message.</li><li><strong>id</strong> – the event ID to set the EventSource object&#39;s last event ID value.</li><li><strong>retry</strong> – the reconnection time.</li></ul><h3 id="how-to-receive-the-events-on-the-client-side" tabindex="-1"><a class="header-anchor" href="#how-to-receive-the-events-on-the-client-side"><span>How to Receive the Events on the Client Side</span></a></h3>',2)),s("p",null,[n[20]||(n[20]=a("On the front end or client side, you will have to use the ")),s("a",E,[e(l,{icon:"fa-brands fa-firefox"}),n[19]||(n[19]=a("EventSource"))]),n[21]||(n[21]=a(" interface. It's a browser API encapsulating Server-Sent Events. In the following example, our browser application receives the events from the server and prints them in a list."))]),n[26]||(n[26]=i(`<div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>list<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/javascript<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        const eventSrc = new EventSource(&quot;http://127.0.0.1:8080/events&quot;);</span>
<span class="line"></span>
<span class="line">        const list = document.getElementById(&quot;list&quot;);</span>
<span class="line"></span>
<span class="line">        eventSrc.onmessage = (event) =&gt; {</span>
<span class="line">            const li = document.createElement(&quot;li&quot;);</span>
<span class="line">            li.textContent = \`message: \${event.data}\`;</span>
<span class="line"></span>
<span class="line">            list.appendChild(li);</span>
<span class="line">        };</span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here is how it may look in your browser:</p><figure><img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2cda643-36a6-4986-8100-76d1d7c3fb33_998x490.png" alt="logs" tabindex="0" loading="lazy"><figcaption>logs</figcaption></figure><hr><h2 id="best-practices-for-sse-in-golang" tabindex="-1"><a class="header-anchor" href="#best-practices-for-sse-in-golang"><span>Best Practices for SSE in Golang</span></a></h2><h3 id="event-formatting" tabindex="-1"><a class="header-anchor" href="#event-formatting"><span>Event Formatting</span></a></h3><p>In a real world project, a simple string of data may not be enough. In these cases, using a structured format like JSON can be a good option to send multiple data fields once. Here&#39;s an example:</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;in_progress&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;completion&quot;</span><span class="token operator">:</span> <span class="token number">51.22</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reconnection-strategy-and-error-handling" tabindex="-1"><a class="header-anchor" href="#reconnection-strategy-and-error-handling"><span>Reconnection Strategy and Error Handling</span></a></h3><p>Something could always go wrong on both sides: the server might reject the connection for some reason or a client might abruptly disconnect.</p><p>In each case, you&#39;ll need to implement a backoff strategy for graceful reconnections. It&#39;s better to miss one message than completely break the event loop.</p><p>In JavaScript, you can check for errors in EventSource and then act accordingly:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">eventSrc<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;EventSource failed:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="load-balancing" tabindex="-1"><a class="header-anchor" href="#load-balancing"><span>Load Balancing</span></a></h3><p>For high-traffic applications, you may consider using a Load Balancer, for example NGINX. If you plan to have many clients connecting to your server, it&#39;s good to test it beforehand by simulating the load from the clients.</p><hr><h2 id="use-cases-for-sse" tabindex="-1"><a class="header-anchor" href="#use-cases-for-sse"><span>Use Cases for SSE</span></a></h2><ol><li>Real-time dashboards</li><li>Live sports scores</li><li>Social media feeds</li><li>Stock market tickers</li><li>Progress indicators for long-running tasks</li></ol><hr><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion</span></a></h2><p>Server-Sent Events provide an efficient and straightforward way to implement real-time, server-to-client communication in Golang applications. By leveraging SSE, developers can create responsive and dynamic web applications with minimal overhead and complexity.</p><p>As you build your SSE-powered applications, remember to consider scalability, error handling, and client-side implementation to ensure a robust and efficient real-time communication system.</p>`,22)),e(c,{name:"packagemain.tech | Alex Pliutau | Substack",desc:"Welcome to packagemain.tech, your one-stop shop for mastering Backend, Cloud, Kubernetes, Microservices, APIs, and more. We'll provide you with hands-on, practical and real-world tutorials that you can use to build your software development skills. Click to read packagemain.tech, a Substack publication with thousands of subscribers.",url:"https://packagemain.tech/",logo:"https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/apple-touch-icon-1024x1024.png",preview:"https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/favicon.ico"})])}const H=d(f,[["render",x],["__file","how-to-implement-server-sent-events-in-go.html.vue"]]),G=JSON.parse('{"path":"/freecodecamp.org/how-to-implement-server-sent-events-in-go.html","title":"How to Implement Server-Sent Events in Go","lang":"en-US","frontmatter":{"lang":"en-US","title":"How to Implement Server-Sent Events in Go","description":"Article(s) > How to Implement Server-Sent Events in Go","icon":"fa-brands fa-golang","category":["Go","Article(s)"],"tag":["blog","freecodecamp.org","go","golang"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to Implement Server-Sent Events in Go"},{"property":"og:description","content":"How to Implement Server-Sent Events in Go"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-server-sent-events-in-go.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-server-sent-events-in-go.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to Implement Server-Sent Events in Go"}],["meta",{"property":"og:description","content":"Article(s) > How to Implement Server-Sent Events in Go"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1724762290560/de9c7afd-2a81-4bd6-aa12-da92a759ebdb.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1724762290560/de9c7afd-2a81-4bd6-aa12-da92a759ebdb.png"}],["meta",{"name":"twitter:image:alt","content":"How to Implement Server-Sent Events in Go"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"go"}],["meta",{"property":"article:tag","content":"golang"}],["meta",{"property":"article:published_time","content":"2024-08-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to Implement Server-Sent Events in Go\\",\\"image\\":[\\"https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2cda643-36a6-4986-8100-76d1d7c3fb33_998x490.png\\"],\\"datePublished\\":\\"2024-08-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/programming/go/articles/README.md","date":"2024-08-28T00:00:00.000Z","isOriginal":false,"cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1724762290560/de9c7afd-2a81-4bd6-aa12-da92a759ebdb.png"},"headers":[{"level":2,"title":"What are Server-Sent Events?","slug":"what-are-server-sent-events","link":"#what-are-server-sent-events","children":[{"level":3,"title":"Benefits of SSE","slug":"benefits-of-sse","link":"#benefits-of-sse","children":[]}]},{"level":2,"title":"How to Implement SSE in Go","slug":"how-to-implement-sse-in-go","link":"#how-to-implement-sse-in-go","children":[{"level":3,"title":"Key Components of the SSE Implementation","slug":"key-components-of-the-sse-implementation","link":"#key-components-of-the-sse-implementation","children":[]},{"level":3,"title":"How to Receive the Events on the Client Side","slug":"how-to-receive-the-events-on-the-client-side","link":"#how-to-receive-the-events-on-the-client-side","children":[]}]},{"level":2,"title":"Best Practices for SSE in Golang","slug":"best-practices-for-sse-in-golang","link":"#best-practices-for-sse-in-golang","children":[{"level":3,"title":"Event Formatting","slug":"event-formatting","link":"#event-formatting","children":[]},{"level":3,"title":"Reconnection Strategy and Error Handling","slug":"reconnection-strategy-and-error-handling","link":"#reconnection-strategy-and-error-handling","children":[]},{"level":3,"title":"Load Balancing","slug":"load-balancing","link":"#load-balancing","children":[]}]},{"level":2,"title":"Use Cases for SSE","slug":"use-cases-for-sse","link":"#use-cases-for-sse","children":[]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":4}]},"readingTime":{"minutes":4.59,"words":1378},"filePathRelative":"freecodecamp.org/how-to-implement-server-sent-events-in-go.md","localizedDate":"August 28, 2024","excerpt":"\\n"}');export{H as comp,G as data};