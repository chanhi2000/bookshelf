import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as v,am as s,as as h,ao as a,at as r,au as u,ap as p,al as l,an as e,aq as o,ar as g}from"./app-CpYYKbnj.js";const b={},y={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},f={class:"table-of-contents"},S={href:"https://docs.aws.amazon.com/local-zones/latest/ug/getting-started.html",target:"_blank",rel:"noopener noreferrer"};function A(d,n){const c=o("VPCard"),t=o("router-link"),k=o("SiteInfo"),i=o("FontIcon");return g(),v("div",null,[s("h1",y,[s("a",w,[s("span",null,h(d.$frontmatter.title)+" 관련",1)])]),a(c,r(u({title:"AWS > Article(s)",desc:"Article(s)",link:"/devops/aws/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),a(c,r(u({title:"Node.js > Article(s)",desc:"Article(s)",link:"/programming/js-node/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",f,[s("ul",null,[s("li",null,[a(t,{to:"#step-1-create-an-aws-local-zone"},{default:p(()=>n[0]||(n[0]=[e("Step 1: Create an AWS Local Zone")])),_:1})]),s("li",null,[a(t,{to:"#step-2-create-a-cdk-project"},{default:p(()=>n[1]||(n[1]=[e("Step 2: Create a CDK Project")])),_:1})]),s("li",null,[a(t,{to:"#step-3-create-an-amazon-eks-cluster"},{default:p(()=>n[2]||(n[2]=[e("Step 3: Create an Amazon EKS Cluster")])),_:1})]),s("li",null,[a(t,{to:"#step-4-create-worker-nodes"},{default:p(()=>n[3]||(n[3]=[e("Step 4: Create Worker Nodes")])),_:1})]),s("li",null,[a(t,{to:"#step-5-deploy-the-cdk-app"},{default:p(()=>n[4]||(n[4]=[e("Step 5: Deploy the CDK App")])),_:1})]),s("li",null,[a(t,{to:"#conclusion"},{default:p(()=>n[5]||(n[5]=[e("Conclusion")])),_:1})])])]),n[12]||(n[12]=s("hr",null,null,-1)),a(k,{name:"How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK",desc:"AWS Local Zones are a new type of infrastructure that enables you to build and run applications closer to end-users, providing low latency and improved performance.  They are designed to provide the same high availability and reliability as an AWS Region, but with the added benefit of low-latency connections...",url:"https://freecodecamp.org/news/build-an-eks-cluster-using-aws-local-zones-with-aws-cdk/",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/size/w2000/2024/05/pexels-pixabay-357742.jpg"}),n[13]||(n[13]=l('<p>AWS Local Zones are a new type of infrastructure that enables you to build and run applications closer to end-users, providing low latency and improved performance.</p><p>They are designed to provide the same high availability and reliability as an AWS Region, but with the added benefit of low-latency connections for applications that require it.</p><p>Using Local Zones can be particularly helpful if you have end users located in specific geographic areas and want to provide them with low-latency access to their applications. This can be especially important for applications that require real-time data processing or have strict performance requirements.</p><p>Local Zones can also minimize network expenses, which is an additional advantage. By executing applications in a Local Zone closer to end users, you can limit the quantity of data that must be transferred over long distances, which reduces network costs.</p><p>In this tutorial, we will see how to build a hybrid edge EKS cluster that spans across the AWS Regions and AWS Local Zones using both AWS Management Console and AWS Cloud Development Kit (CDK).</p><p>Before getting started, it&#39;s important to note that AWS Local Zones are physically separate locations that are connected to the main AWS region through high-speed links. They allow you to run certain services closer to your customers and reduce latency.</p><p>To build your EKS cluster across Local Zones, you will need to:</p><ol><li>Create an EKS cluster in the main region</li><li>Create a VPC and associated resources in the Local Zones</li><li>Connect the Local Zone VPCs to the main region VPC</li><li>Launch worker nodes in the Local Zone VPCs</li></ol><p>We&#39;ll walk through these steps in this guide.</p><figure><img src="https://lh3.googleusercontent.com/-kdtf6vkPfxVY3aLcGpqQI5wczBZXfcScdCz2z1bhNSuawjGEJyLEznPfB5mqnupfuVsPCNybRHJViCjLTxKmF5F2zq82LdHvRmnItjDFTrPDtTRhAzAgr7ToL8bhuymqSkCpVei2VcPyFdjz7YQC_w" alt="Architecture Diagram" tabindex="0" loading="lazy"><figcaption>Architecture Diagram</figcaption></figure><div class="hint-container note"><p class="hint-container-title">Prerequisites</p><p>Before we begin, you need to have the following:</p><ol><li>An AWS account with permissions to create resources in AWS Wavelength and AWS Local Zones.</li><li>AWS CDK installed on your local machine. If you don&#39;t have it installed, you can follow the instructions in the AWS CDK documentation to install it.</li><li>AWS CLI installed on your local machine. If you don&#39;t have it installed, you can follow the instructions in the AWS CLI documentation to install it.</li></ol></div><p>Finally, let’s get started.</p><hr><h2 id="step-1-create-an-aws-local-zone" tabindex="-1"><a class="header-anchor" href="#step-1-create-an-aws-local-zone"><span>Step 1: Create an AWS Local Zone</span></a></h2>',14)),s("p",null,[n[7]||(n[7]=e("The first step is to opt-in to AWS Local Zones in the region of your choice. You can follow the instructions in the ")),s("a",S,[a(i,{icon:"fa-brands fa-aws"}),n[6]||(n[6]=e("AWS Local Zones documentation"))]),n[8]||(n[8]=e(" to opt-in to these zones."))]),n[14]||(n[14]=l(`<hr><h2 id="step-2-create-a-cdk-project" tabindex="-1"><a class="header-anchor" href="#step-2-create-a-cdk-project"><span>Step 2: Create a CDK Project</span></a></h2><p>To start, we need to create a new CDK project using the following command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">cdk init <span class="token parameter variable">--language</span><span class="token operator">=</span>javascript</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>This will create a new directory with the required files and directories for a CDK project.</p><p>Next, install the required dependencies using the following command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now, let&#39;s create a new file called local-zone-eks.js in the lib directory and add the following code:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> cdk <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;aws-cdk-lib&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> ec2 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;aws-cdk-lib/aws-ec2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> autoscaling <span class="token keyword">from</span> <span class="token string">&#39;@aws-cdk/aws-autoscaling&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> ecs <span class="token keyword">from</span> <span class="token string">&#39;@aws-cdk/aws-eks&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;dotenv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">account</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">AWS_ACCOUNT_NUMBER</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">region</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">AWS_REGION</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">VPCStack</span> <span class="token keyword">extends</span> <span class="token class-name">cdk<span class="token punctuation">.</span>Stack</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">scope<span class="token punctuation">,</span> id<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">(</span>scope<span class="token punctuation">,</span> id<span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Create a VPC </span></span>
<span class="line">    <span class="token keyword">const</span> vpc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ec2<span class="token punctuation">.</span>Vpc</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;VPC&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">cidr</span><span class="token operator">:</span> <span class="token string">&#39;10.0.0.0/16&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">maxAzs</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">subnetConfiguration</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">cidrMask</span><span class="token operator">:</span> <span class="token number">24</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Public&#39;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">subnetType</span><span class="token operator">:</span> ec2<span class="token punctuation">.</span>SubnetType<span class="token punctuation">.</span><span class="token constant">PRIVATE</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">cidrMask</span><span class="token operator">:</span> <span class="token number">24</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Private&#39;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">subnetType</span><span class="token operator">:</span> ec2<span class="token punctuation">.</span>SubnetType<span class="token punctuation">.</span><span class="token constant">PRIVATE</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span> VPCStack <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This code creates a new VPC with a CIDR block of 10.0.0.0/16, which spans across two private subnets.</p><p>Next, let’s export the environment variable for our AWS Local Zone, which we will use to create the only public subnet in our VPC. In this example, we have selected the Las Vegas Local Zone and have configured the subnet accordingly.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> <span class="token literal-property property">localZone</span><span class="token operator">:</span> string <span class="token operator">=</span> &#39;us<span class="token operator">-</span>west<span class="token operator">-</span><span class="token number">2</span><span class="token operator">-</span>las<span class="token operator">-</span>1a’</span>
<span class="line"></span>
<span class="line"> <span class="token comment">// Create Local Zone Public Subnet</span></span>
<span class="line">    <span class="token keyword">const</span> LocalZoneSubnet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ec2<span class="token punctuation">.</span>PublicSubnet</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;localzone-public-subnet&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">availabilityZone</span><span class="token operator">:</span> localZone<span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">cidrBlock</span><span class="token operator">:</span> <span class="token string">&#39;10.0.3.0/26&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">vpcId</span><span class="token operator">:</span> vpc<span class="token punctuation">.</span>vpcId<span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">mapPublicIpOnLaunch</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Add Local Zone Subnet to VPC</span></span>
<span class="line">    vpc<span class="token punctuation">.</span>publicSubnets<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>LocalZoneSubnet<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="step-3-create-an-amazon-eks-cluster" tabindex="-1"><a class="header-anchor" href="#step-3-create-an-amazon-eks-cluster"><span>Step 3: Create an Amazon EKS Cluster</span></a></h2><p>Now that we have a VPC, we can create an Amazon Elastic Container Service for Kubernetes (Amazon EKS) cluster.</p><p>Add the following code to the local-zone-eks.js file:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> eks <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;aws-cdk-lib/aws-eks&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">EKSStack</span> <span class="token keyword">extends</span> <span class="token class-name">cdk<span class="token punctuation">.</span>Stack</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">scope<span class="token punctuation">,</span> id<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">(</span>scope<span class="token punctuation">,</span> id<span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// Create the EKS cluster</span></span>
<span class="line">    <span class="token keyword">const</span> cluster <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">eks<span class="token punctuation">.</span>Cluster</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;EKSCluster&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">vpc</span><span class="token operator">:</span> vpc<span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">defaultCapacity</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">version</span><span class="token operator">:</span> <span class="token string">&#39;1.21&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">clusterName</span><span class="token operator">:</span> <span class="token string">&#39;local-zone-eks-demo-cluster&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span> EKSStack <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This code creates a new EKS cluster using the VPC we created earlier. It also specifies the Kubernetes version to use and the name of the cluster.</p><hr><h2 id="step-4-create-worker-nodes" tabindex="-1"><a class="header-anchor" href="#step-4-create-worker-nodes"><span>Step 4: Create Worker Nodes</span></a></h2><p>Next, we need to create worker nodes to run our applications on the EKS cluster.</p>`,21)),s("p",null,[n[9]||(n[9]=e("Add the following code to the ")),a(i,{icon:"fa-brands fa-js"}),n[10]||(n[10]=s("code",null,"local-zone-eks.js",-1)),n[11]||(n[11]=e(" file:"))]),n[15]||(n[15]=l(`<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// Define EKS-optimized image for Launch Template</span></span>
<span class="line">    <span class="token keyword">const</span> image <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ecs<span class="token punctuation">.</span>EksOptimizedAmi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Create Launch Template for Auto Scaling group to reference</span></span>
<span class="line">    <span class="token keyword">const</span> lzLaunchTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ec2<span class="token punctuation">.</span>CfnLaunchTemplate</span><span class="token punctuation">(</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&#39;eks-launch-template&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">launchTemplateName</span><span class="token operator">:</span> <span class="token string">&#39;lz-launch-template&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">launchTemplateData</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">networkInterfaces</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">              <span class="token literal-property property">deviceIndex</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">              <span class="token literal-property property">associatePublicIpAddress</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">              <span class="token literal-property property">deleteOnTermination</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">              <span class="token literal-property property">subnetId</span><span class="token operator">:</span> LocalZoneSubnet<span class="token punctuation">.</span>subnetId<span class="token operator">!</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">imageId</span><span class="token operator">:</span> image<span class="token punctuation">.</span><span class="token function">getImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span>imageId<span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">instanceType</span><span class="token operator">:</span> <span class="token string">&#39;t3.medium&#39;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">userData</span><span class="token operator">:</span> cdk<span class="token punctuation">.</span>Fn<span class="token punctuation">.</span><span class="token function">base64</span><span class="token punctuation">(</span></span>
<span class="line">            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">#!/bin/bash -xe</span>
<span class="line">          set -o xtrace</span>
<span class="line">          /etc/eks/bootstrap.sh ‘local-zone-eks-demo-cluster’</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Create Auto Scaling Group</span></span>
<span class="line">    <span class="token keyword">const</span> lz_asg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">autoscaling<span class="token punctuation">.</span>AutoScalingGroup</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;LocalZoneWorkerNodes&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">instanceType</span><span class="token operator">:</span> ec2<span class="token punctuation">.</span>InstanceType<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>ec2<span class="token punctuation">.</span>InstanceClass<span class="token punctuation">.</span><span class="token constant">T3</span><span class="token punctuation">,</span> ec2<span class="token punctuation">.</span>InstanceSize<span class="token punctuation">.</span><span class="token constant">MEDIUM</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">machineImage</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">ecs<span class="token punctuation">.</span>EksOptimizedAmi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">updateType</span><span class="token operator">:</span> autoscaling<span class="token punctuation">.</span>UpdateType<span class="token punctuation">.</span><span class="token constant">REPLACING_UPDATE</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">desiredCapacity</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">vpc</span><span class="token operator">:</span> vpc<span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">launchTemplate</span><span class="token operator">:</span> lzLaunchTemplate</span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This code creates a new auto-scaling group to manage the worker nodes, and adds the worker nodes to the EKS cluster using the instance bootstrap script.</p><hr><h2 id="step-5-deploy-the-cdk-app" tabindex="-1"><a class="header-anchor" href="#step-5-deploy-the-cdk-app"><span>Step 5: Deploy the CDK App</span></a></h2><p>Now that we have all the required code, we can deploy it using the following command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">cdk deploy</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>With your EKS cluster up and running, you can start deploying your applications. You can use Kubernetes manifests or Helm charts to deploy your applications to the cluster.</p><hr><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion</span></a></h2><p>AWS Local Zones provide a robust mechanism for providing high-performance applications to end users, independent of their location. They also give end users a better experience and deliver great performance.</p><p>I’m always open to suggestions and discussions on <a href="https://linkedin.com/in/gursimarsm">LinkedIn</a>. Hit me up with direct messages.</p><p>If you’ve enjoyed my writing and want to keep me motivated, consider leaving stars on <a href="https://github.com/gursimarsm">GitHub</a> and endorse me for relevant skills on <a href="https://linkedin.com/in/gursimarsm">LinkedIn</a>.</p><p>Till the next one, stay safe and keep learning.</p>`,13))])}const L=m(b,[["render",A],["__file","build-an-eks-cluster-using-aws-local-zones-with-aws-cdk.html.vue"]]),W=JSON.parse('{"path":"/freecodecamp.org/build-an-eks-cluster-using-aws-local-zones-with-aws-cdk.html","title":"How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK","lang":"en-US","frontmatter":{"lang":"en-US","title":"How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK","description":"Article(s) > How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK","icon":"fa-brands fa-aws","category":["DevOps","Amazon","AWS","Node.js","Article(s)"],"tag":["blog","freecodecamp.org","amazon-web-services","aws","eks","aws-eks","eks-cluster","aws-cdk","hashicorp","terraform","hcl"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK"},{"property":"og:description","content":"How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-eks-cluster-using-aws-local-zones-with-aws-cdk.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-eks-cluster-using-aws-local-zones-with-aws-cdk.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK"}],["meta",{"property":"og:description","content":"Article(s) > How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/pexels-pixabay-357742.jpg"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/pexels-pixabay-357742.jpg"}],["meta",{"name":"twitter:image:alt","content":"How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"amazon-web-services"}],["meta",{"property":"article:tag","content":"aws"}],["meta",{"property":"article:tag","content":"eks"}],["meta",{"property":"article:tag","content":"aws-eks"}],["meta",{"property":"article:tag","content":"eks-cluster"}],["meta",{"property":"article:tag","content":"aws-cdk"}],["meta",{"property":"article:tag","content":"hashicorp"}],["meta",{"property":"article:tag","content":"terraform"}],["meta",{"property":"article:tag","content":"hcl"}],["meta",{"property":"article:published_time","content":"2024-05-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to Build an EKS Cluster Across AWS Local Zones using the AWS CDK\\",\\"image\\":[\\"https://lh3.googleusercontent.com/-kdtf6vkPfxVY3aLcGpqQI5wczBZXfcScdCz2z1bhNSuawjGEJyLEznPfB5mqnupfuVsPCNybRHJViCjLTxKmF5F2zq82LdHvRmnItjDFTrPDtTRhAzAgr7ToL8bhuymqSkCpVei2VcPyFdjz7YQC_w\\"],\\"datePublished\\":\\"2024-05-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/devops/aws/articles/README.md","date":"2024-05-28T00:00:00.000Z","isOriginal":false,"cover":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/pexels-pixabay-357742.jpg"},"headers":[{"level":2,"title":"Step 1: Create an AWS Local Zone","slug":"step-1-create-an-aws-local-zone","link":"#step-1-create-an-aws-local-zone","children":[]},{"level":2,"title":"Step 2: Create a CDK Project","slug":"step-2-create-a-cdk-project","link":"#step-2-create-a-cdk-project","children":[]},{"level":2,"title":"Step 3: Create an Amazon EKS Cluster","slug":"step-3-create-an-amazon-eks-cluster","link":"#step-3-create-an-amazon-eks-cluster","children":[]},{"level":2,"title":"Step 4: Create Worker Nodes","slug":"step-4-create-worker-nodes","link":"#step-4-create-worker-nodes","children":[]},{"level":2,"title":"Step 5: Deploy the CDK App","slug":"step-5-deploy-the-cdk-app","link":"#step-5-deploy-the-cdk-app","children":[]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":4}]},"readingTime":{"minutes":4.54,"words":1362},"filePathRelative":"freecodecamp.org/build-an-eks-cluster-using-aws-local-zones-with-aws-cdk.md","localizedDate":"May 28, 2024","excerpt":"\\n"}');export{L as comp,W as data};