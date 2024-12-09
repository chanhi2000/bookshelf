import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as k,b as n,t as v,e as a,n as m,g as b,w as t,d as s,f as e,r as p,o as y}from"./app-ubLChIzZ.js";const h={},g={id:"frontmatter-title-관련",tabindex:"-1"},_={class:"header-anchor",href:"#frontmatter-title-관련"},w={class:"table-of-contents"},f=n("hr",null,null,-1),A=e('<h2 id="unit-overview" tabindex="-1"><a class="header-anchor" href="#unit-overview"><span>Unit overview</span></a></h2><ul><li>we will learn about deployments and take our website project and deploy it to the AWS cloud.</li><li>learn about other DevOps practices such as CI/CD</li></ul><hr><h2 id="a-quick-introduction-to-aws" tabindex="-1"><a class="header-anchor" href="#a-quick-introduction-to-aws"><span>A quick introduction to AWS</span></a></h2><ul><li>AWS (Amazon Web Services) is a cloud platform provider offering over 200 products &amp; services available in data centers all over the world</li><li>you need an AWS account to continue with the rest of the course</li></ul><div class="hint-container info"><p class="hint-container-title">📚Resources</p><ul><li><a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">Amazon Web Services</a></li></ul></div><hr><h2 id="aws-s3" tabindex="-1"><a class="header-anchor" href="#aws-s3"><span>AWS S3</span></a></h2><ul><li>the first AWS service that we will use is AWS S3 which stands for simple storage service</li><li>the website is static and requires no computing power or a database</li><li>we will use AWS S3 to store the public files and serve them over HTTP</li><li>AWS S3 files (which AWS calls objects) are stored in buckets</li><li>the name of the bucket needs to be unique</li><li>the AWS console allows us to manually upload files through the web interface</li></ul><hr><h2 id="aws-cli" tabindex="-1"><a class="header-anchor" href="#aws-cli"><span>AWS CLI</span></a></h2><ul><li>to interact with the AWS cloud services, we need to use a CLI tool called AWS CLI</li><li>we will use AWS CLI v2 throughout the course</li><li>when using Docker images in pipelines, I highly recommend specifying a tag or at least a major version (if available)</li><li>if you don&#39;t specify a tag, at least log the version of every tool you use, as this can help with debugging later on</li><li>example: <code>aws --version</code></li></ul>',12),C={class:"hint-container important"},S=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),I=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to s3</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),E=e('<div class="hint-container info"><p class="hint-container-title">📚Resources</p><ul><li><a href="https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html" target="_blank" rel="noopener noreferrer">AWS CLI documentation</a></li><li><a href="https://hub.docker.com/r/amazon/aws-cli" target="_blank" rel="noopener noreferrer">AWS CLI on Dockerhub</a></li></ul></div><hr><h2 id="uploading-a-file-to-s3" tabindex="-1"><a class="header-anchor" href="#uploading-a-file-to-s3"><span>Uploading a file to S3</span></a></h2><ul><li>to upload a file to S3, we will use the copy command <code>cp</code></li><li><code>aws s3 cp</code> allows us to copy a file to and from AWS S3</li></ul>',4),q={class:"hint-container important"},R=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),N=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">.build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">.test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to s3</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> echo &quot;Hello S3&quot; <span class="token punctuation">&gt;</span> test.txt</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 cp test.txt s3<span class="token punctuation">:</span>//YOUR_BUCKET_NAME/test.txt</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),U=e('<div class="hint-container info"><p class="hint-container-title">📚Resources</p><ul><li><a href="https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html" target="_blank" rel="noopener noreferrer">AWS CLI for S3 documentation</a></li></ul></div><hr><h2 id="masking-protecting-variables" tabindex="-1"><a class="header-anchor" href="#masking-protecting-variables"><span>Masking &amp; protecting variables</span></a></h2><ul><li>to define a variable, go to <code>[Settings]</code> &gt; <code>[CI/CD]</code> &gt; <code>[Variables]</code> &gt; <code>[Add variable]</code></li><li>we typically store passwords or other secrets</li><li>a variable has a key and a value</li><li>it is a good practice to write the key in uppercase and to separate any words with underscores</li><li>flags: <ul><li><em>Protect variable</em>: if enabled, the variable is not available in branches, apart from the default branch (main), which is a protected branch</li><li><em>Mask variable</em>: if enabled, the variable value is never displayed in clear text in job logs</li></ul></li></ul>',4),L={class:"hint-container important"},x=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),M=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">.build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">.test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to s3</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> echo &quot;Hello S3&quot; <span class="token punctuation">&gt;</span> test.txt</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 cp test.txt s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET/test.txt</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),T=e('<hr><h2 id="identity-management-with-aws-iam" tabindex="-1"><a class="header-anchor" href="#identity-management-with-aws-iam"><span>Identity management with AWS IAM</span></a></h2><ul><li>we don&#39;t want to use our username and password to use AWS services from the CLI (I am not even sure if this is even possible!)</li><li>as we only need access to S3, it makes sense to work with an account with limited permissions</li><li>IAM allows us to manage access to the AWS services</li><li>we will create a new user with the following settings: <ul><li>account type: programmatic access</li><li>permissions: attach existing policy: AmazonS3FullAccess</li></ul></li><li>the account details will be displayed only once</li><li>go to <em>Settings &gt; CI/CD &gt; Variables &gt; Add variable</em> and define the following unprotected variables: <ul><li><code>AWS_ACCESS_KEY_ID</code></li><li><code>AWS_SECRET_ACCESS_KEY</code></li><li><code>AWS_DEFAULT_REGION</code></li></ul></li><li>AWS CLI will look for these variables and use them to authenticate</li></ul><hr><h2 id="uploading-multiple-files-to-s3" tabindex="-1"><a class="header-anchor" href="#uploading-multiple-files-to-s3"><span>Uploading multiple files to S3</span></a></h2><ul><li>using cp to copy individual files can take a lot of space in the pipeline config</li><li>some file names are generated during the build process, and we can&#39;t know them in advance</li><li>we will use sync to align the content between the build folder in GitLab and the S3 bucket</li></ul>',6),P={class:"hint-container important"},W=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),D=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to s3</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),$=e(`<div class="hint-container info"><p class="hint-container-title">📚Resources</p><ul><li><a href="https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html" target="_blank" rel="noopener noreferrer">AWS S3 sync command documentation</a></li></ul></div><hr><h2 id="hosting-a-website-on-s3" tabindex="-1"><a class="header-anchor" href="#hosting-a-website-on-s3"><span>Hosting a website on S3</span></a></h2><ul><li>files in the S3 bucket are not publicly available</li><li>to get the website to work, we need to configure the bucket</li><li>from the bucket, click on <em>Properties</em> and enable Static website hosting</li><li>from the bucket, click on the <em>Permissions</em> tab and disable <em>Block public access</em></li><li>from the bucket, click on the <em>Permissions</em> tab and set a bucket policy</li></ul><div class="hint-container important"><p class="hint-container-title">S3 bucket policy example</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;Version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2012-10-17&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;Statement&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;Sid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PublicRead&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;Effect&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Allow&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;Principal&quot;</span><span class="token operator">:</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;Action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;s3:GetObject&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;Resource&quot;</span><span class="token operator">:</span> <span class="token string">&quot;arn:aws:s3:::YOUR-BUCKET-NAME/*&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><hr><h2 id="controlling-when-jobs-run" tabindex="-1"><a class="header-anchor" href="#controlling-when-jobs-run"><span>Controlling when jobs run</span></a></h2><ul><li>we don’t want to deploy to production from every branch</li><li>to decide which jobs to run, we can use <code>rules:</code> to set a condition</li><li><code>CI_COMMIT_REF_NAME</code> gives us the current branch that is running the pipeline</li><li><code>CI_DEFAULT_BRANCH</code> gives us the name of the default branch (typically main or master)</li></ul>`,8),O={class:"hint-container important"},B=n("p",{class:"hint-container-title"},"Pipeline after this lectur",-1),G=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to s3</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),j=e('<div class="hint-container info"><p class="hint-container-title">📚Resources</p><ul><li><a href="https://docs.gitlab.com/ee/ci/yaml/#rules" target="_blank" rel="noopener noreferrer">GitLab reference for the .gitlab-ci.yml file - rules:</a></li><li><a href="https://docs.gitlab.com/ee/ci/variables/predefined_variables.html" target="_blank" rel="noopener noreferrer">Predefined variables in GitLab</a></li></ul></div><hr><h2 id="post-deployment-testing" tabindex="-1"><a class="header-anchor" href="#post-deployment-testing"><span>Post-deployment testing</span></a></h2><ul><li>we will use <code>cURL</code> to download the index.html file from the website</li><li>with <code>grep</code>, we will check to see if the index.html file contains a specific string</li></ul>',4),F={class:"hint-container important"},V=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),z=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line">  <span class="token punctuation">-</span> post deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">variables</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">APP_BASE_URL</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//YOUR<span class="token punctuation">-</span>BUCKET<span class="token punctuation">-</span>NAME.s3<span class="token punctuation">-</span>website<span class="token punctuation">-</span>YOUR<span class="token punctuation">-</span>REGION.amazonaws.com</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to s3</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">production tests</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> post deploy</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> curlimages/curl</span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> curl $APP_BASE_URL <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),H=e('<hr><h2 id="what-is-ci-cd" tabindex="-1"><a class="header-anchor" href="#what-is-ci-cd"><span>What is CI/CD?</span></a></h2><ul><li>the pipeline goes through multiple stages: build, test &amp; deploy</li><li>right now, we consider the website hosted at AWS S3 our production environment</li><li>quite often, pipelines will also have a staging environment</li><li>a staging environment is a non-production, usually non-public environment that is very close to the actual production environment</li><li>we often use automation to create these environments and to ensure that they are indeed identical</li><li>we use a staging environment as a pre-production environment</li><li>essentially, we try out our deployment in the pre-production environment</li><li>CD can refer to two concepts: <ul><li>Continuous Deployment - where every change is automatically deployed to production</li><li>Continuous Delivery - where every change is automatically deployed to staging but where we need some manual intervention to deploy to production</li></ul></li></ul><hr><h2 id="assignment" tabindex="-1"><a class="header-anchor" href="#assignment"><span>Assignment</span></a></h2><ul><li>create a staging environment and add it to the CI/CD pipeline</li></ul><hr><h2 id="assignment-solution" tabindex="-1"><a class="header-anchor" href="#assignment-solution"><span>Assignment solution</span></a></h2>',8),K={class:"hint-container important"},Y=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),J=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy staging</span>
<span class="line">  <span class="token punctuation">-</span> test staging</span>
<span class="line">  <span class="token punctuation">-</span> deploy production</span>
<span class="line">  <span class="token punctuation">-</span> test production</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">variables</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">APP_BASE_URL</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//YOUR<span class="token punctuation">-</span>BUCKET<span class="token punctuation">-</span>NAME.s3<span class="token punctuation">-</span>website<span class="token punctuation">-</span>YOUR<span class="token punctuation">-</span>REGION.amazonaws.com</span>
<span class="line">  <span class="token key atrule">APP_BASE_URL_STAGING</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//YOUR<span class="token punctuation">-</span>BUCKET<span class="token punctuation">-</span>NAME<span class="token punctuation">-</span>STAGING.s3<span class="token punctuation">-</span>website<span class="token punctuation">-</span>YOUR<span class="token punctuation">-</span>REGION.amazonaws.com</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to staging</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy staging</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET_STAGING <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">staging tests</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test staging</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> curlimages/curl</span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> curl $APP_BASE_URL_STAGING <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to production</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy production</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">production tests</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test production</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> curlimages/curl</span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> curl $APP_BASE_URL <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Q=n("hr",null,null,-1),X=n("h2",{id:"environments",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#environments"},[n("span",null,"Environments")])],-1),Z=n("ul",null,[n("li",null,"every system where we deploy an application is an environment"),n("li",null,"typical environments include test, staging & production"),n("li",null,"GitLab offers support for environments"),n("li",null,[s("we can define environments in "),n("code",null,"[Deployments]"),s(" > "),n("code",null,"[Environments]")])],-1),nn={class:"hint-container important"},sn=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),an=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy staging</span>
<span class="line">  <span class="token punctuation">-</span> deploy production</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to staging</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy staging</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> staging</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line">    <span class="token punctuation">-</span> curl $CI_ENVIRONMENT_URL <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to production</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy production</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> production</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line">    <span class="token punctuation">-</span> curl $CI_ENVIRONMENT_URL <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),en=e('<div class="hint-container info"><p class="hint-container-title">📚Resources</p><ul><li><a href="https://docs.gitlab.com/ee/ci/variables/predefined_variables.html" target="_blank" rel="noopener noreferrer">Predefined variables in GitLab</a></li></ul></div><hr><h2 id="reusing-configuration" tabindex="-1"><a class="header-anchor" href="#reusing-configuration"><span>Reusing configuration</span></a></h2><ul><li>sometimes, multiple jobs may look almost the same, and we should try to avoid repeating ourselves</li><li>GitLab allows us to inherit from an exiting job with the <code>extends:</code> keyword</li></ul>',4),ln={class:"hint-container important"},tn=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),pn=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy staging</span>
<span class="line">  <span class="token punctuation">-</span> deploy production</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">.deploy</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line">    <span class="token punctuation">-</span> curl $CI_ENVIRONMENT_URL <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to staging</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy staging</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> staging</span>
<span class="line">  <span class="token key atrule">extends</span><span class="token punctuation">:</span> .deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to production</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy production</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> production</span>
<span class="line">  <span class="token key atrule">extends</span><span class="token punctuation">:</span> .deploy</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),cn=n("hr",null,null,-1),on=n("h2",{id:"assignment-1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#assignment-1"},[n("span",null,"Assignment")])],-1),un=n("li",null,"the goal of this assignment is to expand the post-deployment tests to ensure that the correct version has been deployed",-1),rn=n("code",null,"version.html",-1),dn=n("li",null,[s("the current build number is given by a predefined GitLab CI variable named "),n("code",null,"CI_PIPELINE_IID")],-1),kn=e('<div class="hint-container info"><p class="hint-container-title">📚Resources</p><ul><li><a href="https://docs.gitlab.com/ee/ci/variables/predefined_variables.html" target="_blank" rel="noopener noreferrer">Predefined variables in GitLab</a></li></ul></div><hr><h2 id="assignment-solution-1" tabindex="-1"><a class="header-anchor" href="#assignment-solution-1"><span>Assignment solution</span></a></h2>',3),vn={class:"hint-container important"},mn=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),bn=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy staging</span>
<span class="line">  <span class="token punctuation">-</span> deploy production</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">variables</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">APP_VERSION</span><span class="token punctuation">:</span> $CI_PIPELINE_IID</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">    <span class="token punctuation">-</span> echo $APP_VERSION <span class="token punctuation">&gt;</span> build/version.html</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">.deploy</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line">    <span class="token punctuation">-</span> curl $CI_ENVIRONMENT_URL <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line">    <span class="token punctuation">-</span> curl $CI_ENVIRONMENT_URL/version.html <span class="token punctuation">|</span> grep $APP_VERSION</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to staging</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy staging</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> staging</span>
<span class="line">  <span class="token key atrule">extends</span><span class="token punctuation">:</span> .deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to production</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy production</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> production</span>
<span class="line">  <span class="token key atrule">extends</span><span class="token punctuation">:</span> .deploy</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),yn=n("hr",null,null,-1),hn=n("h2",{id:"continuous-delivery-pipeline",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#continuous-delivery-pipeline"},[n("span",null,"Continuous Delivery pipeline")])],-1),gn=n("ul",null,[n("li",null,[s("adding "),n("code",null,"when: manual"),s(" allows us to manually trigger the production deployment")])],-1),_n={class:"hint-container important"},wn=n("p",{class:"hint-container-title"},"Pipeline after this lecture",-1),fn=e(`<code>.gitlab-ci.yml</code><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy staging</span>
<span class="line">  <span class="token punctuation">-</span> deploy production</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">variables</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">APP_VERSION</span><span class="token punctuation">:</span> $CI_PIPELINE_IID</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn install</span>
<span class="line">    <span class="token punctuation">-</span> yarn lint</span>
<span class="line">    <span class="token punctuation">-</span> yarn test</span>
<span class="line">    <span class="token punctuation">-</span> yarn build</span>
<span class="line">    <span class="token punctuation">-</span> echo $APP_VERSION <span class="token punctuation">&gt;</span> build/version.html</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test website</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16<span class="token punctuation">-</span>alpine</span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> yarn global add serve</span>
<span class="line">    <span class="token punctuation">-</span> apk add curl</span>
<span class="line">    <span class="token punctuation">-</span> serve <span class="token punctuation">-</span>s build &amp;</span>
<span class="line">    <span class="token punctuation">-</span> sleep 10</span>
<span class="line">    <span class="token punctuation">-</span> curl http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3000 <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">.deploy</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> </span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> amazon/aws<span class="token punctuation">-</span>cli<span class="token punctuation">:</span>2.4.11</span>
<span class="line">    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> aws <span class="token punctuation">-</span><span class="token punctuation">-</span>version</span>
<span class="line">    <span class="token punctuation">-</span> aws s3 sync build s3<span class="token punctuation">:</span>//$AWS_S3_BUCKET <span class="token punctuation">-</span><span class="token punctuation">-</span>delete</span>
<span class="line">    <span class="token punctuation">-</span> curl $CI_ENVIRONMENT_URL <span class="token punctuation">|</span> grep &quot;React App&quot;</span>
<span class="line">    <span class="token punctuation">-</span> curl $CI_ENVIRONMENT_URL/version.html <span class="token punctuation">|</span> grep $APP_VERSION</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to staging</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy staging</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> staging</span>
<span class="line">  <span class="token key atrule">extends</span><span class="token punctuation">:</span> .deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy to production</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy production</span>
<span class="line">  <span class="token key atrule">when</span><span class="token punctuation">:</span> manual</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span> production</span>
<span class="line">  <span class="token key atrule">extends</span><span class="token punctuation">:</span> .deploy</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function An(c,Cn){const o=p("VPCard"),l=p("router-link"),u=p("SiteInfo"),r=p("VidStack"),i=p("FontIcon");return y(),k("div",null,[n("h1",g,[n("a",_,[n("span",null,v(c.$frontmatter.title)+" 관련",1)])]),a(o,m(b({title:"DevOps with GitLab CI Course",desc:"GitLab CI/CD can automatically build, test, deploy, and monitor your applications. We just published a full course on the freeCodeCamp.org YouTube channel that will teach you how to use GitLab CI. Valentin Despa developed this course. Valentin is an ...",link:"/freecodecamp.org/devops-with-gitlab-ci-course/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),n("nav",w,[n("ul",null,[n("li",null,[a(l,{to:"#unit-overview"},{default:t(()=>[s("Unit overview")]),_:1})]),n("li",null,[a(l,{to:"#a-quick-introduction-to-aws"},{default:t(()=>[s("A quick introduction to AWS")]),_:1})]),n("li",null,[a(l,{to:"#aws-s3"},{default:t(()=>[s("AWS S3")]),_:1})]),n("li",null,[a(l,{to:"#aws-cli"},{default:t(()=>[s("AWS CLI")]),_:1})]),n("li",null,[a(l,{to:"#uploading-a-file-to-s3"},{default:t(()=>[s("Uploading a file to S3")]),_:1})]),n("li",null,[a(l,{to:"#masking-protecting-variables"},{default:t(()=>[s("Masking & protecting variables")]),_:1})]),n("li",null,[a(l,{to:"#identity-management-with-aws-iam"},{default:t(()=>[s("Identity management with AWS IAM")]),_:1})]),n("li",null,[a(l,{to:"#uploading-multiple-files-to-s3"},{default:t(()=>[s("Uploading multiple files to S3")]),_:1})]),n("li",null,[a(l,{to:"#hosting-a-website-on-s3"},{default:t(()=>[s("Hosting a website on S3")]),_:1})]),n("li",null,[a(l,{to:"#controlling-when-jobs-run"},{default:t(()=>[s("Controlling when jobs run")]),_:1})]),n("li",null,[a(l,{to:"#post-deployment-testing"},{default:t(()=>[s("Post-deployment testing")]),_:1})]),n("li",null,[a(l,{to:"#what-is-ci-cd"},{default:t(()=>[s("What is CI/CD?")]),_:1})]),n("li",null,[a(l,{to:"#assignment"},{default:t(()=>[s("Assignment")]),_:1})]),n("li",null,[a(l,{to:"#assignment-solution"},{default:t(()=>[s("Assignment solution")]),_:1})]),n("li",null,[a(l,{to:"#environments"},{default:t(()=>[s("Environments")]),_:1})]),n("li",null,[a(l,{to:"#reusing-configuration"},{default:t(()=>[s("Reusing configuration")]),_:1})]),n("li",null,[a(l,{to:"#assignment-1"},{default:t(()=>[s("Assignment")]),_:1})]),n("li",null,[a(l,{to:"#assignment-solution-1"},{default:t(()=>[s("Assignment solution")]),_:1})]),n("li",null,[a(l,{to:"#continuous-delivery-pipeline"},{default:t(()=>[s("Continuous Delivery pipeline")]),_:1})])])]),f,a(u,{name:"DevOps with GitLab CI Course",desc:"GitLab CI/CD can automatically build, test, deploy, and monitor your applications. We just published a full course on the freeCodeCamp.org YouTube channel that will teach you how to use GitLab CI. Valentin Despa developed this course. Valentin is an ...",url:"https://freecodecamp.org/news/devops-with-gitlab-ci-course/",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/size/w2000/2022/03/qomm1soQ.png"}),a(r,{src:"youtube/PGyhBwLyK2U"}),A,n("div",C,[S,a(i,{icon:"iconfont icon-gitlab"}),s(),I]),E,n("div",q,[R,a(i,{icon:"iconfont icon-gitlab"}),s(),N]),U,n("div",L,[x,a(i,{icon:"iconfont icon-gitlab"}),s(),M]),T,n("div",P,[W,a(i,{icon:"iconfont icon-gitlab"}),s(),D]),$,n("div",O,[B,a(i,{icon:"iconfont icon-gitlab"}),s(),G]),j,n("div",F,[V,a(i,{icon:"iconfont icon-gitlab"}),s(),z]),H,n("div",K,[Y,a(i,{icon:"iconfont icon-gitlab"}),s(),J]),Q,X,Z,n("div",nn,[sn,a(i,{icon:"iconfont icon-gitlab"}),s(),an]),en,n("div",ln,[tn,a(i,{icon:"iconfont icon-gitlab"}),s(),pn]),cn,on,n("ul",null,[un,n("li",null,[s("add a file named "),a(i,{icon:"fa-brands fa-html5"}),rn,s(" which contains the current build number")]),dn]),kn,n("div",vn,[mn,a(i,{icon:"iconfont icon-gitlab"}),s(),bn]),yn,hn,gn,n("div",_n,[wn,a(i,{icon:"iconfont icon-gitlab"}),s(),fn])])}const En=d(h,[["render",An],["__file","unit-3-continuous-deployment-with-gitlab-aws.html.vue"]]),qn=JSON.parse('{"path":"/freecodecamp.org/devops-with-gitlab-ci-course/unit-3-continuous-deployment-with-gitlab-aws.html","title":"Unit 3: Continuous Deployment with GitLab & AWS","lang":"en-US","frontmatter":{"lang":"en-US","title":"Unit 3: Continuous Deployment with GitLab & AWS","description":"(3/5) DevOps with GitLab CI Course","category":["DevOps","Gitlab","Youtube"],"tag":["blog","freecodecamp.org","devops","gitlab","scm","@vdespa","yaml","ci","cd","cicd","youtube","crashcourse"],"head":[[{"meta":null},{"property":"og:title","content":"(3/5) DevOps with GitLab CI Course"},{"property":"og:description","content":"Unit 3: Continuous Deployment with GitLab & AWS"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/devops-with-gitlab-ci-course/unit-3-continuous-deployment-with-gitlab-aws.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/devops-with-gitlab-ci-course/unit-3-continuous-deployment-with-gitlab-aws.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Unit 3: Continuous Deployment with GitLab & AWS"}],["meta",{"property":"og:description","content":"(3/5) DevOps with GitLab CI Course"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"devops"}],["meta",{"property":"article:tag","content":"gitlab"}],["meta",{"property":"article:tag","content":"scm"}],["meta",{"property":"article:tag","content":"@vdespa"}],["meta",{"property":"article:tag","content":"yaml"}],["meta",{"property":"article:tag","content":"ci"}],["meta",{"property":"article:tag","content":"cd"}],["meta",{"property":"article:tag","content":"cicd"}],["meta",{"property":"article:tag","content":"youtube"}],["meta",{"property":"article:tag","content":"crashcourse"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Unit 3: Continuous Deployment with GitLab & AWS\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Unit overview","slug":"unit-overview","link":"#unit-overview","children":[]},{"level":2,"title":"A quick introduction to AWS","slug":"a-quick-introduction-to-aws","link":"#a-quick-introduction-to-aws","children":[]},{"level":2,"title":"AWS S3","slug":"aws-s3","link":"#aws-s3","children":[]},{"level":2,"title":"AWS CLI","slug":"aws-cli","link":"#aws-cli","children":[]},{"level":2,"title":"Uploading a file to S3","slug":"uploading-a-file-to-s3","link":"#uploading-a-file-to-s3","children":[]},{"level":2,"title":"Masking & protecting variables","slug":"masking-protecting-variables","link":"#masking-protecting-variables","children":[]},{"level":2,"title":"Identity management with AWS IAM","slug":"identity-management-with-aws-iam","link":"#identity-management-with-aws-iam","children":[]},{"level":2,"title":"Uploading multiple files to S3","slug":"uploading-multiple-files-to-s3","link":"#uploading-multiple-files-to-s3","children":[]},{"level":2,"title":"Hosting a website on S3","slug":"hosting-a-website-on-s3","link":"#hosting-a-website-on-s3","children":[]},{"level":2,"title":"Controlling when jobs run","slug":"controlling-when-jobs-run","link":"#controlling-when-jobs-run","children":[]},{"level":2,"title":"Post-deployment testing","slug":"post-deployment-testing","link":"#post-deployment-testing","children":[]},{"level":2,"title":"What is CI/CD?","slug":"what-is-ci-cd","link":"#what-is-ci-cd","children":[]},{"level":2,"title":"Assignment","slug":"assignment","link":"#assignment","children":[]},{"level":2,"title":"Assignment solution","slug":"assignment-solution","link":"#assignment-solution","children":[]},{"level":2,"title":"Environments","slug":"environments","link":"#environments","children":[]},{"level":2,"title":"Reusing configuration","slug":"reusing-configuration","link":"#reusing-configuration","children":[]},{"level":2,"title":"Assignment","slug":"assignment-1","link":"#assignment-1","children":[]},{"level":2,"title":"Assignment solution","slug":"assignment-solution-1","link":"#assignment-solution-1","children":[]},{"level":2,"title":"Continuous Delivery pipeline","slug":"continuous-delivery-pipeline","link":"#continuous-delivery-pipeline","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":8.27,"words":2482},"filePathRelative":"freecodecamp.org/devops-with-gitlab-ci-course/unit-3-continuous-deployment-with-gitlab-aws.md","excerpt":"\\n"}');export{En as comp,qn as data};
