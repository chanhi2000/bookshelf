import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as e,as as r,ao as s,at as d,au as u,ap as h,al as m,aq as a,ar as v,an as k}from"./app-CpYYKbnj.js";const b={},g={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"},f={class:"table-of-contents"};function w(t,n){const i=a("VPCard"),o=a("router-link"),c=a("SiteInfo");return v(),p("div",null,[e("h1",g,[e("a",y,[e("span",null,r(t.$frontmatter.title)+" 관련",1)])]),s(i,d(u({title:"The Microservices Book – Learn How to Build and Manage Services in the Cloud",desc:"In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi...",link:"/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),e("nav",f,[e("ul",null,[e("li",null,[s(o,{to:"#orchestration-with-kubernetes"},{default:h(()=>n[0]||(n[0]=[k("Orchestration with Kubernetes")])),_:1})])])]),n[1]||(n[1]=e("hr",null,null,-1)),s(c,{name:"The Microservices Book – Learn How to Build and Manage Services in the Cloud",desc:"In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi...",url:"https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-continuous-integration-and-continuous-deployment-cicd",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"}),n[2]||(n[2]=m(`<p>CI/CD helps you automate the process of building, testing, and deploying microservices.</p><p>It’s like having an automated assembly line that assembles, tests, and packages products without manual intervention.</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title=".github/workflows/node.js.yml"><pre><code><span class="line"><span class="token comment"># Using GitHub Actions for Node.js</span></span>
<span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Node.js CI</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout code</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set up Node.js</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;14&#39;</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run tests</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm test</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The code above shows the process of how GitHub Actions is used to automate the Continuous Integration (CI) process for a Node.js application. The CI/CD pipeline ensures that code is automatically built, tested, and prepared for deployment without manual intervention, much like an automated assembly line that assembles, tests, and packages products seamlessly.</p><p>The file begins with the line <code>name: Node.js CI</code>, which sets the name of the workflow. The <code>on:</code> section specifies when the workflow should be triggered. In this case, it’s set to trigger on <code>push</code> events to the <code>main</code> branch.</p><p>This means every time a developer pushes changes to the main branch, GitHub Actions will automatically start the pipeline to check the quality and functionality of the code.</p><p>The <code>jobs:</code> section defines the tasks to be executed in this pipeline, and it specifies that the job will run on <code>ubuntu-latest</code>, a virtual machine environment provided by GitHub to run the workflow. Inside the <code>build</code> job, there are several <code>steps</code> that execute sequentially.</p><p>In the first step, <code>Checkout code</code>, uses the <code>actions/checkout@v3</code> action to check out the repository’s code so that the subsequent steps can operate on it.</p><p>In the next step, <code>Set up Node.js</code>, utilizes <code>actions/setup-node@v3</code> to install Node.js version 14. This step ensures that the correct version of Node.js is used for the application, avoiding discrepancies between environments.</p><p>After setting up Node.js, the step <code>Install dependencies</code> runs the command <code>npm install</code>, which installs all the dependencies defined in the project’s <code>package.json</code> file. This ensures that the necessary packages are available for the tests to run.</p><p>Finally, the last step, <code>Run tests</code>, runs the command <code>npm test</code>, which triggers the tests for the Node.js application. This step ensures that any changes made in the code do not break the functionality of the application, as the tests will validate that everything works as expected.</p><p>Through this GitHub Actions configuration, the CI process is fully automated. Every time changes are pushed to the main branch, the pipeline builds the project, installs dependencies, and runs the tests.</p><p>This process ensures that issues are caught early, streamlining development and improving code quality by providing automated feedback on the state of the application. It also saves time by eliminating the need for manual testing and deployment steps.</p><hr><h2 id="orchestration-with-kubernetes" tabindex="-1"><a class="header-anchor" href="#orchestration-with-kubernetes"><span>Orchestration with Kubernetes</span></a></h2><p>Kubernetes helps you manage the deployment, scaling, and operation of containerized applications.</p><p>Like a conductor orchestrating a symphony, Kubernetes manages and coordinates the deployment and scaling of your containerized services.</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># Kubernetes YAML for a Node.js app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deployment definition</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">app</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line">  <span class="token key atrule">template</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">app</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">containers</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line">          <span class="token key atrule">image</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service<span class="token punctuation">:</span>latest</span>
<span class="line">          <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3000</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Service definition</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Service</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">app</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line">  <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP</span>
<span class="line">      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span></span>
<span class="line">      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3000</span></span>
<span class="line">  <span class="token key atrule">type</span><span class="token punctuation">:</span> LoadBalancer</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This code illustrates how you can use Kubernetes to orchestrate the deployment and management of a Node.js application, specifically the <code>user-service</code>.</p><p>This YAML configuration file contains two main sections: the <strong>Deployment</strong> and the <strong>Service</strong>.</p><p>The <strong>Deployment</strong> section is where you define how your application should be deployed in the Kubernetes cluster. It specifies the <code>apiVersion</code>, which indicates which version of the Kubernetes API should be used to create the resource, and the <code>kind</code>, which identifies the type of resource being defined (in this case, a <code>Deployment</code>).</p><p>The <code>metadata</code> section contains basic information about the deployment, such as its name (<code>user-service</code>). Under <code>spec</code>, you define the desired state for the application.</p><p>The <code>replicas: 3</code> field indicates that Kubernetes should maintain three identical instances of the <code>user-service</code> pod running at all times, which helps ensure high availability and load balancing.</p><p>The <code>selector</code> field defines a label selector that is used to identify the set of pods that this deployment should manage. The <code>template</code> section defines the pod’s metadata and its spec.</p><p>This includes a container definition, where the <code>image</code> is set to <code>user-service:latest</code>, pointing to the Docker image to be used for the container. The <code>ports</code> section specifies that the container will listen on port 3000, which is the port your Node.js app will use.</p><p>In the <strong>Service</strong> section, Kubernetes defines how to expose the deployed application so that other services or external clients can access it. The <code>Service</code> is also defined with <code>apiVersion: v1</code> and <code>kind: Service</code>, indicating that it will use Kubernetes’ core service management. The <code>metadata</code> section defines the service name (<code>user-service</code>), while the <code>spec</code> section describes the service&#39;s behavior.</p><p>The <code>selector</code> here refers to the same label as the deployment (<code>app: user-service</code>), ensuring that the service will route traffic to the pods created by the deployment. The <code>ports</code> section specifies that the service will listen on port 80 (the external port) and forward traffic to port 3000 (the port inside the container where the app is running).</p><p>Finally, the <code>type: LoadBalancer</code> tells Kubernetes to provision an external load balancer, distributing incoming traffic across the multiple instances of the <code>user-service</code> pods, further ensuring high availability and fault tolerance.</p><p>Through this orchestration, Kubernetes ensures that your <code>user-service</code> is deployed, scaled, and exposed in a highly available manner, much like a conductor ensuring that all sections of a symphony play in time and tune.</p><p>It provides detailed guidance on choosing the right technology stack, defining APIs and contracts, and understanding key design patterns.</p><p>Selecting appropriate programming languages and frameworks is crucial for optimizing each microservice, while well-defined APIs and contracts ensure clear and reliable communication between services.</p><p>Key design patterns such as the API Gateway Pattern, Strangler Fig Pattern, and Backend for Frontend (BFF) Pattern are explained to help manage and optimize microservices architecture.</p>`,32))])}const T=l(b,[["render",w],["__file","continuous-integration-and-continuous-deployment-cicd.html.vue"]]),j=JSON.parse('{"path":"/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/continuous-integration-and-continuous-deployment-cicd.html","title":"Continuous Integration and Continuous Deployment (CI/CD)","lang":"en-US","frontmatter":{"lang":"en-US","title":"Continuous Integration and Continuous Deployment (CI/CD)","description":"Article(s) > (12/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud","category":["Node.js","RabbitMQ","DevOps","Docker","Kubernetes","Article(s)"],"tag":["blog","freecodecamp.org","node","nodejs","node-js","rabbitmq","rabbit-mq","devops","vm","docker","k8s","kubernetes"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > (12/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud"},{"property":"og:description","content":"Continuous Integration and Continuous Deployment (CI/CD)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/continuous-integration-and-continuous-deployment-cicd.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/continuous-integration-and-continuous-deployment-cicd.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Continuous Integration and Continuous Deployment (CI/CD)"}],["meta",{"property":"og:description","content":"Article(s) > (12/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"}],["meta",{"name":"twitter:image:alt","content":"Continuous Integration and Continuous Deployment (CI/CD)"}],["meta",{"property":"article:author","content":"Adekola Olawale"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"node"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"node-js"}],["meta",{"property":"article:tag","content":"rabbitmq"}],["meta",{"property":"article:tag","content":"rabbit-mq"}],["meta",{"property":"article:tag","content":"devops"}],["meta",{"property":"article:tag","content":"vm"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"k8s"}],["meta",{"property":"article:tag","content":"kubernetes"}],["meta",{"property":"article:published_time","content":"2024-11-29T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Continuous Integration and Continuous Deployment (CI/CD)\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png\\"],\\"datePublished\\":\\"2024-11-29T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Adekola Olawale\\"}]}"]],"date":"2024-11-29T00:00:00.000Z","isOriginal":false,"author":"Adekola Olawale","cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"},"headers":[{"level":2,"title":"Orchestration with Kubernetes","slug":"orchestration-with-kubernetes","link":"#orchestration-with-kubernetes","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":4.4,"words":1320},"filePathRelative":"freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/continuous-integration-and-continuous-deployment-cicd.md","localizedDate":"November 29, 2024","excerpt":"\\n","copyright":{"author":"Adekola Olawale"}}');export{T as comp,j as data};