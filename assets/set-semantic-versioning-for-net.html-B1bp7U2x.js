import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as b,am as n,as as g,ao as t,at as d,au as u,ap as r,an as s,al as i,ak as f,aq as l,ar as v}from"./app-CpYYKbnj.js";const y={},w={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},V={class:"table-of-contents"},S={href:"https://semver.org/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://postman.com/",target:"_blank",rel:"noopener noreferrer"},N={href:"https://learn.microsoft.com/en-us/dotnet/standard/assembly/",target:"_blank",rel:"noopener noreferrer"},A={href:"https://andrewlock.net/version-vs-versionsuffix-vs-packageversion-what-do-they-all-mean/#how-to-set-the-version-number-when-you-build-your-app-library",target:"_blank",rel:"noopener noreferrer"},T={href:"https://jetbrains.com/decompiler/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://red-gate.com/products/reflector/",target:"_blank",rel:"noopener noreferrer"},j={href:"https://developercommunity.visualstudio.com/t/Build-adds-string-to-assembly-Informatio/10515014?sort=newest",target:"_blank",rel:"noopener noreferrer"};function E(m,e){const p=l("VPCard"),a=l("router-link"),c=l("SiteInfo"),o=l("FontIcon");return v(),b("div",null,[n("h1",w,[n("a",k,[n("span",null,g(m.$frontmatter.title)+" 관련",1)])]),t(p,d(u({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n("nav",V,[n("ul",null,[n("li",null,[t(a,{to:"#structure-of-a-semver-version-number"},{default:r(()=>e[0]||(e[0]=[s("Structure of a SemVer Version Number")])),_:1})]),n("li",null,[t(a,{to:"#the-many-version-numbers-of-a-net-assembly"},{default:r(()=>e[1]||(e[1]=[s("The Many Version Numbers of a .NET Assembly")])),_:1})]),n("li",null,[t(a,{to:"#how-to-set-a-semver-version-number"},{default:r(()=>e[2]||(e[2]=[s("How to Set a SemVer Version Number")])),_:1})]),n("li",null,[t(a,{to:"#how-to-read-an-assembly-s-semver-version-at-runtime"},{default:r(()=>e[3]||(e[3]=[s("How to Read an Assembly’s SemVer Version at Runtime")])),_:1})]),n("li",null,[t(a,{to:"#conclusion"},{default:r(()=>e[4]||(e[4]=[s("Conclusion")])),_:1})])])]),e[53]||(e[53]=n("hr",null,null,-1)),t(c,{name:"How to Set Semantic Versioning for .NET Core Apps and Libraries",desc:"Semantic Versioning (or SemVer for short) is a software versioning scheme that stipulates three-part version numbers in the form <major>.<minor>.<patch>, such as 1.0.2, with an optional prerelease suffix in the form -<prerelease>, as in 1.0.2-beta. S...",url:"https://freecodecamp.org/news/set-semantic-versioning-for-net",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1731065367635/f8ce5091-d526-4d09-8282-2ffe63cead40.jpeg"}),n("p",null,[n("a",S,[t(o,{icon:"fas fa-globe"}),e[5]||(e[5]=s("Semantic Versioning"))]),e[6]||(e[6]=s(" (or SemVer for short) is a software versioning scheme that stipulates three-part version numbers in the form ")),e[7]||(e[7]=n("code",null,"<major>.<minor>.<patch>",-1)),e[8]||(e[8]=s(", such as ")),e[9]||(e[9]=n("code",null,"1.0.2",-1)),e[10]||(e[10]=s(", with an optional prerelease suffix in the form ")),e[11]||(e[11]=n("code",null,"-<prerelease>",-1)),e[12]||(e[12]=s(", as in ")),e[13]||(e[13]=n("code",null,"1.0.2-beta",-1)),e[14]||(e[14]=s("."))]),e[54]||(e[54]=n("p",null,[s("SemVer is perhaps the the most widely used versioning scheme today. For example, both "),n("a",{href:"https://learn.microsoft.com/en-us/nuget/concepts/package-versioning?tabs=semver20sort#pre-release-versions",target:"_blank",rel:"noopener noreferrer"},"Nuget"),s(" and "),n("a",{href:"https://docs.npmjs.com/about-semantic-versioning",target:"_blank",rel:"noopener noreferrer"},"npm"),s(" recommend and support it, and VS Code "),n("a",{href:"https://github.com/microsoft/vscode/releases",target:"_blank",rel:"noopener noreferrer"},"uses it"),s(" as well.")],-1)),e[55]||(e[55]=n("p",null,"In most GitHub repos that use the GitHub Releases feature to publish releases, you would see a SemVer version number in the latest release badge on the home page, as can be seen in the screenshot below:",-1)),e[56]||(e[56]=n("figure",null,[n("img",{src:"https://cdn.hashnode.com/res/hashnode/image/upload/v1730988665455/34706cc9-7cf3-401c-9407-2f15933fef49.png",alt:"Latest release badge in Next.js GitHub repository showing the three-part Semantic Versioning version number 15.0.3",tabindex:"0",loading:"lazy"}),n("figcaption",null,"Latest release badge in Next.js GitHub repository showing the three-part Semantic Versioning version number 15.0.3")],-1)),e[57]||(e[57]=n("p",null,"I frequently need to set a SemVer version number when building ASP.NET Core API projects, and then read or report this at runtime.",-1)),n("p",null,[e[16]||(e[16]=s("For example, if I build a minimal API with its version set to ")),e[17]||(e[17]=n("code",null,"1.0.2-beta",-1)),e[18]||(e[18]=s(", this would be reported by a ")),e[19]||(e[19]=n("code",null,"/version",-1)),e[20]||(e[20]=s(" endpoint exposed by the API, as shown in the screenshot below from ")),e[21]||(e[21]=n("a",{href:"https://hoppscotch.io/",target:"_blank",rel:"noopener noreferrer"},"Hoppscotch",-1)),e[22]||(e[22]=s(" (this is a ")),n("a",I,[t(o,{icon:"iconfont icon-postman"}),e[15]||(e[15]=s("Postman"))]),e[23]||(e[23]=s("-like tool with the convenience that it runs the browser):"))]),e[58]||(e[58]=n("figure",null,[n("img",{src:"https://cdn.hashnode.com/res/hashnode/image/upload/v1730746046707/eb8968ef-41c7-4919-a0ed-7aeb25e0a03d.png",alt:`Screenshot of Hoppscotch shows that a was call made to the  endpoint of an API running locally (on localhost). The result was a JSON document containing a "version" property whose value is the API's SemVer version number of "1.0.2-beta".`,tabindex:"0",loading:"lazy"}),n("figcaption",null,[s("Screenshot of Hoppscotch shows that a was call made to the "),n("code",null,"/version"),s(` endpoint of an API running locally (on localhost). The result was a JSON document containing a "version" property whose value is the API's SemVer version number of "1.0.2-beta".`)])],-1)),e[59]||(e[59]=n("p",null,"Checking that the version reported from deployed services, such as web apps and APIs, is correct is a crucial part of my CD pipeline and is one of the smoke tests I use to determine if a deployment succeeded.",-1)),n("p",null,[e[25]||(e[25]=s("One slight complication when setting a SemVer version number on .NET assemblies is that .NET originally used four part version numbers like ")),e[26]||(e[26]=n("code",null,"1.0.3.212",-1)),e[27]||(e[27]=s(" and assemblies still have these (assembly is the .NET term for ")),n("a",N,[t(o,{icon:"fa-brands fa-microsoft"}),e[24]||(e[24]=s("units of code compiled to .NET bytecode"))]),e[28]||(e[28]=s(", the most typical of these being dll’s and exe’s)."))]),e[60]||(e[60]=i('<p>The other is that .NET has not one but but many, slightly different, version numbers that are present in the same assembly.</p><p>In this article, I’ll show you how to sidestep these quirks and stamp a SemVer version number on a .NET assembly during build. That is, on a compiled <strong>.exe</strong> or <strong>.dll</strong>, and how to read it at runtime.</p><hr><h2 id="structure-of-a-semver-version-number" tabindex="-1"><a class="header-anchor" href="#structure-of-a-semver-version-number"><span>Structure of a SemVer Version Number</span></a></h2><p>Consider a SemVer version number like <code>1.0.2</code> or <code>1.0.2-beta</code>. It has the form <code>&lt;major&gt;</code>.<code>&lt;minor&gt;</code>.<code>&lt;patch&gt;</code>-<code>&lt;prerelease&gt;</code></p><p>This is what the various components mean:</p><p>The <code>&lt;major&gt;</code> component of the version number would be incremented only if the new release would break an existing (most recent) release.</p><p>In case of a UI app, clients may be taken to mean <em>human clients</em>. So if the new release would break users’ existing assets such as workflow definitions, this would call for incrementing the major version number. In this event, if the previous release was <code>1.0.2</code>, the new release should be <code>2.0.0</code> (all lower components of the version number would reset).</p><p>In case of a library, such as a library package on Nuget or NPM, the clients would be other code. So if the new release would break existing client code, i.e. it would not be backwards compatible with its own previous version, then again it is the <code>&lt;major&gt;</code> component would be incremented.</p><p><code>&lt;minor&gt;</code> is incremented if new features have been added but the new version is still backwards compatible. So from <code>1.0.2</code> you would go to <code>1.1.0</code>.</p><p><code>&lt;patch&gt;</code> is incremented when a new release needs to be made even though there is no breaking change and no new functionality has been added. This could happen, for example, if there was a bugfix that had to be released.</p><p><code>-&lt;prerelease&gt;</code> suffix is optional. It is typically suffixed to a three part version number when software needs to be made available during prerelease testing phases such as alpha and beta. For example, before generally releasing version <code>1.0.2</code> of your software, you can make it available to your beta testers as <code>1.0.2-beta</code>.</p><p>The <code>&lt;prerelease&gt;</code> component can pretty much be any string of your choosing and the only requirement is that it is either an <em>alphanumeric identifier</em> such as <code>beta</code> or <code>12</code> or <code>alpha2</code> (no characters other than numbers or letters of the alphabet) or multiple alphanumeric identifiers separated by a dot(<code>.</code>) e.g. <code>development.version</code>.</p><hr><h2 id="the-many-version-numbers-of-a-net-assembly" tabindex="-1"><a class="header-anchor" href="#the-many-version-numbers-of-a-net-assembly"><span>The Many Version Numbers of a .NET Assembly</span></a></h2>',15)),n("p",null,[e[30]||(e[30]=s("As Andrew Lock’s ")),n("a",A,[t(o,{icon:"fas fa-globe"}),e[29]||(e[29]=s("article on .NET versioning"))]),e[31]||(e[31]=s(" explains, a .NET assembly has not one but several different version numbers:"))]),e[61]||(e[61]=i("<ul><li><strong>AssemblyVersion:</strong> This is a four part version number, for example, <code>1.0.2.0</code>. It is used by the runtime when loading linked assemblies.</li><li><strong>FileVersion:</strong> This is the version number reported for a <strong>.dll</strong> file in Windows File Explorer when you right click the assembly and select Properties.</li><li><strong>InformationalVersion:</strong> Yet another version number and, like FileVersion, can be seen in Properties dialog if you right-click the assembly in Windows and select Properties. This can contain strings and not only integers and dots that AssemblyVersion and FileVersion are constrained to.</li><li><strong>PackageVersion:</strong> If the project is a Nuget package, this would be the version number of the package that the assembly is part of.</li></ul>",1)),n("p",null,[e[34]||(e[34]=s("All of these version numbers are emitted into the assembly during compilation as metadata. You can see them if you inspect the assembly with ")),n("a",T,[t(o,{icon:"iconfont icon-jetbrains"}),e[32]||(e[32]=s("JetBrains dotPeek"))]),e[35]||(e[35]=s(" (free) or ")),n("a",x,[t(o,{icon:"fas fa-globe"}),e[33]||(e[33]=s("Red gate Reflector"))]),e[36]||(e[36]=s(" (not free) or similar."))]),e[62]||(e[62]=i(`<p>FileVersion and InformationalVersion can also be seen in the Details tab of the Properties dialog that appears when you right-click the assembly file in Windows File Explorer and select Properties:</p><figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1730755185100/d444a84b-5148-47e6-ab75-951d9f0f73ac.png" alt="Properties Dialog for a compiled .NET DLL in Windows File Explorer. It shows the DLL&#39;s &quot;File Version&quot; attribute with value &quot;1.0.2.0&quot; and its &quot;Product version&quot; attribute with value &quot;1.0.2-beta&quot;" tabindex="0" loading="lazy"><figcaption>Properties Dialog for a compiled .NET DLL in Windows File Explorer. It shows the DLL&#39;s &quot;File Version&quot; attribute with value &quot;1.0.2.0&quot; and its &quot;Product version&quot; attribute with value &quot;1.0.2-beta&quot;</figcaption></figure><p>In the screenshot above, “Product version” is the caption for InformationalVersion whereas “File version” is the caption for FIleVersion.</p><p>Of the four types of version numbers described above, only the first three apply to any assembly (i.e. whether or not the assembly is part of a Nuget package).</p><p>Of those three, AssemblyVersion alsways adds a <code>0</code> in the fourth place if you try to set a SemVer version which only has three numbers (plus an optional <em>prerelease</em> suffix). For example if you try to set a SemVer version of <code>1.0.2-beta</code> during build and then read the AssemblyVersion value at run time in the assembly, it would be <code>1.0.2.0</code>.</p><p>FileVersion does the same, as shown in the screenshot above.</p><p>InformationalVersion is the only version number which would get set exactly to the server version you set during build, as the screenshot above shows.</p><p>Therefore, InformationalVersion is the version that should be read at runtime to retrieve the assembly’s SemVer version.</p><hr><h2 id="how-to-set-a-semver-version-number" tabindex="-1"><a class="header-anchor" href="#how-to-set-a-semver-version-number"><span>How to Set a SemVer Version Number</span></a></h2><p>There are two things you need to do to set a SemVer version number on an assembly during build.</p><p><strong>First,</strong> in a <code>&lt;PropertyGroup&gt;</code> element in the project’s <code>csproj</code> file, add element <code>&lt;IncludeSourceRevisionInInformationalVersion&gt;false&lt;/IncludeSourceRevisionInInformationalVersion&gt;</code>:</p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="csproj"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PropertyGroup</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"> ...</span>
<span class="line"> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>IncludeSourceRevisionInInformationalVersion</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>IncludeSourceRevisionInInformationalVersion</span><span class="token punctuation">&gt;</span></span> </span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>PropertyGroup</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13)),n("p",null,[e[38]||(e[38]=s("As described in ")),n("a",j,[t(o,{icon:"iconfont icon-visualstudio"}),e[37]||(e[37]=s("this issue"))]),e[39]||(e[39]=s(", this ensures that InformationalVersion is set exactly to the SemVer version number we specified and does not get a ")),e[40]||(e[40]=n("code",null,"+<hash code>",-1)),e[41]||(e[41]=s(" tacked on at the end."))]),e[63]||(e[63]=i(`<p><strong>Second</strong>, pass the version number as value of <code>Version</code> property passed to <code>dotnet build</code> command e.g.:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">dotnet build <span class="token parameter variable">--configuration</span> Release <span class="token parameter variable">-p</span> <span class="token assign-left variable">Version</span><span class="token operator">=</span><span class="token number">1.0</span>.2-beta</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>This would set InformationalVersion in the compiled assembly (.exe or .dll file) to <code>1.0.2-beta</code>.</p><p>Incidentally, it would also set AssemblyVersion and FileVersion (an extra <code>0</code> would be added to the end of <code>1.0.2</code>) but we are not interested in those.</p><p>Note that instead pf passing <code>Version</code> argument on the command line, you can set MS Build property <code>&lt;Version&gt;1.0.2-beta&lt;/Version&gt;</code> in a <code>&lt;PropertyGroup&gt;</code> element in the csproj file. However passing a value of <code>Version</code> parameter to <code>dotnet build</code> is simpler because the csproj file does not need to be modified everytime the version number is incremented. This is helpful in CD pipelines. Also, by default, csproj files do not have any property related to versioning.</p><hr><h2 id="how-to-read-an-assembly-s-semver-version-at-runtime" tabindex="-1"><a class="header-anchor" href="#how-to-read-an-assembly-s-semver-version-at-runtime"><span>How to Read an Assembly’s SemVer Version at Runtime</span></a></h2><p>Code that reads InfromationalVersion at run time is as follows:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> version <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">GetEntryAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">?.</span></span>
<span class="line">  <span class="token generic-method"><span class="token function">GetCustomAttribute</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AssemblyInformationalVersionAttribute<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">?.</span></span>
<span class="line">  InformationalVersion<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)),n("p",null,[e[42]||(e[42]=s("In my minimal APIs, to add a ")),e[43]||(e[43]=n("code",null,"/version",-1)),e[44]||(e[44]=s(" endpoint as I showed in the Introduction section above, I place the above snippet in ")),t(o,{icon:"iconfont icon-csharp"}),e[45]||(e[45]=n("code",null,"Program.cs",-1)),e[46]||(e[46]=s(", then add the following snippet immediately after. Note that the whole thing should appear ")),e[47]||(e[47]=n("strong",null,"before",-1)),e[48]||(e[48]=s()),e[49]||(e[49]=n("code",null,"builder.Build()",-1)),e[50]||(e[50]=s()),e[51]||(e[51]=n("strong",null,"is called",-1)),e[52]||(e[52]=s(":"))]),e[64]||(e[64]=i(`<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="Program.cs"><pre><code><span class="line"><span class="token comment">//this object of an anonymous type will </span></span>
<span class="line"><span class="token comment">//be serialised as JSON in response body</span></span>
<span class="line"><span class="token comment">//when returned by a handler</span></span>
<span class="line"><span class="token class-name"><span class="token keyword">var</span></span> objVersion <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Version <span class="token operator">=</span> version <span class="token operator">??</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//OTHER CODE</span></span>
<span class="line"><span class="token comment">//var app = builder.Build()</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After <code>builder.Build()</code> is called, I create the handler for the <code>/version</code> endpoint:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">app<span class="token punctuation">.</span><span class="token function">MapGet</span><span class="token punctuation">(</span><span class="token string">&quot;/version&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> objVersion<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now when I run the API project and call the <code>/version</code> endpoint, I get the version number back in a JSON object in HTTP response body:</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.2-beta&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is what the Hoppscotch screenshot in the Introduction showed.</p><hr><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion</span></a></h2><p>This article showed you how to set a SemVer version number in your .NET assemblies, libraries, or apps.</p><p>It also showed you how to read the version number at runtime.</p>`,10)),f(" TODO: add ARTICLE CARD "),t(p,d(u({title:"How to Set Semantic Versioning for .NET Core Apps and Libraries",desc:"Semantic Versioning (or SemVer for short) is a software versioning scheme that stipulates three-part version numbers in the form <major>.<minor>.<patch>, such as 1.0.2, with an optional prerelease suffix in the form -<prerelease>, as in 1.0.2-beta. S...",link:"https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-semantic-versioning-for-net.html",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16)])}const q=h(y,[["render",E],["__file","set-semantic-versioning-for-net.html.vue"]]),H=JSON.parse('{"path":"/freecodecamp.org/set-semantic-versioning-for-net.html","title":"How to Set Semantic Versioning for .NET Core Apps and Libraries","lang":"en-US","frontmatter":{"lang":"en-US","title":"How to Set Semantic Versioning for .NET Core Apps and Libraries","description":"Article(s) > How to Set Semantic Versioning for .NET Core Apps and Libraries","icon":"iconfont icon-csharp","category":["C#","Article(s)"],"tag":["blog","freecodecamp.org","cs","csharp"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to Set Semantic Versioning for .NET Core Apps and Libraries"},{"property":"og:description","content":"How to Set Semantic Versioning for .NET Core Apps and Libraries"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-semantic-versioning-for-net.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-semantic-versioning-for-net.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to Set Semantic Versioning for .NET Core Apps and Libraries"}],["meta",{"property":"og:description","content":"Article(s) > How to Set Semantic Versioning for .NET Core Apps and Libraries"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1731065367635/f8ce5091-d526-4d09-8282-2ffe63cead40.jpeg"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1731065367635/f8ce5091-d526-4d09-8282-2ffe63cead40.jpeg"}],["meta",{"name":"twitter:image:alt","content":"How to Set Semantic Versioning for .NET Core Apps and Libraries"}],["meta",{"property":"article:author","content":"Naveed Ausaf"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:published_time","content":"2024-11-08T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to Set Semantic Versioning for .NET Core Apps and Libraries\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1730988665455/34706cc9-7cf3-401c-9407-2f15933fef49.png\\",\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1730746046707/eb8968ef-41c7-4919-a0ed-7aeb25e0a03d.png\\",\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1730755185100/d444a84b-5148-47e6-ab75-951d9f0f73ac.png\\"],\\"datePublished\\":\\"2024-11-08T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Naveed Ausaf\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2024-11-08T00:00:00.000Z","isOriginal":false,"author":"Naveed Ausaf","cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1731065367635/f8ce5091-d526-4d09-8282-2ffe63cead40.jpeg"},"headers":[{"level":2,"title":"Structure of a SemVer Version Number","slug":"structure-of-a-semver-version-number","link":"#structure-of-a-semver-version-number","children":[]},{"level":2,"title":"The Many Version Numbers of a .NET Assembly","slug":"the-many-version-numbers-of-a-net-assembly","link":"#the-many-version-numbers-of-a-net-assembly","children":[]},{"level":2,"title":"How to Set a SemVer Version Number","slug":"how-to-set-a-semver-version-number","link":"#how-to-set-a-semver-version-number","children":[]},{"level":2,"title":"How to Read an Assembly’s SemVer Version at Runtime","slug":"how-to-read-an-assembly-s-semver-version-at-runtime","link":"#how-to-read-an-assembly-s-semver-version-at-runtime","children":[]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":6.52,"words":1956},"filePathRelative":"freecodecamp.org/set-semantic-versioning-for-net.md","localizedDate":"November 8, 2024","excerpt":"\\n","copyright":{"author":"Naveed Ausaf"}}');export{q as comp,H as data};