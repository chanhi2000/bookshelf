import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as d,d as e,f as n,b as i,t as m,n as u,g as v,e as t,r as a,o as g}from"./app-CR0kswh3.js";const h={},b={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function k(l,s){const c=a("VPCard"),p=a("SiteInfo"),o=a("VPIcon");return g(),d("div",null,[e("h1",b,[e("a",f,[e("span",null,m(l.$frontmatter.title)+" 관련",1)])]),n(c,u(v({title:"Git > Article(s)",desc:"Article(s)",link:"/programming/git/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s[2]||(s[2]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),s[3]||(s[3]=e("hr",null,null,-1)),n(p,{name:"git squash - 여러개의 커밋로그를 하나로 묶기| NHN Cloud Meetup",desc:"git squash - 여러개의 커밋로그를 하나로 묶기",url:"https://meetup.nhncloud.com/posts/39",logo:"https://meetup.nhncloud.com/resources/img/favicon.ico",preview:"/assets/image/meetup.nhncloud.com/gitlogo.png"}),s[4]||(s[4]=i(`<p>정확히 이야기해서 git squash 라는 명령어는 없습니다. interactive rebase를 하는데 필요한 명령어 중 하나지요.</p><p>때때로 아래처럼 하나의 작업을 여러번에 걸쳐서 커밋을 할 때가 있습니다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline</span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment"># d442427eae836f15e94f5df0445c70081df79a3e Task 3/3</span></span>
<span class="line"><span class="token comment"># 26395437be53e4e6e68f83aa98560ef93838aaa0 Task 2/3</span></span>
<span class="line"><span class="token comment"># 7c6535580a038e9dcfaa72a98e04848812da9aee Task 1/3</span></span>
<span class="line"><span class="token comment"># 2260a88777c247c31170ff6074d95569ac557afb Initial commit</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),e("p",null,[s[0]||(s[0]=t("여기서 Task 1/3~3/3 을 하나의 ")),n(o,{icon:"iconfont icon-change"}),s[1]||(s[1]=t("commit으로 묶어버리고 싶은 경우가 많죠."))]),s[5]||(s[5]=i(`<p>이럴때 사용하는것이 interactive rebase 입니다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">-i</span> HEAD~3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>(최근 3개의 커밋을 interactive rebase 한다는 뜻입니다)</p><p>환경에 따라 다르겠지만 보통은 vi에디터가 뜨면서 다음과 같은 메세지를 볼 수 있습니다.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pick 7c65355 Task 1/3</span>
<span class="line">pick 2639543 Task 2/3</span>
<span class="line">pick d442427 Task 3/3</span>
<span class="line"></span>
<span class="line"># Rebase 2260a88..d442427 onto 2260a88</span>
<span class="line">#</span>
<span class="line"># Commands:</span>
<span class="line">#  p, pick = use commit</span>
<span class="line">#  r, reword = use commit, but edit the commit message</span>
<span class="line">#  e, edit = use commit, but stop for amending</span>
<span class="line">#  s, squash = use commit, but meld into previous commit</span>
<span class="line">#  f, fixup = like &quot;squash&quot;, but discard this commit&#39;s log message</span>
<span class="line">#  x, exec = run command (the rest of the line) using shell</span>
<span class="line">#</span>
<span class="line"># These lines can be re-ordered; they are executed from top to bottom.</span>
<span class="line">#</span>
<span class="line"># If you remove a line here THAT COMMIT WILL BE LOST.</span>
<span class="line">#</span>
<span class="line"># However, if you remove everything, the rebase will be aborted.</span>
<span class="line">#</span>
<span class="line"># Note that empty commits are commented out</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>위의 세줄을 다음과 같이 바꾸어 준 후 저장(:wq)를 누르면</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pick 7c65355 Task 1/3</span>
<span class="line">squash 2639543 Task 2/3</span>
<span class="line">squash d442427 Task 3/3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>다른 vi창이 뜨면서 커밋 메세지를 rewrite 할 수 있습니다.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pick 7c65355 Task 1/3</span>
<span class="line">Rebasing (3/3)</span>
<span class="line"># This is a combination of 3 commits.</span>
<span class="line"># The first commit&#39;s message is:</span>
<span class="line">Task 1/3</span>
<span class="line"></span>
<span class="line"># This is the 2nd commit message:</span>
<span class="line"></span>
<span class="line">Task 2/3</span>
<span class="line"></span>
<span class="line"># This is the 3rd commit message:</span>
<span class="line"></span>
<span class="line">Task 3/3</span>
<span class="line"></span>
<span class="line"># Please enter the commit message for your changes. Lines starting</span>
<span class="line"># with &#39;#&#39; will be ignored, and an empty message aborts the commit.</span>
<span class="line"># rebase in progress; onto 2260a88</span>
<span class="line"># You are currently editing a commit while rebasing branch &#39;master&#39; on &#39;2260a88&#39;.</span>
<span class="line">#</span>
<span class="line"># Changes to be committed:</span>
<span class="line">#       modified:   README.md</span>
<span class="line">#</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>그리고 다시 확인하면 이렇게 됩니다</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline</span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment"># 9833ca676c5a24361c1cc36fb173746328dfac3a Task 1/3 ~ 3/3</span></span>
<span class="line"><span class="token comment"># 2260a88777c247c31170ff6074d95569ac557afb Initial commit</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note"><p class="hint-container-title">참고</p><p>가능하면 이미 push하지 않은 작업만 squash 하는것을 추천합니다. push와 pull 작업이 살짝 번거로워 집니다</p><p><code>git push -f</code> / <code>git fetch &amp;&amp;; git merge --squash</code></p></div>`,12))])}const x=r(h,[["render",k]]),q=JSON.parse('{"path":"/meetup.nhncloud.com/39.html","title":"git squash - 여러개의 커밋로그를 하나로 묶기","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"git squash - 여러개의 커밋로그를 하나로 묶기","description":"Article(s) > git squash - 여러개의 커밋로그를 하나로 묶기","icon":"iconfont icon-git","category":["Git","Article(s)"],"tag":["blog","meetup.nhncloud.com","git","git-squash"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git squash - 여러개의 커밋로그를 하나로 묶기\\",\\"image\\":[\\"https://chanhi2000.github.io/bookshelf/assets/image/meetup.nhncloud.com/gitlogo.png\\"],\\"datePublished\\":\\"2015-11-30T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/meetup.nhncloud.com/39.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"git squash - 여러개의 커밋로그를 하나로 묶기"}],["meta",{"property":"og:description","content":"Article(s) > git squash - 여러개의 커밋로그를 하나로 묶기"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://chanhi2000.github.io/bookshelf/assets/image/meetup.nhncloud.com/gitlogo.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://chanhi2000.github.io/bookshelf/assets/image/meetup.nhncloud.com/gitlogo.png"}],["meta",{"name":"twitter:image:alt","content":"git squash - 여러개의 커밋로그를 하나로 묶기"}],["meta",{"property":"article:tag","content":"git-squash"}],["meta",{"property":"article:tag","content":"git"}],["meta",{"property":"article:tag","content":"meetup.nhncloud.com"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:published_time","content":"2015-11-30T00:00:00.000Z"}],[{"meta":null},{"property":"og:title","content":"Article(s) > git squash - 여러개의 커밋로그를 하나로 묶기"},{"property":"og:description","content":"git squash - 여러개의 커밋로그를 하나로 묶기"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/meetup.nhncloud.com/39.html"}]],"prev":"/programming/git/articles/README.md","date":"2015-11-30T00:00:00.000Z","isOriginal":false,"cover":"/assets/image/meetup.nhncloud.com/gitlogo.png"},"git":{},"readingTime":{"minutes":1.28,"words":383},"filePathRelative":"meetup.nhncloud.com/39.md"}');export{x as comp,q as data};
