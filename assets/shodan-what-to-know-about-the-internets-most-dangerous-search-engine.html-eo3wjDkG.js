import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as e,av as u,au as t,aw as o,ax as s,b as i,r,o as p}from"./app-TfhzDSA_.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,n){const a=r("VPCard"),h=r("SiteInfo");return p(),l("div",null,[e("h1",g,[e("a",y,[e("span",null,u(c.$frontmatter.title)+" 관련",1)])]),t(a,o(s({title:"Security > Article(s)",desc:"Article(s)",link:"/devops/security/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t(a,o(s({title:"Python > Article(s)",desc:"Article(s)",link:"/programming/py/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n[0]||(n[0]=e("hr",null,null,-1)),t(h,{name:"Shodan – What to Know About the Internet’s Most Dangerous Search Engine",desc:"Shodan is a search engine that discovers devices connected to the internet. In this article, we’ll look at why it’s both a valuable tool and a potential threat. When you hear the term “search engine,” your mind likely jumps to Google, Bing, or Yahoo...",url:"https://freecodecamp.org/news/shodan-what-to-know-about-the-internets-most-dangerous-search-engine/",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1725990169364/3181020e-abd0-4943-a461-830c2a416035.png"}),i(" TODO: 작성"),i(` 
Shodan is a search engine that discovers devices connected to the internet. In this article, we’ll look at why it’s both a valuable tool and a potential threat.

When you hear the term “search engine,” your mind likely jumps to Google, Bing, or Yahoo. These platforms are familiar to most of us, helping us find websites, images, and news.

But there’s another search engine out there, one that most people have never heard of. And it’s a lot more powerful and dangerous. It’s called <a href="https://www.shodan.io/">Shodan</a>.

Shodan is a database of online devices, many of which are not meant to be public. The scary thing about Shodan is that it can have one of your devices, too.

Let’s look at what Shodan is, how it works, and why it’s both a valuable tool and a potential threat.

### -what-is-shodan">What is Shodan?

Shodan is a search engine that discovers devices connected to the internet. This includes everything from simple webcams and routers to complex industrial control systems.

Traditional search engines index websites. Shodan scans the internet for devices and lists them based on their IP addresses, open ports, and other publicly available data.

Shodan works by scanning the internet using specific protocols to identify connected devices. It collects all information about the device.

These include IP addresses, open ports, and even the software versions in use. This data is then made searchable by allowing users to query the database. You can look for specific types of devices or vulnerabilities using Shodan’s UI or the CLI tool.

Let’s look at how you can use Shodan both via the web interface and the command line.

### -how-to-use-the-shodan-web-interface">How to Use the Shodan Web Interface

Go to <a href="https://www.shodan.io">shodan.io</a> and create an account. While some searches are possible without an account, you’ll need to log in to access most features. 

Also, you will need a premium account to find most devices, and the results of the free plan are very limited.

<img src="https://cdn-images-1.medium.com/max/1600/1*aPocvl3SmA9HSCw-hiEITg.png" alt="Shodan Home Page" width="1600" height="786" loading="lazy">

On the homepage, you will see a simple search bar. You can type in general queries like “default password” or “webcam” to see what Shodan can find.

For example, typing “default password” will list devices with default settings. They are vulnerable to unauthorized access.

Shodan also allows you to filter results with specific parameters. For example:

- **Search for specific devices**: If you’re looking for webcams, you might type “webcam country:US”. This query will return webcams located in the United States.
<li>**Search by IP address:** To see details about a specific IP, type the IP address into the search bar.
<li>**Search by port:** To find devices with a specific port open, use a query like “port:22”. This will find devices with SSH (port 22) exposed to the Internet.

After executing a search, Shodan will present a list of matching devices. Each result includes the IP address, open ports, and the software on the device.

For example, a search for “port:22” might find SSH servers and their configuration details.

<img src="https://cdn-images-1.medium.com/max/1600/1*dQ9aYtNI0ZklPcqXFPhoCw.png" alt="Shodan search results" width="1600" height="830" loading="lazy">

### -how-to-use-the-shodan-command-line-interface-cli">How to Use the Shodan Command-Line Interface (CLI)

For advanced users, Shodan provides a command-line interface (CLI). It lets you search and automate tasks.

**Note: API usage may be limited based on your account and you might have to pay to use it.**

Before you can use the CLI, you will need to install it. You can do this using Python’s package manager, pip. Open your terminal and type the following.

<pre class="language-plaintext" tabindex="0"><code class="language-plaintext">pip install shodan
\`\`\`

Once installed, you can see if it works by trying the help command. 

<pre class="language-plaintext" tabindex="0"><code class="language-plaintext">shodan -h
\`\`\`

<img src="https://cdn-images-1.medium.com/max/1600/1*j-AeWDwmtsLvczJEj1U2yQ.png" alt="Shodan help" width="1306" height="842" loading="lazy">

Now you have to add your Shodan CLI with your API key. You can find your API key on your <a href="https://account.shodan.io/">Shodan account page</a>. To set it up, use the following command:

<pre class="language-plaintext" tabindex="0"><code class="language-plaintext">shodan init YOUR_API_KEY
\`\`\`

Now you can start searching. Here’s an example of a basic search:

<pre class="language-plaintext" tabindex="0"><code class="language-plaintext">shodan search "default password"
\`\`\`

This command will return devices with “default password” in their banners. This often indicates poor security practices.

You can search for devices with specific characteristics as before:

<pre class="language-plaintext" tabindex="0"><code class="language-plaintext">shodan search "port:80 country:US"
\`\`\`

This command finds web servers (port 80) located in the United States.

To get detailed information about a specific IP address, use this command:

<pre class="language-plaintext" tabindex="0"><code class="language-plaintext">shodan host 8.8.8.8
\`\`\`

It will return all known data about the specified IP. This includes open ports and detected services.

To see more commands or debug CLI issues, <a href="https://help.shodan.io/command-line-interface/0-installation">here is the official documentation from Shodan</a>.

### -the-good-the-bad-and-the-dangerous">The Good, the Bad, and the Dangerous

Shodan is a double-edged sword. It’s a powerful tool for cybersecurity professionals. It also poses significant risks if used with bad intent.

Security teams use Shodan to find exposed devices within their networks. It allows them to patch vulnerabilities before someone can exploit them.

Researchers can track vulnerabilities or malware by monitoring devices on Shodan.

Unfortunately, Shodan can also be a hacker’s dream. Hackers can use Shodan to locate devices exposed to the Internet. These include webcams, servers, and even industrial control systems.

A worrying fact about Shodan is its ability to find industrial control systems. An Industrial Control System (ICS) controls and monitors industrial processes. It’s the “brain” behind machines in factories, power plants, and water treatment plants.

Shodan has found thousands of unsecured, internet-connected industrial control systems (ICS). In some cases, these systems had no password or used default credentials.

Shodan has also indexed thousands of security cameras, database servers, and IoT devices. These raise serious privacy and security concerns. All these can be easily exploited if not properly secured.

To protect your own devices, you must understand Shodan. You need to know how it works and what it can find.

So, how can you prevent Shodan from exposing your devices?

**1. Change Default Credentials**: Always change the default usernames and passwords on your devices.

2. **Use Strong Passwords**: Avoid weak passwords. Use a mix of letters, numbers, and symbols, and consider using a password manager.

3. **Disable Unnecessary Services**: If your device has services you don’t use, disable them. This reduces the number of potential vulnerabilities.

---

## -conclusion">Conclusion

Shodan is a powerful tool. It’s a reminder that any device connected to the internet is potentially exposed. It offers useful insights for cybersecurity experts but also an opportunity for cybercriminals.

Knowing what Shodan can do should make you take cybersecurity seriously. In a world where everything is connected, your security is only as strong as your weakest device. Stay informed, stay updated, and most importantly, stay safe.

*Join the* <a href="https://www.stealthsecurity.sh/">***Stealth Security newsletter***</a> *for more articles on offensive and defensive cybersecurity. To learn how to build a career in Cybersecurity, check out* <a href="https://book.stealthsecurity.sh/">***The Hacker's Handbook***</a>*.*

`)])}const v=d(m,[["render",f],["__file","shodan-what-to-know-about-the-internets-most-dangerous-search-engine.html.vue"]]),S=JSON.parse('{"path":"/freecodecamp.org/shodan-what-to-know-about-the-internets-most-dangerous-search-engine.html","title":"Shodan – What to Know About the Internet’s Most Dangerous Search Engine","lang":"en-US","frontmatter":{"lang":"en-US","title":"Shodan – What to Know About the Internet’s Most Dangerous Search Engine","description":"Article(s) > Shodan – What to Know About the Internet’s Most Dangerous Search Engine","icon":"fas fa-shield-halved","category":["Security","Python","Article(s)"],"tag":["blog","freecodecamp.org","security","sec","python","py","shodan"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Shodan – What to Know About the Internet’s Most Dangerous Search Engine"},{"property":"og:description","content":"Shodan – What to Know About the Internet’s Most Dangerous Search Engine"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/shodan-what-to-know-about-the-internets-most-dangerous-search-engine.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/shodan-what-to-know-about-the-internets-most-dangerous-search-engine.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Shodan – What to Know About the Internet’s Most Dangerous Search Engine"}],["meta",{"property":"og:description","content":"Article(s) > Shodan – What to Know About the Internet’s Most Dangerous Search Engine"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1725990169364/3181020e-abd0-4943-a461-830c2a416035.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1725990169364/3181020e-abd0-4943-a461-830c2a416035.png"}],["meta",{"name":"twitter:image:alt","content":"Shodan – What to Know About the Internet’s Most Dangerous Search Engine"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"security"}],["meta",{"property":"article:tag","content":"sec"}],["meta",{"property":"article:tag","content":"python"}],["meta",{"property":"article:tag","content":"py"}],["meta",{"property":"article:tag","content":"shodan"}],["meta",{"property":"article:published_time","content":"2024-09-10T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Shodan – What to Know About the Internet’s Most Dangerous Search Engine\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1725990169364/3181020e-abd0-4943-a461-830c2a416035.png\\"],\\"datePublished\\":\\"2024-09-10T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/devops/security/articles/README.md","date":"2024-09-10T00:00:00.000Z","isOriginal":false,"cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1725990169364/3181020e-abd0-4943-a461-830c2a416035.png"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":4}]},"readingTime":{"minutes":5.12,"words":1535},"filePathRelative":"freecodecamp.org/shodan-what-to-know-about-the-internets-most-dangerous-search-engine.md","localizedDate":"September 10, 2024","excerpt":"\\n"}');export{v as comp,S as data};
