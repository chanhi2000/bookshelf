import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as b,am as t,as as g,ao as n,at as r,au as c,ap as i,an as a,al as h,ak as f,aq as d,ar as v}from"./app-CpYYKbnj.js";const y={},w={id:"frontmatter-title-관련",tabindex:"-1"},D={class:"header-anchor",href:"#frontmatter-title-관련"},k={class:"table-of-contents"},L={href:"https://dbdocs.io/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://dbml.dbdiagram.io/home",target:"_blank",rel:"noopener noreferrer"},M={href:"https://dbdocs.io/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://dbml.dbdiagram.io/home",target:"_blank",rel:"noopener noreferrer"},C={href:"https://dbml.dbdiagram.io/home",target:"_blank",rel:"noopener noreferrer"},S={href:"https://docs.dbdocs.io/features/generate-dbml-from-db",target:"_blank",rel:"noopener noreferrer"},A={href:"https://docs.dbdocs.io/features/ci-integration",target:"_blank",rel:"noopener noreferrer"},I={href:"https://docs.dbdocs.io/features/project-access-control",target:"_blank",rel:"noopener noreferrer"},T={href:"https://docs.dbdocs.io/features/schema-changelog",target:"_blank",rel:"noopener noreferrer"},U={href:"https://dbdocs.io/Holistics/Ecommerce",target:"_blank",rel:"noopener noreferrer"};function E(p,e){const l=d("VPCard"),o=d("router-link"),m=d("SiteInfo"),s=d("FontIcon");return v(),b("div",null,[t("h1",w,[t("a",D,[t("span",null,g(p.$frontmatter.title)+" 관련",1)])]),n(l,r(c({title:"Data Science > Article(s)",desc:"Article(s)",link:"/data-science/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n(l,r(c({title:"PostgreSQL > Article(s)",desc:"Article(s)",link:"/data-science/postgres/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t("nav",k,[t("ul",null,[t("li",null,[n(o,{to:"#what-is-dbdocs"},{default:i(()=>e[0]||(e[0]=[a("What is dbdocs?")])),_:1})]),t("li",null,[n(o,{to:"#step-1-install-dbml-cli-and-dbdocs"},{default:i(()=>e[1]||(e[1]=[a("Step 1: Install DBML CLI and dbdocs")])),_:1})]),t("li",null,[n(o,{to:"#step-2-export-your-database-schema-to-dbml"},{default:i(()=>e[2]||(e[2]=[a("Step 2: Export Your Database Schema to DBML")])),_:1})]),t("li",null,[n(o,{to:"#step-3-edit-and-add-notes-to-the-dbml-file"},{default:i(()=>e[3]||(e[3]=[a("Step 3: Edit and Add Notes to the DBML File")])),_:1})]),t("li",null,[n(o,{to:"#step-4-generate-documentation-with-dbdocs"},{default:i(()=>e[4]||(e[4]=[a("Step 4: Generate Documentation with dbdocs")])),_:1})]),t("li",null,[n(o,{to:"#benefits-of-using-dbdocs-with-dbml"},{default:i(()=>e[5]||(e[5]=[a("Benefits of Using dbdocs with DBML")])),_:1})]),t("li",null,[n(o,{to:"#conclusion"},{default:i(()=>e[6]||(e[6]=[a("Conclusion")])),_:1})])])]),e[40]||(e[40]=t("hr",null,null,-1)),n(m,{name:"How to Create Database Documentation Using dbdocs with DBML",desc:"Database documentation plays a crucial role in maintaining and scaling systems. Clear and well-organized documentation can significantly improve communication between team members and enhance project longevity. One of the most efficient ways to docum...",url:"https://freecodecamp.org/news/create-database-documentation-using-dbdocs-with-dbml",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1728620241328/79515009-0fa3-4fcd-a4ce-e1ec2d5609f8.png"}),e[41]||(e[41]=t("p",null,"Database documentation plays a crucial role in maintaining and scaling systems. Clear and well-organized documentation can significantly improve communication between team members and enhance project longevity.",-1)),t("p",null,[e[9]||(e[9]=a("One of the most efficient ways to document a database is through ")),t("a",L,[n(s,{icon:"fas fa-globe"}),e[7]||(e[7]=a("dbdocs"))]),e[10]||(e[10]=a(" and ")),t("a",B,[n(s,{icon:"fas fa-globe"}),e[8]||(e[8]=a("DBML"))]),e[11]||(e[11]=a(" - an open sourced Database Markup Language."))]),e[42]||(e[42]=t("p",null,"In this guide, I’ll show you how to create database documentation using these tools, step by step.",-1)),e[43]||(e[43]=t("hr",null,null,-1)),e[44]||(e[44]=t("h2",{id:"what-is-dbdocs",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#what-is-dbdocs"},[t("span",null,"What is dbdocs?")])],-1)),t("p",null,[t("a",M,[n(s,{icon:"fas fa-globe"}),e[12]||(e[12]=a("dbdocs"))]),e[14]||(e[14]=a(" is a platform that generates database documentation from your schema, easily shareable via a link. Using ")),t("a",x,[n(s,{icon:"fas fa-globe"}),e[13]||(e[13]=a("DBML"))]),e[15]||(e[15]=a()),e[16]||(e[16]=t("strong",null,"(Database Markup Language)",-1)),e[17]||(e[17]=a(", you can create clear, shareable, and updatable documentation of your database structure."))]),e[45]||(e[45]=h(`<div class="hint-container note"><p class="hint-container-title">Prerequisites</p><p>Before we begin, ensure you have the following:</p><ul><li>Basic knowledge of databases and SQL.</li><li>A database schema to document (we’ll use a PostgreSQL example in this guide).</li></ul></div><hr><h2 id="step-1-install-dbml-cli-and-dbdocs" tabindex="-1"><a class="header-anchor" href="#step-1-install-dbml-cli-and-dbdocs"><span>Step 1: Install DBML CLI and dbdocs</span></a></h2><p>Start by installing the <strong>DBML CLI</strong>, which helps convert your database schema into a DBML format. You also need the <strong>dbdocs CLI</strong> to generate and publish your documentation.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> dbdocs</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><hr><h2 id="step-2-export-your-database-schema-to-dbml" tabindex="-1"><a class="header-anchor" href="#step-2-export-your-database-schema-to-dbml"><span>Step 2: Export Your Database Schema to DBML</span></a></h2><figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1728615902517/20974a9d-729e-4b3a-997c-0b89e944a6cd.png" alt="DB diagram" tabindex="0" loading="lazy"><figcaption>DB diagram</figcaption></figure><p>If you’re working with an existing database, you can export the schema into DBML using the DBML CLI tool.</p><p>For PostgreSQL, run the following command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">dbdocs db2dbml postgres <span class="token operator">&lt;</span>connection-string<span class="token operator">&gt;</span> <span class="token parameter variable">-o</span> database.dbml</span>
<span class="line"><span class="token comment"># </span></span>
<span class="line"><span class="token comment"># ✔ Connecting to database &lt;db-name&gt;... done.</span></span>
<span class="line"><span class="token comment"># ✔ Generating DBML... done.</span></span>
<span class="line"><span class="token comment"># ✔ Wrote to database.dbml</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1728615885904/9f68f18b-fa14-4e88-b58b-bd90d292ef31.gif" alt="Extract DBML code from database connection" tabindex="0" loading="lazy"><figcaption>Extract DBML code from database connection</figcaption></figure><p>This command will export your database schema and save it into a file called <code>database.dbml</code>.</p><p>Here’s an example of how a generated DBML file might look:</p><div class="language-dbml line-numbers-mode" data-highlighter="prismjs" data-ext="dbml" data-title="database.dbml"><pre><code><span class="line">Table users {</span>
<span class="line">  id int [pk, increment]</span>
<span class="line">  username varchar(50) [not null]</span>
<span class="line">  email varchar(100) [not null, unique]</span>
<span class="line">  created_at timestamp [not null]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">Table orders {</span>
<span class="line">  id int [pk, increment]</span>
<span class="line">  user_id int [not null, ref: &gt; users.id]</span>
<span class="line">  total decimal [not null]</span>
<span class="line">  created_at timestamp [not null]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>In this example:</strong></p><p>• The users and orders tables are defined. • Fields are annotated with types and constraints. • The relationship between <code>orders.user_id</code> and <code>users.id</code> is established using <code>ref</code>.</p><hr><h2 id="step-3-edit-and-add-notes-to-the-dbml-file" tabindex="-1"><a class="header-anchor" href="#step-3-edit-and-add-notes-to-the-dbml-file"><span>Step 3: Edit and Add Notes to the DBML File</span></a></h2><p>You may want to clean it up or add extra documentation like table descriptions and field descriptions to communicate with other members in the team.</p><figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1728615980279/8e1851a8-2e38-4ded-8b6a-c873d6b395b8.gif" alt="Add notes to generated DBML Code" tabindex="0" loading="lazy"><figcaption>Add notes to generated DBML Code</figcaption></figure><hr><h2 id="step-4-generate-documentation-with-dbdocs" tabindex="-1"><a class="header-anchor" href="#step-4-generate-documentation-with-dbdocs"><span>Step 4: Generate Documentation with dbdocs</span></a></h2><p>Once your DBML file is ready, the next step is to generate the documentation using dbdocs. First, you need to login to dbdocs:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">dbdocs login</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>After logging in, publish the DBML file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">dbdocs build database.dbml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1728616039961/0ef67db3-8a86-495a-b42f-3fad0fead933.gif" alt="Generate database documentation from DBML file" tabindex="0" loading="lazy"><figcaption>Generate database documentation from DBML file</figcaption></figure><p>This command will generate a shareable documentation link that you can access via the dbdocs platform. You can also set access permissions and collaborate with your team.</p><p>This seamless workflow ensures that your documentation always reflects the latest state of your database.</p><hr><h2 id="benefits-of-using-dbdocs-with-dbml" tabindex="-1"><a class="header-anchor" href="#benefits-of-using-dbdocs-with-dbml"><span>Benefits of Using dbdocs with DBML</span></a></h2>`,32)),t("ul",null,[t("li",null,[e[19]||(e[19]=t("strong",null,"Simplicity",-1)),e[20]||(e[20]=a(": The ")),t("a",C,[n(s,{icon:"fas fa-globe"}),e[18]||(e[18]=a("DBML"))]),e[21]||(e[21]=a(" syntax is simple and easy to learn, making it a perfect fit for teams."))]),t("li",null,[e[24]||(e[24]=t("strong",null,"Automation",-1)),e[25]||(e[25]=a(": You can ")),t("a",S,[n(s,{icon:"fas fa-globe"}),e[22]||(e[22]=a("automate your database documentation updates"))]),e[26]||(e[26]=a(" as part of your ")),t("a",A,[n(s,{icon:"fas fa-globe"}),e[23]||(e[23]=a("CI/CD pipeline"))]),e[27]||(e[27]=a("."))]),t("li",null,[e[29]||(e[29]=t("strong",null,"Collaboration",-1)),e[30]||(e[30]=a(": Easily ")),t("a",I,[n(s,{icon:"fas fa-globe"}),e[28]||(e[28]=a("share documentation links"))]),e[31]||(e[31]=a(" with your team or stakeholders for easy access and discussion."))]),t("li",null,[e[33]||(e[33]=t("strong",null,"Version Control:",-1)),e[34]||(e[34]=a(" Use ")),t("a",T,[n(s,{icon:"fas fa-globe"}),e[32]||(e[32]=a("schema changelog"))]),e[35]||(e[35]=a(" to track database schema changes over time."))]),t("li",null,[e[37]||(e[37]=t("strong",null,"Visualization",-1)),e[38]||(e[38]=a(": dbdocs provides a clean interface to visualize your database schema, relationships, and annotations. ")),t("a",U,[n(s,{icon:"fas fa-globe"}),e[36]||(e[36]=a("Try this demo"))]),e[39]||(e[39]=a(" to learn more."))])]),e[46]||(e[46]=t("hr",null,null,-1)),e[47]||(e[47]=t("h2",{id:"conclusion",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#conclusion"},[t("span",null,"Conclusion")])],-1)),e[48]||(e[48]=t("p",null,"In this tutorial, we explored how to export a database schema, customize it, and generate shareable documentation using dbdocs.",-1)),e[49]||(e[49]=t("p",null,"By incorporating this workflow into your development process, you’ll improve your team’s collaboration, enhance your project’s scalability, and ensure that everyone stays on the same page. Happy documenting!",-1)),f(" TODO: add ARTICLE CARD "),n(l,r(c({title:"How to Create Database Documentation Using dbdocs with DBML",desc:"Database documentation plays a crucial role in maintaining and scaling systems. Clear and well-organized documentation can significantly improve communication between team members and enhance project longevity. One of the most efficient ways to docum...",link:"https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-database-documentation-using-dbdocs-with-dbml.html",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16)])}const N=u(y,[["render",E],["__file","create-database-documentation-using-dbdocs-with-dbml.html.vue"]]),j=JSON.parse('{"path":"/freecodecamp.org/create-database-documentation-using-dbdocs-with-dbml.html","title":"How to Create Database Documentation Using dbdocs with DBML","lang":"en-US","frontmatter":{"lang":"en-US","title":"How to Create Database Documentation Using dbdocs with DBML","description":"Article(s) > How to Create Database Documentation Using dbdocs with DBML","icon":"fas fa-database","category":["Data Science","PostgreSQL","Article(s)"],"tag":["blog","freecodecamp.org","data-science","postgres","postgresql"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to Create Database Documentation Using dbdocs with DBML"},{"property":"og:description","content":"How to Create Database Documentation Using dbdocs with DBML"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-database-documentation-using-dbdocs-with-dbml.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-database-documentation-using-dbdocs-with-dbml.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to Create Database Documentation Using dbdocs with DBML"}],["meta",{"property":"og:description","content":"Article(s) > How to Create Database Documentation Using dbdocs with DBML"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1728620241328/79515009-0fa3-4fcd-a4ce-e1ec2d5609f8.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1728620241328/79515009-0fa3-4fcd-a4ce-e1ec2d5609f8.png"}],["meta",{"name":"twitter:image:alt","content":"How to Create Database Documentation Using dbdocs with DBML"}],["meta",{"property":"article:author","content":"Truong-Phat Nguyen"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"data-science"}],["meta",{"property":"article:tag","content":"postgres"}],["meta",{"property":"article:tag","content":"postgresql"}],["meta",{"property":"article:published_time","content":"2024-10-15T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to Create Database Documentation Using dbdocs with DBML\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1728615902517/20974a9d-729e-4b3a-997c-0b89e944a6cd.png\\",\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1728615885904/9f68f18b-fa14-4e88-b58b-bd90d292ef31.gif\\",\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1728615980279/8e1851a8-2e38-4ded-8b6a-c873d6b395b8.gif\\",\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1728616039961/0ef67db3-8a86-495a-b42f-3fad0fead933.gif\\"],\\"datePublished\\":\\"2024-10-15T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Truong-Phat Nguyen\\"}]}"]],"prev":"/data-science/articles/README.md","date":"2024-10-15T00:00:00.000Z","isOriginal":false,"author":"Truong-Phat Nguyen","cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1728620241328/79515009-0fa3-4fcd-a4ce-e1ec2d5609f8.png"},"headers":[{"level":2,"title":"What is dbdocs?","slug":"what-is-dbdocs","link":"#what-is-dbdocs","children":[]},{"level":2,"title":"Step 1: Install DBML CLI and dbdocs","slug":"step-1-install-dbml-cli-and-dbdocs","link":"#step-1-install-dbml-cli-and-dbdocs","children":[]},{"level":2,"title":"Step 2: Export Your Database Schema to DBML","slug":"step-2-export-your-database-schema-to-dbml","link":"#step-2-export-your-database-schema-to-dbml","children":[]},{"level":2,"title":"Step 3: Edit and Add Notes to the DBML File","slug":"step-3-edit-and-add-notes-to-the-dbml-file","link":"#step-3-edit-and-add-notes-to-the-dbml-file","children":[]},{"level":2,"title":"Step 4: Generate Documentation with dbdocs","slug":"step-4-generate-documentation-with-dbdocs","link":"#step-4-generate-documentation-with-dbdocs","children":[]},{"level":2,"title":"Benefits of Using dbdocs with DBML","slug":"benefits-of-using-dbdocs-with-dbml","link":"#benefits-of-using-dbdocs-with-dbml","children":[]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3.34,"words":1003},"filePathRelative":"freecodecamp.org/create-database-documentation-using-dbdocs-with-dbml.md","localizedDate":"October 15, 2024","excerpt":"\\n","copyright":{"author":"Truong-Phat Nguyen"}}');export{N as comp,j as data};