import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as n,as as h,ao as s,at as l,au as p,al as o,an as a,aq as r,ar as m}from"./app-CpYYKbnj.js";const k={},g={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},w={href:"http://duriansoftware.com/",target:"_blank",rel:"noopener noreferrer"};function b(c,t){const i=r("VPCard"),e=r("FontIcon");return m(),d("div",null,[n("h1",g,[n("a",f,[n("span",null,h(c.$frontmatter.title)+" 관련",1)])]),s(i,l(p({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[22]||(t[22]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),t[23]||(t[23]=n("hr",null,null,-1)),s(i,l(p({title:"Examples of using NSPredicate to filter NSFetchRequest | Hacking with iOS",desc:"Examples of using NSPredicate to filter NSFetchRequest",link:"https://hackingwithswift.com/read/38/7/examples-of-using-nspredicate-to-filter-nsfetchrequest",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[24]||(t[24]=o('<p>It&#39;s time to take your Core Data skills up a notch: we&#39;re going to add a second entity called Author, and link that entity to our existing Commit entity. This will allow us to attach an author to every commit, but also to find all commits that belong to a specific author.</p><p>Open the data model (Project38.xcdatamodeld) for editing, then click the Add Entity button. Name the entity Author, then give it two attributes: &quot;name&quot; and &quot;email&quot;. Please make both strings, and make sure both are not marked as optional. This time we&#39;re also going to make one further change: we’re going to make “name” indexed.</p><p>To do that, long press on the Add Entity button and choose Add Fetch Index from the menu that appears. Name it “byNameIndex”, because this indexes our items by name. You’ll see a small + button under Fetch Index Elements in the main editor – click that to add a new index element, then change its property from “Expression” to “name”.</p><figure><img src="https://hackingwithswift.com/img/books/hws/38-9@2x.png" alt="You can index as many attributes as you want, but don&#39;t go overboard: it takes time to create and update indexes, so you should index only the attributes you really need." tabindex="0" loading="lazy"><figcaption>You can index as many attributes as you want, but don&#39;t go overboard: it takes time to create and update indexes, so you should index only the attributes you really need.</figcaption></figure><p>An indexed attribute is one that is optimized for fast searching. There is a cost to creating and maintaining each index, which means you need to choose carefully which attributes should be index. But when you find a particular fetch request is happening slowly, chances are it&#39;s because you need to index an attribute.</p><p>We want every Author to have a list of commits that belong to them, and every Commit to have the Author that created it. In Core Data, this is represented using relationships, which are a bit like calculated properties except Core Data adds extra functionality to handle the situation when part of a relationship gets deleted.</p><p>With the Author entity selected, click the + button under the Relationships section – it&#39;s just below the Attributes section. Name the new relationship &quot;commits&quot; and choose &quot;commit&quot; for its destination. In the Data Model inspector, change Type to be &quot;To Many&quot;, which tells Core Data that each author has many Commits attached to it.</p><figure><img src="https://hackingwithswift.com/img/books/hws/38-10@2x.png" alt="All relationships between objects should be managed inside your data model, because it allows Core Data to understand exactly what data you&#39;re storing and how it will be used." tabindex="0" loading="lazy"><figcaption>All relationships between objects should be managed inside your data model, because it allows Core Data to understand exactly what data you&#39;re storing and how it will be used.</figcaption></figure><p>Now choose the Commit entity we created earlier and add a relationship named &quot;author&quot;. Choose Author for the destination then change &quot;No Inverse&quot; to be &quot;commits&quot;. In the Data Model inspector, change Type to be &quot;To One&quot;, because each commit has exactly one author).</p>',9)),n("p",null,[t[0]||(t[0]=a("That's it for our model changes, so press ")),s(e,{icon:"iconfont icon-Cmd"}),t[1]||(t[1]=a("+")),s(e,{icon:"iconfont icon-S"}),t[2]||(t[2]=a(" to save then ")),s(e,{icon:"iconfont icon-Cmd"}),t[3]||(t[3]=a("+")),s(e,{icon:"iconfont icon-R"}),t[4]||(t[4]=a(" now to build and run the app. What you’ll see is… well, exactly what you saw before: the same list of commits. What changed?"))]),t[25]||(t[25]=o('<p>You’ve already seen how <code>NSPersistentContainer</code> does a huge amount of set up work on your behalf. Well, it’s also doing something remarkably clever here too because we just changed our data model. By default Core Data doesn&#39;t know how to handle that – it considers any variation in its data model an unwelcome surprise, so we need to tell Core Data how to handle the changed model or we need to tell it to figure out the differences itself.</p><p>These two options are called &quot;heavyweight migrations&quot; and &quot;lightweight migrations.&quot; The latter is usually preferable, and is what we&#39;ll be doing here, but it&#39;s only possible when your changes are small enough that Core Data can perform the conversion correctly. We added a new &quot;authors&quot; relationship, so if we tell Core Data to perform a lightweight migration it will simply set that value to be empty.</p><p>The magic of <code>NSPersistentContainer</code> is that it automatically configures Core Data to perform a lightweight migration if it’s needed and if it’s possible – that is, if the changes are small enough to be figured out by the system. So, as long as your changes are strictly additive, <code>NSPersistentContainer</code> will take care of all the work. Awesome, right?</p><p>Of course, all this cleverness doesn&#39;t actually use our new Author entity. To do <em>that</em> we first need to do something rather tedious: we need to re-use the NSManagedObject generator, which, if you remember, also means having to re-add our custom changes such as removing optionality from its properties.</p><p>So, go back to the data model, and choose Editor &gt; Create NSManagedObject Subclass again. This time I want you to choose both Author and Commit, but don&#39;t forget to change Group from the blue project icon to the yellow folder icon – Xcode does love to keep resetting that particular option.</p><figure><img src="https://hackingwithswift.com/img/books/hws/38-11@2x.png" alt="Run the Create NSManagedObject Subclass procedure again, but this time make sure you select both entities." tabindex="0" loading="lazy"><figcaption>Run the Create NSManagedObject Subclass procedure again, but this time make sure you select both entities.</figcaption></figure>',6)),n("p",null,[t[5]||(t[5]=a("Once the files are generated you'll now have four files: two each for Author and Commit. We need to make a few changes to clean them up for use, starting with ")),s(e,{icon:"fa-brands fa-swift"}),t[6]||(t[6]=n("code",null,"Commit+CoreDataProperties.swift",-1)),t[7]||(t[7]=a(":"))]),t[26]||(t[26]=n("ol",null,[n("li",null,"Remove optionality from all five properties."),n("li",null,[a("Change "),n("code",null,"fetchRequest()"),a(" to "),n("code",null,"createFetchRequest()"),a(".")])],-1)),n("p",null,[t[8]||(t[8]=a("Now in ")),s(e,{icon:"fa-brands fa-swift"}),t[9]||(t[9]=n("code",null,"Author+CoreDataProperties.swift",-1)),t[10]||(t[10]=a(":"))]),t[27]||(t[27]=n("ol",null,[n("li",null,"Remove optionality from all three properties."),n("li",null,[a("Change "),n("code",null,"fetchRequest()"),a(" to "),n("code",null,"createFetchRequest()"),a(".")])],-1)),n("p",null,[t[11]||(t[11]=a("Notice that ")),s(e,{icon:"fa-brands fa-swift"}),t[12]||(t[12]=n("code",null,"Author+CoreDataProperties.swift",-1)),t[13]||(t[13]=a(" includes some extra methods for adding and removing commits."))]),t[28]||(t[28]=o(`<p>In order to attach authors to commits, I want to show you how to look for a specific named author, or create it if they don&#39;t exist already. Remember, we made the &quot;name&quot; attribute indexed, which makes it lightning fast for search. This needs to set up and execute a new <code>NSFetchRequest</code> (using an == <code>NSPredicate</code> to match the name), then use the result if there is one. If no matching author is found we&#39;ll create and configure a new author, and use that instead.</p><p>Put this new code just before the end of the <code>configure(commit:)</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> commitAuthor<span class="token punctuation">:</span> <span class="token class-name">Author</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// see if this author exists already</span></span>
<span class="line"><span class="token keyword">let</span> authorRequest <span class="token operator">=</span> <span class="token class-name">Author</span><span class="token punctuation">.</span><span class="token function">createFetchRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">authorRequest<span class="token punctuation">.</span>predicate <span class="token operator">=</span> <span class="token class-name">NSPredicate</span><span class="token punctuation">(</span>format<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;name == %@&quot;</span></span><span class="token punctuation">,</span> json<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;commit&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;committer&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">.</span>stringValue<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> authors <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> container<span class="token punctuation">.</span>viewContext<span class="token punctuation">.</span><span class="token function">fetch</span><span class="token punctuation">(</span>authorRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> authors<span class="token punctuation">.</span>count <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// we have this author already</span></span>
<span class="line">        commitAuthor <span class="token operator">=</span> authors<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> commitAuthor <span class="token operator">==</span> <span class="token nil constant">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// we didn&#39;t find a saved author - create a new one!</span></span>
<span class="line">    <span class="token keyword">let</span> author <span class="token operator">=</span> <span class="token class-name">Author</span><span class="token punctuation">(</span>context<span class="token punctuation">:</span> container<span class="token punctuation">.</span>viewContext<span class="token punctuation">)</span></span>
<span class="line">    author<span class="token punctuation">.</span>name <span class="token operator">=</span> json<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;commit&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;committer&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">.</span>stringValue</span>
<span class="line">    author<span class="token punctuation">.</span>email <span class="token operator">=</span> json<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;commit&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;committer&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;email&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">.</span>stringValue</span>
<span class="line">    commitAuthor <span class="token operator">=</span> author</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// use the author, either saved or new</span></span>
<span class="line">commit<span class="token punctuation">.</span>author <span class="token operator">=</span> commitAuthor</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You&#39;ll note that I used <code>try?</code> for <code>fetch()</code> this time, because we don&#39;t really care if the request failed: it will still fall through and get caught by the <code>if commitAuthor == nil</code> check later on.</p><p>To show that this worked, change your <code>cellForRowAt</code> method so that the detail text label contains the author name as well as the commit date, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">cell<span class="token punctuation">.</span>detailTextLabel<span class="token operator">!</span><span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;By </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">commit<span class="token punctuation">.</span>author<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> on </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">commit<span class="token punctuation">.</span>date<span class="token punctuation">.</span>description</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>You should be able to run the app now and see the author name appear after a moment, as Core Data merges the new data with the old.</p><p>Broadly speaking you don’t want to make these kinds of model changes while you’re still learning Core Data, so once you’ve verified that it works I would suggest you use “Erase All Content and Settings&quot; again in the simulator to make sure you have a clean foundation again.</p>`,8)),n("p",null,[t[14]||(t[14]=a("We can also show that the inverse relationship works, so it’s time to make the detail view controller do something. Open ")),s(e,{icon:"fa-brands fa-swift"}),t[15]||(t[15]=n("code",null,"DetailViewController.swift",-1)),t[16]||(t[16]=a(" and give it this property:"))]),t[29]||(t[29]=o(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> detailItem<span class="token punctuation">:</span> <span class="token class-name">Commit</span><span class="token operator">?</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now change its <code>viewDidLoad()</code> method to this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> detail <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>detailItem <span class="token punctuation">{</span></span>
<span class="line">        detailLabel<span class="token punctuation">.</span>text <span class="token operator">=</span> detail<span class="token punctuation">.</span>message</span>
<span class="line">        <span class="token comment">// navigationItem.rightBarButtonItem = UIBarButtonItem(title: &quot;Commit 1/\\(detail.author.commits.count)&quot;, style: .plain, target: self, action: #selector(showAuthorCommits))</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>I commented out one of the lines that will make a tappable button in the top-right corner showing how many other commits we have stored from this author. We haven&#39;t written a <code>showAuthorCommits()</code> method yet, but don&#39;t worry: that will be your homework later on!</p><p>Now that every commit has an author attached to it, I want to add one last filter to our <code>changeFilter()</code> method to show you just how clever <code>NSPredicate</code> is. Add this just before the &quot;Show all commits&quot; action:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">ac<span class="token punctuation">.</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name">UIAlertAction</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Show only Durian commits&quot;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">unowned</span> <span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token omit keyword">_</span> <span class="token keyword">in</span></span>
<span class="line">    <span class="token keyword">self</span><span class="token punctuation">.</span>commitPredicate <span class="token operator">=</span> <span class="token class-name">NSPredicate</span><span class="token punctuation">(</span>format<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;author.name == &#39;Joe Groff&#39;&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">loadSavedData</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There are three things that bear explaining in that code:</p>`,7)),n("ul",null,[t[20]||(t[20]=n("li",null,[a("By using "),n("code",null,"author.name"),a(' the predicate will perform two steps: it will find the "author" relation for our commit, then look up the "name" attribute of the matching object.')],-1)),t[21]||(t[21]=n("li",null,"Joe is one of Apple's Swift engineers. Although it's fairly likely you'll see commits by him, it can't be guaranteed – I'm pretty sure that Apple give him a couple of days vacation each year. Maybe.",-1)),n("li",null,[t[18]||(t[18]=a("Durian is a fruit that's very popular in south-east Asia, particularly Malaysia, Singapore and Thailand. Although most locals are big fans, the majority of foreigners find that it really, really stinks, so I'm sure there's some psychological reason why Joe Groff chose it for his website: ")),n("a",w,[s(e,{icon:"fas fa-globe"}),t[17]||(t[17]=a("duriansoftware.com"))]),t[19]||(t[19]=a("."))])]),t[30]||(t[30]=o(`<p>Run your app now and the new filter should work. Remember, it might not return any objects, depending on just how many commits Joe has done recently. No pressure, Joe! In those changes, I also modified the detail view controller so that it shows the commit message in full, or at least as full as it can given the limited space.</p><p>To test out that change, we need to write the <code>didSelectRowAt</code> method so that it loads a detail view controller from the storyboard, assigns it the selected commit, then pushes it onto the navigation stack. Add this method to <code>ViewController</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">tableView</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> tableView<span class="token punctuation">:</span> <span class="token class-name">UITableView</span><span class="token punctuation">,</span> didSelectRowAt indexPath<span class="token punctuation">:</span> <span class="token class-name">IndexPath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> vc <span class="token operator">=</span> storyboard<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">instantiateViewController</span><span class="token punctuation">(</span>withIdentifier<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Detail&quot;</span></span><span class="token punctuation">)</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token class-name">DetailViewController</span> <span class="token punctuation">{</span></span>
<span class="line">        vc<span class="token punctuation">.</span>detailItem <span class="token operator">=</span> commits<span class="token punctuation">[</span>indexPath<span class="token punctuation">.</span>row<span class="token punctuation">]</span></span>
<span class="line">        navigationController<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">pushViewController</span><span class="token punctuation">(</span>vc<span class="token punctuation">,</span> animated<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You should be able to run the app now and see it start to come together!</p>`,4))])}const q=u(k,[["render",b],["__file","08-adding-core-data-entity-relationships-lightweight-vs-heavyweight-migration.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/read/38/08-adding-core-data-entity-relationships-lightweight-vs-heavyweight-migration.html","title":"Examples of using NSPredicate to filter NSFetchRequest","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Examples of using NSPredicate to filter NSFetchRequest","description":"Article(s) > Examples of using NSPredicate to filter NSFetchRequest","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Examples of using NSPredicate to filter NSFetchRequest"},{"property":"og:description","content":"Examples of using NSPredicate to filter NSFetchRequest"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/38/07-examples-of-using-nspredicate-to-filter-nsfetchrequest.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/38/08-adding-core-data-entity-relationships-lightweight-vs-heavyweight-migration.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Examples of using NSPredicate to filter NSFetchRequest"}],["meta",{"property":"og:description","content":"Article(s) > Examples of using NSPredicate to filter NSFetchRequest"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/hws/38-9@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Examples of using NSPredicate to filter NSFetchRequest\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/hws/38-9@2x.png\\",\\"https://hackingwithswift.com/img/books/hws/38-10@2x.png\\",\\"https://hackingwithswift.com/img/books/hws/38-11@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":6.32,"words":1895},"filePathRelative":"hackingwithswift.com/read/38/08-adding-core-data-entity-relationships-lightweight-vs-heavyweight-migration.md","excerpt":"\\n"}');export{q as comp,x as data};