import{_ as k}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as v,am as e,as as y,ao as a,at as r,au as d,ap as s,al as u,aq as p,ar as f,an as t}from"./app-CpYYKbnj.js";const b={},w={id:"frontmatter-title-관련",tabindex:"-1"},x={class:"header-anchor",href:"#frontmatter-title-관련"},R={class:"table-of-contents"};function S(m,n){const c=p("VPCard"),o=p("router-link"),g=p("SiteInfo"),h=p("Tabs");return f(),v("div",null,[e("h1",w,[e("a",x,[e("span",null,y(m.$frontmatter.title)+" 관련",1)])]),a(c,r(d({title:"The React Interview Prep Handbook – Essential Topics and Code Examples",desc:"Hi everyone! In the ever-changing landscape of web development, React is in very high demand. Companies are often seeking skilled React developers to build dynamic and engaging web applications. If you are a web developer or aspiring to be one, it's ...",link:"/freecodecamp.org/react-interview-prep-handbook/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),e("nav",R,[e("ul",null,[e("li",null,[a(o,{to:"#why-not-use-index-as-keys-while-rendering-lists"},{default:s(()=>n[0]||(n[0]=[t("Why not Use Index as Keys while Rendering Lists?")])),_:1})]),e("li",null,[a(o,{to:"#higher-order-components"},{default:s(()=>n[1]||(n[1]=[t("Higher Order Components")])),_:1})]),e("li",null,[a(o,{to:"#lazy-loading"},{default:s(()=>n[2]||(n[2]=[t("Lazy Loading")])),_:1})]),e("li",null,[a(o,{to:"#difference-between-client-side-and-server-side-rendering"},{default:s(()=>n[3]||(n[3]=[t("Difference Between Client-side and Server-side Rendering")])),_:1})])])]),n[8]||(n[8]=e("hr",null,null,-1)),a(g,{name:"The React Interview Prep Handbook – Essential Topics and Code Examples",desc:"Hi everyone! In the ever-changing landscape of web development, React is in very high demand. Companies are often seeking skilled React developers to build dynamic and engaging web applications. If you are a web developer or aspiring to be one, it's ...",url:"https://freecodecamp.org/news/react-interview-prep-handbook#heading-additional-concepts",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"}),n[9]||(n[9]=u(`<p>Here are some additional concepts that can be helpful:</p><hr><h2 id="why-not-use-index-as-keys-while-rendering-lists" tabindex="-1"><a class="header-anchor" href="#why-not-use-index-as-keys-while-rendering-lists"><span>Why not Use Index as Keys while Rendering Lists?</span></a></h2><p>When you render lists in React using the <code>Array.map</code> method, you are asked to provide a unique <code>key</code> prop to each item being rendered. This key is used to distinguish elements from each other.</p><p>Indices are unique, so it&#39;s tempting to use them as keys for simplicity. However, indices of elements are not stable.</p><p>Elements often get added or deleted in an array. The order of elements could get changed too. In these cases, value of <code>key</code> prop changes and may lead to unpredictable behavior.</p><p>Let&#39;s consider the following list:</p><div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx" data-title="jsx"><pre><code><span class="line"><span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Item A&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Item B&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Item C&#39;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">    </span><span class="token punctuation">{</span>items<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">        </span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text"></span>
<span class="line">  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Each rendered item in the list has its index as the key. If we delete <code>Item B</code> from the list, the references of the other elements get changed.</p><p>React uses keys to uniquely identify list elements, so that rendering them becomes easier. React often re-uses these elements for quick renders. However, if an element gets deleted, the keys of all subsequent elements are updated.</p><p>React may reuse the deleted key or render the entire list again which could lead to performance issues. Instead of indices, choose something unique, preferably username, email or an ID generated by database.</p><hr><h2 id="higher-order-components" tabindex="-1"><a class="header-anchor" href="#higher-order-components"><span>Higher Order Components</span></a></h2><p>A higher order component (HOC) is a function that takes a component as an argument and returns a new component that wraps the original one. HOCs allow you to provide additional functionality to a component as well as re-use it across multiple components.</p><p>Rather than providing a short explanation here, I would recommend the following article that explains HOCs with various examples:</p>`,15)),a(c,r(d({title:"How to Use Higher-Order Components in React",desc:"Higher-order components (HOCs) are a powerful feature of the React library. They allow you to reuse component logic across multiple components.  In React, a higher-order component is a function that takes a component as an argument and returns a new ...",link:"/freecodecamp.org/higher-order-components-in-react.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),n[10]||(n[10]=u(`<hr><h2 id="lazy-loading" tabindex="-1"><a class="header-anchor" href="#lazy-loading"><span>Lazy Loading</span></a></h2><p>Lazy loading is a web development pattern that delays the loading of resources like images, videos, or non-essential components. It helps web pages load faster by first loading the content necessary for interaction, and then loading the rest of the content.</p><p>One example of lazy loading is an E-commerce product catalog page. The page first loads the names and prices of products and clickable elements. Then, it loads the images and other UI elements.</p><p>In React, lazy loading can be implemented using <code>React.lazy()</code> and <code>Suspense</code>:</p><div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx" data-title="jsx"><pre><code><span class="line"><span class="token keyword">const</span> LazyComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./LazyComponent&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Showing lazy component below</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Loading...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LazyComponent</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Suspense</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Once you have identified a component to lazy load, use the <code>React.lazy()</code> function to dynamically import the lazy component.</li><li>Wrap the lazy-loaded component inside <code>Suspense</code>. It renders a fallback (default) component till the lazy component loads.</li></ul><p>This way, you can load a React component on demand. This is also known as code splitting**.** The code is split and some part of the React code is loaded dynamically when needed.</p><p>Code splitting optimizes the performance of React applications that have large, complex components. By using <code>Suspense</code>, you can display a temporary UI to the user, so they don&#39;t have to stare at a blank screen while a component is loading.</p><p>Code splitting breaks your application into several chunks, with each chunk being loaded independently. So, this process is also known as chunking**.**</p><hr><h2 id="difference-between-client-side-and-server-side-rendering" tabindex="-1"><a class="header-anchor" href="#difference-between-client-side-and-server-side-rendering"><span>Difference Between Client-side and Server-side Rendering</span></a></h2><p>There are two ways to render webpages in React. Let&#39;s have a look:</p>`,13)),a(h,{id:"91",data:[{id:"Server Side Rendering (SSR)"},{id:"Client Side Rendering (CSR)"}],active:0},{title0:s(({value:i,isActive:l})=>n[4]||(n[4]=[t("Server Side Rendering (SSR)")])),title1:s(({value:i,isActive:l})=>n[5]||(n[5]=[t("Client Side Rendering (CSR)")])),tab0:s(({value:i,isActive:l})=>n[6]||(n[6]=[e("ul",null,[e("li",null,"Web Page is generated and rendered on the server before sending to the client. Client receives complete web page from the server and displays it directly to the user."),e("li",null,"Loading the prepared HTML helps with faster loading times, improving the user experience. This is especially beneficial for users with slower internet connections."),e("li",null,"Since the web page is already prepared, it helps search engines better index your website, making it more SEO-friendly."),e("li",null,"SSR can increase server load if the page is updated frequently. Pages with dynamic content can take longer to update because they need to re-render often."),e("li",null,"SSR is used for marketing, blogging and news websites where initial load times and SEO are important.")],-1)])),tab1:s(({value:i,isActive:l})=>n[7]||(n[7]=[e("ul",null,[e("li",null,"A basic HTML file is sent to the client, and then it renders dynamic content using JavaScript."),e("li",null,"Initial load times are slower because preparing and rendering the content mostly happens on the client side."),e("li",null,"Since it initially renders basic HTML and adds JavaScript content later, search engines may not be able to index your content, making it less SEO-friendly."),e("li",null,"For web pages with dynamic content, rendering times are faster since all the rendering happens on client side."),e("li",null,"CSR is used for websites with dynamic content and frequent user interactions like social media platforms or dashboards.")],-1)])),_:1})])}const T=k(b,[["render",S],["__file","additional-concepts.html.vue"]]),z=JSON.parse('{"path":"/freecodecamp.org/react-interview-prep-handbook/additional-concepts.html","title":"Additional Concepts","lang":"en-US","frontmatter":{"lang":"en-US","title":"Additional Concepts","description":"Article(s) > (4/6) The React Interview Prep Handbook – Essential Topics and Code Examples","category":["Node.js","React.js","Article(s)"],"tag":["blog","freecodecamp.org","node","nodejs","node-js","react","reactjs","react-js"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > (4/6) The React Interview Prep Handbook – Essential Topics and Code Examples"},{"property":"og:description","content":"Additional Concepts"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-prep-handbook/additional-concepts.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-prep-handbook/additional-concepts.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Additional Concepts"}],["meta",{"property":"og:description","content":"Article(s) > (4/6) The React Interview Prep Handbook – Essential Topics and Code Examples"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"}],["meta",{"name":"twitter:image:alt","content":"Additional Concepts"}],["meta",{"property":"article:author","content":"Kunal Nalawade"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"node"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"node-js"}],["meta",{"property":"article:tag","content":"react"}],["meta",{"property":"article:tag","content":"reactjs"}],["meta",{"property":"article:tag","content":"react-js"}],["meta",{"property":"article:published_time","content":"2024-10-11T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Additional Concepts\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png\\"],\\"datePublished\\":\\"2024-10-11T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kunal Nalawade\\"}]}"]],"date":"2024-10-11T00:00:00.000Z","isOriginal":false,"author":"Kunal Nalawade","cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"},"headers":[{"level":2,"title":"Why not Use Index as Keys while Rendering Lists?","slug":"why-not-use-index-as-keys-while-rendering-lists","link":"#why-not-use-index-as-keys-while-rendering-lists","children":[]},{"level":2,"title":"Higher Order Components","slug":"higher-order-components","link":"#higher-order-components","children":[]},{"level":2,"title":"Lazy Loading","slug":"lazy-loading","link":"#lazy-loading","children":[]},{"level":2,"title":"Difference Between Client-side and Server-side Rendering","slug":"difference-between-client-side-and-server-side-rendering","link":"#difference-between-client-side-and-server-side-rendering","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.7,"words":1110},"filePathRelative":"freecodecamp.org/react-interview-prep-handbook/additional-concepts.md","localizedDate":"October 11, 2024","excerpt":"\\n","copyright":{"author":"Kunal Nalawade"}}');export{T as comp,z as data};