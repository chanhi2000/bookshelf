import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as b,am as t,as as y,ao as n,at as l,au as d,ap as r,al as c,an as o,ak as v,aq as s,ar as w}from"./app-CpYYKbnj.js";const x={},j={id:"frontmatter-title-관련",tabindex:"-1"},R={class:"header-anchor",href:"#frontmatter-title-관련"},S={class:"table-of-contents"},k={href:"https://youtu.be/-JXUaydU1J0",target:"_blank",rel:"noopener noreferrer"};function N(h,e){const i=s("VPCard"),a=s("router-link"),p=s("SiteInfo"),u=s("RouteLink"),g=s("FontIcon"),f=s("VidStack");return w(),b("div",null,[t("h1",j,[t("a",R,[t("span",null,y(h.$frontmatter.title)+" 관련",1)])]),n(i,l(d({title:"Next.js > Article(s)",desc:"Article(s)",link:"/programming/js-next/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n(i,l(d({title:"React.js > Article(s)",desc:"Article(s)",link:"/programming/js-react/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t("nav",S,[t("ul",null,[t("li",null,[n(a,{to:"#understanding-react"},{default:r(()=>e[0]||(e[0]=[o("Understanding React")])),_:1}),t("ul",null,[t("li",null,[n(a,{to:"#client-side-rendering"},{default:r(()=>e[1]||(e[1]=[o("Client-side Rendering")])),_:1})]),t("li",null,[n(a,{to:"#use-cases-for-react-in-web-development"},{default:r(()=>e[2]||(e[2]=[o("Use Cases for React in Web Development")])),_:1})])])]),t("li",null,[n(a,{to:"#exploring-next-js"},{default:r(()=>e[3]||(e[3]=[o("Exploring Next.js")])),_:1}),t("ul",null,[t("li",null,[n(a,{to:"#server-side-rendering"},{default:r(()=>e[4]||(e[4]=[o("Server-side Rendering")])),_:1})]),t("li",null,[n(a,{to:"#use-cases-for-next-js-in-web-development"},{default:r(()=>e[5]||(e[5]=[o("Use Cases for Next.js in web development")])),_:1})])])]),t("li",null,[n(a,{to:"#key-difference-between-next-js-and-react"},{default:r(()=>e[6]||(e[6]=[o("Key Difference Between Next.js and React")])),_:1}),t("ul",null,[t("li",null,[n(a,{to:"#rendering-methods-client-side-vs-server-side"},{default:r(()=>e[7]||(e[7]=[o("Rendering Methods: client-side vs. server-side")])),_:1})]),t("li",null,[n(a,{to:"#performance-considerations"},{default:r(()=>e[8]||(e[8]=[o("Performance Considerations")])),_:1})]),t("li",null,[n(a,{to:"#seo-implications"},{default:r(()=>e[9]||(e[9]=[o("SEO Implications")])),_:1})]),t("li",null,[n(a,{to:"#scalability-and-project-complexity"},{default:r(()=>e[10]||(e[10]=[o("Scalability and Project Complexity")])),_:1})])])]),t("li",null,[n(a,{to:"#when-to-use-react-or-next-js"},{default:r(()=>e[11]||(e[11]=[o("When to Use React or Next.js")])),_:1}),t("ul",null,[t("li",null,[n(a,{to:"#when-to-use-react"},{default:r(()=>e[12]||(e[12]=[o("When to use React")])),_:1})]),t("li",null,[n(a,{to:"#when-to-use-next-js"},{default:r(()=>e[13]||(e[13]=[o("When to Use Next.js")])),_:1})])])]),t("li",null,[n(a,{to:"#conclusion"},{default:r(()=>e[14]||(e[14]=[o("Conclusion")])),_:1})])])]),e[21]||(e[21]=t("hr",null,null,-1)),n(p,{name:"Next.js vs React – Differences and How to Choose the Right One for Your Project",desc:"As a developer, there are many tools, languages, frameworks and open-source packages you have to learn in order to make your job easier and straightforward (though the journey isn’t a straightforward one but you will get there). Some of these tools, ...",url:"https://freecodecamp.org/news/nextjs-vs-react-differences",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1733260801154/22f3a036-3b7f-4e38-946e-93ec432164b1.png"}),e[22]||(e[22]=c('<p>As a developer, there are many tools, languages, frameworks and open-source packages you have to learn in order to make your job easier and straightforward (though the journey isn’t a straightforward one but you will get there).</p><p>Some of these tools, languages, or frameworks are used daily by community members and can undergo fundamental changes in how they are implemented or written over time.</p><p>In this article, we will explore two popular JavaScript technologies, Next.js and React.js, by comparing their key differences, examining their strengths, and offering insights to help developers choose the best option for their projects.</p><hr><h2 id="understanding-react" tabindex="-1"><a class="header-anchor" href="#understanding-react"><span>Understanding React</span></a></h2><p>We often confuse ourselves as to whether React is a JavaScript framework or not, but here is the answer to that question. React is not a JavaScript framework, it is a JavaScript library. Now, these two terminologies are often interchanged or misused, but I will explain them shortly.</p><p>A library is a collection of already-written code that can be reused or called upon when building your own project.</p><div class="hint-container tip"><p class="hint-container-title">Example</p><p>Imagine a library where you go to study. The books are already available on the shelves – you simply pick the one you need and start reading. Similarly, in programming, a library provides ready-made tools that you can use in your project without starting from scratch.</p></div><p>On the other hand, a framework is like a ready-made structure that helps you build your project. It gives you a solid foundation to work with, so you don&#39;t have to start from scratch or write repetitive code. Instead, you focus on adding your own features and logic, while the framework takes care of running things at the right time and in the right way.</p><div class="hint-container tip"><p class="hint-container-title">Example</p><p>hink of a framework like a house under construction where the walls, foundation, and roof are already built. All you need to do is decide how to design the interior—like choosing the furniture, paint, and decorations. The framework handles the heavy lifting, like ensuring the house stands strong, while you focus on making it your own. Similarly, in programming, the framework provides the structure, and you add your custom logic to complete the project.</p></div><p>With that out of the way, let’s move on.</p><p>React is one of the most popular JavaScript libraries used by developers to build fast, interactive, and reliable user interfaces. It is a declarative library that helps developers create component-based web applications. Facebook developed this library in 2011 and it has been trending since then.</p><p>Usually, when writing JavaScript code, we create a file with the extension <code>js</code>. For example: <code>App.js</code>, <code>script.js</code>, and so on. In React we create a file with the extension <code>jsx</code>. That is: <code>index.jsx</code>, <code>Home.jsx</code>, and so on. The <code>jsx</code> is a React extension that allows you to write a JavaScript code resembling HTML. The syntax, when executed, is passed through preprocessors/transpilers which transforms the HTML-looking code into a standard JavaScript code.</p><p>At the heart of all React applications are components. Components are chunks of user interfaces (UI) which are built independently and can be reused in different parts of your project. Different components can be built separately and later brought together to form a complex user interface (UI).</p><div class="hint-container note"><p class="hint-container-title">Note</p><p>Every React application has at least one component, commonly referred to as the root component. This component represents the entire application. Within the root component, there are often other components, known as child components, that help structure and manage different parts of the application.</p></div><p>Here is a structural representation of root and child components.</p><figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1732758941272/17c6b471-b2a7-40ae-83f8-4e215a50c853.png" alt="structural representation of root and child components" tabindex="0" loading="lazy"><figcaption>structural representation of root and child components</figcaption></figure><p>From the image above, you can clearly understand what components are all about. <code>App</code> is the root component, and inside the root component, we have the child components: <code>Navbar</code>, <code>Profile</code>, <code>Blog</code> and <code>Footer</code>. The child components can be reused on other pages of the project without having to rewrite the code again.</p><h3 id="client-side-rendering" tabindex="-1"><a class="header-anchor" href="#client-side-rendering"><span>Client-side Rendering</span></a></h3><p>Client-side rendering (CSR) is a common technique, especially in libraries like React and frameworks like Vue.js, Angular, and so on. Here, the browser downloads and processes JavaScript files to dynamically render content directly on the user&#39;s device. With CSR, web pages are generated dynamically, and any updates or changes to the code are applied without requiring a full page reload. Only the specific parts that have changed are updated, ensuring a seamless and efficient user experience.</p><p>Therefore, in CSR, the logic and structure of the web page is handled by the client (browser) and a fully rendered page is displayed.</p>',21)),t("p",null,[e[16]||(e[16]=o("To help you understand CSR, ")),n(u,{to:"/freecodecamp.org/rendering-patterns.html#single-page-applications-spas-with-client-side-rendering-csr"},{default:r(()=>e[15]||(e[15]=[o("I have added an article here")])),_:1}),e[17]||(e[17]=o("."))]),e[23]||(e[23]=c('<h3 id="use-cases-for-react-in-web-development" tabindex="-1"><a class="header-anchor" href="#use-cases-for-react-in-web-development"><span>Use Cases for React in Web Development</span></a></h3><p>Ever since React became a go-to choice for many developers, its flexibility has made it suitable for a wide range of use cases in web development. Here are a few cases:</p><ul><li><strong>Single Page Applications (SPAs):</strong> When we talk about SPAs, we don’t really mean that your web application has only one page, it can go on to having multiple pages. In SPAs, your web application files (HTML, CSS, JS) are generated once on your web page and when subsequent updates are made on the file, your page won’t have to fully reload. This approach helps ensure a faster transition, reduces load on the server and enhance overall user experience.</li><li><strong>Interactive User Interfaces:</strong> React is suitable for building interactive user interfaces which, from time to time, undergo dynamic updates based on the actions of the users. Examples are online forms, dashboards, websites (E-commerce websites), and so on.</li><li><strong>Cross-Platform Applications:</strong> Having React knowledge comes in handy when building mobile applications, simplifying the connection between web applications and mobile applications. Tools like React Native helps you achieve this process.</li></ul><hr><h2 id="exploring-next-js" tabindex="-1"><a class="header-anchor" href="#exploring-next-js"><span>Exploring Next.js</span></a></h2><p>Next.js is a popular React-based framework used in building web applications with the use of React components. Next.js provides additional structure, features, and optimization for your web application.</p><p>Unlike React, Next.js supports server-side rendering (SSR), so requests are processed and generated from the server and then displayed on the browser (client).</p><h3 id="server-side-rendering" tabindex="-1"><a class="header-anchor" href="#server-side-rendering"><span>Server-side Rendering</span></a></h3><p>Server-side rendering (SSR) is a technique in web development where a server generates the HTML for a web page on the server and sends it to the browser (client). In other words, the server handles the structures and logic of the page and displays a fully rendered page on the screen.</p><p>In server-side rendering, a request is first sent to the server from the browser (client), then the server begins to process the request and when it&#39;s done processing the request, it executes the request by generating and displaying an HTML file with the content on the browser (client side). When a change is made or a new page is requested, a new request is sent again to the server and it is processed all over again – a fresh, fully rendered HTML file will be generated and displayed on the browser (client).</p>',10)),t("p",null,[e[19]||(e[19]=o("For a better understanding of CSR and SSR, I have added a ")),t("a",k,[n(g,{icon:"fa-brands fa-youtube"}),e[18]||(e[18]=o("YouTube video here"))]),e[20]||(e[20]=o("."))]),n(f,{src:"youtube/-JXUaydU1J0"}),e[24]||(e[24]=c('<h3 id="use-cases-for-next-js-in-web-development" tabindex="-1"><a class="header-anchor" href="#use-cases-for-next-js-in-web-development"><span>Use Cases for Next.js in web development</span></a></h3><ul><li><strong>Single Page Application (SPAs):</strong> Next.js can be used in the creation of single page applications, similar to React.</li><li><strong>SEO-Friendly:</strong> Next.js helps create SEO-friendly websites by rendering an HTML file on the server and delivering it to the browser. This improves search engine visibility, increasing the chances of your website appearing at the top of search results.</li><li><strong>Multi-User Platforms:</strong> Due to Next.js ability to handle dynamic routing, API handling, and so on, it’s easy to create applications that serve various purposes.</li></ul><hr><h2 id="key-difference-between-next-js-and-react" tabindex="-1"><a class="header-anchor" href="#key-difference-between-next-js-and-react"><span>Key Difference Between Next.js and React</span></a></h2><h3 id="rendering-methods-client-side-vs-server-side" tabindex="-1"><a class="header-anchor" href="#rendering-methods-client-side-vs-server-side"><span>Rendering Methods: client-side vs. server-side</span></a></h3><p>When we talk about the rendering method in React, React relies mainly on rendering with the client-side rendering (CSR) method. Therefore both the logic and the structure of the web page will be handled by the browser (client). Though this method is commonly used, it has some downside effects like slower initial page load.</p><p>Next.js, on the other hand, supports both SSR and CSR because it was built on top of React. Web pages are rendered on the server and both logic and structure of the page are all handled by the server. This enables a faster loading of the web page and also improves the SEO.</p><h3 id="performance-considerations" tabindex="-1"><a class="header-anchor" href="#performance-considerations"><span>Performance Considerations</span></a></h3><p>In terms of performance considerations, Next.js is often preferred because it offers multiple rendering options, including server-side rendering (SSR), static site generation (SSG), Incremental Static Regeneration (ISR), and client-side rendering (CSR). In contrast, React primarily provides a single rendering approach: client-side rendering.</p><h3 id="seo-implications" tabindex="-1"><a class="header-anchor" href="#seo-implications"><span>SEO Implications</span></a></h3><p>React is less SEO-friendly because search engines may struggle to index content that requires JavaScript execution to render.</p><p>On the other hand, Next.js is more SEO-friendly than React because it renders content on the server, providing fully-rendered HTML to search engines for easier indexing.</p><h3 id="scalability-and-project-complexity" tabindex="-1"><a class="header-anchor" href="#scalability-and-project-complexity"><span>Scalability and Project Complexity</span></a></h3><p>In terms of scalability and project complexity, Next.js is generally better than React. Next.js provides built-in features that enhance the scalability of your project. These include:</p><ul><li>Server-side rendering (SSR) and static site generation (SSG) for better performance and SEO.</li><li>A built-in API routes feature for creating serverless functions seamlessly.</li><li>A file-based routing system that simplifies the organization of larger projects.</li></ul><p>In contrast, with React, you are responsible for setting up and maintaining the structure for scalability. For larger projects, this often requires adding additional tools such as:</p><ul><li>State management libraries (for example, Redux, Recoil, and so on).</li><li>Routing libraries (for example, React Router).</li></ul><p>These tools are necessary to enhance React&#39;s scalability and address project complexity, but they also increase the overhead and effort needed to set up and manage the application.</p><p>In summary, here is a tabular break down;</p><p>| <strong>Factors</strong> | <strong>React</strong> | <strong>Next.js</strong> | Scalability | It is possible but to increase scalability, it requires additional tools and a custom setup | It is scalable and already has built-in tools that increase the scalability. | | Performance | It provides only one rendering option which is client-side rendering (CSR) | It offers multiple rendering options, including SSR, SSG, ISR, and CSR. | | SEO | It is less SEO-friendly because search engines may struggle to index content that requires JavaScript execution to render. | It is more SEO-friendly than React because it renders content on the server, providing fully-rendered HTML to search engines for easier indexing. | | Use Case | Mostly used in smaller or unique projects | Mostly used in large-scale projects and enhances performance and SEO |</p><hr><h2 id="when-to-use-react-or-next-js" tabindex="-1"><a class="header-anchor" href="#when-to-use-react-or-next-js"><span>When to Use React or Next.js</span></a></h2><p>Choosing the right tool for your project solely depends on the complexity of the solution of the project you are building. While React and Next.js are closely related, each has its strengths and optimal use cases.</p><h3 id="when-to-use-react" tabindex="-1"><a class="header-anchor" href="#when-to-use-react"><span>When to use React</span></a></h3><p>Here are some cases when it is best to use React for your project:</p><ul><li>When building highly interactive applications.</li><li>When your project requires manual handling of routing, state management or/and API integration.</li><li>When your project requires client-side rendering (CSR)</li></ul><h3 id="when-to-use-next-js" tabindex="-1"><a class="header-anchor" href="#when-to-use-next-js"><span>When to Use Next.js</span></a></h3><p>Here are some cases where it’s best to use Next.js:</p><ul><li>When your project requires a better SEO.</li><li>When your project requires server side rendering.</li><li>When your project requires you to build APIs along your frontend code.</li><li>When building content-driven websites like blogs or e-commerce sites. Due to its use of server-side rendering, it aids in improving the load times of contents on the page.</li><li>Next.js is best used when you want to optimize images in your project.</li></ul><hr><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion</span></a></h2><p>At this point I believe you have a clear understanding of React and Next.js, the concepts of server-side and client-side rendering, the use cases for both React and Next.js, and the key differences between them.</p><p>Thank you for taking the time to read this. I hope you found it helpful.</p><p>Happy coding.</p>',34)),v(" TODO: add ARTICLE CARD "),n(i,l(d({title:"Next.js vs React – Differences and How to Choose the Right One for Your Project",desc:"As a developer, there are many tools, languages, frameworks and open-source packages you have to learn in order to make your job easier and straightforward (though the journey isn’t a straightforward one but you will get there). Some of these tools, ...",link:"https://chanhi2000.github.io/bookshelf/freecodecamp.org/nextjs-vs-react-differences.html",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16)])}const P=m(x,[["render",N],["__file","nextjs-vs-react-differences.html.vue"]]),A=JSON.parse('{"path":"/freecodecamp.org/nextjs-vs-react-differences.html","title":"Next.js vs React – Differences and How to Choose the Right One for Your Project","lang":"en-US","frontmatter":{"lang":"en-US","title":"Next.js vs React – Differences and How to Choose the Right One for Your Project","description":"Article(s) > Next.js vs React – Differences and How to Choose the Right One for Your Project","icon":"iconfont icon-nextjs","category":["Node.js","React.js","Next.js","Article(s)"],"tag":["blog","freecodecamp.org","node","nodejs","node-js","next","nextjs","next-js","react","reactjs","react-js"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Next.js vs React – Differences and How to Choose the Right One for Your Project"},{"property":"og:description","content":"Next.js vs React – Differences and How to Choose the Right One for Your Project"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/nextjs-vs-react-differences.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/nextjs-vs-react-differences.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Next.js vs React – Differences and How to Choose the Right One for Your Project"}],["meta",{"property":"og:description","content":"Article(s) > Next.js vs React – Differences and How to Choose the Right One for Your Project"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1733260801154/22f3a036-3b7f-4e38-946e-93ec432164b1.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1733260801154/22f3a036-3b7f-4e38-946e-93ec432164b1.png"}],["meta",{"name":"twitter:image:alt","content":"Next.js vs React – Differences and How to Choose the Right One for Your Project"}],["meta",{"property":"article:author","content":"Okoro Emmanuel Nzube"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"node"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"node-js"}],["meta",{"property":"article:tag","content":"next"}],["meta",{"property":"article:tag","content":"nextjs"}],["meta",{"property":"article:tag","content":"next-js"}],["meta",{"property":"article:tag","content":"react"}],["meta",{"property":"article:tag","content":"reactjs"}],["meta",{"property":"article:tag","content":"react-js"}],["meta",{"property":"article:published_time","content":"2024-12-05T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Next.js vs React – Differences and How to Choose the Right One for Your Project\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1732758941272/17c6b471-b2a7-40ae-83f8-4e215a50c853.png\\"],\\"datePublished\\":\\"2024-12-05T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Okoro Emmanuel Nzube\\"}]}"]],"prev":"/programming/js-next/articles/README.md","date":"2024-12-05T00:00:00.000Z","isOriginal":false,"author":"Okoro Emmanuel Nzube","cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1733260801154/22f3a036-3b7f-4e38-946e-93ec432164b1.png"},"headers":[{"level":2,"title":"Understanding React","slug":"understanding-react","link":"#understanding-react","children":[{"level":3,"title":"Client-side Rendering","slug":"client-side-rendering","link":"#client-side-rendering","children":[]},{"level":3,"title":"Use Cases for React in Web Development","slug":"use-cases-for-react-in-web-development","link":"#use-cases-for-react-in-web-development","children":[]}]},{"level":2,"title":"Exploring Next.js","slug":"exploring-next-js","link":"#exploring-next-js","children":[{"level":3,"title":"Server-side Rendering","slug":"server-side-rendering","link":"#server-side-rendering","children":[]},{"level":3,"title":"Use Cases for Next.js in web development","slug":"use-cases-for-next-js-in-web-development","link":"#use-cases-for-next-js-in-web-development","children":[]}]},{"level":2,"title":"Key Difference Between Next.js and React","slug":"key-difference-between-next-js-and-react","link":"#key-difference-between-next-js-and-react","children":[{"level":3,"title":"Rendering Methods: client-side vs. server-side","slug":"rendering-methods-client-side-vs-server-side","link":"#rendering-methods-client-side-vs-server-side","children":[]},{"level":3,"title":"Performance Considerations","slug":"performance-considerations","link":"#performance-considerations","children":[]},{"level":3,"title":"SEO Implications","slug":"seo-implications","link":"#seo-implications","children":[]},{"level":3,"title":"Scalability and Project Complexity","slug":"scalability-and-project-complexity","link":"#scalability-and-project-complexity","children":[]}]},{"level":2,"title":"When to Use React or Next.js","slug":"when-to-use-react-or-next-js","link":"#when-to-use-react-or-next-js","children":[{"level":3,"title":"When to use React","slug":"when-to-use-react","link":"#when-to-use-react","children":[]},{"level":3,"title":"When to Use Next.js","slug":"when-to-use-next-js","link":"#when-to-use-next-js","children":[]}]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":7.86,"words":2359},"filePathRelative":"freecodecamp.org/nextjs-vs-react-differences.md","localizedDate":"December 5, 2024","excerpt":"\\n","copyright":{"author":"Okoro Emmanuel Nzube"}}');export{P as comp,A as data};