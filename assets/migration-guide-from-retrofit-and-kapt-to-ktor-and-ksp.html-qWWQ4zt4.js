import{_ as b}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as n,as as w,ao as e,at as k,au as g,ap as s,an as a,al as f,ak as d,aq as p,ar as K}from"./app-CpYYKbnj.js";const y={},P={id:"frontmatter-title-관련",tabindex:"-1"},A={class:"header-anchor",href:"#frontmatter-title-관련"},S={class:"table-of-contents"},T={href:"https://sgkantamani.medium.com/migration-guide-from-hilt-to-koin-ea8083d3f7a9",target:"_blank",rel:"noopener noreferrer"},x={href:"https://betterprogramming.pub/how-to-use-ktor-in-your-android-app-a99f50cc9444",target:"_blank",rel:"noopener noreferrer"},j={href:"https://betterprogramming.pub/ktor-in-server-side-development-the-basics-81ce4bbba878",target:"_blank",rel:"noopener noreferrer"},M={href:"https://betterprogramming.pub/how-to-use-ktor-in-your-android-app-a99f50cc9444",target:"_blank",rel:"noopener noreferrer"},R={href:"https://kotlinlang.org/docs/ksp-overview.html#resources",target:"_blank",rel:"noopener noreferrer"},G={href:"https://kotlinlang.org/docs/ksp-quickstart.html#pass-options-to-processors",target:"_blank",rel:"noopener noreferrer"},I={href:"https://medium.com/@sgkantamani",target:"_blank",rel:"noopener noreferrer"},C={href:"https://x.com/SG5202",target:"_blank",rel:"noopener noreferrer"},D={href:"https://linkedin.com/in/siva-kantamani-bb59309b/",target:"_blank",rel:"noopener noreferrer"},z={class:"hint-container info"},B={href:"https://proandroiddev.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp-38c8cd5dc16c",target:"_blank",rel:"noopener noreferrer"};function q(v,t){const c=p("VPCard"),r=p("router-link"),u=p("SiteInfo"),o=p("FontIcon"),m=p("Tabs");return K(),h("div",null,[n("h1",P,[n("a",A,[n("span",null,w(v.$frontmatter.title)+" 관련",1)])]),e(c,k(g({title:"Android > Article(s)",desc:"Article(s)",link:"/programming/java-android/articles/README.md",logo:"/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n("nav",S,[n("ul",null,[n("li",null,[e(r,{to:"#introduction"},{default:s(()=>t[0]||(t[0]=[a("Introduction")])),_:1})]),n("li",null,[e(r,{to:"#retrofit-to-ktor-migration"},{default:s(()=>t[1]||(t[1]=[a("Retrofit to Ktor Migration")])),_:1}),n("ul",null,[n("li",null,[e(r,{to:"#integration"},{default:s(()=>t[2]||(t[2]=[a("Integration")])),_:1})]),n("li",null,[e(r,{to:"#di-migration"},{default:s(()=>t[3]||(t[3]=[a("DI Migration")])),_:1})])])]),n("li",null,[e(r,{to:"#kapt-to-ksp-migration"},{default:s(()=>t[4]||(t[4]=[a("KAPT to KSP Migration")])),_:1})])])]),t[53]||(t[53]=n("hr",null,null,-1)),e(u,{name:"Migration Guide from Retrofit and KAPT to Ktor and KSP",desc:"Network Client and Annotation Processor migration to support Kotlin Multiplatform",url:"https://droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",preview:"https://droidcon.com/wp-content/uploads/2024/12/0_K_Blg9wuGY60ti9k.webp"}),t[54]||(t[54]=n("div",{class:"hint-container note"},[n("p",{class:"hint-container-title"},"Takeaway from this article"),n("p",null,"In this article, you’ll learn why we might need to migrate from Retrofit to Ktor and KAPT to KSP. By the end of this article, you will be able to remove Retrofit and KAPT from the project safely.")],-1)),t[55]||(t[55]=n("hr",null,null,-1)),t[56]||(t[56]=n("h2",{id:"introduction",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#introduction"},[n("span",null,"Introduction")])],-1)),n("p",null,[t[8]||(t[8]=a("This is part 2 in the series of migrations from the Android project to the kotlin multiplatform project. In ")),n("a",T,[t[5]||(t[5]=a("Part 1 (")),e(o,{icon:"fa-brands fa-medium"}),t[6]||(t[6]=n("code",null,"sgkantamani",-1)),t[7]||(t[7]=a(")"))]),t[9]||(t[9]=a(", we discussed the KMP technology and the tech stack used in migrating applications to KMP. Then as a first step, we started with dependency injection migration from Hilt to Koin. The following is the link to the article in case you missed it."))]),e(u,{name:"Migration Guide From Hilt to Koin",desc:"DI migration to support Kotlin Multiplatform",url:"https://sgkantamani.medium.com/migration-guide-from-hilt-to-koin-ea8083d3f7a9/",logo:"https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19",preview:"https://miro.medium.com/v2/resize:fit:1024/1*RIKjBF2V3iKk85t7all_CA.png"}),t[57]||(t[57]=n("p",null,"In this part of the series, we’ll focus on migrating two main things:",-1)),t[58]||(t[58]=n("ol",null,[n("li",null,"Android network library Retrofit to purely Kotlin-based Ktor."),n("li",null,"KAPT annotation processor to generate the code to KSP (Kotlin Symbol Processing).")],-1)),t[59]||(t[59]=n("p",null,"Retrofit is a stable and very popular library in the Android world, but the lack of KMP support leaves me with no choice but to migrate. Ktor is the obvious choice to migrate as it’s built purely with Kotlin and is being maintained by Google. Ktor is more than just another client library for networking, to learn more about it read the following in-depth articles:",-1)),n("ol",null,[n("li",null,[n("a",x,[e(o,{icon:"fa-brands fa-medium"}),t[10]||(t[10]=a("How to Use Ktor in Your Android App"))])]),n("li",null,[n("a",j,[e(o,{icon:"fa-brands fa-medium"}),t[11]||(t[11]=a("Ktor in Server-Side Development: The Basics"))])])]),t[60]||(t[60]=f(`<p>Kapt (Kotlin Annotation Processing Tool) enables Java annotation processors usage in Kotlin projects, even when the processors aren’t designed for Kotlin. KSP (Kotlin Symbol Processing) offers a Kotlin-centric alternative to Kapt. Unlike Kapt, KSP directly analyzes Kotlin code, making it up to twice as fast. Additionally, it has a deeper understanding of Kotlin’s language features.</p><hr><h2 id="retrofit-to-ktor-migration" tabindex="-1"><a class="header-anchor" href="#retrofit-to-ktor-migration"><span>Retrofit to Ktor Migration</span></a></h2><h3 id="integration" tabindex="-1"><a class="header-anchor" href="#integration"><span>Integration</span></a></h3><p>To integrate ktor into the project add the following lines under the dependencies node in the app module and other modules where you might have to make the network calls.</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="build.gradle.kts"><pre><code><span class="line"><span class="token comment">// Ktor</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.2&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io.ktor:ktor-client-core:2.3.12&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// CIO - for JVM and Android</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io.ktor:ktor-client-cio:2.3.12&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io.ktor:ktor-client-content-negotiation:2.3.12&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io.ktor:ktor-serialization-kotlinx-json:2.3.12&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then add the following line under the plugins section in the project-level gradle file.</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="app/build.gradle.kts"><pre><code><span class="line">id &#39;org<span class="token punctuation">.</span>jetbrains<span class="token punctuation">.</span>kotlin<span class="token punctuation">.</span>plugin<span class="token punctuation">.</span>serialization&#39; version &#39;<span class="token number">1.9</span><span class="token punctuation">.</span><span class="token number">23</span>&#39; apply <span class="token boolean">false</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,8)),n("p",null,[t[12]||(t[12]=a("Now add the following lines in ")),e(o,{icon:"fas fa-folder-open"}),t[13]||(t[13]=n("code",null,"app/",-1)),e(o,{icon:"fas fa-file-lines"}),t[14]||(t[14]=n("code",null,"proguard-rules.pro",-1)),t[15]||(t[15]=a(" to make sure Ktor works as expected in release builds even with obfuscation."))]),t[61]||(t[61]=f(`<div class="language-proguard line-numbers-mode" data-highlighter="prismjs" data-ext="proguard" data-title="proguard"><pre><code><span class="line"># Ktor</span>
<span class="line">-keep class io.ktor.** { *; }</span>
<span class="line">-keep class kotlinx.coroutines.** { *; }</span>
<span class="line">-dontwarn kotlinx.atomicfu.**</span>
<span class="line">-dontwarn io.netty.**</span>
<span class="line">-dontwarn com.typesafe.**</span>
<span class="line">-dontwarn org.slf4j.**</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then remove all the Retrofit-related dependencies and hit the sync now button.</p><h3 id="di-migration" tabindex="-1"><a class="header-anchor" href="#di-migration"><span>DI Migration</span></a></h3><p>Now we need to update the Koin network and data source modules, replacing the Retrofit with Ktor. Let’s start with the network module, The following is the Retrofit setup of the network module.</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">val</span> networkModule <span class="token operator">=</span> module <span class="token punctuation">{</span></span>
<span class="line">    single<span class="token operator">&lt;</span>Gson<span class="token operator">&gt;</span> <span class="token punctuation">{</span> GsonFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    single<span class="token operator">&lt;</span>Converter<span class="token punctuation">.</span>Factory<span class="token operator">&gt;</span> <span class="token punctuation">{</span> GsonConverterFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    single<span class="token operator">&lt;</span>OkHttpClient<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        OkHttpClientFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    single<span class="token operator">&lt;</span>Retrofit<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        RetrofitFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span></span>
<span class="line">            okHttpClient <span class="token operator">=</span> <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">            converterFactory <span class="token operator">=</span> <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After migration to Ktor, it looks as follows:</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">val</span> networkModule <span class="token operator">=</span> module <span class="token punctuation">{</span></span>
<span class="line">    single<span class="token operator">&lt;</span>Json<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        Json <span class="token punctuation">{</span></span>
<span class="line">            ignoreUnknownKeys <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">            isLenient <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">            prettyPrint <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">            encodeDefaults <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    single<span class="token operator">&lt;</span>HttpClient<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">HttpClient</span><span class="token punctuation">(</span>CIO<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">install</span><span class="token punctuation">(</span>ContentNegotiation<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">get</span><span class="token operator">&lt;</span>Json<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)),n("p",null,[t[17]||(t[17]=a("Now we need to replace the retrofit inject with the Ktor client, as I’ve a single API in the application, I’m replacing the retrofit service interface with Kotr client and requesting with the client directly. But the real-time use of Ktor will be much more complicated with multiple routes and header configuration for which please refer to this ")),n("a",M,[e(o,{icon:"fa-brands fa-medium"}),t[16]||(t[16]=a("article"))]),t[18]||(t[18]=a("."))]),e(m,{id:"91",data:[{id:"Before"},{id:"After"}],active:0},{title0:s(({value:i,isActive:l})=>t[19]||(t[19]=[a("Before")])),title1:s(({value:i,isActive:l})=>t[20]||(t[20]=[a("After")])),tab0:s(({value:i,isActive:l})=>t[21]||(t[21]=[n("div",{class:"language-kotlin line-numbers-mode","data-highlighter":"prismjs","data-ext":"kt","data-title":"WizardRemoteDataSource.kt"},[n("pre",null,[n("code",null,[n("span",{class:"line"},[n("span",{class:"token keyword"},"class"),a(" WizardRemoteDataSource "),n("span",{class:"token keyword"},"constructor"),n("span",{class:"token punctuation"},"(")]),a(`
`),n("span",{class:"line"},[a("    "),n("span",{class:"token keyword"},"private"),a(),n("span",{class:"token keyword"},"val"),a(" api"),n("span",{class:"token operator"},":"),a(" RetrofitServiceApi"),n("span",{class:"token punctuation"},",")]),a(`
`),n("span",{class:"line"},[n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),a(" WizardDataSource")]),a(`
`),n("span",{class:"line"})])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])),tab1:s(({value:i,isActive:l})=>t[22]||(t[22]=[n("div",{class:"language-kotlin line-numbers-mode","data-highlighter":"prismjs","data-ext":"kt","data-title":"WizardRemoteDataSource.kt"},[n("pre",null,[n("code",null,[n("span",{class:"line"},[n("span",{class:"token keyword"},"class"),a(" WizardRemoteDataSource "),n("span",{class:"token keyword"},"constructor"),n("span",{class:"token punctuation"},"(")]),a(`
`),n("span",{class:"line highlighted"},[a("    "),n("span",{class:"token keyword"},"private"),a(),n("span",{class:"token keyword"},"val"),a(" httpClient"),n("span",{class:"token operator"},":"),a(" HttpClient"),n("span",{class:"token punctuation"},",")]),a(`
`),n("span",{class:"line"},[n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),a(" WizardDataSource")]),a(`
`),n("span",{class:"line"})])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])),_:1}),t[62]||(t[62]=n("p",null,"That’s all, now the project network module is compatible with kotlin multiplatform.",-1)),t[63]||(t[63]=n("hr",null,null,-1)),t[64]||(t[64]=n("h2",{id:"kapt-to-ksp-migration",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#kapt-to-ksp-migration"},[n("span",null,"KAPT to KSP Migration")])],-1)),t[65]||(t[65]=n("p",null,"Before migrating your code to KSP, there are a few important considerations to keep in mind. Since KSP is relatively new, some libraries may not yet support it. However, there’s no need to worry — you can run KSP and Kapt side by side in your project.",-1)),n("p",null,[t[24]||(t[24]=a("It’s worth noting that Kapt is now in maintenance mode, so it’s a good idea to encourage your library providers to upgrade to KSP as soon as possible. Fortunately, many popular libraries like Dagger, Moshi, Room, and others already support KSP. To know more about supported libraries refer to this ")),n("a",R,[e(o,{icon:"iconfont icon-kotlin"}),t[23]||(t[23]=a("link"))]),t[25]||(t[25]=a("."))]),t[66]||(t[66]=n("p",null,"Now let’s start the migration, I prefer to increase the Kotlin version before integrating KSP, in the project-level gradle upgrade Kotlin plugin.",-1)),e(m,{id:"115",data:[{id:"Before"},{id:"After"}],active:0},{title0:s(({value:i,isActive:l})=>t[26]||(t[26]=[a("Before")])),title1:s(({value:i,isActive:l})=>t[27]||(t[27]=[a("After")])),tab0:s(({value:i,isActive:l})=>t[28]||(t[28]=[n("div",{class:"language-kotlin line-numbers-mode","data-highlighter":"prismjs","data-ext":"kt","data-title":"build.gradle.kts"},[n("pre",null,[n("code",null,[n("span",{class:"line"},[n("span",{class:"token comment"},"// Before")]),a(`
`),n("span",{class:"line"},[a("id 'org"),n("span",{class:"token punctuation"},"."),a("jetbrains"),n("span",{class:"token punctuation"},"."),a("kotlin"),n("span",{class:"token punctuation"},"."),a("android' version '"),n("span",{class:"token number"},"1.8"),n("span",{class:"token punctuation"},"."),n("span",{class:"token number"},"10"),a("' apply "),n("span",{class:"token boolean"},"false")]),a(`
`),n("span",{class:"line"})])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])),tab1:s(({value:i,isActive:l})=>t[29]||(t[29]=[n("div",{class:"language-kotlin line-numbers-mode","data-highlighter":"prismjs","data-ext":"kt","data-title":"build.gradle.kts"},[n("pre",null,[n("code",null,[n("span",{class:"line"},[n("span",{class:"token comment"},"// After")]),a(`
`),n("span",{class:"line"},[a("id 'org"),n("span",{class:"token punctuation"},"."),a("jetbrains"),n("span",{class:"token punctuation"},"."),a("kotlin"),n("span",{class:"token punctuation"},"."),a("android' version '"),n("span",{class:"token number"},"2.0"),n("span",{class:"token punctuation"},"."),n("span",{class:"token number"},"0"),a("' apply "),n("span",{class:"token boolean"},"false")]),a(`
`),n("span",{class:"line"})])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])),_:1}),t[67]||(t[67]=n("p",null,[a("Then move to the module-level gradle files starting with the app module, remove the "),n("code",null,"kapt"),a(" and add "),n("code",null,"ksp"),a(" plugin, have a look:")],-1)),t[68]||(t[68]=n("figure",null,[n("img",{src:"https://droidcon.com/wp-content/uploads/2024/12/1_mwj65S07CAn-Yz0eKwV1UQ-1.webp",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1)),d(" TODO: Google Lens "),t[69]||(t[69]=n("p",null,[a("Then remove all the "),n("code",null,"kapt"),a(" references like the following from the gradle:")],-1)),t[70]||(t[70]=n("figure",null,[n("img",{src:"https://droidcon.com/wp-content/uploads/2024/12/1_Uz43rrk7uxoE0ubBYYDOxw.webp",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1)),d(" TODO: Google Lens "),t[71]||(t[71]=n("p",null,[a("As a final step replace all the "),n("code",null,"kapt"),a(" dependency integration to "),n("code",null,"ksp"),a(" as shown below:")],-1)),t[72]||(t[72]=n("figure",null,[n("img",{src:"https://droidcon.com/wp-content/uploads/2024/12/1_wEk7u7hPLpz90IVhUCcqlQ.webp",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1)),d(" TODO: Google Lens "),t[73]||(t[73]=n("p",null,"Now hit the “sync now” button and then rebuild the project to complete the code generation.",-1)),t[74]||(t[74]=n("p",null,"The following are some common issues to look out for stated in the Android Official Documentation:",-1)),n("ul",null,[t[33]||(t[33]=n("li",null,"Some libraries don’t support the same set of features with kapt and KSP. If your code breaks after migrating, check the library’s documentation.",-1)),t[34]||(t[34]=n("li",null,"KSP has more accurate Kotlin-type information than kapt (for example, about nullability), which means that KSP processors can be more precise about type requirements. This might require some fixes in your source code as well, in addition to updating your build files.",-1)),n("li",null,[t[31]||(t[31]=a("If you were previously passing in arguments to the annotation processor, you’ll likely need to pass in those arguments to KSP now. Note that the format of the arguments might differ between kapt and KSP. See the ")),n("a",G,[e(o,{icon:"iconfont icon-kotlin"}),t[30]||(t[30]=a("KSP documentation"))]),t[32]||(t[32]=a(" and consult the documentation of the library you’re using to learn more."))])]),t[75]||(t[75]=n("p",null,". . .",-1)),t[76]||(t[76]=n("p",null,"That is all for now, hope you learned something useful, thanks for reading.",-1)),n("p",null,[t[44]||(t[44]=a("You can find me on ")),n("a",I,[t[35]||(t[35]=a("Medium (")),e(o,{icon:"fa-brands fa-medium"}),t[36]||(t[36]=n("code",null,"sgkantamani",-1)),t[37]||(t[37]=a(")"))]),t[45]||(t[45]=a(", ")),n("a",C,[t[38]||(t[38]=a("X (")),e(o,{icon:"fa-brands fa-x-twitter"}),t[39]||(t[39]=n("code",null,"SG5202",-1)),t[40]||(t[40]=a(")"))]),t[46]||(t[46]=a(", ")),t[47]||(t[47]=n("a",{href:"https://quora.com/profile/Siva-Ganesh-Kantamani-1",target:"_blank",rel:"noopener noreferrer"},"Quora",-1)),t[48]||(t[48]=a(" and ")),n("a",D,[t[41]||(t[41]=a("LinkedIn (")),e(o,{icon:"fa-brands fa-linkedin"}),t[42]||(t[42]=n("code",null,"siva-kantamani-bb59309b",-1)),t[43]||(t[43]=a(")"))]),t[49]||(t[49]=a("."))]),n("div",z,[t[52]||(t[52]=n("p",{class:"hint-container-title"},"Info",-1)),n("p",null,[t[51]||(t[51]=a("This article is previously published on ")),n("a",B,[e(o,{icon:"fa-brands fa-medium"}),t[50]||(t[50]=n("code",null,"proandroiddev",-1))])]),e(u,{name:"Migration Guide from Retrofit and KAPT to Ktor and KSP",desc:"Network Client and Annotation Processor migration to support Kotlin Multiplatform",url:"https://proandroiddev.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp-38c8cd5dc16c/",logo:"https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png",preview:"https://miro.medium.com/v2/da:true/resize:fit:1200/0*K_Blg9wuGY60ti9k"})]),d(" TODO: add ARTICLE CARD "),e(c,k(g({title:"Migration Guide from Retrofit and KAPT to Ktor and KSP",desc:"Network Client and Annotation Processor migration to support Kotlin Multiplatform",link:"https://chanhi2000.github.io/bookshelf/droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.html",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",background:"rgba(4,20,221,0.2)"})),null,16)])}const V=b(y,[["render",q],["__file","migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.html.vue"]]),U=JSON.parse('{"path":"/droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.html","title":"Migration Guide from Retrofit and KAPT to Ktor and KSP","lang":"en-US","frontmatter":{"lang":"en-US","title":"Migration Guide from Retrofit and KAPT to Ktor and KSP","description":"Article(s) > Migration Guide from Retrofit and KAPT to Ktor and KSP","icon":"fa-brands fa-android","category":["Java","Kotlin","Android","Article(s)"],"tag":["blog","droidcon.com","java","kotlin","android"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Migration Guide from Retrofit and KAPT to Ktor and KSP"},{"property":"og:description","content":"Migration Guide from Retrofit and KAPT to Ktor and KSP"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Migration Guide from Retrofit and KAPT to Ktor and KSP"}],["meta",{"property":"og:description","content":"Article(s) > Migration Guide from Retrofit and KAPT to Ktor and KSP"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://droidcon.com/wp-content/uploads/2024/12/0_K_Blg9wuGY60ti9k.webp"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://droidcon.com/wp-content/uploads/2024/12/0_K_Blg9wuGY60ti9k.webp"}],["meta",{"name":"twitter:image:alt","content":"Migration Guide from Retrofit and KAPT to Ktor and KSP"}],["meta",{"property":"article:author","content":"Siva Ganesh Kantamani"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"droidcon.com"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"kotlin"}],["meta",{"property":"article:tag","content":"android"}],["meta",{"property":"article:published_time","content":"2024-12-03T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Migration Guide from Retrofit and KAPT to Ktor and KSP\\",\\"image\\":[\\"https://droidcon.com/wp-content/uploads/2024/12/1_mwj65S07CAn-Yz0eKwV1UQ-1.webp\\",\\"https://droidcon.com/wp-content/uploads/2024/12/1_Uz43rrk7uxoE0ubBYYDOxw.webp\\",\\"https://droidcon.com/wp-content/uploads/2024/12/1_wEk7u7hPLpz90IVhUCcqlQ.webp\\"],\\"datePublished\\":\\"2024-12-03T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Siva Ganesh Kantamani\\"}]}"]],"prev":"/programming/java-android/articles/README.md","date":"2024-12-03T00:00:00.000Z","isOriginal":false,"author":"Siva Ganesh Kantamani","cover":"https://droidcon.com/wp-content/uploads/2024/12/0_K_Blg9wuGY60ti9k.webp"},"headers":[{"level":2,"title":"Introduction","slug":"introduction","link":"#introduction","children":[]},{"level":2,"title":"Retrofit to Ktor Migration","slug":"retrofit-to-ktor-migration","link":"#retrofit-to-ktor-migration","children":[{"level":3,"title":"Integration","slug":"integration","link":"#integration","children":[]},{"level":3,"title":"DI Migration","slug":"di-migration","link":"#di-migration","children":[]}]},{"level":2,"title":"KAPT to KSP Migration","slug":"kapt-to-ksp-migration","link":"#kapt-to-ksp-migration","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":5.08,"words":1524},"filePathRelative":"droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.md","localizedDate":"December 3, 2024","excerpt":"\\n","copyright":{"author":"Siva Ganesh Kantamani"}}');export{V as comp,U as data};