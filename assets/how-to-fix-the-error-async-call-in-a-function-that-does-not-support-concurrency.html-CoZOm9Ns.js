import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as n,as as h,ao as o,at as e,au as c,al as d,an as s,aq as i,ar as f}from"./app-CpYYKbnj.js";const y={},m={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},g={href:"https://hackingwithswift.com/files/projects/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency-1.zip",target:"_blank",rel:"noopener noreferrer"},k={class:"hint-container details"};function b(r,t){const a=i("VPCard"),l=i("FontIcon");return f(),u("div",null,[n("h1",m,[n("a",w,[n("span",null,h(r.$frontmatter.title)+" 관련",1)])]),o(a,e(c({title:"Swift Concurrency by Example",desc:"Back to Home",link:"/hackingwithswift.com/concurrency/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),t[3]||(t[3]=n("hr",null,null,-1)),o(a,e(c({title:"How to fix the error “async call in a function that does not support concurrency” | Swift Concurrency by Example",desc:"How to fix the error “async call in a function that does not support concurrency”",link:"https://hackingwithswift.com/quick-start/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[4]||(t[4]=d(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>This error occurs when you’ve tried to call an async function from a synchronous function, which is not allowed in Swift – asynchronous functions must be able to suspend themselves and their callers, and synchronous functions simply don’t know how to do that.</p><p>If your asynchronous work needs to be waited for, you don’t have much of a choice but to mark your current code as also being <code>async</code> so that you can use <code>await</code> as normal. However, sometimes this can result in a bit of an “async infection” – you mark one function as being async, which means its caller needs to be async too, as does *<code>its*</code> caller, and so on, until you’ve turned one error into 50.</p><p>In this situation, you can create a dedicated <code>Task</code> to solve the problem. We’ll be covering this API in more detail later on, but here’s how it would look in your code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">doAsyncWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Doing async work&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">doRegularWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Task</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">await</span> <span class="token function">doAsyncWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">doRegularWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),n("blockquote",null,[n("p",null,[n("a",g,[o(l,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=s("Download this as an Xcode project"))])])]),t[5]||(t[5]=n("p",null,[s("Tasks like this one are created and run immediately. We aren’t waiting for the task to complete, so we shouldn’t use "),n("code",null,"await"),s(" when creating it.")],-1)),n("details",k,[t[1]||(t[1]=n("summary",null,"Similar solutions…",-1)),o(a,e(c({title:"How to call an async function using async let | Swift Concurrency by Example",desc:"How to call an async function using async let",link:"/hackingwithswift.com/concurrency/how-to-call-an-async-function-using-async-let.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,e(c({title:"Why can’t we call async functions using async var? | Swift Concurrency by Example",desc:"Why can’t we call async functions using async var?",link:"/hackingwithswift.com/concurrency/why-cant-we-call-async-functions-using-async-var.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,e(c({title:"How to create and call an async function | Swift Concurrency by Example",desc:"How to create and call an async function",link:"/hackingwithswift.com/concurrency/how-to-create-and-call-an-async-function.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,e(c({title:"How to call async throwing functions | Swift Concurrency by Example",desc:"How to call async throwing functions",link:"/hackingwithswift.com/concurrency/how-to-call-async-throwing-functions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,e(c({title:"Concurrency vs parallelism | Swift Concurrency by Example",desc:"Concurrency vs parallelism",link:"/hackingwithswift.com/concurrency/concurrency-vs-parallelism.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const H=p(y,[["render",b],["__file","how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency.html","title":"How to fix the error “async call in a function that does not support concurrency”","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to fix the error “async call in a function that does not support concurrency”","description":"Article(s) > How to fix the error “async call in a function that does not support concurrency”","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to fix the error “async call in a function that does not support concurrency”"},{"property":"og:description","content":"How to fix the error “async call in a function that does not support concurrency”"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to fix the error “async call in a function that does not support concurrency”"}],["meta",{"property":"og:description","content":"Article(s) > How to fix the error “async call in a function that does not support concurrency”"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2021-11-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to fix the error “async call in a function that does not support concurrency”\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-11-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/concurrency/whats-the-difference-between-sequence-asyncsequence-and-asyncstream.md","date":"2021-11-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.15,"words":645},"filePathRelative":"hackingwithswift.com/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency.md","localizedDate":"2021년 11월 28일","excerpt":"\\n"}');export{H as comp,C as data};