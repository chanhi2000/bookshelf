import{_ as f}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as m,ao as o,at as d,au as u,ap as a,al as s,an as i,ak as y,aq as r,ar as b}from"./app-CpYYKbnj.js";const k={},v={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},S={class:"table-of-contents"},C={href:"https://insert-koin.io/",target:"_blank",rel:"noopener noreferrer"},K={href:"https://insert-koin.io/docs/reference/koin-annotations/start#ksp-options",target:"_blank",rel:"noopener noreferrer"},I={href:"https://blog.kotzilla.io/koin-annotations-1.3.1?hsLang=en",target:"_blank",rel:"noopener noreferrer"},D={href:"https://developer.android.com/studio",target:"_blank",rel:"noopener noreferrer"},E={href:"https://jetbrains.com/idea/download/?section=mac",target:"_blank",rel:"noopener noreferrer"},T={href:"https://kotzilla.io/",target:"_blank",rel:"noopener noreferrer"},P={href:"https://doc.cloud-inject.io/docs/reference/mobile-sdk/setup_android",target:"_blank",rel:"noopener noreferrer"};function x(h,e){const p=r("VPCard"),n=r("router-link"),g=r("SiteInfo"),l=r("FontIcon");return b(),c("div",null,[t("h1",v,[t("a",w,[t("span",null,m(h.$frontmatter.title)+" 관련",1)])]),o(p,d(u({title:"Android > Article(s)",desc:"Article(s)",link:"/programming/java-android/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t("nav",S,[t("ul",null,[t("li",null,[o(n,{to:"#compile-safety-vs-configuration-safety"},{default:a(()=>e[0]||(e[0]=[i("Compile Safety vs. Configuration Safety")])),_:1})]),t("li",null,[o(n,{to:"#📈-the-technical-advantage"},{default:a(()=>e[1]||(e[1]=[i("📈 The Technical Advantage")])),_:1})]),t("li",null,[o(n,{to:"#background"},{default:a(()=>e[2]||(e[2]=[i("Background")])),_:1})]),t("li",null,[o(n,{to:"#empowering-kotlin-developers-with-compile-safety"},{default:a(()=>e[3]||(e[3]=[i("Empowering Kotlin Developers with Compile Safety")])),_:1}),t("ul",null,[t("li",null,[o(n,{to:"#_1-check-koin-configuration-at-compile-time"},{default:a(()=>e[4]||(e[4]=[i("1. Check Koin Configuration at Compile Time")])),_:1})]),t("li",null,[o(n,{to:"#_2-bypass-compile-safety-with-provided"},{default:a(()=>e[5]||(e[5]=[i("2. Bypass Compile Safety with @Provided")])),_:1})]),t("li",null,[o(n,{to:"#_3-use-the-verify-extension-function"},{default:a(()=>e[6]||(e[6]=[i("3. Use the verify() extension function")])),_:1})])])]),t("li",null,[o(n,{to:"#enter-the-koin-ide-plugin"},{default:a(()=>e[7]||(e[7]=[i("Enter the Koin IDE Plugin")])),_:1}),t("ul",null,[t("li",null,[o(n,{to:"#initial-feature-set"},{default:a(()=>e[8]||(e[8]=[i("Initial Feature Set")])),_:1})]),t("li",null,[o(n,{to:"#the-koin-ide-plugin-s-superpower-configuration-safety"},{default:a(()=>e[9]||(e[9]=[i("The Koin IDE Plugin's Superpower: Configuration Safety")])),_:1})])])])])]),e[29]||(e[29]=t("hr",null,null,-1)),o(g,{name:"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin",desc:"From Compile Safety to Configuration Safety: Discover the upcoming Koin IDE Plugin that analyzes Koin configurations in real-time as you write your code.",url:"https://blog.kotzilla.io/koin-ide-plugin",logo:"https://blog.kotzilla.io/hubfs/favicon.png",preview:"https://blog.kotzilla.io/hubfs/Screenshot%202024-11-18%20at%2016.56.15.png"}),e[30]||(e[30]=s('<p>Our Koin community has been clear: compile safety is crucial. This year, over 100 Koin users highlighted the need for more robust dependency management.</p><p>We&#39;re responding to you, with an even more targeted solution- Configuration Safety.</p><p>Configuration safety means catching dependency issues before compilation, directly in your integrated development environment (IDE)</p><hr><h2 id="compile-safety-vs-configuration-safety" tabindex="-1"><a class="header-anchor" href="#compile-safety-vs-configuration-safety"><span>Compile Safety vs. Configuration Safety</span></a></h2><p>Unlike traditional compile safety, which happens during the compilation process, our approach analyzes Koin configurations in real-time as you write your code.</p><p>The Koin IDE Plugin will perform static code analysis, identifying issues like circular references or missing declarations early—before they become runtime errors. This proactive approach will streamline your workflow by preventing configuration problems at their source, rather than waiting for them to surface during compilation or build-time.</p><p>By integrating immediately into your development workflow, we&#39;re not just checking code—we&#39;re preventing configuration errors at their source.</p><p>This approach offers additional value compared to other DI frameworks like Dagger2/Hilt, by eliminating the need to wait for compilation or build time.</p><hr><h2 id="📈-the-technical-advantage" tabindex="-1"><a class="header-anchor" href="#📈-the-technical-advantage"><span>📈 The Technical Advantage</span></a></h2><p>✅ Immediate configuration analysis</p><p>✅ Errors detected in real-time, before compilation</p><p>✅ Instant visual feedback in your IDE</p><p>✅ Zero runtime surprises</p><hr><h2 id="background" tabindex="-1"><a class="header-anchor" href="#background"><span>Background</span></a></h2>',17)),t("p",null,[e[11]||(e[11]=i("Dependency injection is a core part of modern Android development, helping us build more modular, testable, and maintainable applications. ")),t("a",C,[o(l,{icon:"fas fa-globe"}),e[10]||(e[10]=i("Koin"))]),e[12]||(e[12]=i(" is a popular choice for DI in the Kotlin ecosystem, providing a lightweight and flexible solution."))]),e[31]||(e[31]=t("p",null,"One of the key advantages of Koin is its declarative approach to dependency configuration. Instead of relying on complex annotations or XML configurations, Koin allows you to define your dependencies using a simple and concise domain-specific language (DSL). This promotes clean, readable code and reduces boilerplate, making it easier to manage and maintain your application's dependency graph.",-1)),e[32]||(e[32]=t("hr",null,null,-1)),e[33]||(e[33]=t("h2",{id:"empowering-kotlin-developers-with-compile-safety",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#empowering-kotlin-developers-with-compile-safety"},[t("span",null,"Empowering Kotlin Developers with Compile Safety")])],-1)),t("p",null,[e[14]||(e[14]=i("While Koin's declarative DSL is a powerful feature, the framework also provides an annotation-based API that allows you to use the ")),t("a",K,[o(l,{icon:"fas fa-globe"}),e[13]||(e[13]=i("Kotlin Compiler"))]),e[15]||(e[15]=i(" to perform compile-time checks on your Koin configurations. This is achieved through the Koin Compiler Plugin and KSP, which provide options to:"))]),e[34]||(e[34]=s('<h3 id="_1-check-koin-configuration-at-compile-time" tabindex="-1"><a class="header-anchor" href="#_1-check-koin-configuration-at-compile-time"><span>1. Check Koin Configuration at Compile Time</span></a></h3><p>Add the <code>KOIN_CONFIG_CHECK</code> option to your Gradle setup, and the compiler will verify that all dependencies used in your configuration are declared and that all modules are accessible.</p><figure><img src="https://blog.kotzilla.io/hs-fs/hubfs/Screenshot 2024-11-18 at 16.06.45.png?width=669&amp;height=152&amp;name=Screenshot 2024-11-18 at 16.06.45.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-bypass-compile-safety-with-provided" tabindex="-1"><a class="header-anchor" href="#_2-bypass-compile-safety-with-provided"><span>2. Bypass Compile Safety with <code>@Provided</code></span></a></h3><p>If you have certain components that are provided externally (ie, a module declared with the DSL), you can use the <code>@Provided</code> annotation to exclude them from the compile-time checks.</p><figure><img src="https://blog.kotzilla.io/hs-fs/hubfs/Screenshot 2024-11-18 at 16.07.29.png?width=677&amp;height=132&amp;name=Screenshot 2024-11-18 at 16.07.29.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-use-the-verify-extension-function" tabindex="-1"><a class="header-anchor" href="#_3-use-the-verify-extension-function"><span>3. Use the <code>verify()</code> extension function</span></a></h3><p>on your Koin module to verify your Koin configuration. This checks that all constructor classes have a corresponding Koin component defined. If any issues are found, <code>verify()</code> will throw a <code>MissingKoinDefinitionException</code>:</p><figure><img src="https://blog.kotzilla.io/hs-fs/hubfs/Screenshot 2024-11-18 at 16.10.06.png?width=648&amp;height=176&amp;name=Screenshot 2024-11-18 at 16.10.06.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',9)),t("p",null,[e[17]||(e[17]=i("These compile safety features have been available to Koin users since the release of ")),t("a",I,[o(l,{icon:"fas fa-globe"}),e[16]||(e[16]=i("Koin Annotations 1.3.0"))]),e[18]||(e[18]=i(", but they do require manual setup and configuration."))]),e[35]||(e[35]=t("p",null,"Now, having listened to your feedback, we want to make this level of type-safety accessible to all Kotlin developers using Koin for DI, directly within the IDE.",-1)),e[36]||(e[36]=t("hr",null,null,-1)),e[37]||(e[37]=t("h2",{id:"enter-the-koin-ide-plugin",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#enter-the-koin-ide-plugin"},[t("span",null,"Enter the Koin IDE Plugin")])],-1)),t("p",null,[e[21]||(e[21]=i("We're excited to announce the upcoming release of the Koin IDE Plugin. This new tool will integrate directly with ")),t("a",D,[o(l,{icon:"fa-brands fa-android"}),e[19]||(e[19]=i("Android Studio"))]),e[22]||(e[22]=i(" and ")),t("a",E,[o(l,{icon:"iconfont icon-jetbrains"}),e[20]||(e[20]=i("IntelliJ IDEA"))]),e[23]||(e[23]=i(", providing enhanced visibility and navigation of Koin configurations, as well as the powerful configuration checks."))]),t("p",null,[e[26]||(e[26]=i("The Koin IDE Plugin will be part of the broader ")),t("a",T,[o(l,{icon:"fas fa-globe"}),e[24]||(e[24]=i("Kotzilla Platform"))]),e[27]||(e[27]=i(", which also includes the ")),t("a",P,[o(l,{icon:"fas fa-globe"}),e[25]||(e[25]=i("Kotzilla SDK"))]),e[28]||(e[28]=i(" and the Kotzilla Console."))]),e[38]||(e[38]=s('<h3 id="initial-feature-set" tabindex="-1"><a class="header-anchor" href="#initial-feature-set"><span>Initial Feature Set</span></a></h3><p>In our initial release (Q1 2025), the Koin IDE Plugin will focus on two key areas:</p><ol><li><strong>Configuration Tree View</strong>: You&#39;ll be able to visualize your entire Koin setup, including modules, components, and dependencies, all within the IDE, making it easier to understand relationships between different parts of your configuration. This view will also include an initial validation check to ensure no configurations are missing, representing the first step toward configuration safety.</li><li><strong>Contextual Navigation</strong>: Moving between a component and its configuration will be seamless, with the plugin providing direct links. No more manually searching through your codebase to find where a particular dependency is declared.</li></ol><p>These features aim to address common issues faced by Koin users, like struggling to grasp the big picture of their DI setup or having to switch between different files to trace configuration details</p><h3 id="the-koin-ide-plugin-s-superpower-configuration-safety" tabindex="-1"><a class="header-anchor" href="#the-koin-ide-plugin-s-superpower-configuration-safety"><span>The Koin IDE Plugin&#39;s Superpower: Configuration Safety</span></a></h3><p>So, as we said at the start, the ultimate goal is to bring the power of Koin&#39;s configuration safety checks directly into the IDE experience. We&#39;ll achieve this by integrating our tool seamlessly, where you can easily activate the desired level of safety checks without any extra effort. The plugin handles everything behind the scenes, ensuring a frictionless developer workflow.</p><p>It will help you catch problems early in the development cycle, as we’ll analyse your code directly saving time and frustration.</p><ul><li><strong>Real-time Safety Checks</strong>: The plugin will proactively detect Koin configuration issues directly in the IDE.</li><li><strong>CI/CD Integration</strong>: You can choose when to execute compile safety tasks within the CI/CD pipeline, thanks to a dedicated Gradle task that launches a compilation safety check.</li></ul><p>This functionality is targeted to be available in the second release of the Koin IDE Plugin, scheduled for Q2 2025, making this level of type-safety accessible to all Koin developers, directly within their everyday IDE workflows.</p>',9)),y(" TODO: add ARTICLE CARD "),o(p,d(u({title:"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin",desc:"From Compile Safety to Configuration Safety: Discover the upcoming Koin IDE Plugin that analyzes Koin configurations in real-time as you write your code.",link:"https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/koin-ide-plugin.html",logo:"https://blog.kotzilla.io/hubfs/favicon.png",background:"rgba(238,181,80,0.2)"})),null,16)])}const B=f(k,[["render",x],["__file","koin-ide-plugin.html.vue"]]),F=JSON.parse(`{"path":"/blog.kotzilla.io/koin-ide-plugin.html","title":"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin","lang":"en-US","frontmatter":{"lang":"en-US","title":"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin","description":"Article(s) > From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin","icon":"fa-brands fa-android","category":["Java","Kotlin","Android","Article(s)"],"tag":["blog","blog.kotzilla.io","java","kotlin","android"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"},{"property":"og:description","content":"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/koin-ide-plugin.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/koin-ide-plugin.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"}],["meta",{"property":"og:description","content":"Article(s) > From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.kotzilla.io/hubfs/Screenshot%202024-11-18%20at%2016.56.15.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://blog.kotzilla.io/hubfs/Screenshot%202024-11-18%20at%2016.56.15.png"}],["meta",{"name":"twitter:image:alt","content":"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"}],["meta",{"property":"article:author","content":"The Kotzilla Team"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"blog.kotzilla.io"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"kotlin"}],["meta",{"property":"article:tag","content":"android"}],["meta",{"property":"article:published_time","content":"2024-11-19T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin\\",\\"image\\":[\\"https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-18%20at%2016.06.45.png?width=669&height=152&name=Screenshot%202024-11-18%20at%2016.06.45.png\\",\\"https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-18%20at%2016.07.29.png?width=677&height=132&name=Screenshot%202024-11-18%20at%2016.07.29.png\\",\\"https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-18%20at%2016.10.06.png?width=648&height=176&name=Screenshot%202024-11-18%20at%2016.10.06.png\\"],\\"datePublished\\":\\"2024-11-19T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"The Kotzilla Team\\"}]}"]],"prev":"/programming/java-android/articles/README.md","date":"2024-11-19T00:00:00.000Z","isOriginal":false,"author":"The Kotzilla Team","cover":"https://blog.kotzilla.io/hubfs/Screenshot%202024-11-18%20at%2016.56.15.png"},"headers":[{"level":2,"title":"Compile Safety vs. Configuration Safety","slug":"compile-safety-vs-configuration-safety","link":"#compile-safety-vs-configuration-safety","children":[]},{"level":2,"title":"📈 The Technical Advantage","slug":"📈-the-technical-advantage","link":"#📈-the-technical-advantage","children":[]},{"level":2,"title":"Background","slug":"background","link":"#background","children":[]},{"level":2,"title":"Empowering Kotlin Developers with Compile Safety","slug":"empowering-kotlin-developers-with-compile-safety","link":"#empowering-kotlin-developers-with-compile-safety","children":[{"level":3,"title":"1. Check Koin Configuration at Compile Time","slug":"_1-check-koin-configuration-at-compile-time","link":"#_1-check-koin-configuration-at-compile-time","children":[]},{"level":3,"title":"2. Bypass Compile Safety with @Provided","slug":"_2-bypass-compile-safety-with-provided","link":"#_2-bypass-compile-safety-with-provided","children":[]},{"level":3,"title":"3. Use the verify() extension function","slug":"_3-use-the-verify-extension-function","link":"#_3-use-the-verify-extension-function","children":[]}]},{"level":2,"title":"Enter the Koin IDE Plugin","slug":"enter-the-koin-ide-plugin","link":"#enter-the-koin-ide-plugin","children":[{"level":3,"title":"Initial Feature Set","slug":"initial-feature-set","link":"#initial-feature-set","children":[]},{"level":3,"title":"The Koin IDE Plugin's Superpower: Configuration Safety","slug":"the-koin-ide-plugin-s-superpower-configuration-safety","link":"#the-koin-ide-plugin-s-superpower-configuration-safety","children":[]}]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.24,"words":1273},"filePathRelative":"blog.kotzilla.io/koin-ide-plugin.md","localizedDate":"November 19, 2024","excerpt":"\\n","copyright":{"author":"The Kotzilla Team"}}`);export{B as comp,F as data};