import{_ as g}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as v,am as t,as as f,ao as s,at as d,au as u,ap as a,an as n,al as c,ak as b,aq as o,ar as w}from"./app-CpYYKbnj.js";const y={},S={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},x={class:"table-of-contents"},C={href:"https://wiki.centos.org/About/Product",target:"_blank",rel:"noopener noreferrer"};function O(h,e){const l=o("VPCard"),i=o("router-link"),m=o("SiteInfo"),p=o("FontIcon"),r=o("RouteLink");return w(),v("div",null,[t("h1",S,[t("a",k,[t("span",null,f(h.$frontmatter.title)+" 관련",1)])]),s(l,d(u({title:"Linux - Fedroa >  > Article(s)",desc:"Article(s)",link:"/devops/linux-fedora/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t("nav",x,[t("ul",null,[t("li",null,[s(i,{to:"#the-basics"},{default:a(()=>e[0]||(e[0]=[n("The Basics")])),_:1})]),t("li",null,[s(i,{to:"#step-one—root-login"},{default:a(()=>e[1]||(e[1]=[n("Step One—Root Login")])),_:1})]),t("li",null,[s(i,{to:"#step-two—change-your-password"},{default:a(()=>e[2]||(e[2]=[n("Step Two—Change Your Password")])),_:1})]),t("li",null,[s(i,{to:"#step-three—-create-a-new-user"},{default:a(()=>e[3]||(e[3]=[n("Step Three— Create a New User")])),_:1})]),t("li",null,[s(i,{to:"#step-four—-root-privileges"},{default:a(()=>e[4]||(e[4]=[n("Step Four— Root Privileges")])),_:1})]),t("li",null,[s(i,{to:"#step-five—-configure-ssh-optional"},{default:a(()=>e[5]||(e[5]=[n("Step Five— Configure SSH (OPTIONAL)")])),_:1})]),t("li",null,[s(i,{to:"#step-six—-reload-and-done"},{default:a(()=>e[6]||(e[6]=[n("Step Six— Reload and Done!")])),_:1})]),t("li",null,[s(i,{to:"#see-more"},{default:a(()=>e[7]||(e[7]=[n("See More")])),_:1})])])]),e[24]||(e[24]=t("hr",null,null,-1)),s(m,{name:"Initial Server Setup with CentOS 6",desc:"This tutorial covers how to login with root, how to change the root password, how to create a new user, how to give the new user root privileges, how to chan… ",url:"https://digitalocean.com/initial-server-setup-with-centos-6",logo:"https://digitalocean.com/_next/static/media/favicon.594d6067.ico",preview:"https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"}),e[25]||(e[25]=t("p",null,"::: critical Status: Deprecated",-1)),e[26]||(e[26]=t("p",null,"This article covers a version of CentOS that is no longer supported. If you are currently operating a server running CentOS 6, we highly recommend upgrading or migrating to a supported version of CentOS.",-1)),e[27]||(e[27]=t("p",null,[t("strong",null,"Reason:")],-1)),t("p",null,[t("a",C,[s(p,{icon:"fa-brands fa-centos"}),e[8]||(e[8]=n("CentOS 6 reached end of life (EOL) on November 30th, 2020"))]),e[9]||(e[9]=n(" and no longer receives security patches or updates. For this reason, this guide is no longer maintained."))]),e[28]||(e[28]=c(`<p><strong>See Instead:</strong></p><p>This guide might still be useful as a reference, but may not work on other CentOS releases. If available, we strongly recommend using a guide written for the version of CentOS you are using.</p><p>:::</p><hr><h2 id="the-basics" tabindex="-1"><a class="header-anchor" href="#the-basics"><span>The Basics</span></a></h2><p>When you first begin to access your fresh new virtual private server, there are a few early steps you should take to make it more secure. Some of the first tasks can include setting up a new user, providing them with the proper privileges, and configuring SSH.</p><hr><h2 id="step-one—root-login" tabindex="-1"><a class="header-anchor" href="#step-one—root-login"><span>Step One—Root Login</span></a></h2><p>Once you know your IP address and root password, login as the main user, root.</p><p>It is not encouraged to use root on a regular basis, and this tutorial will help you set up an alternative user to login with permanently.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">ssh</span> root@123.45.67.890</span>
<span class="line"><span class="token comment"># </span></span>
<span class="line"><span class="token comment"># The authenticity of host &#39;69.55.55.20 (69.55.55.20)&#39; can&#39;t be established.</span></span>
<span class="line"><span class="token comment"># ECDSA key fingerprint is 79:95:46:1a:ab:37:11:8e:86:54:36:38:bb:3c:fa:c0.</span></span>
<span class="line"><span class="token comment"># Are you sure you want to continue connecting (yes/no)? </span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go ahead and type yes, and then enter your root password.</p><hr><h2 id="step-two—change-your-password" tabindex="-1"><a class="header-anchor" href="#step-two—change-your-password"><span>Step Two—Change Your Password</span></a></h2><p>Currently your root password is the default one that was sent to you when you registered your droplet. The first thing to do is change it to one of your choice.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">passwd</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>CentOS is very cautious about the passwords it allows. After you type your password, you may see a BAD PASSWORD notice. You can either set a more complex password or ignore the message—CentOS will not actually stop you from creating a short or simple password, although it will advise against it.</p><hr><h2 id="step-three—-create-a-new-user" tabindex="-1"><a class="header-anchor" href="#step-three—-create-a-new-user"><span>Step Three— Create a New User</span></a></h2><p>After you have logged in and changed your password, you will not need to login again to your VPS as root. In this step we will make a new user, with a new password, and give them all of the root capabilities.</p><p>First, create your user; you can choose any name for your user. Here I’ve suggested Demo</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">/usr/sbin/adduser demo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Second, create a new user password:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">passwd</span> demo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><hr><h2 id="step-four—-root-privileges" tabindex="-1"><a class="header-anchor" href="#step-four—-root-privileges"><span>Step Four— Root Privileges</span></a></h2><p>As of yet, only root has all of the administrative capabilities. We are going to give the new user the root privileges.</p><p>When you perform any root tasks with the new user, you will need to use the phrase <code>sudo</code> before the command. This is a helpful command for 2 reasons:</p>`,28)),t("ol",null,[e[13]||(e[13]=t("li",null,"it prevents the user from making any system-destroying mistakes",-1)),t("li",null,[e[10]||(e[10]=n("it stores all the commands run with sudo to the file ")),s(p,{icon:"fas fa-folder-open"}),e[11]||(e[11]=t("code",null,"/var/log/secure",-1)),e[12]||(e[12]=n(" which can be reviewed later if needed."))])]),e[29]||(e[29]=c(`<p>Let’s go ahead and edit the sudo configuration. This can be done through the default editor, which in CentOS is called <code>vi</code></p><p>Find the section called user privilege specification.</p><p>It will look like this:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">/usr/sbin/visudo</span>
<span class="line"><span class="token comment"># </span></span>
<span class="line"><span class="token comment"># # User privilege specification</span></span>
<span class="line"><span class="token comment"># root    ALL=(ALL)       ALL</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Under the details of root&#39;s privileges, add the following line, granting all the permissions to your new user.</p><p>To began typing in vi, press “a”.</p><div class="language-plaintext line-numbers-mode" data-highlighter="prismjs" data-ext="plaintext" data-title="plaintext"><pre><code><span class="line">demo    ALL=(ALL)       ALL</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Press <kbd>esc</kbd>, <kbd>:</kbd>, <kbd>w</kbd>, <kbd>q</kbd>, then <kbd>Enter</kbd> to save and exit the file.</p><hr><h2 id="step-five—-configure-ssh-optional" tabindex="-1"><a class="header-anchor" href="#step-five—-configure-ssh-optional"><span>Step Five— Configure SSH (OPTIONAL)</span></a></h2><p>Now it’s time to make the server more secure. These steps are optional. They will make the server more secure by making login more difficult.</p><p>Open the configuration file</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">vi</span> /etc/ssh/sshd<span class="token punctuation">\\</span>_config</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Find the following sections and change the information where applicable:</p><div class="language-plaintext line-numbers-mode" data-highlighter="prismjs" data-ext="plaintext" data-title="/etc/ssh/sshd_config"><pre><code><span class="line">Port 25000</span>
<span class="line">Protocol 2</span>
<span class="line">PermitRootLogin no</span>
<span class="line">UseDNS no</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We’ll take these one by one.</p><p>Port: Although port 22 is the default, you can change this to any number between 1025 and 65535. In this example, I am using port 25000. Make sure you make a note of the new port number. You will need it to login in the future, and this change will make it more difficult for unauthorized people to log in.</p><p>PermitRootLogin: change this from yes to no to stop future root login. You will now only login as the new user.</p><p>Add this line to the bottom of the document, replacing demo with your username:</p><div class="language-plaintext line-numbers-mode" data-highlighter="prismjs" data-ext="plaintext" data-title="plaintext"><pre><code><span class="line">AllowUsers demo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Save and Exit</p><hr><h2 id="step-six—-reload-and-done" tabindex="-1"><a class="header-anchor" href="#step-six—-reload-and-done"><span>Step Six— Reload and Done!</span></a></h2><p>Reload SSH, and it will implement the new ports and settings.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">service</span> sshd reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>To test the new settings (don’t logout of root yet), open a new terminal window and login into your virtual server as your new user.</strong></p><p>Don’t forget to include the new port number.</p><p>Your prompt should now say:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">ssh</span> <span class="token parameter variable">-p</span> <span class="token number">25000</span> demo@123.45.67.890</span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment"># \\[demo@yourname ~\\]$</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="see-more" tabindex="-1"><a class="header-anchor" href="#see-more"><span>See More</span></a></h2>`,31)),t("p",null,[e[16]||(e[16]=n("As you start securing your droplet with SSH, you can continue to improve its security by installing programs, such as ")),s(r,{to:"/digitalocean.com/how-to-protect-ssh-with-fail2ban-on-centos-6.html"},{default:a(()=>e[14]||(e[14]=[n("Fail2Ban")])),_:1}),e[17]||(e[17]=n(" or ")),s(r,{to:"/digitalocean.com/how-to-install-denyhosts-on-centos-6.html"},{default:a(()=>e[15]||(e[15]=[n("Deny Hosts")])),_:1}),e[18]||(e[18]=n(", to prevent against brute force attacks on the server."))]),t("p",null,[e[21]||(e[21]=n("You can also find the tutorial to install the LAMP stack on the server ")),s(r,{to:"/digitalocean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-centos-6.html"},{default:a(()=>e[19]||(e[19]=[n("here")])),_:1}),e[22]||(e[22]=n(" or the LEMP stack on the server ")),s(r,{to:"/digitalocean.com/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-6.html"},{default:a(()=>e[20]||(e[20]=[n("here")])),_:1}),e[23]||(e[23]=n("."))]),b(" TODO: add ARTICLE CARD "),s(l,d(u({title:"Initial Server Setup with CentOS 6",desc:"This tutorial covers how to login with root, how to change the root password, how to create a new user, how to give the new user root privileges, how to chan… ",link:"https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-centos-6.html",logo:"https://digitalocean.com/_next/static/media/favicon.594d6067.ico",background:"rgba(44,103,246,0.2)"})),null,16)])}const I=g(y,[["render",O],["__file","initial-server-setup-with-centos-6.html.vue"]]),L=JSON.parse('{"path":"/digitalocean.com/initial-server-setup-with-centos-6.html","title":"Initial Server Setup with CentOS 6","lang":"en-US","frontmatter":{"lang":"en-US","title":"Initial Server Setup with CentOS 6","description":"Article(s) > Initial Server Setup with CentOS 6","icon":"fa-brands fa-centos","category":["Linux","Fedora","CentOS","Article(s)"],"tag":["blog","digitalocean.com","linux","fedora","centos"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Initial Server Setup with CentOS 6"},{"property":"og:description","content":"Initial Server Setup with CentOS 6"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-centos-6.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-centos-6.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Initial Server Setup with CentOS 6"}],["meta",{"property":"og:description","content":"Article(s) > Initial Server Setup with CentOS 6"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"}],["meta",{"name":"twitter:image:alt","content":"Initial Server Setup with CentOS 6"}],["meta",{"property":"article:author","content":"Etel Sverdlov"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"digitalocean.com"}],["meta",{"property":"article:tag","content":"linux"}],["meta",{"property":"article:tag","content":"fedora"}],["meta",{"property":"article:tag","content":"centos"}],["meta",{"property":"article:published_time","content":"2012-05-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Initial Server Setup with CentOS 6\\",\\"image\\":[\\"https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg\\"],\\"datePublished\\":\\"2012-05-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Etel Sverdlov\\"}]}"]],"prev":"/devops/linux-fedora/articles/README.md","date":"2012-05-22T00:00:00.000Z","isOriginal":false,"author":"Etel Sverdlov","cover":"https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"},"headers":[{"level":2,"title":"The Basics","slug":"the-basics","link":"#the-basics","children":[]},{"level":2,"title":"Step One—Root Login","slug":"step-one—root-login","link":"#step-one—root-login","children":[]},{"level":2,"title":"Step Two—Change Your Password","slug":"step-two—change-your-password","link":"#step-two—change-your-password","children":[]},{"level":2,"title":"Step Three— Create a New User","slug":"step-three—-create-a-new-user","link":"#step-three—-create-a-new-user","children":[]},{"level":2,"title":"Step Four— Root Privileges","slug":"step-four—-root-privileges","link":"#step-four—-root-privileges","children":[]},{"level":2,"title":"Step Five— Configure SSH (OPTIONAL)","slug":"step-five—-configure-ssh-optional","link":"#step-five—-configure-ssh-optional","children":[]},{"level":2,"title":"Step Six— Reload and Done!","slug":"step-six—-reload-and-done","link":"#step-six—-reload-and-done","children":[]},{"level":2,"title":"See More","slug":"see-more","link":"#see-more","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.94,"words":1183},"filePathRelative":"digitalocean.com/initial-server-setup-with-centos-6.md","localizedDate":"May 22, 2012","excerpt":"\\n","copyright":{"author":"Etel Sverdlov"}}');export{I as comp,L as data};