import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as a,as as l,ao as t,at as e,au as o,al as r,aq as u,ar as d}from"./app-CpYYKbnj.js";const m={},k={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function w(p,n){const s=u("VPCard");return d(),c("div",null,[a("h1",k,[a("a",h,[a("span",null,l(p.$frontmatter.title)+" 관련",1)])]),t(s,e(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[0]||(n[0]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),n[1]||(n[1]=a("hr",null,null,-1)),t(s,e(o({title:"How to delete a Core Data object | Hacking with iOS",desc:"How to delete a Core Data object",link:"https://hackingwithswift.com/read/38/9/how-to-delete-a-core-data-object",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=r(`<p>Table views have a built-in swipe to delete mechanic that we can draw upon to let users delete commits in our app. Helpfully, managed object context has a matching <code>delete()</code> method that will delete any object regardless of its type or location in the object graph. Once an object has been deleted from the context, we can then call <code>saveContext()</code> to write that change back to the persistent store so that the change is permanent.</p><p>All this is easy to do by adding three new lines of code to the table view’s <code>commit</code> method. Here&#39;s the new method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">tableView</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> tableView<span class="token punctuation">:</span> <span class="token class-name">UITableView</span><span class="token punctuation">,</span> commit editingStyle<span class="token punctuation">:</span> <span class="token class-name">UITableViewCellEditingStyle</span><span class="token punctuation">,</span> forRowAt indexPath<span class="token punctuation">:</span> <span class="token class-name">IndexPath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> editingStyle <span class="token operator">==</span> <span class="token punctuation">.</span>delete <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> commit <span class="token operator">=</span> commits<span class="token punctuation">[</span>indexPath<span class="token punctuation">.</span>row<span class="token punctuation">]</span></span>
<span class="line">        container<span class="token punctuation">.</span>viewContext<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>commit<span class="token punctuation">)</span></span>
<span class="line">        commits<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>at<span class="token punctuation">:</span> indexPath<span class="token punctuation">.</span>row<span class="token punctuation">)</span></span>
<span class="line">        tableView<span class="token punctuation">.</span><span class="token function">deleteRows</span><span class="token punctuation">(</span>at<span class="token punctuation">:</span> <span class="token punctuation">[</span>indexPath<span class="token punctuation">]</span><span class="token punctuation">,</span> with<span class="token punctuation">:</span> <span class="token punctuation">.</span>fade<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token function">saveContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, it 1) pulls out the <code>Commit</code> object that the user selected to delete, 2) removes it from the managed object context, 3) removes it from the <code>commits</code> array, 4) deletes it from the table view, then 5) saves the context. Remember: you must call <code>saveContext()</code> whenever you want your changes to persist.</p><p>Try running the app now, then swipe to delete a few rows. As you&#39;ll see you can delete as many commits as you want, and everything seems to work great. Now try running the app once again, and you&#39;ll get a nasty shock: the deleted commits reappear! What&#39;s going on?</p><p>Well, if you think about it, the app is doing exactly what we told it to do: every time it runs it re-fetches the list of commits from GitHub, and merges it with the commits in its data store. This means any commits we try to delete just get redownloaded again – they really are being deleted, but then they get recreated as soon as the app is relaunched.</p><p>This problem is not a hard one to fix, and it gives me a chance to show you another part of <code>NSFetchRequest</code>: the <code>fetchLimit</code> property. This tells Core Data how many items you want it to return. What we&#39;re going to do is find the newest commit in our data store, then use the date from that to ask GitHub to provide only newer commits.</p><p>First, go to the <code>fetchCommits()</code> method and modify the start of it to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@objc</span> <span class="token keyword">func</span> <span class="token function-definition function">fetchCommits</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> newestCommitDate <span class="token operator">=</span> <span class="token function">getNewestCommitDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">String</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://api.github.com/repos/apple/swift/commits?per_page=100&amp;amp;since=</span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">newestCommitDate</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> jsonCommits <span class="token operator">=</span> <span class="token function">JSON</span><span class="token punctuation">(</span>parseJSON<span class="token punctuation">:</span> data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We&#39;ll be adding the <code>getNewestCommitDate()</code> method shortly, but what it will return is a date formatted as an ISO-8601 string. This date will be set to one second after our most recent commit, and we can send that to the GitHub API using its &quot;since&quot; parameter to receive back only newer commits.</p><p>Here is the <code>getNewestCommitDate()</code> method – only three pieces of it are new, and I&#39;ll explain them momentarily.</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">getNewestCommitDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> formatter <span class="token operator">=</span> <span class="token class-name">ISO8601DateFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> newest <span class="token operator">=</span> <span class="token class-name">Commit</span><span class="token punctuation">.</span><span class="token function">createFetchRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> sort <span class="token operator">=</span> <span class="token class-name">NSSortDescriptor</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;date&quot;</span></span><span class="token punctuation">,</span> ascending<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span></span>
<span class="line">    newest<span class="token punctuation">.</span>sortDescriptors <span class="token operator">=</span> <span class="token punctuation">[</span>sort<span class="token punctuation">]</span></span>
<span class="line">    newest<span class="token punctuation">.</span>fetchLimit <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> commits <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> container<span class="token punctuation">.</span>viewContext<span class="token punctuation">.</span><span class="token function">fetch</span><span class="token punctuation">(</span>newest<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> commits<span class="token punctuation">.</span>count <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> formatter<span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> commits<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>date<span class="token punctuation">.</span><span class="token function">addingTimeInterval</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> formatter<span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>timeIntervalSince1970<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The first of the new pieces of code is the <code>fetchLimit</code> property for the fetch request. As you might imagine, it&#39;s always more efficient to fetch as few objects as needed, so if you can set a fetch limit you should do so.</p><p>Second, the <code>string(from:)</code> method is the inverse of the <code>date(from:)</code> method we used when parsing the commit JSON. We use the same date format that was defined earlier, because GitHub&#39;s &quot;since&quot; parameter is specified in an identical way. Finally, <code>addingTimeInterval()</code> is used to add one second to the time from the previous commit, otherwise GitHub will return the newest commit again.</p><p>If no valid date is found, the method returns a date from the 1st of January 1970, which will reproduce the same behavior we had before introducing this date change.</p><p>This solution is a good start, but it has a small flaw – see if you can spot it! If not, don&#39;t worry: I&#39;ll be setting it as homework for you. Regardless, it gave me the chance to show you the <code>fetchLimit</code> property, and you know how much I love squeezing new knowledge in…</p>`,16))])}const b=i(m,[["render",w],["__file","09-how-to-delete-a-core-data-object.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/read/38/09-how-to-delete-a-core-data-object.html","title":"How to delete a Core Data object","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to delete a Core Data object","description":"Article(s) > How to delete a Core Data object","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to delete a Core Data object"},{"property":"og:description","content":"How to delete a Core Data object"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/38/09-how-to-delete-a-core-data-object.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/38/09-how-to-delete-a-core-data-object.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to delete a Core Data object"}],["meta",{"property":"og:description","content":"Article(s) > How to delete a Core Data object"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to delete a Core Data object\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.94,"words":881},"filePathRelative":"hackingwithswift.com/read/38/09-how-to-delete-a-core-data-object.md","excerpt":"\\n"}');export{b as comp,v as data};