import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as n,as as u,ao as s,at as m,au as h,ap as e,al as k,aq as o,ar as g,an as p}from"./app-CpYYKbnj.js";const f={},y={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"},b={class:"table-of-contents"};function w(c,a){const l=o("VPCard"),t=o("router-link"),i=o("SiteInfo");return g(),d("div",null,[n("h1",y,[n("a",v,[n("span",null,u(c.$frontmatter.title)+" 관련",1)])]),s(l,m(h({title:"How to Build and Deploy a Smart Contract With Rust and the Gear Protocol",desc:"Smart contracts are like digital agreements that run on blockchain technology, making transactions automatic and secure. While many people use Ethereum and Solidity to create these contracts, there are other options that can be just as powerful.  One...",link:"/freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),n("nav",b,[n("ul",null,[n("li",null,[s(t,{to:"#metadata"},{default:e(()=>a[0]||(a[0]=[p("Metadata")])),_:1})]),n("li",null,[s(t,{to:"#example-of-a-metadata"},{default:e(()=>a[1]||(a[1]=[p("Example Of A Metadata")])),_:1})]),n("li",null,[s(t,{to:"#state"},{default:e(()=>a[2]||(a[2]=[p("State")])),_:1})])])]),a[3]||(a[3]=n("hr",null,null,-1)),s(i,{name:"How to Build and Deploy a Smart Contract With Rust and the Gear Protocol",desc:"Smart contracts are like digital agreements that run on blockchain technology, making transactions automatic and secure. While many people use Ethereum and Solidity to create these contracts, there are other options that can be just as powerful.  One...",url:"https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-metadata-amp-state",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"}),a[4]||(a[4]=k(`<p>Metadata and state goes hand in hand with each other. In order for your client application to allow users to interact or request data(state) from your smart contract, you need to define both the metadata and state, and even if the state is defined, and the metadata was not provided, you cannot access the any data.</p><p>So let&#39;s take each step by step.</p><hr><h2 id="metadata" tabindex="-1"><a class="header-anchor" href="#metadata"><span>Metadata</span></a></h2><p>In the Gear Protocol world, metadata is like a blueprint for defining how different parts of a decentralized app (dApp) talk to each other. It&#39;s similar to how interfaces or types work in TypeScript. These blueprints describe how things like initial data type to expect, handling messages, and swapping data happen in the dApp, whether <code>In</code>, <code>Out</code>, and <code>InOut</code>.</p><p>When we make clear blueprints, it helps developers make sure that all the different parts of the dApp understand each other&#39;s data formats. This makes it easy for the smart contract (program-actor) and the client side app to share data smoothly.</p><p>To create these blueprints for your program, we use the <code>gmeta</code> tool. It helps us define these blueprints by outlining how different interactions work and what kinds of data they involve.</p><p>So, think of metadata in your program as similar to how interfaces/types work in TypeScript. They help organize how the different parts of your dApp communicate and understand each other&#39;s data.</p><hr><h2 id="example-of-a-metadata" tabindex="-1"><a class="header-anchor" href="#example-of-a-metadata"><span>Example Of A Metadata</span></a></h2><div class="language-rust line-numbers-mode" data-highlighter="prismjs" data-ext="rs" data-title="rs"><pre><code><span class="line"><span class="token keyword">use</span> <span class="token namespace">gmeta<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token class-name">InOut</span><span class="token punctuation">,</span> <span class="token class-name">Metadata</span><span class="token punctuation">,</span> <span class="token class-name">Out</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">pub</span> <span class="token keyword">struct</span> <span class="token type-definition class-name">ProgramMetadata</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Be sure to describe all the types.</span></span>
<span class="line"><span class="token comment">// But if any of the endpoints is missing in your program, you can use ();</span></span>
<span class="line"><span class="token comment">// as indicated in the case of \`type Signal\`.</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">impl</span> <span class="token class-name">Metadata</span> <span class="token keyword">for</span> <span class="token class-name">ProgramMetadata</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">type</span> <span class="token type-definition class-name">Init</span> <span class="token operator">=</span> <span class="token class-name">InOut</span><span class="token operator">&lt;</span><span class="token class-name">MessageInitIn</span><span class="token punctuation">,</span> <span class="token class-name">MessageInitOut</span><span class="token operator">&gt;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">type</span> <span class="token type-definition class-name">Handle</span> <span class="token operator">=</span> <span class="token class-name">InOut</span><span class="token operator">&lt;</span><span class="token class-name">MessageIn</span><span class="token punctuation">,</span> <span class="token class-name">MessageOut</span><span class="token operator">&gt;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">type</span> <span class="token type-definition class-name">Others</span> <span class="token operator">=</span> <span class="token class-name">InOut</span><span class="token operator">&lt;</span><span class="token class-name">MessageAsyncIn</span><span class="token punctuation">,</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">u8</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">type</span> <span class="token type-definition class-name">Reply</span> <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">type</span> <span class="token type-definition class-name">Signal</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">type</span> <span class="token type-definition class-name">State</span> <span class="token operator">=</span> <span class="token class-name">Out</span><span class="token operator">&lt;</span><span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">Wallet</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above is an example of how it is defined. Don&#39;t worry if you don&#39;t understand it now, I&#39;ll cover more into details later. Now let&#39;s talk about the state.</p><hr><h2 id="state" tabindex="-1"><a class="header-anchor" href="#state"><span>State</span></a></h2><p>In Gear Protocol, the <code>state</code> function serves as a dedicated storage space within a program. This storage allows us to store and retrieve data as needed. Since this data is stored in persistent memory, it remains accessible even after the contract stops running. What&#39;s fascinating is that anyone with access to the blockchain can view this stored data. The <code>state</code> function doesn&#39;t alter or modify the blockchain itself. Instead, it simply provides a way to access stored data within the program.</p><p>Here is an example of a <code>state</code> function:</p><div class="language-rust line-numbers-mode" data-highlighter="prismjs" data-ext="rs" data-title="rs"><pre><code><span class="line"><span class="token comment">// Describe state structure</span></span>
<span class="line"><span class="token attribute attr-name">#[derive(TypeInfo, Decode, Encode, Clone)]</span></span>
<span class="line"><span class="token keyword">pub</span> <span class="token keyword">struct</span> <span class="token type-definition class-name">Messages</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">pub</span> id<span class="token punctuation">:</span> <span class="token class-name">ActorId</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token keyword">pub</span> content<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Declare and initialize the state</span></span>
<span class="line"><span class="token keyword">static</span> <span class="token keyword">mut</span> <span class="token constant">MESSAGES</span><span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">Messages</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token class-name">Vec</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute attr-name">#[no_mangle]</span></span>
<span class="line"><span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span> <span class="token keyword">fn</span> <span class="token function-definition function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token namespace">msg<span class="token punctuation">::</span></span><span class="token function">reply</span><span class="token punctuation">(</span><span class="token keyword">unsafe</span> <span class="token punctuation">{</span> <span class="token constant">MESSAGES</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to share state&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>When the <code>state</code> function is called, it returns a list of <code>wallets</code> data stored within the program. This means that once a program is deployed on the blockchain, anyone can read its state.</p><p>Additionally, developers have the flexibility to create custom programs that can read the state. This empowers you and I to tailor our data access methods according to the specific needs for our dApp, even if the primary program undergoes changes.</p><p>The key takeaway is that, the <code>state</code> function facilitates access to data stored in smart contracts. It&#39;s worth noting that both users and other programs can access the state of a program, providing a versatile means of interacting with stored data.</p>`,20))])}const x=r(f,[["render",w],["__file","metadata-amp-state.html.vue"]]),I=JSON.parse('{"path":"/freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/metadata-amp-state.html","title":"Metadata & State","lang":"en-US","frontmatter":{"lang":"en-US","title":"Metadata & State","description":"(8/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol","category":["Rust","Article(s)"],"tag":["blog","freecodecamp.org","rust","rs"],"head":[[{"meta":null},{"property":"og:title","content":"(8/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"},{"property":"og:description","content":"Metadata & State"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/metadata-amp-state.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/metadata-amp-state.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Metadata & State"}],["meta",{"property":"og:description","content":"(8/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"}],["meta",{"name":"twitter:image:alt","content":"Metadata & State"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"rust"}],["meta",{"property":"article:tag","content":"rs"}],["meta",{"property":"article:published_time","content":"2024-06-04T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Metadata & State\\",\\"image\\":[\\"https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png\\"],\\"datePublished\\":\\"2024-06-04T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2024-06-04T00:00:00.000Z","isOriginal":false,"cover":"https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"},"headers":[{"level":2,"title":"Metadata","slug":"metadata","link":"#metadata","children":[]},{"level":2,"title":"Example Of A Metadata","slug":"example-of-a-metadata","link":"#example-of-a-metadata","children":[]},{"level":2,"title":"State","slug":"state","link":"#state","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":2.86,"words":859},"filePathRelative":"freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/metadata-amp-state.md","localizedDate":"June 4, 2024","excerpt":"\\n"}');export{x as comp,I as data};