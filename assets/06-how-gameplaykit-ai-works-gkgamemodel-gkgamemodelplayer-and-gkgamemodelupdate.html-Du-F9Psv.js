import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as a,as as p,ao as o,at as s,au as n,al as c,aq as m,ar as d}from"./app-CpYYKbnj.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function y(i,e){const t=m("VPCard");return d(),r("div",null,[a("h1",u,[a("a",g,[a("span",null,p(i.$frontmatter.title)+" 관련",1)])]),o(t,s(n({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),e[1]||(e[1]=a("hr",null,null,-1)),o(t,s(n({title:"How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate | Hacking with iOS",desc:"How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate",link:"https://hackingwithswift.com/read/34/6/how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=c(`<p>Amongst the many features introduced in GameplayKit, one of the most immediately useful is its ability to provide artificial intelligence that can evaluate a situation and make smart choices. We&#39;re going to be using it in our Four in a Row game to provide a meaningful opponent, but first it&#39;s essential that you understand how GameplayKit tackles the AI problem because it directly affects the code we&#39;ll write.</p><p>GameplayKit has three protocols we need to implement in various parts of our model:</p><ul><li>The <code>GKGameModel</code> protocol is used to represent the state of play, which means it needs to know where all the game pieces are, who the players are, what happens after each move is made, and what the score for a player is given any state.</li><li>The <code>GKGameModelPlayer</code> protocol is used to represent one player in the game. This protocol is so simple we already implemented it: all you need to do is make sure your player class has a <code>playerId</code> integer. It&#39;s used to identify a player uniquely inside the AI.</li><li>The <code>GKGameModelUpdate</code> protocol is used to represent one possible move in the game. For us, that means storing a column number to represent a piece being played there. This protocol requires that you also store a <code>value</code> integer, which is used to rank all possible results by quality to help GameplayKit make a good choice.</li></ul><p>We have a sensible match for the first two in our <code>Board</code> and <code>Player</code> classes, but we have nothing suitable for <code>GKGameModelUpdate</code> so let&#39;s create that now. Like I said, this needs to track only how &quot;good&quot; a move is, where each move is represented by a column number to play.</p><p>This is easy to do, so please go ahead and create a new Cocoa Touch class in your project. Name it “Move”, and make it subclass from “NSObject”. Now replace its source code with this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">GameplayKit</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token class-name">UIKit</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Move</span><span class="token punctuation">:</span> <span class="token class-name">NSObject</span><span class="token punctuation">,</span> <span class="token class-name">GKGameModelUpdate</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> value<span class="token punctuation">:</span> <span class="token class-name">Int</span> <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">var</span> column<span class="token punctuation">:</span> <span class="token class-name">Int</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>column<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>column <span class="token operator">=</span> column</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That&#39;s it: the default for <code>value</code> is 0, and we create a <code>Move</code> object by passing in the column it represents. We&#39;re done with that class, and I already said we were finished with the <code>Player</code> class, which means we can focus our mental energies on what remains: <code>Board</code>.</p><p>GameplayKit&#39;s artificial intelligence works through brute force: it tries every possible move, then tries every possible follow-on move, then every possible follow-on follow-on move, etc. This runs up combinations extremely quickly, particularly when you consider that there are 4,531,985,219,092 unique positions for all the pieces on the board! So, you will inevitably limit the depth of the search to provide just enough intelligence to be interesting.</p><p>Now, this bit is really important, so read carefully. When you ask GameplayKit to find a move, it will examine all possible moves. To begin with, that is every column, because they all have space for moves in them. It then takes a copy of the game, and makes a virtual move on that copy. It then takes a copy of the game, and makes a different virtual move, and so on until until all initial first moves have been made.</p><p>Next, it starts to re-use its copies to save on memory: it will take one of those copies and apply a game state to it, which means it will reset the board so that it matches the position after one of its virtual moves. It will then rinse and repeat: it will examine all possible moves, and make one. It does this for all moves, and does so recursively until it has created a tree of all possible moves and outcomes, or at least as many as you ask it to scan.</p><p>Each time the AI has made a move, it will ask us what the player score is. For some games this will be as simple as returning a score variable, but for our 4IR game it&#39;s a bit trickier because there is no score, only a win or a loss. The original Apple source code provides a simple heuristic for this, and I&#39;ve kept it here because it&#39;s quite fun – the AI can sometimes make dumb mistakes, or sometimes play like a genius, which makes the game interesting!</p><p>If you were wondering, a <em>heuristic</em> is the computer science term for a guesstimate – it&#39;s a function that tries to solve a problem quickly by taking shortcuts. For us, that means we&#39;ll tell the AI the player&#39;s score is 1000 if a move wins the game, -1000 if a move loses the game, or 0 otherwise.</p><p>All this information is important because I hope now you can see why we separate the game model from the game view – why we have a <code>slots</code> array inside the game board and a <code>placedChips</code> array inside the view controller. If you&#39;re still not sure, try to imagine how many moves the AI needs to simulate in order to decide what to do – our board has seven columns, so:</p><ul><li>The player goes first, and all seven columns are valid.</li><li>The AI calculates its first move, which could be any of those seven columns. (7 moves in total.)</li><li>The AI then calculates what the player might do, but the player&#39;s move depends on the previous AI move so it has to calculate one player move for every possible AI move. (49 more moves; 56 in total.)</li><li>The AI then calculates what its second move might look like, which of course depends on the players first and second moves, and the AI&#39;s first move. So, for every one of those 49 moves, it has to calculate 7 more. (343 moves; 399 in total.)</li></ul><p>…and so on. Eventually one column will become full so the multiplications will decrease, but you&#39;re still talking many thousands of copies of the board. Now imagine if the <code>Board</code> class kept track of all the <code>UIViews</code> used to draw the chips – suddenly we&#39;d be copying far more than intended, and doing it 5000 times!</p><p>So: if a couple of chapters ago you were thinking I was wasting your time by forcing you to separate your model from your view, I hope you can now see why. AI is slow enough without doing a huge stack of extra work for no reason!</p><p>That&#39;s enough theory, it&#39;s time for some code. If you remember nothing else, remember this: to simulate a move, GameplayKit takes copies of our board state, finds all possible moves that can happen, and applies them all on different copies.</p>`,17))])}const f=l(h,[["render",y],["__file","06-how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/read/34/06-how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate.html","title":"How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate","description":"Article(s) > How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"},{"property":"og:description","content":"How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/06-how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/06-how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"}],["meta",{"property":"og:description","content":"Article(s) > How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.29,"words":1288},"filePathRelative":"hackingwithswift.com/read/34/06-how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate.md","excerpt":"\\n"}');export{f as comp,v as data};