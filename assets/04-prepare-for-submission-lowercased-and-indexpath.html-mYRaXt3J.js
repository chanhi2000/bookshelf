import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as d,ao as n,at as t,au as o,al as u,aq as i,ar as h}from"./app-CpYYKbnj.js";const w={},m={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"};function f(r,s){const a=i("VPCard"),p=i("VidStack");return h(),l("div",null,[e("h1",m,[e("a",k,[e("span",null,d(r.$frontmatter.title)+" 관련",1)])]),n(a,t(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[0]||(s[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),s[1]||(s[1]=e("hr",null,null,-1)),n(a,t(o({title:"Prepare for submission: lowercased() and IndexPath | Hacking with iOS",desc:"Prepare for submission: lowercased() and IndexPath",link:"https://hackingwithswift.com/read/5/4/prepare-for-submission-lowercased-and-indexpath",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n(p,{src:"youtube/jjOcsdYZE9c"}),s[2]||(s[2]=u(`<p>You can breathe again: we&#39;re done with closures for now. I know that wasn&#39;t easy, but once you understand basic closures you really have come a long way in your Swift adventure.</p><p>We&#39;re going to do some much easier coding now, because believe it or not we&#39;re not that far from making this game actually work!</p><p>We have now gone over the structure of a closure: trailing closure syntax, unowned self, a parameter being passed in, then the need for <code>self.</code> to make capturing clear. We haven&#39;t really talked about the actual content of our closure, because there isn&#39;t a lot to it. As a reminder, here&#39;s how it looks:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">guard</span> <span class="token keyword">let</span> answer <span class="token operator">=</span> ac<span class="token operator">?</span><span class="token punctuation">.</span>textFields<span class="token operator">?</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>text <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">self</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>answer<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>The first line safely unwraps the array of text fields – it&#39;s optional because there might not be any. The second line pulls out the text from the text field and passes it to our (all-new-albeit-empty) <code>submit()</code> method.</p><p>This method needs to check whether the player&#39;s word can be made from the given letters. It needs to check whether the word has been used already, because obviously we don&#39;t want duplicate words. It also needs to check whether the word is actually a valid English word, because otherwise the user can just type in nonsense.</p><p>If all three of those checks pass, <code>submit()</code> needs to add the word to the <code>usedWords</code> array, then insert a new row in the table view. We could just use the table view&#39;s <code>reloadData()</code> method to force a full reload, but that&#39;s not very efficient when we&#39;re changing just one row.</p><p>First, let’s create dummy methods for the three checks we’re going to do: is the word possible, is it original, and is it real? Each of these will accept a word string and return true or false, but for now we’ll just always return true – we’ll come back to these soon. Add these methods now:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">isPossible</span><span class="token punctuation">(</span>word<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">isOriginal</span><span class="token punctuation">(</span>word<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">isReal</span><span class="token punctuation">(</span>word<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With those three methods in place, we can write our first pass at the <code>submit()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">submit</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> answer<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> lowerAnswer <span class="token operator">=</span> answer<span class="token punctuation">.</span><span class="token function">lowercased</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">isPossible</span><span class="token punctuation">(</span>word<span class="token punctuation">:</span> lowerAnswer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token function">isOriginal</span><span class="token punctuation">(</span>word<span class="token punctuation">:</span> lowerAnswer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token function">isReal</span><span class="token punctuation">(</span>word<span class="token punctuation">:</span> lowerAnswer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                usedWords<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>answer<span class="token punctuation">,</span> at<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token keyword">let</span> indexPath <span class="token operator">=</span> <span class="token class-name">IndexPath</span><span class="token punctuation">(</span>row<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> section<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                tableView<span class="token punctuation">.</span><span class="token function">insertRows</span><span class="token punctuation">(</span>at<span class="token punctuation">:</span> <span class="token punctuation">[</span>indexPath<span class="token punctuation">]</span><span class="token punctuation">,</span> with<span class="token punctuation">:</span> <span class="token punctuation">.</span>automatic<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If a user types &quot;cease&quot; as a word that can be made out of our started word &quot;agencies&quot;, it&#39;s clear that is correct because there is one &quot;c&quot;, two &quot;e&quot;s, one &quot;a&quot; and one &quot;s&quot;. But what if they type &quot;Cease&quot;? Now it has a capital C, and &quot;agencies&quot; doesn&#39;t have a capital C. Yes, that&#39;s right: strings are case-sensitive, which means Cease is not cease is not CeasE is not CeAsE.</p><p>The solution to this is quite simple: all the starter words are lowercase, so when we check the player&#39;s answer we immediately lowercase it using its <code>lowercased()</code> method. This is stored in the <code>lowerAnswer</code> constant because we want to use it several times.</p><p>We then have three <code>if</code> statements, one inside another. These are called nested statements, because you nest one inside the other. Only if all three statements are true (the word is possible, the word hasn&#39;t been used yet, and the word is a real word), does the main block of code execute.</p><p>Once we know the word is good, we do three things: insert the new word into our <code>usedWords</code> array at index 0. This means &quot;add it to the start of the array,&quot; and means that the newest words will appear at the top of the table view.</p><p>The next two things are related: we insert a new row into the table view. Given that the table view gets all its data from the used words array, this might seem strange. After all, we just inserted the word into the <code>usedWords</code> array, so why do we need to insert anything into the table view?</p><p>The answer is animation. Like I said, we could just call the <code>reloadData()</code> method and have the table do a full reload of all rows, but it means a lot of extra work for one small change, and also causes a jump – the word wasn&#39;t there, and now it is.</p><p>This can be hard for users to track visually, so using <code>insertRows()</code> lets us tell the table view that a new row has been placed at a specific place in the array so that it can animate the new cell appearing. Adding one cell is also significantly easier than having to reload everything, as you might imagine!</p><p>There are two quirks here that require a little more detail. First, <code>IndexPath</code> is something we looked at briefly in project 1, as it contains a section and a row for every item in your table. As with project 1 we aren&#39;t using sections here, but the row number should equal the position we added the item in the array – position 0, in this case.</p><p>Second, the <code>with</code> parameter lets you specify how the row should be animated in. Whenever you&#39;re adding and removing things from a table, the <code>.automatic</code> value means &quot;do whatever is the standard system animation for this change.&quot; In this case, it means &quot;slide the new row in from the top.&quot;</p><p>Our three checking methods always return true regardless of what word is entered, but apart from that the game is starting to come together. Press <kbd>Cmd</kbd>+<kbd>R</kbd> to play back what you have: you should be able to tap the + button and enter words into the alert.</p>`,21))])}const v=c(w,[["render",f],["__file","04-prepare-for-submission-lowercased-and-indexpath.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/read/05/04-prepare-for-submission-lowercased-and-indexpath.html","title":"Prepare for submission: lowercased() and IndexPath","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Prepare for submission: lowercased() and IndexPath","description":"Article(s) > Prepare for submission: lowercased() and IndexPath","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Prepare for submission: lowercased() and IndexPath"},{"property":"og:description","content":"Prepare for submission: lowercased() and IndexPath"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/04-prepare-for-submission-lowercased-and-indexpath.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/04-prepare-for-submission-lowercased-and-indexpath.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Prepare for submission: lowercased() and IndexPath"}],["meta",{"property":"og:description","content":"Article(s) > Prepare for submission: lowercased() and IndexPath"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Prepare for submission: lowercased() and IndexPath\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.76,"words":1127},"filePathRelative":"hackingwithswift.com/read/05/04-prepare-for-submission-lowercased-and-indexpath.md","excerpt":"\\n"}');export{v as comp,y as data};