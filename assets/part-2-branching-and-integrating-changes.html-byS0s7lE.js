import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as f,f as t,av as u,au as i,aw as w,ax as y,e as s,at as n,a,b as c,r as h,o as b}from"./app-n2Oj_rFs.js";const v={},_={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},x={class:"table-of-contents"};function T(g,e){const m=h("VPCard"),r=h("router-link"),d=h("SiteInfo"),l=h("RouteLink"),o=h("FontIcon");return b(),f("div",null,[t("h1",_,[t("a",k,[t("span",null,u(g.$frontmatter.title)+" 관련",1)])]),i(m,w(y({title:"Gitting Things Done – A Visual and Practical Guide to Git [Full Book]",desc:"Introduction Git is awesome. Most software developers use Git on a daily basis. But how many truly understand Git? Do you feel like you know what's going on under the hood as you use Git to perform various tasks? For example, what happens when you us...",link:"/freecodecamp.org/gitting-things-done-book/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),t("nav",x,[t("ul",null,[t("li",null,[i(r,{to:"#chapter-6-diffs-and-patches"},{default:s(()=>e[0]||(e[0]=[n("Chapter 6 - Diffs and Patches")])),_:1}),t("ul",null,[t("li",null,[i(r,{to:"#git-diff-s-history"},{default:s(()=>e[1]||(e[1]=[n("Git Diff's History")])),_:1})]),t("li",null,[i(r,{to:"#time-to-get-hands-on"},{default:s(()=>e[2]||(e[2]=[n("Time to Get Hands-On")])),_:1})]),t("li",null,[i(r,{to:"#the-structure-of-a-diff"},{default:s(()=>e[3]||(e[3]=[n("The Structure of a Diff")])),_:1})]),t("li",null,[i(r,{to:"#how-to-produce-diffs"},{default:s(()=>e[4]||(e[4]=[n("How to Produce Diffs")])),_:1})]),t("li",null,[i(r,{to:"#how-to-apply-patches"},{default:s(()=>e[5]||(e[5]=[n("How to Apply Patches")])),_:1})]),t("li",null,[i(r,{to:"#recap-git-diff-and-patch"},{default:s(()=>e[6]||(e[6]=[n("Recap - Git Diff and Patch")])),_:1})])])]),t("li",null,[i(r,{to:"#chapter-7-understanding-git-merge"},{default:s(()=>e[7]||(e[7]=[n("Chapter 7 - Understanding Git Merge")])),_:1}),t("ul",null,[t("li",null,[i(r,{to:"#what-is-a-merge-in-git"},{default:s(()=>e[8]||(e[8]=[n("What is a Merge in Git?")])),_:1})]),t("li",null,[i(r,{to:"#time-to-get-hands-on-1"},{default:s(()=>e[9]||(e[9]=[n("Time to Get Hands-on")])),_:1})]),t("li",null,[i(r,{to:"#time-for-a-more-advanced-case"},{default:s(()=>e[10]||(e[10]=[n("Time For a More Advanced Case")])),_:1})]),t("li",null,[i(r,{to:"#how-to-perform-a-three-way-merge-in-git"},{default:s(()=>e[11]||(e[11]=[n("How to Perform a Three-way Merge in Git")])),_:1})]),t("li",null,[i(r,{to:"#quick-recap-of-a-three-way-merge"},{default:s(()=>e[12]||(e[12]=[n("Quick Recap of a Three-way Merge")])),_:1})]),t("li",null,[i(r,{to:"#moving-on"},{default:s(()=>e[13]||(e[13]=[n("Moving on")])),_:1})])])])])]),e[283]||(e[283]=t("hr",null,null,-1)),i(d,{name:"Gitting Things Done – A Visual and Practical Guide to Git [Full Book]",desc:"Introduction Git is awesome. Most software developers use Git on a daily basis. But how many truly understand Git? Do you feel like you know what's going on under the hood as you use Git to perform various tasks? For example, what happens when you us...",url:"https://freecodecamp.org/news/gitting-things-done-book/",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/size/w2000/2023/12/Gitting-Things-Done-Cover-with-Photo.png"}),e[284]||(e[284]=t("h2",{id:"chapter-6-diffs-and-patches",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#chapter-6-diffs-and-patches"},[t("span",null,"Chapter 6 - Diffs and Patches")])],-1)),e[285]||(e[285]=t("p",null,"In Part 1 you learned how Git works under the hood, the different Git objects, and how to create a repo from scratch.",-1)),e[286]||(e[286]=t("p",null,"When teams work with Git, they introduce sequences of changes, usually in branches, and then they need to combine different change histories together. To really understand how this is achieved, you should learn how Git treats diffs and patches. You will then apply your knowledge to understand the process of merge and rebase.",-1)),e[287]||(e[287]=t("p",null,"Many of the interesting processes in Git like merging, rebasing, or even committing are based on diffs and patches. Developers work with diffs all the time, whether using Git directly or relying on the IDE's diff view. In this chapter, you will learn what Git diffs and patches are, their structure, and how to apply patches.",-1)),t("p",null,[e[15]||(e[15]=n("As a reminder from the ")),i(l,{to:"/freecodecamp.org/gitting-things-done-book/part-1-main-objects-and-introducing-changes.html#chapter-1-git-objects"},{default:s(()=>e[14]||(e[14]=[n("chapter on Git Objects")])),_:1}),e[16]||(e[16]=n(", a commit is a snapshot of the working tree at a certain point in time, in addition to some meta-data."))]),e[288]||(e[288]=a('<p>Yet, it is really hard to make sense of individual commits by looking at the entire working tree. Rather, it is more helpful to look at how different a commit is from its parent commit, that is, the diff between these commits.</p><p>So, what do I mean when I say &quot;diff&quot;? Let&#39;s start with some history.</p><h3 id="git-diff-s-history" tabindex="-1"><a class="header-anchor" href="#git-diff-s-history"><span>Git Diff&#39;s History</span></a></h3><p>Git&#39;s <code>diff</code> is based on the diff utility on UNIX systems. <code>diff</code> was developed in the early 1970&#39;s on the Unix operating system. The first released version shipped with the Fifth Edition of Unix in 1974.</p><p><code>git diff</code> is a command that takes two inputs, and computes the difference between them. Inputs can be commits, but also files, and even files that have never been introduced to the repository.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_definition.png" alt="Git diff takes two inputs, which can be commits or files" tabindex="0" loading="lazy"><figcaption>Git diff takes two inputs, which can be commits or files</figcaption></figure><p>This is important - <code>git diff</code> computes the <em>difference</em> between two strings, which most of the time happen to consist of code, but not necessarily.</p><h3 id="time-to-get-hands-on" tabindex="-1"><a class="header-anchor" href="#time-to-get-hands-on"><span>Time to Get Hands-On</span></a></h3><p>As always, you are encouraged to run the commands yourself while reading this chapter. Unless noted otherwise, I will use the following repository:</p>',9)),i(d,{name:"Omerr/gitting_things_repo",desc:"Contribute to Omerr/gitting_things_repo development by creating an account on GitHub.",url:"https://github.com/Omerr/gitting_things_repo",logo:"https://avatars.githubusercontent.com/u/52040016?v=4",preview:"https://opengraph.githubassets.com/0290d3810c21c12fae01dcbd28657a5ee70c563a3a20572f4e0c86d1bd182ae7/Omerr/gitting_things_repo"}),e[289]||(e[289]=t("p",null,"You can clone it locally and have the same starting point I am using for this chapter.",-1)),t("p",null,[e[17]||(e[17]=n("Consider this short text file on my machine, called ")),i(o,{icon:"fas fa-file-lines"}),e[18]||(e[18]=t("code",null,"file.txt",-1)),e[19]||(e[19]=n(", which consists of 6 lines:"))]),t("figure",null,[e[22]||(e[22]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/file_txt_1.png",alt:'<FontIcon icon="fas fa-file-lines"/> consists of six lines',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[i(o,{icon:"fas fa-file-lines"}),e[20]||(e[20]=t("code",null,"file.txt",-1)),e[21]||(e[21]=n(" consists of six lines"))])]),e[290]||(e[290]=t("p",null,[n("Now, modify this file a bit. Remove the second line, and insert a new line as the fourth line. Add an exclamation mark ("),t("code",null,"!"),n(") to the end of the last line, so you get this result:")],-1)),t("figure",null,[e[26]||(e[26]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/new_file_txt_1.png",alt:'After modifying <FontIcon icon="fas fa-file-lines"/>, we get different six lines',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[23]||(e[23]=n("After modifying ")),i(o,{icon:"fas fa-file-lines"}),e[24]||(e[24]=t("code",null,"file.txt",-1)),e[25]||(e[25]=n(", we get different six lines"))])]),t("p",null,[e[27]||(e[27]=n("Save this file with a new name, ")),i(o,{icon:"fas fa-file-lines"}),e[28]||(e[28]=n("``new_file.txt`."))]),e[291]||(e[291]=a(`<p>Now you can run <code>git diff</code> to compute the difference between the files like so:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> --no-index file.txt new_file.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>I will explain the <code>--no-index</code> switch of this command later. For now it&#39;s enough to understand it allows us to compare between two files that are not part of a Git repository.</p></blockquote><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_1.png" alt="The output of " tabindex="0" loading="lazy"><figcaption>The output of <code>git diff --no-index file.txt new_file.txt</code></figcaption></figure><p>The output of <code>git diff</code> shows quite a lot of things.</p><p>Focus on the part starting with <code>This is a file</code>. You can see that the added line (<code>// new test</code>) is preceded by a <code>+</code> sign. The deleted line is preceded by a <code>-</code> sign.</p><p>Interestingly, notice that Git views a modified line as a sequence of two changes - erasing a line and adding a new line instead. So the patch includes deleting the last line, and adding a new line that&#39;s equal to that line, with the addition of a <code>!</code>.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/diff_format_lines.png" alt="Addition lines are preceded by , deletion lines by , and modification lines are sequences of deletions and additions" tabindex="0" loading="lazy"><figcaption>Addition lines are preceded by <code>+</code>, deletion lines by <code>-</code>, and modification lines are sequences of deletions and additions</figcaption></figure><p>Now would be a good time to discuss the terms &quot;patch&quot; and &quot;diff&quot;. These two are often used interchangeably, although there is a distinction, at least historically.</p><p>A <strong>diff</strong> shows the differences between two files, or snapshots, and can be quite minimal in doing so. A <strong>patch</strong> is an extension of a diff, augmented with further information such as context lines and filenames, which allow it to be <em>applied</em> more widely. It is a text document that describes how to alter an existing file or codebase.</p><p>These days, the Unix <code>diff</code> program, and <code>git diff</code>, can produce patches of various kinds.</p><p>A patch is a compact representation of the differences between two files. It describes how to turn one file into another.</p>`,12)),t("p",null,[e[29]||(e[29]=n('In other words, if you apply the "instructions" produced by ')),e[30]||(e[30]=t("code",null,"git diff",-1)),e[31]||(e[31]=n(" on ")),i(o,{icon:"fas fa-file-lines"}),e[32]||(e[32]=t("code",null,"file.txt",-1)),e[33]||(e[33]=n(" - that is, remove the second line, insert ")),e[34]||(e[34]=t("code",null,"// new test",-1)),e[35]||(e[35]=n(" as the fourth line, remove the last line, and add instead a line with the same content and ")),e[36]||(e[36]=t("code",null,"!",-1)),e[37]||(e[37]=n(" - you will get the content of ")),i(o,{icon:"fas fa-file-lines"}),e[38]||(e[38]=t("code",null,"new_file.txt",-1)),e[39]||(e[39]=n("."))]),t("p",null,[e[40]||(e[40]=n("Another important thing to note is that a patch is ")),e[41]||(e[41]=t("strong",null,"asymmetric",-1)),e[42]||(e[42]=n(": the patch from ")),i(o,{icon:"fas fa-file-lines"}),e[43]||(e[43]=t("code",null,"file.txt",-1)),e[44]||(e[44]=n(" to ")),i(o,{icon:"fas fa-file-lines"}),e[45]||(e[45]=t("code",null,"new_file.txt",-1)),e[46]||(e[46]=n(" is not the same as the patch for the other direction. Generating a patch between ")),i(o,{icon:"fas fa-file-lines"}),e[47]||(e[47]=t("code",null,"new_file.txt",-1)),e[48]||(e[48]=n(" and ")),i(o,{icon:"fas fa-file-lines"}),e[49]||(e[49]=t("code",null,"file.txt",-1)),e[50]||(e[50]=n(", in this order, would mean exactly the opposite instructions than before - add the second line instead of removing it, and so on."))]),e[292]||(e[292]=a(`<figure><img src="https://freecodecamp.org/news/content/images/2023/12/patch_asymmetric.png" alt="A patch consists of asymmetric instructions to get from one file to another" tabindex="0" loading="lazy"><figcaption>A patch consists of asymmetric instructions to get from one file to another</figcaption></figure><p>Try it out:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> --no-index new_file.txt file.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_2.png" alt="Running git diff in the reverse direction yields the reverse instructions - add a line instead of removing it, and so on" tabindex="0" loading="lazy"><figcaption>Running git diff in the reverse direction yields the reverse instructions - add a line instead of removing it, and so on</figcaption></figure><p>The patch format uses context, as well as line numbers, to locate differing file regions. This allows a patch to be applied to a somewhat earlier or later version of the first file than the one from which it was derived, as long as the applying program can still locate the context of the change. We will see exactly how these are used.</p><h3 id="the-structure-of-a-diff" tabindex="-1"><a class="header-anchor" href="#the-structure-of-a-diff"><span>The Structure of a Diff</span></a></h3><p>It&#39;s time to dive deeper.</p>`,7)),t("p",null,[e[51]||(e[51]=n("Generate a diff from ")),i(o,{icon:"fas fa-file-lines"}),e[52]||(e[52]=t("code",null,"file.txt",-1)),e[53]||(e[53]=n(" to ")),i(o,{icon:"fas fa-file-lines"}),e[54]||(e[54]=t("code",null,"new_file.txt",-1)),e[55]||(e[55]=n(" again, and consider the output more carefully:"))]),e[293]||(e[293]=a(`<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> --no-index file.txt new_file.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_1-1.png" alt="The output of " tabindex="0" loading="lazy"><figcaption>The output of <code>git diff --no-index file.txt new_file.txt</code></figcaption></figure>`,2)),t("p",null,[e[56]||(e[56]=n("The first line introduces the compared files. Git always gives one file the name ")),e[57]||(e[57]=t("code",null,"a",-1)),e[58]||(e[58]=n(", and the other the name ")),e[59]||(e[59]=t("code",null,"b",-1)),e[60]||(e[60]=n(". So in this case ")),i(o,{icon:"fas fa-file-lines"}),e[61]||(e[61]=t("code",null,"file.txt",-1)),e[62]||(e[62]=n(" is called ")),e[63]||(e[63]=t("code",null,"a",-1)),e[64]||(e[64]=n(", whereas ")),i(o,{icon:"fas fa-file-lines"}),e[65]||(e[65]=t("code",null,"new_file.txt",-1)),e[66]||(e[66]=n(" is called ")),e[67]||(e[67]=t("code",null,"b",-1)),e[68]||(e[68]=n("."))]),e[294]||(e[294]=a(`<figure><img src="https://freecodecamp.org/news/content/images/2023/12/diff_structure_1.png" alt="The first line in &#39;s output introduces the files being compared" tabindex="0" loading="lazy"><figcaption>The first line in <code>diff</code>&#39;s output introduces the files being compared</figcaption></figure><p>Then the second line, starting with <code>index</code>, includes the blob SHAs of these files. So even though in our case they are not even stored within a Git repo, Git shows their corresponding SHA-1 values.</p><p>The third value in this line, <code>100644</code>, is the &quot;mode bits&quot;, indicating that this is a &quot;regular&quot; file: not executable and not a symbolic link.</p><p>The use of two dots (<code>..</code>) here between the blob SHAs is just as a separator (unlike other cases where it&#39;s used within Git).</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/diff_structure_2.png" alt="The second line in &#39;s output includes the blob SHAs of the compared files, as well as the mode bits" tabindex="0" loading="lazy"><figcaption>The second line in <code>diff</code>&#39;s output includes the blob SHAs of the compared files, as well as the mode bits</figcaption></figure><p>Other header lines might indicate the old and new mode bits if they&#39;ve changed, old and new filenames if the files were being renamed, and so on.</p><p>The blob SHAs (also called &quot;blob IDs&quot;) are helpful if this patch is later applied by Git to the same project and there are conflicts while applying it. You will better understand what this means when you learn about the merges in <a href="#chapter-7-understanding-git-merge">the next chapter</a>.</p><p>After the blob IDs, we have two lines: one starting with <code>-</code> signs, and the other starting with <code>+</code> signs. This is the traditional &quot;unified diff&quot; header, again showing the files being compared and the direction of the changes: <code>-</code> signs show lines in the A version that are missing from the B version, and <code>+</code> signs show lines missing in the A version but present in B.</p><p>If the patch were of this file being added or deleted in its entirety, then one of these would be <code>/dev/null</code> to signal that.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/diff_structure_3.png" alt=" signs show lines in the A version but missing from the B version, and  signs, lines missing in A version but present in B" tabindex="0" loading="lazy"><figcaption><code>-</code> signs show lines in the A version but missing from the B version, and <code>+</code> signs, lines missing in A version but present in B</figcaption></figure><p>Consider the case where you delete a file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">rm</span> awesome.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And then use <code>git diff</code>:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/rm_diff.png" alt="&#39;s output for a deleted file" tabindex="0" loading="lazy"><figcaption><code>git diff</code>&#39;s output for a deleted file</figcaption></figure><p>The <code>A</code> version, representing the state of the index, is currently <code>awesome.txt</code>, compared to the working dir where this file does not exist, so it is <code>/dev/null</code>. All lines are preceded by <code>-</code> signs as they exist only in the <code>A</code> version.</p><p>For now, undo the deleting (more on undoing changes in Part 3):</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> restore awesome.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Going back to the diff we started with:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_1-2.png" alt="The output of " tabindex="0" loading="lazy"><figcaption>The output of <code>git diff --no-index file.txt new_file.txt</code></figcaption></figure><p>After this unified diff header, we get to the main part of the diff, consisting of &quot;difference sections&quot;, also called &quot;hunks&quot; or &quot;chunks&quot; in Git. Note that these terms are used interchangeably, and you may stumble upon either of them in Git&#39;s documentation and tutorials, as well as Git&#39;s source code.</p><p>Every hunk begins with a single line, starting with two <code>@</code> signs. These signs are followed by at most four numbers, and then a header for the chunk - which is an educated guess by Git. Usually, it will include the beginning of a function or a class, when possible.</p><p>In this example it doesn&#39;t include anything as this is a text file, so consider another example for a moment:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> --no-index example.py example_changed.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/diff_example_changed.png" alt="When possible, Git includes a header for each hunk, for example a function or class definition" tabindex="0" loading="lazy"><figcaption>When possible, Git includes a header for each hunk, for example a function or class definition</figcaption></figure><p>In the image above, the hunk&#39;s header includes the beginning of the function that includes the changed lines - <code>def example_function(x)</code>.</p><p>Back to our previous example then:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_1-3.png" alt="Back to the previous diff" tabindex="0" loading="lazy"><figcaption>Back to the previous diff</figcaption></figure><p>After the two <code>@</code> signs, you&#39;ll find four numbers:</p><p>The first numbers are preceded by a <code>-</code> sign as they refer to <code>file A</code>. The first number represents the line number corresponding to the first line in <code>file A</code> that this hunk refers to. In the example above, it is <code>1</code>, meaning that the line <code>This is a file</code> corresponds to line number <code>1</code> in version <code>file A</code>.</p><p>This number is followed by a comma (<code>,</code>), and then the number of lines this chunk consists of in <code>file A</code>. This number includes all context lines (the lines preceded with a space in the <code>diff</code>), or lines marked with a <code>-</code> sign, as they are part of <code>file A</code>, but not lines marked with a <code>+</code> sign, as they do not exist in <code>file A</code>.</p><p>In our example, this number is <code>6</code>, counting the context line <code>This is a file</code>, the <code>-</code> line <code>It has a nice poem:</code>, then the three context lines, and lastly <code>Are belong to you</code>.</p><p>As you can see, the lines beginning with a space character are context lines, which means they appear as shown in both <code>file A</code> and <code>file B</code>.</p><p>Then, we have a <code>+</code> sign to mark the two numbers that refer to <code>file B</code>. First, there&#39;s the line number corresponding to the first line in <code>file B</code>, followed by the number of lines this chunk consists of in <code>file B</code>.</p><p>This number includes all context lines, as well as lines marked with the <code>+</code> sign, as they are part of <code>file B</code>, but not lines marked with a <code>-</code> sign.</p><p>These four numbers are followed by two additional <code>@</code> signs.</p><p>After the header of the chunk, we get the actual lines - either context, <code>-</code>, or <code>+</code> lines.</p><p>Typically and by default, a hunk starts and ends with three context lines. For example, if you modify lines 4-5 in a file with ten lines:</p><ul><li>Line 1 - context line (before the changed lines)</li><li>Line 2 - context line (before the changed lines)</li><li>Line 3 - context line (before the changed lines)</li><li>Line 4 - changed line</li><li>Line 5 - another changed line</li><li>Line 6 - context line (after the changed lines)</li><li>Line 7 - context line (after the changed lines)</li><li>Line 8 - context line (after the changed lines)</li><li>Line 9 - this line will not be part of the hunk</li></ul><p>So by default, changing lines 4-5 results in a hunk consisting of lines 1-8, that is, three lines before and three lines after the modified lines.</p><p>If that file doesn&#39;t have nine lines, but rather six lines - then the hunk will contain only one context line after the changed lines, and not three. Similarly, if you change the second line of a file, then there would be only one line of context before the changed lines.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/diff_structure_4.png" alt="The patch format by " tabindex="0" loading="lazy"><figcaption>The patch format by <code>git diff</code></figcaption></figure><h3 id="how-to-produce-diffs" tabindex="-1"><a class="header-anchor" href="#how-to-produce-diffs"><span>How to Produce Diffs</span></a></h3><p>The last example we considered shows a diff between two files. A single patch file can contain the differences for <em>any</em> number of files, and <code>git diff</code> produces diffs for all altered files in the repository in a single patch.</p><p>Often, you will see the output of <code>git diff</code> showing two versions of the same file and the difference between them.</p><p>To demonstrate, consider the state in another branch called <code>diffs</code>:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout diffs</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Again, I encourage you to run the commands with me - make sure you clone the repository from:</p>`,47)),i(d,{name:"Omerr/gitting_things_repo",desc:"Contribute to Omerr/gitting_things_repo development by creating an account on GitHub.",url:"https://github.com/Omerr/gitting_things_repo",logo:"https://avatars.githubusercontent.com/u/52040016?v=4",preview:"https://opengraph.githubassets.com/0290d3810c21c12fae01dcbd28657a5ee70c563a3a20572f4e0c86d1bd182ae7/Omerr/gitting_things_repo"}),e[295]||(e[295]=t("p",null,"At the current state, the active directory is a Git repository, with a clean status:",-1)),e[296]||(e[296]=t("figure",null,[t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/git_status_branch_diffs.png",alt:"",tabindex:"0",loading:"lazy"}),t("figcaption",null,[t("code",null,"git status")])],-1)),t("p",null,[e[69]||(e[69]=n("Take an existing file, ")),i(o,{icon:"fa-brands fa-python"}),e[70]||(e[70]=t("code",null,"my_file.py",-1)),e[71]||(e[71]=n(":"))]),t("figure",null,[e[74]||(e[74]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/nano_my_file.png",alt:'An example file - <FontIcon icon="fa-brands fa-python"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[72]||(e[72]=n("An example file - ")),i(o,{icon:"fa-brands fa-python"}),e[73]||(e[73]=t("code",null,"my_file.py",-1))])]),e[297]||(e[297]=t("p",null,[n("And change the second line from "),t("code",null,"print('An example function!')"),n(" to "),t("code",null,"print('An example function! And it has been changed!')"),n(":")],-1)),t("figure",null,[e[78]||(e[78]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/nano_my_file_after_change.png",alt:'The contents of <FontIcon icon="fa-brands fa-python"/> after modifying the second line',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[75]||(e[75]=n("The contents of ")),i(o,{icon:"fa-brands fa-python"}),e[76]||(e[76]=t("code",null,"my_file.py",-1)),e[77]||(e[77]=n(" after modifying the second line"))])]),e[298]||(e[298]=t("p",null,[n("Save your changes, but don't stage or commit them. Next, run "),t("code",null,"git diff"),n(":")],-1)),t("figure",null,[e[84]||(e[84]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/diff_my_file.png",alt:'The output of  for <FontIcon icon="fa-brands fa-python"/> after changing it',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[79]||(e[79]=n("The output of ")),e[80]||(e[80]=t("code",null,"git diff",-1)),e[81]||(e[81]=n(" for ")),i(o,{icon:"fa-brands fa-python"}),e[82]||(e[82]=t("code",null,"my_file.py",-1)),e[83]||(e[83]=n(" after changing it"))])]),t("p",null,[e[85]||(e[85]=n("The output of ")),e[86]||(e[86]=t("code",null,"git diff",-1)),e[87]||(e[87]=n(" shows the difference between ")),i(o,{icon:"fa-brands fa-python"}),e[88]||(e[88]=t("code",null,"my_file.py",-1)),e[89]||(e[89]=n("'s version in the staging area, which in this case is the same as the last commit (")),e[90]||(e[90]=t("code",null,"HEAD",-1)),e[91]||(e[91]=n("), and the version in the working directory."))]),t("p",null,[e[93]||(e[93]=n('I covered the terms "working directory", "staging area", and "commit" in the ')),i(l,{to:"/freecodecamp.org/gitting-things-done-book/part-1-main-objects-and-introducing-changes.html#chapter-1-git-objects"},{default:s(()=>e[92]||(e[92]=[n("Git objects chapter")])),_:1}),e[94]||(e[94]=n(', so check it out in ccase you would like to refresh your memory. As a reminder, the terms "staging area" and "index" are interchangeable, and both are widely used.'))]),e[299]||(e[299]=a('<figure><img src="https://freecodecamp.org/news/content/images/2023/12/repo_state_commit_2_staging_area.png" alt="At this state, the status of the working dir is different from the status of the index. The status of the index is the same as that of " tabindex="0" loading="lazy"><figcaption>At this state, the status of the working dir is different from the status of the index. The status of the index is the same as that of <code>HEAD</code></figcaption></figure><p>To see the difference between the <strong>working dir</strong> and the <strong>staging area</strong>, use <code>git diff</code>, without any additional flags.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/repo_state_commit_2_git_diff-1.png" alt="Without switches,  shows the difference between the staging area and the working directory" tabindex="0" loading="lazy"><figcaption>Without switches, <code>git diff</code> shows the difference between the staging area and the working directory</figcaption></figure>',3)),t("p",null,[e[95]||(e[95]=n("As you can see, ")),e[96]||(e[96]=t("code",null,"git diff",-1)),e[97]||(e[97]=n(" lists here both ")),e[98]||(e[98]=t("code",null,"file A",-1)),e[99]||(e[99]=n(" and ")),e[100]||(e[100]=t("code",null,"file B",-1)),e[101]||(e[101]=n(" pointing to ")),i(o,{icon:"fa-brands fa-python"}),e[102]||(e[102]=t("code",null,"my_file.py",-1)),e[103]||(e[103]=n(". ")),e[104]||(e[104]=t("code",null,"file A",-1)),e[105]||(e[105]=n(" here refers to the version of ")),i(o,{icon:"fa-brands fa-python"}),e[106]||(e[106]=t("code",null,"my_file.py",-1)),e[107]||(e[107]=n(" in the staging area, whereas ")),e[108]||(e[108]=t("code",null,"file B",-1)),e[109]||(e[109]=n(" refers to its version in the working dir."))]),t("p",null,[e[110]||(e[110]=n("Note that if you modify ")),i(o,{icon:"fa-brands fa-python"}),e[111]||(e[111]=t("code",null,"my_file.py",-1)),e[112]||(e[112]=n(" in a text editor, and don't save the file, then ")),e[113]||(e[113]=t("code",null,"git diff",-1)),e[114]||(e[114]=n(" will not be aware of the changes you've made. This is because they haven't been saved to the working dir."))]),e[300]||(e[300]=t("p",null,[n("We can provide a few switches to "),t("code",null,"git diff"),n(" to get the diff between the working dir and a specific commit, or between the staging area and the latest commit, or between two commits, and so on.")],-1)),t("p",null,[e[115]||(e[115]=n("First create a new file, ")),i(o,{icon:"fas fa-file-lines"}),e[116]||(e[116]=t("code",null,"new_file.txt",-1)),e[117]||(e[117]=n(", and save it:"))]),t("figure",null,[e[120]||(e[120]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/nano_new_file.png",alt:'A simple new file saved as <FontIcon icon="fas fa-file-lines"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[118]||(e[118]=n("A simple new file saved as ")),i(o,{icon:"fas fa-file-lines"}),e[119]||(e[119]=t("code",null,"new_file.txt",-1))])]),e[301]||(e[301]=a(`<p>Currently the file is in the working dir, and it is actually untracked in Git.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/new_file_working_dir.png" alt="A new, untracked file" tabindex="0" loading="lazy"><figcaption>A new, untracked file</figcaption></figure><p>Now stage and commit this file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> new_file.txt</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Commit 3&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, the state of <code>HEAD</code> is the same as the state of the staging area, as well as the working tree:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/repo_state_commit_3.png" alt="The state of  is the same as the index and the working dir" tabindex="0" loading="lazy"><figcaption>The state of <code>HEAD</code> is the same as the index and the working dir</figcaption></figure>`,6)),t("p",null,[e[121]||(e[121]=n("Next, edit ")),i(o,{icon:"fas fa-file-lines"}),e[122]||(e[122]=t("code",null,"new_file.txt",-1)),e[123]||(e[123]=n(" by adding a new line at the beginning and another new line at the end:"))]),t("figure",null,[e[127]||(e[127]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/new_file_edited.png",alt:'Modifying <FontIcon icon="fas fa-file-lines"/> by adding a line in the beginning and another in the end',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[124]||(e[124]=n("Modifying ")),i(o,{icon:"fas fa-file-lines"}),e[125]||(e[125]=t("code",null,"new_file.txt",-1)),e[126]||(e[126]=n(" by adding a line in the beginning and another in the end"))])]),e[302]||(e[302]=a(`<p>As a result, the state is as follows:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/repo_state_start_end.png" alt="After saving, the state in the working dir is different than that of the index or " tabindex="0" loading="lazy"><figcaption>After saving, the state in the working dir is different than that of the index or <code>HEAD</code></figcaption></figure><p>A nice trick would be to use <code>git add -p</code>, which allows you to split the changes even within a file, and consider which ones you&#39;d like to stage.</p><p>In this case, add the first line to the index, but not the last line. To do that, you can split the hunk using <code>s</code>, then accept to stage the first hunk (using <code>y</code>), and not the second part (using <code>n</code>).</p><p>If you are not sure what each letter stands for, you can always use a <code>?</code> and Git will tell you.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/add_p.png" alt="Using , you can stage only the first change" tabindex="0" loading="lazy"><figcaption>Using <code>git add -p</code>, you can stage only the first change</figcaption></figure><p>So now the state in <code>HEAD</code> is without either of those new lines. In the staging area you have the first line but not the last line, and in the working dir you have both new lines.</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/repo_state_after_add_p.png" alt="The state after staging only the first line" tabindex="0" loading="lazy"><figcaption>The state after staging only the first line</figcaption></figure><p>If you use <code>git diff</code>, what will happen?</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_3.png" alt=" shows the difference between the index and the working dir" tabindex="0" loading="lazy"><figcaption><code>git diff</code> shows the difference between the index and the working dir</figcaption></figure><p>Well, as stated before, you get the diff between the staging area and the working tree.</p><p>What happens if you want to get the diff between <code>HEAD</code> and the staging area? For that, you can use <code>git diff --cached</code>:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_cached.png" alt=" shows the difference between  and the index" tabindex="0" loading="lazy"><figcaption><code>git diff --cached</code> shows the difference between <code>HEAD</code> and the index</figcaption></figure><p>And what if you want the difference between <code>HEAD</code> and the working tree? For that you can run <code>git diff HEAD</code>:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_HEAD.png" alt=" shows the difference between  and the working dir" tabindex="0" loading="lazy"><figcaption><code>git diff HEAD</code> shows the difference between <code>HEAD</code> and the working dir</figcaption></figure><p>To summarize the different switches for git diff we have seen so far, here&#39;s a diagram:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_diagram_1.png" alt="Different switches for " tabindex="0" loading="lazy"><figcaption>Different switches for <code>git diff</code></figcaption></figure><p>As a reminder, at the beginning of this chapter you used <code>git diff --no-index</code>. With the <code>--no-index</code> switch, you can compare two files that are not part of the repository - or of any staging area.</p><p>Now, commit the changes you have in the staging area:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Commit 4&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>To observe the diff between this commit and its parent commit, you can run the following command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> HEAD~1 HEAD</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_HEAD_1_HEAD.png" alt="The output of " tabindex="0" loading="lazy"><figcaption>The output of <code>git diff HEAD~1 HEAD</code></figcaption></figure><p>By the way, you can omit the <code>1</code> above and write <code>HEAD~</code>, and get the same result. Using <code>1</code> is the explicit way to state you are referring to the first parent of the commit.</p><p>Note that writing the parent commit here, <code>HEAD~1</code>, first results in a diff showing how to get <em>from</em> the parent commit <em>to</em> the current commit. Of course, I could also generate the reverse diff by writing:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> HEAD HEAD~1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_HEAD_HEAD_1.png" alt="The output of  generates the reverse patch" tabindex="0" loading="lazy"><figcaption>The output of <code>git diff HEAD HEAD~1</code> generates the reverse patch</figcaption></figure><p>To summarize all the different switches for git diff we covered in this section, see this diagram:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_diagram_2.png" alt="The different switches for " tabindex="0" loading="lazy"><figcaption>The different switches for <code>git diff</code></figcaption></figure><p>A short way to view the diff between a commit and its parent is by using <code>git show</code>, for example:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> show HEAD</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_show_HEAD.png" alt="" tabindex="0" loading="lazy"><figcaption><code>git show HEAD</code></figcaption></figure><p>This is the same as writing:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> HEAD~ HEAD</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>We can now update our diagram:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_diff_diagram_3.png" alt=" is used to show the difference between commits" tabindex="0" loading="lazy"><figcaption><code>git diff HEAD~ HEAD</code> is used to show the difference between commits</figcaption></figure><p>You can go back to this diagram as a reference when needed.</p><p>As a reminder, Git commits are snapshots - of the entire working directory of the repository, at a certain point in time. Yet, it&#39;s sometimes not useful to regard a commit as a whole snapshot, but rather by the <strong>changes</strong> this specific commit introduced. In other words, by the diff between a parent commit to the next commit.</p>`,38)),t("p",null,[e[129]||(e[129]=n("As you learned in the ")),i(l,{to:"/freecodecamp.org/gitting-things-done-book/part-1-main-objects-and-introducing-changes.html#chapter-1-git-objects"},{default:s(()=>e[128]||(e[128]=[n("Git Objects chapter")])),_:1}),e[130]||(e[130]=n(", Git stores the ")),e[131]||(e[131]=t("strong",null,"entire",-1)),e[132]||(e[132]=n(" snapshots. The diff is dynamically generated from the snapshot data - by comparing the root trees of the commit and its parent."))]),e[303]||(e[303]=a(`<p>Of course, Git can compare any two snapshots in time, not just adjacent commits, and also generate a diff of files not included in a repository.</p><h3 id="how-to-apply-patches" tabindex="-1"><a class="header-anchor" href="#how-to-apply-patches"><span>How to Apply Patches</span></a></h3><p>By using <code>git diff</code> you can see a patch Git generates, and you can then apply this patch using <code>git apply</code>.</p><h4 id="historical-note" tabindex="-1"><a class="header-anchor" href="#historical-note"><span>Historical Note</span></a></h4><p>Actually, sharing patches used to be the main way to share code in the early days of open source. But now - virtually all projects have moved to sharing Git commits directly through pull requests (called &quot;merge requests&quot; on some platforms).</p><p>The biggest problem with using patches is that it is hard to apply a patch when your working directory does not match the sender&#39;s previous commit. Losing the commit history makes it difficult to resolve conflicts. You will better understand this as you dive deeper into the process of <code>git apply</code>, especially in the next chapter where we cover merges.</p><h4 id="a-simple-patch" tabindex="-1"><a class="header-anchor" href="#a-simple-patch"><span>A Simple Patch</span></a></h4><p>What does it mean to apply a patch? It&#39;s time to try it out!</p><p>Take the output of <code>git diff</code>:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> HEAD~1 HEAD</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And store it in a file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> HEAD~1 HEAD <span class="token operator">&gt;</span> my_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Use <code>reset</code> to undo the last commit:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Don&#39;t worry about the last command - I&#39;ll explain it in detail in Part 3, where we discuss undoing changes. In short, it allows us to &quot;reset&quot; the state of where <code>HEAD</code> is pointing to, as well as the state of the index and of the working dir. In the example above, they are all set to the state of <code>HEAD~1</code>, or &quot;Commit 3&quot; in the diagram.</p><p>So after running the reset command, the contents of the file are as follows (the state from &quot;Commit 3&quot;):</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">nano</span> new_file.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,17)),t("p",null,[e[133]||(e[133]=n("![")),i(o,{icon:"fas fa-file-lines"}),e[134]||(e[134]=t("code",null,"new_file.txt",-1)),e[135]||(e[135]=n("]https://freecodecamp.org/news/content/images/2023/12/nano_new_file-1.png)"))]),e[304]||(e[304]=a(`<p>And you will apply this patch that you&#39;ve just saved:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">nano</span> my_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/my_patch.png" alt="The patch you are about to apply, as generated by git diff" tabindex="0" loading="lazy"><figcaption>The patch you are about to apply, as generated by git diff</figcaption></figure><p>This patch tells Git to find the lines:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">This is a new file</span>
<span class="line">With new content!</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),t("p",null,[e[136]||(e[136]=n("Those lines used to be line number 1 and line number 2 in ")),i(o,{icon:"fas fa-file-lines"}),e[137]||(e[137]=t("code",null,"new_file.txt",-1)),e[138]||(e[138]=n(", and add a line with the content ")),e[139]||(e[139]=t("code",null,"START!",-1)),e[140]||(e[140]=n(" right above them."))]),e[305]||(e[305]=a(`<p>Run this command to apply the patch:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> apply my_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And as a result, you get this version of your file, just like the commit you have created before:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">nano</span> new_file.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/new_file_after_applying.png" alt="The contents of  after applying the patch" tabindex="0" loading="lazy"><figcaption>The contents of <code>new_file.txt</code> after applying the patch</figcaption></figure><h4 id="understanding-the-context-lines" tabindex="-1"><a class="header-anchor" href="#understanding-the-context-lines"><span>Understanding the Context Lines</span></a></h4><p>To understand the importance of context lines, consider a more advanced scenario. What happens if line numbers have changed since you created the patch file?</p><p>To test, start by creating another file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">nano</span> test.text</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,9)),t("figure",null,[e[143]||(e[143]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/testing_file.png",alt:'Creating another file - <FontIcon icon="fas fa-file-lines"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[141]||(e[141]=n("Creating another file - ")),i(o,{icon:"fas fa-file-lines"}),e[142]||(e[142]=t("code",null,"test.txt",-1))])]),e[306]||(e[306]=a(`<p>Stage and commit this file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> test.txt</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Test file&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, change this file by adding a new line, and also erasing the line before the last one:</p>`,3)),t("figure",null,[e[146]||(e[146]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/testing_file_modified.png",alt:'Changes to <FontIcon icon="fas fa-file-lines"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[144]||(e[144]=n("Changes to ")),i(o,{icon:"fas fa-file-lines"}),e[145]||(e[145]=t("code",null,"test.txt",-1))])]),e[307]||(e[307]=a(`<p>Observe the difference between the original version of the file and the version including your changes:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> -- test.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/testing_file_diff.png" alt="The output for " tabindex="0" loading="lazy"><figcaption>The output for <code>git diff -- test.txt</code></figcaption></figure>`,3)),t("p",null,[e[147]||(e[147]=n("(Using ")),e[148]||(e[148]=t("code",null,"-- test.txt",-1)),e[149]||(e[149]=n(" tells Git to run the command ")),e[150]||(e[150]=t("code",null,"diff",-1)),e[151]||(e[151]=n(", taking into consideration only ")),i(o,{icon:"fas fa-file-lines"}),e[152]||(e[152]=t("code",null,"test.txt",-1)),e[153]||(e[153]=n(", so you don't get the diff for other files.)"))]),e[308]||(e[308]=a(`<p>Store this diff into a patch file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> -- test.txt <span class="token operator">&gt;</span> new_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now, reset your state to that before introducing the changes:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>If you were to apply new_patch.patch now, it would simply work.</p>`,5)),t("p",null,[e[154]||(e[154]=n("Let's now consider a more interesting case. Modify ")),i(o,{icon:"fas fa-file-linse"}),e[155]||(e[155]=t("code",null,"test.txt",-1)),e[156]||(e[156]=n(" again by adding a new line at the beginning:"))]),t("figure",null,[e[159]||(e[159]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/testing_file_added_first_line.png",alt:'Adding a new line at the beginning of <FontIcon icon="fas fa-file-lines"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[157]||(e[157]=n("Adding a new line at the beginning of ")),i(o,{icon:"fas fa-file-lines"}),e[158]||(e[158]=t("code",null,"test.txt",-1))])]),e[309]||(e[309]=t("p",null,"As a result, the line numbers are different from the original version where the patch has been created. Consider the patch you created before:",-1)),t("figure",null,[e[161]||(e[161]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/new_patch.png",alt:'<FontIcon icon="fas fa-file-lines"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[i(o,{icon:"fas fa-file-lines"}),e[160]||(e[160]=t("code",null,"new_patch.patch",-1))])]),e[310]||(e[310]=a(`<p>It assumes that the line <code>With more text</code> is the second line in <code>test.txt</code>, which is no longer the case. So...will <code>git apply</code> work?</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> apply new_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>It worked!</p><p>By default, Git looks for 3 lines of context before and after each change introduced in the patch - as you can see, they are included in the patch file. If you take three lines before and after the added line, and three lines before and after the deleted line (actually only one line after, as no other lines exist) - you get to the patch file. If these lines all exist - then applying the patch works, even if the line numbers changed.</p><p>Reset the state again:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>What happens if you change one of the context lines? Try it out by changing the line <code>With more text</code> to <code>With more text!</code>:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/testing_file_modifying_second_line.png" alt="Changing the line  to " tabindex="0" loading="lazy"><figcaption>Changing the line <code>With more text</code> to <code>With more text!</code></figcaption></figure><p>And now:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> apply new_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_apply_new_patch.png" alt=" doesn&#39;t apply the patch" tabindex="0" loading="lazy"><figcaption><code>git apply</code> doesn&#39;t apply the patch</figcaption></figure><p>Well, no. The patch does not apply. If you are not sure why, or just want to better understand the process Git is performing, you can add the <code>--verbose</code> flag to <code>git apply</code>, like so:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> apply <span class="token parameter variable">--verbose</span> new_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_apply_new_patch_verbose.png" alt=" shows the process Git is taking to apply the patch" tabindex="0" loading="lazy"><figcaption><code>git apply --verbose</code> shows the process Git is taking to apply the patch</figcaption></figure><p>It seems that Git searched lines from the file, including the line &quot;With more text&quot;, right before the line &quot;It has some really nice lines&quot;. This sequence of lines no longer exists in the file. As Git cannot find this sequence, it cannot apply the patch.</p><p>As mentioned earlier, by default, Git looks for 3 lines of context before and after each change introduced in the patch. If the surrounding three lines do not exist, Git cannot apply the patch.</p><p>You can ask Git to rely on fewer lines of context, using the <code>-C</code> argument. For example, to ask Git to look for 1 line of the surrounding context, run the following command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> apply <span class="token parameter variable">-C1</span> new_patch.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>The patch applies!</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_apply_c1.png" alt="" tabindex="0" loading="lazy"><figcaption><code>git apply -C1 new_patch.patch</code></figcaption></figure><p>Why is that? Consider the patch again:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/new_patch-1.png" alt="" tabindex="0" loading="lazy"><figcaption><code>new_patch.patch</code></figcaption></figure><p>When applying the patch with the <code>-C1</code> option, Git is looking for the lines:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Like this one</span>
<span class="line">And that one</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>in order to add the line <code>!!!This is the new line!!!</code> between these two lines. These lines exist (and, importantly, they appear one right after the other). As a result, Git can successfully add the line between them, even though the line numbers changed.</p><p>Similarly, Git would look for the lines:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">How wonderful</span>
<span class="line">So we are writing an example</span>
<span class="line">Git is awesoome!</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As Git can find these lines, Git can erase the middle one.</p><p>If we changed one of these lines, say, changed &quot;How wonderful&quot; to &quot;How very wondeful&quot;, then Git would not be able to find the string above, and thus the patch would not apply.</p><h3 id="recap-git-diff-and-patch" tabindex="-1"><a class="header-anchor" href="#recap-git-diff-and-patch"><span>Recap - Git Diff and Patch</span></a></h3><p>In this chapter, you learned what a diff is, and the difference between a diff and a patch. You learned how to generate various patches using different switches for <code>git diff</code>. You also learned what the output of git diff looks like, and how it is constructed. Ultimately, you learned how patches are applied, and specifically the importance of context.</p><p>Understanding diffs is a major milestone for understanding many other processes within Git - for example, merging or rebasing, that we will explore in the next chapters.</p><hr><h2 id="chapter-7-understanding-git-merge" tabindex="-1"><a class="header-anchor" href="#chapter-7-understanding-git-merge"><span>Chapter 7 - Understanding Git Merge</span></a></h2><p>By reading this chapter, you are going to really understand <code>git merge</code>, one of the most common operations you&#39;ll perform in your Git repositories.</p><h3 id="what-is-a-merge-in-git" tabindex="-1"><a class="header-anchor" href="#what-is-a-merge-in-git"><span>What is a Merge in Git?</span></a></h3><p>Merging is the process of combining the recent changes from several branches into a single new commit. This commit points back to these branches.</p><p>In a way, merging is the complement of branching in version control: a branch allows you to work simultaneously with others on a particular set of files, whereas a merge allows you to later combine separate work on branches that diverged from a common ancestor commit.</p><p>OK, let&#39;s take this bit by bit.</p><p>Remember that in Git, a branch is just a name pointing to a single commit. When we think about commits as being &quot;on&quot; a specific branch, they are actually reachable through the parent chain from the commit that the branch is pointing to.</p><p>That is, if you consider this commit graph:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/commit_graph_1.png" alt="Commit graph with " tabindex="0" loading="lazy"><figcaption>Commit graph with <code>feature_1</code></figcaption></figure>`,42)),t("p",null,[e[162]||(e[162]=n("You see the branch ")),i(o,{icon:"fas fa-code-branch"}),e[163]||(e[163]=t("code",null,"feature_1",-1)),e[164]||(e[164]=n(", which points to a commit with the SHA-1 value of ")),e[165]||(e[165]=t("code",null,"ba0d2",-1)),e[166]||(e[166]=n(". As in previous chapters, I only write the first 5 digits of the SHA-1 value for brevity."))]),t("p",null,[e[167]||(e[167]=n("Notice that commit ")),e[168]||(e[168]=t("code",null,"54a9d",-1)),e[169]||(e[169]=n(' is also "on" this branch, as it is the parent commit of ')),e[170]||(e[170]=t("code",null,"ba0d2",-1)),e[171]||(e[171]=n(". So if you start from the pointer of ")),i(o,{icon:"fas fa-code-branch"}),e[172]||(e[172]=t("code",null,"feature_1",-1)),e[173]||(e[173]=n(", you get to ")),e[174]||(e[174]=t("code",null,"ba0d2",-1)),e[175]||(e[175]=n(", which then points to ")),e[176]||(e[176]=t("code",null,"54a9d",-1)),e[177]||(e[177]=n('. You can go on the chain of parents, and all these reachable commits are considered to be "on" ')),i(o,{icon:"fas fa-code-branch"}),e[178]||(e[178]=t("code",null,"feature_1",-1)),e[179]||(e[179]=n("."))]),e[311]||(e[311]=t("p",null,'When you merge with Git, you merge commits. Almost always, we merge two commits by referring to them with the branch names that point to them. Thus we say we "merge branches" - though under the hood, we actually merge commits.',-1)),e[312]||(e[312]=t("h3",{id:"time-to-get-hands-on-1",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#time-to-get-hands-on-1"},[t("span",null,"Time to Get Hands-on")])],-1)),e[313]||(e[313]=t("p",null,"For this chapter, I will use the following repository:",-1)),i(d,{name:"Omerr/gitting_things_merge",desc:"A practice repo accompanying Chapter 7 of Gitting Things Done book",url:"https://github.com/Omerr/gitting_things_merge",logo:"https://avatars.githubusercontent.com/u/52040016?v=4",preview:"https://opengraph.githubassets.com/6a523daa47ce27e47be2d48594e590bab824f093bc10db99de138a0af3508de4/Omerr/gitting_things_merge"}),e[314]||(e[314]=t("p",null,"As in previous chapters, I encourage you to clone it locally and have the same starting point I am using for this chapter.",-1)),t("p",null,[e[180]||(e[180]=n("OK, so let's say I have this simple repository here, with a branch called ")),i(o,{icon:"fas fa-code-branch"}),e[181]||(e[181]=t("code",null,"main",-1)),e[182]||(e[182]=n(', and a few commits with the commit messages of "Commit 1", "Commit 2", and "Commit 3":'))]),e[315]||(e[315]=a('<figure><img src="https://freecodecamp.org/news/content/images/2023/12/commits_1_3.png" alt="A simple repository with three commits" tabindex="0" loading="lazy"><figcaption>A simple repository with three commits</figcaption></figure><p>Next, create a feature branch by typing <code>git branch new_feature</code>:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_branch_new_feature.png" alt="Creating a new branch with " tabindex="0" loading="lazy"><figcaption>Creating a new branch with <code>git branch</code></figcaption></figure><p>And switch <code>HEAD</code> to point to this new branch, by using <code>git checkout new_feature</code> (or <code>git switch new_feature</code>). You can look at the outcome by using git log:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_checkout_new_feature.png" alt="The output of  after using " tabindex="0" loading="lazy"><figcaption>The output of <code>git log</code> after using <code>git checkout new_feature</code></figcaption></figure><p>As a reminder, you could also write <code>git checkout -b new_feature</code>, which would both create a new branch and change <code>HEAD</code> to point to this new branch.</p><p>If you need a reminder about branches and how they&#39;re implemented under the hood, please check out <a href="#chapter-2-branches-in-git">chapter 2</a>. Yes, check out. Pun intended 😇</p>',7)),t("p",null,[e[183]||(e[183]=n("Now, on the ")),i(o,{icon:"fas fa-code-branch"}),e[184]||(e[184]=t("code",null,"new_feature",-1)),e[185]||(e[185]=n(" branch, implement a new feature. In this example, I will edit an existing file that looks like this before the edit:"))]),e[316]||(e[316]=t("figure",null,[t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/code_py_before_changes.png",alt:" before editing it",tabindex:"0",loading:"lazy"}),t("figcaption",null,[t("code",null,"code.py"),n(" before editing it")])],-1)),e[317]||(e[317]=t("p",null,"And I will now edit it to include a new function:",-1)),t("figure",null,[e[188]||(e[188]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/code_py_new_feature.png",alt:'Implementing <FontIcon icon="fas fa-code-branch"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[186]||(e[186]=n("Implementing ")),i(o,{icon:"fas fa-code-branch"}),e[187]||(e[187]=t("code",null,"new_feature",-1))])]),e[318]||(e[318]=a(`<p>And luckily, this is not a programming book, so this function is legit 😇</p><p>Next, stage and commit this change:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> code.py</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Commit 4&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),t("p",null,[e[189]||(e[189]=n("Looking at the history, you have the branch ")),i(o,{icon:"fas fa-code-branch"}),e[190]||(e[190]=t("code",null,"new_feature",-1)),e[191]||(e[191]=n(', now pointing to "Commit 4", which points to its parent, "Commit 3". The branch main is also pointing to "Commit 3".'))]),e[319]||(e[319]=t("figure",null,[t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/commits_1_4.png",alt:'The history after committing "Commit 4"',tabindex:"0",loading:"lazy"}),t("figcaption",null,'The history after committing "Commit 4"')],-1)),t("p",null,[e[192]||(e[192]=n("Time to merge the new feature! That is, merge these two branches, ")),i(o,{icon:"fas fa-code-branch"}),e[193]||(e[193]=t("code",null,"main",-1)),e[194]||(e[194]=n(" and ")),i(o,{icon:"fas fa-code-branch"}),e[195]||(e[195]=t("code",null,"new_feature",-1)),e[196]||(e[196]=n(". Or, in Git's lingo, merge ")),i(o,{icon:"fas fa-code-branch"}),e[197]||(e[197]=t("code",null,"new_feature",-1)),e[198]||(e[198]=n()),e[199]||(e[199]=t("em",null,"into",-1)),e[200]||(e[200]=n()),i(o,{icon:"fas fa-code-branch"}),e[201]||(e[201]=t("code",null,"main",-1)),e[202]||(e[202]=n('. This means merging "Commit 4" and "Commit 3". This is pretty trivial, as after all, "Commit 3" is an ancestor of "Commit 4".'))]),e[320]||(e[320]=t("p",null,[n("Check out the main branch (with "),t("code",null,"git checkout main"),n("), and perform the merge by using "),t("code",null,"git merge new_feature"),n(":")],-1)),t("figure",null,[e[207]||(e[207]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/git_merge_new_feature.png",alt:'Merging <FontIcon icon="fas fa-code-branch"/> into <FontIcon icon="fas fa-code-branch"/>',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[203]||(e[203]=n("Merging ")),i(o,{icon:"fas fa-code-branch"}),e[204]||(e[204]=t("code",null,"new_feature",-1)),e[205]||(e[205]=n(" into ")),i(o,{icon:"fas fa-code-branch"}),e[206]||(e[206]=t("code",null,"main",-1))])]),t("p",null,[e[208]||(e[208]=n("Since ")),i(o,{icon:"fas fa-code-branch"}),e[209]||(e[209]=t("code",null,"new_feature",-1)),e[210]||(e[210]=n(" never really diverged from main, Git could just perform a fast-forward merge. So what happened here? Consider the history:"))]),e[321]||(e[321]=t("figure",null,[t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/git_ff_merge.png",alt:"The result of a fast-forward merge",tabindex:"0",loading:"lazy"}),t("figcaption",null,"The result of a fast-forward merge")],-1)),t("p",null,[e[211]||(e[211]=n("Even though you used ")),e[212]||(e[212]=t("code",null,"git merge",-1)),e[213]||(e[213]=n(", there was no actual merging here. Actually, Git did something very simple - it ")),e[214]||(e[214]=t("code",null,"reset",-1)),e[215]||(e[215]=n(" the main branch to point to the same commit as the branch ")),i(o,{icon:"fas fa-code-branch"}),e[216]||(e[216]=t("code",null,"new_feature",-1)),e[217]||(e[217]=n("."))]),e[322]||(e[322]=a(`<p>In case you don&#39;t want that to happen, but rather you want Git to really perform a merge, you could either change Git&#39;s configuration, or run the merge command with the <code>--no-ff</code> flag.</p><p>First, undo the last commit:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Reminder: if this way of using reset is not clear to you, don&#39;t worry - we will cover it in detail in Part 3. It is not crucial for this introduction of merge, though. For now, it&#39;s important to understand that it basically undoes the merge operation.</p>`,4)),t("p",null,[e[218]||(e[218]=n("Just to clarify, now if you checked out ")),i(o,{icon:"fas fa-code-branch"}),e[219]||(e[219]=t("code",null,"new_feature",-1)),e[220]||(e[220]=n(" again:"))]),e[323]||(e[323]=a(`<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout new_feature</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>The history would look just like before the merge:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/history_after_reset_after_merge.png" alt="The history after using " tabindex="0" loading="lazy"><figcaption>The history after using <code>git reset --hard HEAD~1</code></figcaption></figure><p>Next, perform the merge with the <code>--no-fast-forward</code> flag (<code>--no-ff</code> for short):</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> merge new_feature --no-ff</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, if we look at the history using <code>git lol</code>:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_lol_1.png" alt="History after merging with the  flag" tabindex="0" loading="lazy"><figcaption>History after merging with the <code>--no-ff</code> flag</figcaption></figure><p>(Reminder: <code>git lol</code> is an alias I added to Git to visibly see the history in a graphical manner. You can find it, along with the other components of my setup, at the <a href="#my-setup">My Setup</a> part of the <a href="#introduction">Introduction</a> chapter.)</p><p>Considering this history, you can see Git created a new commit, a merge commit.</p><p>If you consider this commit a bit closer:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> log <span class="token parameter variable">-n1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_log_after_lol_1.png" alt="The merge commit has two parents" tabindex="0" loading="lazy"><figcaption>The merge commit has two parents</figcaption></figure>`,12)),t("p",null,[e[221]||(e[221]=n('You will see that this commit actually has two parents - "Commit 4", which was the commit that ')),i(o,{icon:"fas fa-code-branch"}),e[222]||(e[222]=t("code",null,"new_feature",-1)),e[223]||(e[223]=n(" pointed to when you ran ")),e[224]||(e[224]=t("code",null,"git merge",-1)),e[225]||(e[225]=n(', and "Commit 3", which was the commit that ')),i(o,{icon:"fas fa-code-branch"}),e[226]||(e[226]=t("code",null,"main",-1)),e[227]||(e[227]=n(" pointed to."))]),e[324]||(e[324]=t("p",null,[t("strong",null,"A merge commit has two parents: the two commits it merged.")],-1)),e[325]||(e[325]=t("p",null,"The merge commit shows us the concept of merge quite well. Git takes two commits, usually referenced by two different branches, and merges them together.",-1)),t("p",null,[e[228]||(e[228]=n("After the merge, as you started the process from ")),i(o,{icon:"fas fa-code-branch"}),e[229]||(e[229]=t("code",null,"main",-1)),e[230]||(e[230]=n(", you are still on ")),i(o,{icon:"fas fa-code-branch"}),e[231]||(e[231]=t("code",null,"main",-1)),e[232]||(e[232]=n(", and the history from ")),i(o,{icon:"fas fa-code-branch"}),e[233]||(e[233]=t("code",null,"new_feature",-1)),e[234]||(e[234]=n(" has been ")),e[235]||(e[235]=t("em",null,"merged",-1)),e[236]||(e[236]=n(" into this branch. Since you started with ")),i(o,{icon:"fas fa-code-branch"}),e[237]||(e[237]=t("code",null,"main",-1)),e[238]||(e[238]=n(', then "Commit 3", which ')),i(o,{icon:"fas fa-code-branch"}),e[239]||(e[239]=t("code",null,"main",-1)),e[240]||(e[240]=n(' pointed to, is the first parent of the merge commit, whereas "Commit 4", which you merged into ')),i(o,{icon:"fas fa-code-branch"}),e[241]||(e[241]=t("code",null,"main",-1)),e[242]||(e[242]=n(", is the second parent of the merge commit."))]),t("p",null,[e[243]||(e[243]=n("Notice that you started on ")),i(o,{icon:"fas fa-code-branch"}),e[244]||(e[244]=t("code",null,"main",-1)),e[245]||(e[245]=n(' when it pointed to "Commit 3", and Git went quite a long way for you. It changed the working tree, the index, and also ')),e[246]||(e[246]=t("code",null,"HEAD",-1)),e[247]||(e[247]=n(" and created a new commit object. At least when you use ")),e[248]||(e[248]=t("code",null,"git merge",-1)),e[249]||(e[249]=n(" without the ")),e[250]||(e[250]=t("code",null,"--no-commit",-1)),e[251]||(e[251]=n(" flag and when it's not a fast-forward merge, Git does all of that."))]),e[326]||(e[326]=a(`<p>This was a super simple case, where the branches you merged didn&#39;t diverge at all. We will soon consider more interesting cases.</p><p>By the way, you can use <code>git merge</code> to merge more than two commits - actually, any number of commits. This is rarely done, and to adhere to the practicality principle of this book, I won&#39;t delve into it.</p><p>Another way to think of <code>git merge</code> is by joining two or more development histories together. That is, when you merge, you incorporate changes from the named commits, since the time their histories diverged <em>from</em> the current branch, <em>into</em> the current branch. I used the term &quot;branch&quot; here, but I am stressing this again - <strong>we are actually merging commits</strong>.</p><h3 id="time-for-a-more-advanced-case" tabindex="-1"><a class="header-anchor" href="#time-for-a-more-advanced-case"><span>Time For a More Advanced Case</span></a></h3><p>Time to consider a more advanced case, which is probably the most common case where we use <code>git merge</code> explicitly - where you need to merge branches that did diverge from one another.</p><p>Assume we have two people working on this repo now, John and Paul.</p><p>John created a branch:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> john_branch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/create_john_branch.png" alt="A new branch, " tabindex="0" loading="lazy"><figcaption>A new branch, <code>john_branch</code></figcaption></figure>`,9)),t("p",null,[e[252]||(e[252]=n("And John has written a new song in a new file, ")),i(o,{icon:"fa-brands fa-markdown"}),e[253]||(e[253]=t("code",null,"lucy_in_the_sky_with_diamonds.md",-1)),e[254]||(e[254]=n(". Well, I believe John Lennon didn't really write in Markdown format, or use Git for that matter, but let's pretend he did for this explanation."))]),e[327]||(e[327]=a(`<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> lucy_in_the_sky_with_diamonds.md</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Commit 5&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>While John was working on this song, Paul was also writing, on another branch. Paul had started from main:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And created his own branch:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> paul_branch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,5)),t("p",null,[e[255]||(e[255]=n("And Paul wrote his song into a file called ")),i(o,{icon:"fa-brands fa-markdown"}),e[256]||(e[256]=t("code",null,"penny_lane.md",-1)),e[257]||(e[257]=n(". Paul staged and committed this file:"))]),e[328]||(e[328]=a(`<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> penny_lane.md</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Commit 6&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),t("p",null,[e[258]||(e[258]=n("So now our history looks like this - where we have two different branches, branching out from ")),i(o,{icon:"fas fa-code-branch"}),e[259]||(e[259]=t("code",null,"main",-1)),e[260]||(e[260]=n(", with different histories:"))]),e[329]||(e[329]=t("figure",null,[t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/history_after_commit_6.png",alt:"The history after John and Paul committed",tabindex:"0",loading:"lazy"}),t("figcaption",null,"The history after John and Paul committed")],-1)),t("p",null,[e[261]||(e[261]=n("John is happy with his branch (that is, his song), so he decides to merge it into the ")),i(o,{icon:"fas fa-code-branch"}),e[262]||(e[262]=t("code",null,"main",-1)),e[263]||(e[263]=n(" branch:"))]),e[330]||(e[330]=a(`<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> merge john_branch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Actually, this is a fast-forward merge, as we have learned before. You can validate that by looking at the history (using <code>git lol</code>, for example):</p>`,2)),t("figure",null,[e[269]||(e[269]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/merge_after_commit_6.png",alt:'Merging <FontIcon icon="fas fa-code-branch"/> into <FontIcon icon="fas fa-code-branch"/> results in a fast-forward merge',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[264]||(e[264]=n("Merging ")),i(o,{icon:"fas fa-code-branch"}),e[265]||(e[265]=t("code",null,"john_branch",-1)),e[266]||(e[266]=n(" into ")),i(o,{icon:"fas fa-code-branch"}),e[267]||(e[267]=t("code",null,"main",-1)),e[268]||(e[268]=n(" results in a fast-forward merge"))])]),t("p",null,[e[270]||(e[270]=n("At this point, Paul also wants to merge his branch into ")),i(o,{icon:"fas fa-code-branch"}),e[271]||(e[271]=t("code",null,"main",-1)),e[272]||(e[272]=n(", but now a fast-forward merge is no longer relevant - there are two different histories here: the history of ")),i(o,{icon:"fas fa-code-branch"}),e[273]||(e[273]=t("code",null,"main",-1)),e[274]||(e[274]=n("'s and that of ")),i(o,{icon:"fas fa-code-branch"}),e[275]||(e[275]=t("code",null,"paul_branch",-1)),e[276]||(e[276]=n("'s. It's not that ")),i(o,{icon:"fas fa-code-branch"}),e[277]||(e[277]=t("code",null,"paul_branch",-1)),e[278]||(e[278]=n(" only adds commits on top of main branch or vice versa."))]),e[331]||(e[331]=a(`<p>Now things get interesting. 😎😎</p><p>First, let Git do the hard work for you. After that, we will understand what&#39;s actually happening under the hood.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> merge paul_branch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Consider the history now:</p>`,4)),t("figure",null,[e[282]||(e[282]=t("img",{src:"https://freecodecamp.org/news/content/images/2023/12/merge_after_commit_6_paul_branch.png",alt:'When you merge <FontIcon icon="fas fa-code-branch"/>, you get a new merge commit',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[e[279]||(e[279]=n("When you merge ")),i(o,{icon:"fas fa-code-branch"}),e[280]||(e[280]=t("code",null,"paul_branch",-1)),e[281]||(e[281]=n(", you get a new merge commit"))])]),e[332]||(e[332]=a(`<p>What you have is a new commit, with two parents - &quot;Commit 5&quot; and &quot;Commit 6&quot;.</p><p>In the working dir, you can see that both John&#39;s song as well as Paul&#39;s song are there (if you use <code>ls</code>, you will see both files in the working dir).</p><p>Nice, Git really did merge the changes for you. But how does that happen?</p><p>Undo this last commit:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="how-to-perform-a-three-way-merge-in-git" tabindex="-1"><a class="header-anchor" href="#how-to-perform-a-three-way-merge-in-git"><span>How to Perform a Three-way Merge in Git</span></a></h3><p>It&#39;s time to understand what&#39;s really happening under the hood. 😎</p><p>What Git has done here is it called a <strong>3-way merge</strong>. In outlining the process of a 3-way merge, I will use the term &quot;branch&quot; for simplicity, but you should remember you could also merge two (or more) commits that are not referenced by a branch.</p><p>The 3-way merge process includes these stages:</p><p>First, Git locates the common ancestor of the two branches. That is, the common commit from which the merging branches most recently diverged. Technically, this is actually the first commit that is reachable from both branches. This commit is then called the merge base.</p><p>Second, Git calculates two diffs - one diff from the merge base to the first branch, and another diff from the merge base to the second branch. Git generates patches based on those diffs.</p><p>Third, Git applies both patches to the merge base using a 3-way merge algorithm. The result is the state of the new merge commit.</p><p>![](https://freecodecamp.org/news/content/images/2023/12/3_way_merge.png&quot; alt=&quot;The three steps of the 3-way merge algorithm: (1) locate the common ancestor; (2) calculate diffs from the merge base to the first branch, and from the merge base to the second branch; (3) apply both patches together&quot; width=&quot;828&quot; height=&quot;522&quot; loading=&quot;lazy&quot;&gt; <em>The three steps of the 3-way merge algorithm: (1) locate the common ancestor (2) calculate diffs from the merge base to the first branch, and from the merge base to the second branch (3) apply both patches together</em></p><p>So, back to our example.</p><p>In the first step, Git looks from both branches - <code>main</code> and <code>paul_branch</code> - and traverses the history to find the first commit that is reachable from both. In this case, this would be… which commit?</p><p>Correct, the merge commit (the one with &quot;Commit 3&quot; and &quot;Commit 4&quot; as its parents).</p><p>If you are not sure, you can always ask Git directly:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> merge-base main paul_branch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>![](https://freecodecamp.org/news/content/images/2023/12/3_way_merge_base.png&quot; alt=&quot;The merge base is the merge commit with &#39;Commit 3&#39; and &#39;Commit 4&#39; as its parents. Note: the previous commit merge is blurred as it is not reachable via the current history following the command&quot; width=&quot;1424&quot; height=&quot;515&quot; loading=&quot;lazy&quot;&gt; <em>The merge base is the merge commit with &quot;Commit 3&quot; and &quot;Commit 4&quot; as its parents. Note: the previous commit merge is blurred as it is not reachable via the current history following the <code>reset</code> command</em></p><p>By the way, this is the most common and simple case, where we have a single obvious choice for the merge base. In more complicated cases, there may be multiple possibilities for a merge base, but this is not within our focus.</p><p>In the second step, Git calculates the diffs. So it first calculates the diff between the merge commit and &quot;Commit 5&quot;:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> 4f90a62 4683aef</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>(The SHA-1 values will be different on your machine.)</p><p>![](https://freecodecamp.org/news/content/images/2023/12/diff_4_5.png&quot; alt=&quot;The diff between the merge commit and &#39;Commit 5&#39;\\label{fig-john-patch}&quot; width=&quot;707&quot; height=&quot;331&quot; loading=&quot;lazy&quot;&gt; <em>The diff between the merge commit and &quot;Commit 5&quot;</em></p><p>If you don&#39;t feel comfortable with the output of <code>git diff</code>, you can read the previous chapter where I described it in detail.</p><p>You can store that diff to a file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> 4f90a62 4683aef <span class="token operator">&gt;</span> john_branch_diff.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Next, Git calculates the diff between the merge commit and &quot;Commit 6&quot;:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> 4f90a62 c5e4951</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>![](https://freecodecamp.org/news/content/images/2023/12/diff_4_6.png&quot; alt=&quot;The diff between the merge commit and &#39;Commit 6&#39;&quot; width=&quot;516&quot; height=&quot;307&quot; loading=&quot;lazy&quot;&gt; <em>The diff between the merge commit and &quot;Commit 6&quot;</em></p><p>Write this one to a file as well:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">diff</span> 4f90a62 c5e4951 <span class="token operator">&gt;</span> paul_branch_diff.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now Git applies those patches on the merge base.</p><p>First, try that out directly - just apply the patches (I will walk you through it in a moment). This is not what Git really does under the hood, but it will help you gain a better understanding of why Git needs to do something different.</p><p>Checkout the merge base first, that is, the merge commit:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout 4f90a62</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And apply John&#39;s patch first (as a reminder, this is the patch shown in the image with the caption &quot;The diff between the merge commit and &quot;Commit 5&quot;&quot;):</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> apply <span class="token parameter variable">--index</span> john_branch_diff.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Notice that for now there is no merge commit. <code>git apply</code> updates the working dir as well as the index, as we used the <code>--index</code> switch.</p><p>You can observe the status using <code>git status</code>:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/git_status_apply_john.png" alt="Applying John&#39;s patch on the merge commit" tabindex="0" loading="lazy"><figcaption>Applying John&#39;s patch on the merge commit</figcaption></figure><p>So now John&#39;s new song is incorporated into the index. Apply the other patch:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> apply <span class="token parameter variable">--index</span> paul_branch_diff.patch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>As a result, the index contains changes from both branches.</p><p>Now it&#39;s time to commit your merge. Since the porcelain command <code>git commit</code> always generates a commit with a single parent, you would need the underlying plumbing command - <code>git commit-tree</code>.</p><p>If you need a reminder about porcelain vs plumbing commands, check out <a href="#chapter-4-how-to-create-a-repo-from-scratch">chapter 4</a> where I explained these terms, and created an entire repo from scratch.</p><p>Remember that every Git commit object points to a single tree. So you need to record the contents of the index in a tree:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> write-tree</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now you get the SHA-1 value of the created tree, and you can create a commit object using <code>git commit-tree</code>:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> commit-tree <span class="token operator">&lt;</span>TREE_SHA<span class="token operator">&gt;</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>COMMIT_<span class="token operator">&lt;</span>span <span class="token assign-left variable">class</span><span class="token operator">=</span><span class="token string">&quot;token file-descriptor important&quot;</span><span class="token operator">&gt;</span><span class="token operator"><span class="token file-descriptor important">5</span>&gt;</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>COMMIT_<span class="token operator">&lt;</span>span <span class="token assign-left variable">class</span><span class="token operator">=</span><span class="token string">&quot;token file-descriptor important&quot;</span><span class="token operator">&gt;</span><span class="token operator"><span class="token file-descriptor important">6</span>&gt;</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;Merge commit!&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://freecodecamp.org/news/content/images/2023/12/create_merge_commit.png" alt="Creating a merge commit" tabindex="0" loading="lazy"><figcaption>Creating a merge commit</figcaption></figure><p>Great, so you have created a commit object!</p><p>Recall that <code>git merge</code> also changes <code>HEAD</code> to point to the new merge commit object. So you can simply do the same:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> db315a</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>If you look at the history now:</p><figure><img src="https://freecodecamp.org/news/content/images/2023/12/history_after_reset_to_merge_commit_git_lol.png" alt="The history after creating a merge commit and resetting " tabindex="0" loading="lazy"><figcaption>The history after creating a merge commit and resetting <code>HEAD</code></figcaption></figure><div class="hint-container note"><p class="hint-container-title">Note</p><p>in this state, <code>HEAD</code> is &quot;detached&quot; - that is, it directly points to a commit object rather than a named reference. <code>gg</code> does not show <code>HEAD</code> when it is &quot;detached&quot;, so don&#39;t be confused if you can&#39;t see <code>HEAD</code> in the output of <code>gg</code>.</p></div><p>This is almost what we wanted. Remember that when you ran <code>git merge</code>, the result was <code>HEAD</code> pointing to <code>main</code> which pointed to the newly created commit (as shown in the image with the caption &quot;When you merge <code>paul_branch</code>, you get a new merge commit&quot;. What should you do then?</p><p>Well, what you want is to modify <code>main</code>, so you can just point it to the new commit:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> db315a</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>And now you have the same result as when you ran <code>git merge</code>: <code>main</code> points to the new commit, which has &quot;Commit 5&quot; and &quot;Commit 6&quot; as its parents. You can use <code>git lol</code> to verify that.</p><p>So this is exactly the same result as the merge done by Git, with the exception of the timestamp and thus the SHA-1 value, of course.</p><p>Overall, you got to merge both the contents of the two commits - that is, the state of the files, and also the history of those commits - by creating a merge commit that points to both histories.</p><p>In this simple case, you could actually just apply the patches using <code>git apply</code>, and everything works quite well.</p><h3 id="quick-recap-of-a-three-way-merge" tabindex="-1"><a class="header-anchor" href="#quick-recap-of-a-three-way-merge"><span>Quick Recap of a Three-way Merge</span></a></h3><p>So to quickly recap, on a three-way merge, Git:</p><ul><li>First, locates the merge base - the common ancestor of the two branches. That is, the first commit that is reachable from both branches.</li><li>Second, Git calculates two diffs - one diff from the merge base to the first branch, and another diff from the merge base to the second branch.</li><li>Third, Git applies both patches to the merge base, using a 3-way merge algorithm. I haven&#39;t explained the 3-way merge yet, but I will elaborate on that later. The result is the state of the new merge commit.</li></ul><p>You can also understand why it&#39;s called a &quot;3-way merge&quot;: Git merges three different states - that of the first branch, that of the second branch, and their common ancestor. In our previous example, <code>main</code>, <code>paul_branch</code>, and the merge commit (with &quot;Commit 3&quot; and &quot;Commit 4&quot; as parents), respectively.</p><p>This is unlike, say, the fast-forward examples we saw before. The fast-forward examples are actually a case of a two-way merge, as Git only compares two states - for example, where <code>main</code> pointed to, and where <code>john_branch</code> pointed to.</p><h3 id="moving-on" tabindex="-1"><a class="header-anchor" href="#moving-on"><span>Moving on</span></a></h3><p>Still, this was a simple case of a 3-way merge. John and Paul created different songs, so each of them touched a different file. It was pretty straightforward to execute the merge.</p><p>What about more interesting cases?</p><p>Let&#39;s assume that now John and Paul are co-authoring a new song.</p><p>So, John checked out <code>main</code> branch and started writing the song:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,75)),c(" TODO: 작성 "),c(` 
![](https://freecodecamp.org/news/content/images/2023/12/a_day_in_the_life_md.png" alt="John's new song" width="669" height="540" loading="lazy">
*John's new song*

He staged and committed it ("Commit 7"):

\`\`\`sh
git add a_day_in_the_life.md
git commit -m "Commit 7"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_7.png" alt="John's new song is committed" width="1476" height="518" loading="lazy">
*John's new song is committed*

Now, Paul branches:

\`\`\`sh
git checkout -b paul_branch_2
\`\`\`

And edits the song, adding another verse:

![](https://freecodecamp.org/news/content/images/2023/12/a_day_in_the_life_paul_verse.png" alt="Paul added a new verse" width="602" height="553" loading="lazy">
*Paul added a new verse*

Of course, the original song does not include the title "Paul's Verse", but I added it here for clarity.

Paul stages and commits the changes:

\`\`\`sh
git add a_day_in_the_life.md
git commit -m "Commit 8"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_8.png" alt="The history after introducing 'Commit 8'" width="1027" height="397" loading="lazy">
*The history after introducing "Commit 8"*

John also branches out from main and adds an additional two lines at the end:

\`\`\`sh
git checkout main
git checkout -b john_branch_2
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/a_day_in_the_life_john_addition.png" alt="John added the two last lines" width="665" height="551" loading="lazy">
*John added the two last lines*

John stages and commits his changes too ("Commit 9"):

\`\`\`sh
git add a_day_in_the_life.md
git commit -m "Commit 9"
\`\`\`

This is the resulting history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_9.png" alt="The history after John's last commit" width="801" height="461" loading="lazy">
*The history after John's last commit*

So, both Paul and John modified the same file on different branches. Will Git be successful in merging them?

Say now we don't go through \`main\`, but John will try to merge Paul's new branch into his branch:

\`\`\`sh
git merge paul_branch_2
\`\`\`

Wait! Don't run this command! Why would you let Git do all the hard work? You are trying to understand the process here.

So, first, Git needs to find the merge base. Can you see which commit that would be?

Correct, it would be the last commit on the \`main\` branch, where the two diverged - that is, "Commit 7".

You can verify that by using:

\`\`\`sh
git merge-base john_branch_2 paul_branch_2
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/merge_base_2.png" alt="'Commit 7' is the merge base" width="783" height="456" loading="lazy">
*"Commit 7" is the merge base*

Checkout the merge base so you can later apply the patches you will create:

\`\`\`sh
git checkout main
\`\`\`

Great, now Git should compute the diffs and generate the patches. You can observe the diffs directly:

\`\`\`sh
git diff main paul_branch_2
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/diff_main_paul_branch_2.png" alt="The output of " width="621" height="487" loading="lazy">
_The output of \`git diff main paul_branch_2\`_

Will applying this patch succeed? Well, no problem, Git has all the context lines in place.

Switch to the merge-base (which is "Commit 7", also referenced by \`main\`), and ask Git to apply this patch:

\`\`\`sh
git checkout main
git diff main paul_branch_2 > paul_branch_2.patch
git apply --index paul_branch_2.patch
\`\`\`

And this worked, no problem at all.

Now, compute the diff between John's new branch and the merge base. Notice that you haven't committed the applied changes, so \`john_branch_2\` still points at the same commit as before, "Commit 9":

\`\`\`sh
git diff main john_branch_2
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/diff_main_john_branch_2.png" alt="The output of " width="668" height="252" loading="lazy">
_The output of \`git diff main john_branch_2\`_

Will applying this diff work?

Well, indeed, yes. Notice that even though the line numbers have changed on the current version of the file, thanks to the context lines Git is able to locate where it needs to add these lines…

![](https://freecodecamp.org/news/content/images/2023/12/diff_main_john_branch_2_context.png" alt="Git can rely on the context lines" width="723" height="240" loading="lazy">
*Git can rely on the context lines*

Save this patch and apply it then:

\`\`\`sh
git diff main john_branch_2 > john_branch_2.patch
git apply --index john_branch_2.patch
\`\`\`

Observe the result file:

![](https://freecodecamp.org/news/content/images/2023/12/a_day_in_the_life_after_merge.png" alt="The result after applying Paul's patch" width="657" height="535" loading="lazy">
*The result after applying Paul's patch*

Cool, exactly what we wanted.

You can now create the tree and relevant commit:

\`\`\`sh
git write-tree
\`\`\`

Don't forget to specify both parents:

\`\`\`sh
git commit-tree <TREE-ID> -p paul_branch_2 -p john_branch_2 -m "Merging new changes"
\`\`\`

See how I used the branch names here? After all, they are just pointers to the commits we want.

Cool, look at the log from the new commit:

![](https://freecodecamp.org/news/content/images/2023/12/git_lol_merging_new_changes.png" alt=" after creating the merge commit" width="799" height="445" loading="lazy">
_\`git lol <SHA_OF_THE_MERGE_COMMIT>\` after creating the merge commit_

![](https://freecodecamp.org/news/content/images/2023/12/history_after_merging_new_changes_commit.png" alt="The history after creating the merge commit" width="1111" height="450" loading="lazy">
*The history after creating the merge commit*

Exactly what we wanted.

You can also let Git perform the job for you. You can checkout \`john_branch_2\`, which you haven't moved - so it still points to the same commit as it did before the merge. So all you need to do is run:

\`\`\`sh
git checkout john_branch_2
git merge paul_branch_2
\`\`\`

Observe the resulting history:

![](https://freecodecamp.org/news/content/images/2023/12/merge_branches_2.png" alt=" after letting Git perform the merge" width="810" height="473" loading="lazy">
*\`git lol\` after letting Git perform the merge*

![](https://freecodecamp.org/news/content/images/2023/12/history_after_merging_with_git.png" alt="A visualization of the history after letting Git perform the merge" width="1138" height="453" loading="lazy">
*A visualization of the history after letting Git perform the merge*

Just as before, you have a merge commit pointing to "Commit 8" and "Commit 9" as its parents. "Commit 9" is the first parent since you merged into it.

But this was still quite simple… John and Paul worked on the same file, but on very different parts. You could also directly apply Paul's changes to John's branch. If you go back to John's branch before the merge:

\`\`\`sh
git reset --hard HEAD~
\`\`\`

And now apply Paul's changes:

\`\`\`sh
git apply --index paul_branch_2.patch
\`\`\`

You will get the same result.

But what happens when the two branches include changes on the same files, in the same locations?

### heading-more-advanced-git-merge-cases">More Advanced Git Merge Cases

What would happen if John and Paul were to coordinate a new song, and work on it together?

In this case, John creates the first version of this song in the main branch:

\`\`\`sh
git checkout main
nano everyone.md
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/everyone_1.png" alt="The contents of  prior to the first commit" width="341" height="433" loading="lazy">
*The contents of \`everyone.md\` prior to the first commit*

By the way, this text is indeed taken from the version that John Lennon recorded for a demo in 1968. But this isn't a book about the Beatles. If you're curious about the process the Beatles underwent while writing this song, you can follow the links in the end of this chapter.

\`\`\`sh
git add everyone.md
git commit -m "Commit 10"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/history_commit_10.png" alt="Introducing 'Commit 10'" width="929" height="601" loading="lazy">
*Introducing "Commit 10"*

Now John and Paul split. Paul creates a new verse in the beginning:

\`\`\`sh
git checkout -b paul_branch_3
nano everyone.md
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/everyone_2.png" alt="Paul added a new verse in the beginning" width="354" height="280" loading="lazy">
*Paul added a new verse in the beginning*

Also, while talking to John, they decided to change the word "feet" to "foot", so Paul adds this change as well.

And Paul adds and commits his changes to the repo:

\`\`\`sh
git add everyone.md
git commit -m "Commit 11"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_11.png" alt="The history after introducing 'Commit 11'" width="934" height="621" loading="lazy">
*The history after introducing "Commit 11"*

You can observe Paul's changes, by comparing this branch's state to the state of branch \`main\`:

\`\`\`sh
git diff main
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main.png" alt="The output of  from Paul's branch" width="478" height="482" loading="lazy">
*The output of \`git diff main\` from Paul's branch*

Store this diff in a patch file:

\`\`\`sh
git diff main > paul_3.patch
\`\`\`

Now back to \`main\`…

\`\`\`sh
git checkout main
\`\`\`

John decides to make another change, in his own new branch:

\`\`\`sh
git checkout -b john_branch_3
\`\`\`

And he replaces the line "Everyone had the boot in" with the line "Everyone had a wet dream". In addition, John changed the word "feet" to "foot", following his talk with Paul.

Observe the diff:

\`\`\`sh
git diff main
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main_2.png" alt="The output of  from John's branch" width="471" height="406" loading="lazy">
*The output of \`git diff main\` from John's branch*

Store this output as well:

\`\`\`sh
git diff main > john_3.patch
\`\`\`

Now, stage and commit:

\`\`\`sh
git add everyone.md
git commit -m "Commit 12"
\`\`\`

This should be your current history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_12.png" alt="The history after introducing 'Commit 12'" width="942" height="615" loading="lazy">
*The history after introducing "Commit 12"*

Note that I deleted \`john_branch_2\` and \`paul_branch_2\` for simplicity. Of course, you can erase them from Git by using \`git branch -D <branch_name>\`. As a result, these branch names will not appear in the output of \`git log\` or other similar commands.

This also applies to commits that are no longer reachable from any named reference, such as "Commit 8" or "Commit 9". Since they are not reachable from any named reference via the parents' chain, they will not be included in the output of commands such as \`git log\`.

Back to our story - Paul told John he had added a new verse, so John would like to merge Paul's changes.

Can John simply apply Paul's patch?

Consider the patch again:

\`\`\`sh
git diff main paul_branch_3
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main-1.png" alt="The output of " width="478" height="482" loading="lazy">
_The output of \`git diff main paul_branch_3\`_

As you can see, this diff relies on the line "Everyone had the boot in", but this line no longer exists on John's branch. As a result, you could expect applying the patch to fail. Go on, give it a try:

\`\`\`sh
git apply paul_3.patch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_apply_paul_3.png" alt="Applying the patch failed" width="692" height="89" loading="lazy">
*Applying the patch failed*

Indeed, you can see that it failed.

But should it really fail?

As explained earlier, \`git merge\` uses a 3-way merge algorithm, and this can come in handy here. What would be the first step of this algorithm?

Well, first, Git would find the merge base - that is, the common ancestor of Paul's branch and John's branch. Consider the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_12-1.png" alt="The history after introducing 'Commit 12'" width="942" height="615" loading="lazy">
*The history after introducing "Commit 12"*

So the common ancestor of "Commit 11" and "Commit 12" is "Commit 10". You can verify this by running the command:

\`\`\`sh
git merge-base john_branch_3 paul_branch_3
\`\`\`

Now we can take the patches we generated from the diffs on both branches, and apply them to \`main\`. Would that work?

First, try to apply John's patch, and then Paul's patch.

Consider the diff:

\`\`\`sh
git diff main john_branch_3
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main_2-1.png" alt="The output of " width="471" height="406" loading="lazy">
_The output of \`git diff main john_branch_3\`_

We can store it in a file:

\`\`\`sh
git diff main john_branch_3 > john_3.patch
\`\`\`

And apply this patch on main:

\`\`\`sh
git checkout main
git apply john_3.patch
\`\`\`

Let's consider the result:

\`\`\`sh
nano everyone.md
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/everyone_3.png" alt="The contents of  after applying John's patch" width="337" height="425" loading="lazy">
*The contents of \`everyone.md\` after applying John's patch*

The line changed as expected. Nice 😎

Now, can Git apply Paul's patch? To remind you, this is the patch:

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main-2.png" alt="The contents of Paul's patch" width="478" height="482" loading="lazy">
*The contents of Paul's patch*

Well, Git cannot apply this patch, because this patch assumes that the line "Everyone had the boot in" exists. Trying to apply it is liable to fail:

\`\`\`sh
git apply -v paul_3.branch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_apply_v_paul_3.png" alt="Applying Paul's patch failed" width="576" height="246" loading="lazy">
*Applying Paul's patch failed*

What you tried to do now, applying Paul's patch on the \`main\` branch after applying John's patch, is the same as being on \`john_branch_3\`, and attempting to apply the patch. That is, running:

\`\`\`sh
git apply paul_3.patch
\`\`\`

What would happen if we tried the other way around?

First, clean up the state:

\`\`\`sh
git reset --hard
\`\`\`

And start from Paul's branch:

\`\`\`sh
git checkout paul_branch_3
\`\`\`

Can we apply John's patch? As a reminder, this is the status of \`everyone.md\` on this branch:

![](https://freecodecamp.org/news/content/images/2023/12/everyone_2-1.png" alt="The contents of  on " width="354" height="280" loading="lazy">
_The contents of \`everyone.md\` on \`paul_branch_3\`_

And this is John's patch:

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main_2-2.png" alt="The contents of John's patch" width="471" height="406" loading="lazy">
*The contents of John's patch*

Would applying John's patch work?

Try to answer yourself before reading on.

You can try:

\`\`\`sh
git apply john_3.patch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_apply_3_john_3.png" alt="Git fails to apply John's patch" width="661" height="89" loading="lazy">
*Git fails to apply John's patch*

Well, no! Again, if you are not sure what happened, you can always ask \`git apply\` to be a bit more verbose:

\`\`\`sh
git apply -v john_3.patch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_apply_v_john_3.png" alt="You can get more information by using the  flag" width="671" height="527" loading="lazy">
*You can get more information by using the \`-v\` flag*

Git is looking for "Everyone put the feet down", but Paul has already changed this line so it now consists of the word "foot" instead of "feet". As a result, applying this patch fails.

Notice that changing the number of context lines here (that is, using \`git apply\` with the \`-C\` flag, as discussed in the <a href="#chapter-6-diffs-and-patches">previous chapter</a>) is irrelevant - Git is unable to locate the actual line that the patch is trying to erase.

But actually, Git can make this work, if you just add a flag to apply, telling it to perform a 3-way merge under the hood:

\`\`\`sh
git apply -3 john_3.patch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_apply_3_john_3-1.png" alt="Applying with  flag succeeds" width="661" height="89" loading="lazy">
*Applying with \`-3\` flag succeeds*

And consider the result:

![](https://freecodecamp.org/news/content/images/2023/12/everyone_4.png" alt="The contents of  after the merge" width="557" height="526" loading="lazy">
*The contents of \`everyone.md\` after the merge*

Exactly what we wanted! You have Paul's verse, and both of John's changes!

So, how was Git able to accomplish that?

Well, as I mentioned, Git really did a **3-way merge**, and with this example, it will be a good time to dive into what this actually means.

### heading-how-gits-3-way-merge-algorithm-works">How Git's 3-way Merge Algorithm Works

Get back to the state before applying this patch:

\`\`\`sh
git reset --hard
\`\`\`

You have now three versions: the merge base, which is "Commit 10", Paul's branch, and John's branch. In general terms, we can say these are the \`merge base\`, \`commit A\` and \`commit B\`. Notice that the \`merge base\` is by definition an ancestor of both \`commit A\` and \`commit B\`.

To perform the merge, Git looks at the diff between the three different versions of the file in question on these three revisions. In your case, it's the file everyone.md, and the revisions are "Commit 10", Paul's branch - that is, "Commit 11", and John's branch, that is, "Commit 12".

Git makes the merging decision based on the status of each line in each of these versions.

![](https://freecodecamp.org/news/content/images/2023/12/3_versions.png" alt="The three versions considered for the 3-way merge" width="1285" height="827" loading="lazy">
*The three versions considered for the 3-way merge*

In case not all three versions match, that is a conflict. Git can resolve many of these conflicts automatically, as we will now see.

Let's consider specific lines.

The first lines here exist only on Paul's branch:

![](https://freecodecamp.org/news/content/images/2023/12/3_versions_1.png" alt="Lines that appear on Paul's branch only" width="1284" height="827" loading="lazy">
*Lines that appear on Paul's branch only*

This means that the state of John's branch is equal to the state of the merge base. So the 3-way merge goes with Paul's version.

In general, if the state of the merge base is the same as \`A\`, the algorithm goes with \`B\`. The reason is that since the merge base is the ancestor of both \`A\` and \`B\`, Git assumes that this line hasn't changed in \`A\`, and it *has* changed in \`B\`, which is the most recent version for that line, and should thus be taken into account.

![](https://freecodecamp.org/news/content/images/2023/12/3_way_merge_1.png" alt="If the state of the merge base is the same as , and this state is different from , the algorithm goes with " width="540" height="144" loading="lazy">
*If the state of the merge base is the same as \`A\`, and this state is different from \`B\`, the algorithm goes with \`B\`*

Next, you can see lines where all three versions agree - they exist on the merge base, \`A\` and \`B\`, with equal data.

![](https://freecodecamp.org/news/content/images/2023/12/3_versions_2.png" alt="Lines where all three versions agree" width="1284" height="827" loading="lazy">
*Lines where all three versions agree*

In this case the algorithm has a trivial choice - just take that version.

![](https://freecodecamp.org/news/content/images/2023/12/3_way_merge_2.png" alt="In case all three versions agree, the algorithm goes with that single version" width="532" height="268" loading="lazy">
*In case all three versions agree, the algorithm goes with that single version*

In a previous example, we saw that if the merge base and \`A\` agree, and \`B\`'s version is different, the algorithm picks \`B\`. This works in the other direction too - for example, here you have a line that exists on John's branch, different than that on the merge base and Paul's branch.

![](https://freecodecamp.org/news/content/images/2023/12/3_versions_3.png" alt="A line where Paul's version matches the merge base's version, and John has a different version" width="1284" height="827" loading="lazy">
*A line where Paul's version matches the merge base's version, and John has a different version*

Hence, John's version is chosen.

![](https://freecodecamp.org/news/content/images/2023/12/3_way_merge_3.png" alt="If the state of the merge base is the same as , and this state is different from , the algorithm goes with " width="530" height="270" loading="lazy">
*If the state of the merge base is the same as \`B\`, and this state is different from \`A\`, the algorithm goes with \`A\`*

Now consider another case, where both \`A\` and \`B\` agree on a line, but the value they agree upon is different from the merge base: both John and Paul agreed to change the line "Everyone put their feet down" to "Everyone put their foot down":

![](https://freecodecamp.org/news/content/images/2023/12/3_versions_4.png" alt="A line where Paul's version matches John's version; yet the merge base has a different version" width="1284" height="827" loading="lazy">
*A line where Paul's version matches John's version, yet the merge base has a different version*

In this case, the algorithm picks the version on both \`A\` and \`B\`.

![](https://freecodecamp.org/news/content/images/2023/12/3_way_merge_4.png" alt="In case A and B agree on a version which is different from the merge base's version, the algorithm picks the version on both A and B" width="577" height="337" loading="lazy">
*In case \`A\` and \`B\` agree on a version which is different from the merge base's version, the algorithm picks the version on both \`A\` and \`B\`*

Notice this is not a democratic vote. In the previous case, the algorithm picked the minority version, as it resembled the newest version of this line. In this case, it happens to pick the majority - but only because \`A\` and \`B\` are the revisions that agree on the new version.

The same would happen if we used \`git merge\`:

\`\`\`sh
git merge john_branch_3
\`\`\`

Without specifying any flags, \`git merge\` will default to using a \`3-way merge\`.

![](https://freecodecamp.org/news/content/images/2023/12/git_merge_default.png" alt="By default,  uses a 3-way merge algorithm" width="571" height="100" loading="lazy">
*By default, \`git merge\` uses a 3-way merge algorithm*

The status of \`everyone.md\` after running \`git merge john_branch\` would be the same as the result you achieved by applying the patches with \`git apply -3\`.

If you consider the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_merge.png" alt="Git's history after performing the merge" width="1298" height="474" loading="lazy">
*Git's history after performing the merge*

You will see that the merge commit indeed has two parents: the first is "Commit 11", that is, where \`paul_branch_3\` pointed to before the merge. The second is "Commit 12", where \`john_branch_3\` pointed to, and still points to now.

What will happen if you now merge from \`main\`? That is, switch to the \`main\` branch, which is pointing to "Commit 10":

\`\`\`sh
git checkout main
\`\`\`

And then merge Paul's branch?

\`\`\`sh
git merge paul_branch_3
\`\`\`

Indeed, we get a fast-forward merge - as before running this command, \`main\` was an ancestor of \`paul_branch_3\`.

![](https://freecodecamp.org/news/content/images/2023/12/fast_forward_merge.png" alt="A fast-forward merge" width="695" height="483" loading="lazy">
*A fast-forward merge*

So, this is a 3-way merge. In general, if all versions agree on a line, then this line is used. If \`A\` and the merge base match, and \`B\` has another version, \`B\` is taken. In the opposite case, where the merge base and \`B\` match, the \`A\` version is selected. If \`A\` and \`B\` match, this version is taken, whether the merge base agrees or not.

This description leaves one open question though: What happens in cases where all three versions disagree?

Well, that's a conflict that Git does not resolve automatically. In these cases, Git calls for a human's help.

### heading-how-to-resolve-merge-conflicts">How to Resolve Merge Conflicts

By following so far, you should understand the basics of the command \`git merge\`, and how Git can automatically resolve some conflicts. You also understand what cases are automatically resolved.

Next, let's consider a more advanced case.

Say Paul and John keep working on this song.

Paul creates a new branch:

\`\`\`sh
git checkout -b paul_branch_4
\`\`\`

And he decides to add some "Yeah"s to the song, so he changes this verse as follows:

![](https://freecodecamp.org/news/content/images/2023/12/paul_branch_4_additions.png" alt="Paul's additions" width="431" height="97" loading="lazy">
*Paul's additions*

So Paul stages and commits these changes:

\`\`\`sh
git add everyone.md
git commit -m "Commit 13"
\`\`\`

Paul also creates another song, \`let_it_be.md\` and adds it to the repo:

\`\`\`sh
git add let_it_be.md
git commit -m "Commit 14"
\`\`\`

This is the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_14.png" alt="The history after Paul introduced 'Commit 14'" width="937" height="511" loading="lazy">
*The history after Paul introduced "Commit 14"*

Going back to \`main\`:

\`\`\`sh
git checkout main
\`\`\`

John also branches out:

\`\`\`sh
git checkout -b john_branch_4
\`\`\`

And John also works on the song "Everyone had a hard year", later to be called "I've got a feeling" (again, this is not a book about the Beatles, so I won't elaborate on it here. See the additional links if you are curious).

John decides to change all occurrences of "Everyone" to "Everybody":

![](https://freecodecamp.org/news/content/images/2023/12/everyone_5.png" alt="John changes all occurrences of 'Everyone' to 'Everybody'" width="499" height="474" loading="lazy">
*John changes all occurrences of "Everyone" to "Everybody"*

He stages and commits this song to the repo:

\`\`\`sh
git add everyone.md
git commit -m "Commit 15"
\`\`\`

Nice. Now John also creates another song, \`across_the_universe.md\`. He adds it to the repo as well:

\`\`\`sh
git add across_the_universe.md
git commit -m "Commit 16"
\`\`\`

Observe the history again:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_16.png" alt="The history after John introduced 'Commit 16'" width="870" height="502" loading="lazy">
*The history after John introduced "Commit 16"*

You can see that the history diverges from \`main\`, to two different branches - \`paul_branch_4\`, and \`john_branch_4\`.

At this point, John would like to merge the changes introduced by Paul.

What is going to happen here?

Remember the changes introduced by Paul:

\`\`\`sh
git diff main paul_branch_4
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main_paul_branch_4.png" alt="The output of " width="427" height="536" loading="lazy">
_The output of \`git diff main paul_branch_4\`_

What do you think? Will merge work?

Try it out:

\`\`\`sh
git merge paul_branch_4
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/merge_conflict.png" alt="A merge conflict" width="619" height="99" loading="lazy">
*A merge conflict*

We have a conflict!

Git cannot merge these branches on its own. You can get an overview of the merge state, using \`git status\`:

![](https://freecodecamp.org/news/content/images/2023/12/git_status_after_merge_failed.png" alt="The output of  right after the merge operation" width="619" height="337" loading="lazy">
*The output of \`git status\` right after the merge operation*

The changes that Git had no problem resolving are staged for commit. And there is a separate section for "unmerged paths" - these are files with conflicts that Git could not resolve on its own.

It's time to understand why and when these conflicts happen, how to resolve them, and also how Git handles them under the hood.

Alright then! I hope you are at least as excited as I am. 😇

Let's recall what we know about 3-way merges:

First, Git will look for the merge base - the common ancestor of \`john_branch_4\` and \`paul_branch_4\`. Which commit would that be?

It would be the tip of the \`main\` branch, the commit in which we merged \`john_branch_3\` into \`paul_branch_3\`.

Again, if you are not sure, you can verify that by running:

\`\`\`sh
git merge-base john_branch_4 paul_branch_4
\`\`\`

And at the current state, \`git status\` knows which files are staged and which aren't.

Consider the process for each *file*, which is the same as the 3-way merge algorithm we considered per line, but on a file's level:

\`across_the_universe.md\` exists on John's branch, but doesn't exist on the merge base or on Paul's branch. So Git chooses to include this file. Since you are already on John's branch and this file is included in the tip of this branch, it is not mentioned by \`git status\`.

\`let_it_be.md\` exists on Paul's branch, but doesn't exist on the merge base or John's branch. So \`git merge\` "chooses" to include it.

What about \`everyone.md\`? Well, here we have three different states of this file: its state on the merge base, its state on John's branch, and its state on Paul's branch. While performing a merge, Git stores all of these versions on the index.

Let's observe that by looking directly at the index with the command \`git ls-files\`:

\`\`\`sh
git ls-files -s --abbrev
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/ls_files_abbrev.png" alt="The output of  after the merge operation" width="850" height="286" loading="lazy">
*The output of \`git ls-files -s --abbrev\` after the merge operation*

You can see that \`everyone.md\` has three different entries. Git assigns each version a number that represents the "stage" of the file, and this is a distinct property of an index entry, alongside the file's name and the mode bits.

When there is no merge conflict regarding a file, its "stage" is \`0\`. This is indeed the state for \`across_the_universe.md\`, and for \`let_it_be.md\`.

On a conflict's state, we have:

- Stage \`1\` - which is the merge base.
- Stage \`2\` - which is "your" version. That is, the version of the file on the branch you are merging *into*. In our example, this would be \`john_branch_4\`.
- Stage \`3\` - which is "their" version, also called the \`MERGE_HEAD\`. That is, the version on the branch you are merging (into the current branch). In our example, that is \`paul_branch_4\`.

To observe the file's contents in a specific stage, you can use a command I introduced in a previous post, git cat-file, and provide the blob's SHA:

\`\`\`sh
git cat-file -p <BLOB_SHA_FOR_STAGE_<span class="token file-descriptor important">2>
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/cat_file.png" alt="Using -file to present the content of the file on John's branch, right from its state in the index" width="653" height="551" loading="lazy">
*Using \`git cat-file\` to present the content of the file on John's branch, right from its state in the index*

And indeed, this is the content we expected - from John's branch, where the lines start with "Everybody" rather than "Everyone".

A nice trick that allows you to see the content quickly without providing the blob's SHA-1 value, is by using \`git show\`, like so:

\`\`\`sh
git show :<STAGE>:everyone.md
\`\`\`

For example, to get the content of the same version as with git cat-file -p , you can write \`git show :2:everyone.md\`.

Git records the three states of the three commits into the index in this way at the start of the merge. It then follows the three-way merge algorithm to quickly resolve the simple cases:

In case all three stages match, then the selection is trivial.

If one side made a change while the other did nothing - that is, stage \`1\` matches stage \`2\`- then we choose stage \`3\`, or vice versa. That's exactly what happened with \`let_it_be.md\` and \`across_the_universe.md\`.

In case of a deletion on the incoming branch, for example, and given there were no changes on the current branch, then we would see that stage \`1\` matches stage \`2\`, but there is no stage \`3\`. In this case, \`git merge\` removes the file for the merged version.

What's really cool here is that for matching, Git doesn't need the actual files. Rather, it can rely on the SHA-1 values of the corresponding blobs. This way, Git can easily detect the state a file is in.

![](https://freecodecamp.org/news/content/images/2023/12/3_way_merge_4-1.png" alt="Git performs the same 3-way merge algorithm on a files level" width="577" height="337" loading="lazy">
*Git performs the same 3-way merge algorithm on a files level*

For \`everyone.md\` you have this special case - where stage \`1\`, stage \`2\` and stage \`3\` are all different from one another. That is, they have different blob SHAs. It's time to go deeper and understand the merge conflict. 😊

One way to do that would be to simply use \`git diff\`. In a <a href="#chapter-6-diffs-and-patches">previous chapter</a>, we examined git diff in detail, and saw that it shows the differences between various combinations of the working tree, index or commits.

But \`git diff\` also has a special mode for helping with merge conflicts:

\`\`\`sh
git diff
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_conflict.png" alt="The output of  during a merge conflict" width="623" height="639" loading="lazy">
*The output of \`git diff\` during a merge conflict*

This output may be confusing at first, but once you get used to it, it's pretty clear. Let's start by understanding it, and then see how you can resolve conflicts with other, more visual tools.

The conflicted section is separated by the "equal" marks (\`====\`), and marked with the corresponding branches. In this context, "ours" is the current branch. In this example, that would be \`john_branch_4\`, the branch that \`HEAD\` was pointing to when we initiated the \`git merge\` command. "Theirs" is the \`MERGE_HEAD\`, the branch that we are merging in - in this case, \`paul_branch_4\`.

So \`git diff\` without any special flags shows changes between the working tree and the index - which in this case are the conflicts yet to be resolved. The output doesn't include staged changes, which is very convenient for resolving the conflict.

Time to resolve this manually. Fun!

So, why is this a conflict?

For Git, Paul and John made different changes to the same line, for a few lines. John changed it to one thing, and Paul changed it to another thing. Git cannot decide which one is correct.

This is not the case for the last lines, like the line that used to be "Everyone had a hard year" on the merge base. Paul hasn't changed this line, or the lines surrounding it, so its version on paul_branch_4, or "theirs" in our case, agrees with the \`merge_base\`. Yet John's version, "ours", is different. Thus \`git merge\` can easily decide to take this version.

But what about the conflicted lines?

In this case, I know what I want, and that is actually a combination of these lines. I want the lines to start with "Everybody", following John's change, but also to include Paul's "yeah"s. So go ahead and create the desired version by editing everyone.md:

\`\`\`sh
nano everyone.md
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/everyone_6.png" alt="Editing the file manually to achieve the desired state" width="582" height="494" loading="lazy">
*Editing the file manually to achieve the desired state*

To compare the result file to what you had in the branch prior to the merge, you can run:

\`\`\`sh
git diff --ours
\`\`\`

Similarly, if you wish to see how the result of the merge differs from the branch you merged into our branch, you can run:

\`\`\`sh
git diff --theirs
\`\`\`

You can even see how the result is different from both sides using:

\`\`\`sh
git diff --base
\`\`\`

Now you can stage the fixed version:

\`\`\`sh
git add everyone.md
\`\`\`

After staging, if you look at \`git status\`, you will see no conflicts:

![](https://freecodecamp.org/news/content/images/2023/12/git_status_after_manual_fix.png" alt="After staging the fixed version , there are no conflicts" width="673" height="187" loading="lazy">
*After staging the fixed version \`everyone.md\`, there are no conflicts*

You can now simply use \`git commit\`, and Git will present you with a commit message containing details about the merge. You can modify it if you like, or leave it as is. Regardless of the commit message, Git will create a "merge commit" - that is, a commit with more than one parent.

To validate that, consider the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_merge_2.png" alt="The history after completing the merge operation" width="1685" height="526" loading="lazy">
*The history after completing the merge operation*

\`john_branch_4\` now points to the new merge commit. The incoming branch, "theirs", in this case, \`paul_branch_4\`, stays where it was.

### heading-how-to-use-vs-code-to-resolve-conflicts">How to Use VS Code to Resolve Conflicts

You will now see how to resolve the same conflict using a graphical tool. For this example, I use VS Code, which is a free and popular code editor. There are many other tools, but the process is similar, so I will just show VS Code as an example.

First, get back to the state before the merge:

\`\`\`sh
git reset --hard HEAD~
\`\`\`

And try to merge again:

\`\`\`sh
git merge paul_branch_4
\`\`\`

You should be back at the same status:

![](https://freecodecamp.org/news/content/images/2023/12/git_status_after_merge_failed-1.png" alt="Back at the conflicting status" width="619" height="337" loading="lazy">
*Back at the conflicting status*

Let's see how this appears on VS Code:

![](https://freecodecamp.org/news/content/images/2023/12/vs_code_1.png" alt="Conflict resolution with VS Code" width="1750" height="973" loading="lazy">
*Conflict resolution with VS Code*

VS Code marks the different versions with "Current Change" - which is the "ours" version, the current \`HEAD\`, and "Incoming Change" for the branch we are merging into the active branch. You can accept one of the changes (or both) by clicking on one of the options.

If you clicked on \`Resolve in Merge editor\`, you'll get a more visual view of the state. VS Code shows the status of each line:

![](https://freecodecamp.org/news/content/images/2023/12/vs_code_2-1.png" alt="VS Code's Merge Editor" width="1337" height="917" loading="lazy">
*VS Code's Merge Editor*

If you look closely, you will see that VS Code shows changes within words - for example, showing that "Every**one**" was changed to "Every**body**", marking the changed parts.

You can accept either version, or you can accept a combination. In this case, if you click on "Accept Combination", you get this result:

![](https://freecodecamp.org/news/content/images/2023/12/vs_code_3.png" alt="VS Code's Merge Editor after clicking on 'Accept Combination'" width="1244" height="895" loading="lazy">
*VS Code's Merge Editor after clicking on "Accept Combination"*

VS Code did a really good job! The same three way merge algorithm was implemented here and used on the *word* level rather than the *line* level. So VS Code was able to actually resolve this conflict in a rather impressive way. Of course, you can modify VS Code's suggestion, but it provided a *very* good start.

### heading-one-more-powerful-tool">One More Powerful Tool

Well, this was the first time in this book that I've used a tool with a graphical user interface. Indeed, graphical interfaces can be convenient to understand what's going on when you are resolving merge conflicts.

However, like in many other cases, when we need to really understand what's going on, the command line becomes handy. So, let's get back to the command line and learn a tool that can come in handy in more complicated cases.

Again, go back to the state before the merge:

\`\`\`sh
git reset --hard HEAD~
\`\`\`

And merge:

\`\`\`sh
git merge paul_branch_4
\`\`\`

And say, you are not exactly sure what happened. Why is there a conflict? One very useful command would be:

\`\`\`sh
git log -p --merge
\`\`\`

As a reminder, \`git log\` shows the history of commits that are reachable from \`HEAD\`. Adding \`-p\` tells \`git log\` to show the commits along with the diffs they introduced. The \`--merge\` switch makes the command show all commits containing changes relevant to any unmerged files, on either branch, together with their diffs.

This can help you identify the changes in history that led to the conflicts. So in this example, you'd see:

![](https://freecodecamp.org/news/content/images/2023/12/git_log_p_merge.png" alt="The output of " width="551" height="645" loading="lazy">
*The output of \`git log -p --merge\`*

The first commit we see is "Commit 15", as in this commit John modified everyone.md, a file that still has conflicts. Next, Git shows "Commit 13", where Paul changed \`everyone.md\`:

![](https://freecodecamp.org/news/content/images/2023/12/git_log_p_merge_2.png" alt="The output of  - continued" width="524" height="635" loading="lazy">
*The output of \`git log -p --merge\` - continued*

Notice that \`git log --merge\` did not mention previous commits that changed \`everyone.md\` before "Commit 13", as they didn't affect the current conflict.

This way, \`git log\` tells you all you need to know to understand the process that got you into the current conflicting state. Cool! 😎

Using the command line, you can also ask Git to take only one side of the changes - either "ours" or "theirs", even for a specific file.

You can also instruct Git to take some parts of the diffs of one file and another from another file. I will provide links that describe how to do that in <a href="#diffs-and-patches">the additional resources of this chapter in the appendix</a>.

For the most part, you can accomplish that pretty easily, either manually or from the UI of your favorite IDE.

For now, it's time for a recap.

### heading-recap-understanding-git-merge">Recap - Understanding Git Merge

In this chapter, you got an extensive overview of merging with Git. You learned that merging is the process of combining the recent changes from several branches into a single new commit. The new commit has two parents - those commits which had been the tips of the branches that were merged.

We considered a simple, fast-forward merge, which is possible when one branch diverged from the base branch, and then just added commits on top of the base branch.

We then considered three-way merges, and explained the three-stage process:

- First, Git locates the merge base. As a reminder, this is the first commit that is reachable from both branches.
- Second, Git calculates two diffs - one diff from the merge base to the *first* branch, and another diff from the merge base to the *second* branch. Git generates patches based on those diffs.
- Third and last, Git applies both patches to the merge base using a 3-way merge algorithm. The result is the state of the new merge commit.

We dove deeper into the process of a 3-way merge, whether at a file level or a hunk level. We considered when Git is able to rely on a 3-way merge to automatically resolve conflicts, and when it just can't.

You saw the output of \`git diff\` when we are in a conflicting state, and how to resolve conflicts either manually or with VS Code.

There is much more to be said about merges - different merge strategies, recursive merges, and so on. Yet, I believe this chapter covered everything needed so you have a robust understanding of what merge is, and what happens under the hood in the vast majority of cases.

### heading-beatles-related-resources">Beatles-Related Resources

- <a href="https://the-paulmccartney-project.com/song/ive-got-a-feeling/">https://the-paulmccartney-project.com/song/ive-got-a-feeling/</a>
- <a href="https://cheatsheet.com/entertainment/did-john-lennon-or-paul-mccartney-write-the-classic-a-day-in-the-life.html/">https://cheatsheet.com/entertainment/did-john-lennon-or-paul-mccartney-write-the-classic-a-day-in-the-life.html/</a>
- <a href="http://lifeofthebeatles.blogspot.com/2009/06/ive-got-feeling-lyrics.html">http://lifeofthebeatles.blogspot.com/2009/06/ive-got-feeling-lyrics.html</a>

---

## ---

## heading-chapter-8-understanding-git-rebase">Chapter 8 - Understanding Git Rebase

One of the most powerful tools a developer can have in their toolbox is \`git rebase\`. Yet it is notorious for being complex and misunderstood.

The truth is, if you understand what it actually does, \`git rebase\` is a very elegant, and straightforward tool to achieve so many different things in Git.

In the previous chapters in this part, you learned what Git diffs are, what a merge is, and how Git resolves merge conflicts. In this chapter, you will understand what Git rebase is, why it's different from merge, and how to rebase with confidence.

### heading-short-recap-what-is-git-merge">Short Recap - What is Git Merge?

Under the hood, \`git rebase\` and \`git merge\` are very, very different things. Then why do people compare them all the time?

The reason is their usage. When working with Git, we usually work in different branches and introduce changes to those branches.

In the previous chapter, we considered the example where John and Paul (of the Beatles) were co-authoring a new song. They started from the \`main\` branch, and then each diverged, modified the lyrics, and committed their changes.

Then, the two wanted to *integrate* their changes, which is something that happens very frequently when working with Git.

![](https://freecodecamp.org/news/content/images/2023/12/diverging_history_commit_9.png" alt="A diverging history -  and  diverged from " width="907" height="341" loading="lazy">
_A diverging history - \`paul_branch\` and \`john_branch\` diverged from \`main\`_

There are two main ways to integrate changes introduced in different branches in Git, or in other words, different commits and commit histories. These are merge and rebase.

In the previous chapter, we got to know \`git merge\` pretty well. We saw that when performing a merge, we create a **merge commit** - where the contents of this commit are a combination of the two branches, and it also has two parents, one in each branch.

So, say you are on the branch \`john_branch\` (assuming the history depicted in the drawing above), and you run \`git merge paul_branch\`. You will get to this state - where on \`john_branch\`, there is a new commit with two parents. The first one will be the commit on the \`john_branch\` branch where \`HEAD\` was pointing to a state before performing the merge - in this case, "Commit 6". The second will be the commit pointed to by \`paul_branch\`, "Commit 9".

![](https://freecodecamp.org/news/content/images/2023/12/git_merge_paul_branch.png" alt="The result of running : a new Merge Commit with two parents" width="1042" height="326" loading="lazy">
_The result of running \`git merge paul_branch\`: a new Merge Commit with two parents_

Look again at the history graph: you created a **diverged** history. You can actually see where it branched and where it merged again.

So when using \`git merge\`, you do not rewrite history - but rather, you add a commit to the existing history. And specifically, a commit that creates a diverged history.

### heading-how-is-git-rebase-different-than-git-merge">How is \`git rebase\` Different than \`git merge\`?

When using \`git rebase\`, something different happens.

Let's start with the big picture: if you are on \`paul_branch\`, and use \`git rebase john_branch\`, Git goes to the common ancestor of John's branch and Paul's branch. Then it takes the patches introduced in the commits on Paul's branch, and applies those changes to John's branch.

So here, you use \`rebase\` to take the changes that were committed on one branch - Paul's branch - and replay them on a different branch, \`john_branch\`.

![](https://freecodecamp.org/news/content/images/2023/12/git_rebase_john_branch.png" alt="The result of running : the commits on  were 'replayed' on top of " width="1154" height="336" loading="lazy">
_The result of running \`git rebase john_branch\`: the commits on \`paul_branch\` were "replayed" on top of \`john_branch\`_

Wait, what does that mean?

We will now take this bit by bit to make sure you fully understand what's happening under the hood 😎

### heading-cherry-pick-as-a-basis-for-rebase">\`cherry-pick\` as a Basis for Rebase

It is useful to think of rebase as performing \`git cherry-pick\` - a command that takes a commit, computes the patch this commit introduces by computing the difference between the parent's commit and the commit itself, and then cherry-pick "replays" this difference.

Let's do this manually.

If we look at the difference introduced by "Commit 5" by performing \`git diff main <SHA_OF_COMMIT_5>\`:

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main_commit_5.png" alt="Running  to observe the patch introduced by 'Commit 5'" width="791" height="362" loading="lazy">
*Running \`git diff\` to observe the patch introduced by "Commit 5"*

As always, you are encouraged to run the commands yourself while reading this chapter. Unless noted otherwise, I will use the following repository:

<a href="https://github.com/Omerr/rebase_playground.git">https://github.com/Omerr/rebase_playground.git</a>

I recommend you clone it locally and have the same starting point I am using for this chapter.

You can see that in this commit, John started working on a song called "Lucy in the Sky with Diamonds":

![](https://freecodecamp.org/news/content/images/2023/12/git_diff_main_commit_5_output.png" alt="The output of  - the patch introduced by 'Commit 5'" width="1189" height="786" loading="lazy">
*The output of \`git diff\` - the patch introduced by "Commit 5"*

As a reminder, you can also use the command \`git show\` to get the same output:

\`\`\`sh
git show <SHA_OF_COMMIT_<span class="token file-descriptor important">5>
\`\`\`

Now, if you \`cherry-pick\` this commit, you will introduce *this change* specifically, on the active branch. Switch to \`main\` first:

\`\`\`sh
git checkout main (or git switch main)
\`\`\`

And create another branch:

\`\`\`sh
git checkout -b my_branch (or git switch -c my_branch)
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/create_my_branch.png" alt="Creating  that branches from " width="801" height="493" loading="lazy">
_Creating \`my_branch\` that branches from \`main\`_

Next, \`cherry-pick\` "Commit 5":

\`\`\`sh
git cherry-pick <SHA_OF_COMMIT_<span class="token file-descriptor important">5>
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/cherry_pick_commit_5.png" alt="Using  to apply the changes introduced in 'Commit 5' onto " width="801" height="685" loading="lazy">
*Using \`cherry-pick\` to apply the changes introduced in "Commit 5" onto \`main\`*

Consider the log (output of \`git lol\`):

![](https://freecodecamp.org/news/content/images/2023/12/git_lol_commit_5.png" alt="The output of " width="1055" height="191" loading="lazy">
*The output of \`git lol\`*

It seems like you *copy-pasted* "Commit 5". Remember that even though it has the same commit message, and introduces the same changes, and even points to the same tree object as the original "Commit 5" in this case - it is still a different commit object, as it was created with a different timestamp.

Looking at the changes, using \`git show HEAD\`:

![](https://freecodecamp.org/news/content/images/2023/12/git_show_HEAD-1.png" alt="The output of " width="862" height="643" loading="lazy">
*The output of \`git show HEAD\`*

They are the same as "Commit 5"'s.

And of course, if you look at the file (say, by using \`nano lucy_in_the_sky_with_diamonds.md\`), it will be in the same state as it has been after the original "Commit 5".

Cool! 😎

You can now remove the new branch so it doesn't appear on your history every time:

\`\`\`sh
git checkout main
git branch -D my_branch
\`\`\`

### heading-beyond-cherry-pick-how-to-use-git-rebase">Beyond \`cherry-pick\` - How to Use \`git rebase\`

You can view \`git rebase\` as a way to perform multiple \`cherry-pick\`s one after the other - that is, to "replay" multiple commits. This is not the only thing you can do with rebase, but it's a good starting point for our explanation.

It's time to play with \`git rebase\`!

Before, you merged \`paul_branch\` into \`john_branch\`. What would happen if you *rebased* \`paul_branch\` on top of \`john_branch\`? You would get a very different history.

In essence, it would seem as if we took the changes introduced in the commits on \`paul_branch\`, and replayed them on \`john_branch\`. The result would be a linear history.

To understand the process, I will provide the high level view, and then dive deeper into each step. The process of rebasing one branch on top of another branch is as follows:

<ol>
- Find the common ancestor.
- Identify the commits to be "replayed".
- For every commit \`X\`, compute \`diff(parent(X), X)\`, and store it as a \`patch(X)\`.
- Move \`HEAD\` to the new base.
- Apply the generated patches in order on the target branch. Each time, create a new commit object with the new state.

The process of making new commits with the same change sets as existing ones is also called "**replaying**" those commits, a term we have already used.

### heading-time-to-get-hands-on-with-rebase">Time to Get Hands-On with Rebase

Before running the following command command, make sure you have \`john_branch\` locally, so run:

\`\`\`sh
git checkout john_branch
\`\`\`

Start from Paul's branch:

\`\`\`sh
git checkout paul_branch
\`\`\`

This is the history:

![](https://freecodecamp.org/news/content/images/2023/12/diverging_history_commit_9-1.png" alt="Commit history before performing " width="907" height="341" loading="lazy">
*Commit history before performing \`git rebase\`*

And now, to the exciting part:

\`\`\`sh
git rebase john_branch
\`\`\`

And observe the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_rebase.png" alt="The history after rebasing" width="477" height="268" loading="lazy">
*The history after rebasing*

With \`git merge\` you added to the history, while with \`git rebase\` you **rewrite history**. You create **new** commit objects. In addition, the result is a linear history graph - rather than a diverging graph.

![](https://freecodecamp.org/news/content/images/2023/12/history_after_rebase_2.png" alt="The history after rebasing" width="1600" height="439" loading="lazy">
*The history after rebasing*

In essence, you "copied" the commits that were on \`paul_branch\` and that were introduced after "Commit 4", and "pasted" them on top of \`john_branch\`.

The command is called "rebase", because it changes the base commit of the branch it's run from. That is, in your case, before running \`git rebase\`, the base of \`paul_branch\` was "Commit 4" - as this is where the branch was "born" (from \`main\`). With \`rebase\`, you asked Git to give it another base - that is, pretend as if it had been born from "Commit 6".

To do that, Git took what used to be "Commit 7", and "replayed" the changes introduced in this commit onto "Commit 6". Then it created a new commit object. This object differs from the original "Commit 7" in three aspects:

<ol>
- It has a different timestamp.
- It has a different parent commit - "Commit 6", rather than "Commit 4".
- The tree object it is pointing to is different - as the changes were introduced to the tree pointed to by "Commit 6", and not the tree pointed to by "Commit 4".

Notice the last commit here, "Commit 9'". The snapshot it represents (that is, the tree that it points to) is exactly the same tree you would get by merging the two branches. The state of the files in your Git repository would be **the same** as if you used \`git merge\`. It's only the *history* that is different, and the commit objects of course.

Now, you can simply use:

\`\`\`sh
git checkout main
git merge paul_branch
\`\`\`

Hm.... What would happen if you ran this last command? Consider the commit history again, after checking out \`main\`:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_checkout_main.png" alt="The history after rebasing and checking out " width="1600" height="558" loading="lazy">
*The history after rebasing and checking out \`main\`*

What would it mean to merge \`main\` and \`paul_branch\`?

Indeed, Git can simply perform a fast-forward merge, as the history is completely linear (if you need a reminder about fast-forward merges, check out the previous chapter). As a result, \`main\` and \`paul_branch\` now point to the same commit:

![](https://freecodecamp.org/news/content/images/2023/12/fast_forward_merge_result.png" alt="The result of a fast-forward merge" width="1168" height="619" loading="lazy">
*The result of a fast-forward merge*

### heading-advanced-rebasing-in-git">Advanced Rebasing in Git

Now that you understand the basics of rebase, it is time to consider more advanced cases, where additional switches and arguments to the rebase command will come in handy.

In the previous example, when you only used \`rebase\` (without additional switches), Git replayed all the commits from the common ancestor to the tip of the current branch.

But rebase is a super-power. It's an almighty command capable of…well, rewriting history. And it can come in handy if you want to modify history to make it your own.

Undo the last merge by making \`main\` point to "Commit 4" again:

\`\`\`sh
git reset --hard <ORIGINAL_COMMIT <span class="token file-descriptor important">4>
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_1.png" alt="'Undoing' the last merge operation" width="590" height="322" loading="lazy">
*"Undoing" the last merge operation*

And undo the rebasing by using:

\`\`\`sh
git checkout paul_branch
git reset --hard <ORIGINAL_COMMIT <span class="token file-descriptor important">9>
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_2.png" alt="'Undoing' the rebase operation" width="694" height="367" loading="lazy">
*"Undoing" the rebase operation*

Notice that you got to exactly the same history you used to have:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_undoing_rebase.png" alt="Visualizing the history after 'undoing' the rebase operation" width="1600" height="454" loading="lazy">
*Visualizing the history after "undoing" the rebase operation*

To be clear, "Commit 9" doesn't just disappear when it's not reachable from the current \`HEAD\`. Rather, it's still stored in the object database. And as you used \`git reset\` now to change \`HEAD\` to point to this commit, you were able to retrieve it, and also its parent commits since they are also stored in the database. Pretty cool, huh? 😎 

You will learn more about \`git reset\` in the next part, where we discuss undoing changes in Git.

View the changes that Paul introduced:

\`\`\`sh
git show HEAD
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_show_HEAD_2.png" alt=" shows the patch introduced by 'Commit 9'" width="814" height="658" loading="lazy">
*\`git show HEAD\` shows the patch introduced by "Commit 9"*

Keep going backwards in the commit graph:

\`\`\`sh
git show HEAD~
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_show_HEAD-.png" alt=" (same as ) shows the patch introduced by 'Commit 8'" width="589" height="723" loading="lazy">
*\`git show HEAD~\` (same as \`git show HEAD~1\`) shows the patch introduced by "Commit 8"*

And one commit further:

\`\`\`sh
git show HEAD~2
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/git_show_HEAD-2.png" alt=" shows the patch introduced by 'Commit 7'" width="636" height="663" loading="lazy">
*\`git show HEAD~2\` shows the patch introduced by "Commit 7"*

Perhaps Paul doesn't want this kind of history. Rather, he wants it to seem as if he introduced the changes in "Commit 7" and "Commit 8" as a single commit.

For that, you can use an **interactive rebase**. To do that, we add the \`-i\` (or \`--interactive\`) switch to the rebase command:

\`\`\`sh
git rebase -i <SHA_OF_COMMIT_<span class="token file-descriptor important">4>
\`\`\`

Or, since main is pointing to "Commit 4", we can run:

\`\`\`sh
git rebase -i main
\`\`\`

By running this command, you tell Git to use a new base, "Commit 4". So you are asking Git to go back to all commits that were introduced after "Commit 4" and that are reachable from the current \`HEAD\`, and replay those commits.

For every commit that is replayed, Git asks us what we'd like to do with it:

![](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_1.png" alt=" prompts you to select what to do with each commit" width="994" height="738" loading="lazy">
*\`git rebase -i main\` prompts you to select what to do with each commit*

In this context it's useful to think of a commit as a patch. That is, "Commit 7", as in "the patch that "Commit 7" introduced on top of its parent".

One option is to use \`pick\`. This is the default behavior, which tells Git to replay the changes introduced in this commit. In this case, if you just leave it as is - and \`pick\` all commits - you will get the same history, and Git won't even create new commit objects.

Another option is \`squash\`. A *squashed* commit will have its contents "folded" into the contents of the commit preceding it. So in our case, Paul would like to squash "Commit 8" into "Commit 7":

![](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_2.png" alt="Squashing 'Commit 8' into 'Commit 7'" width="1020" height="641" loading="lazy">
*Squashing "Commit 8" into "Commit 7"*

As you can see, \`git rebase -i\` provides additional options, but we won't go into all of them in this chapter. If you allow the rebase to run, you will get prompted to select a commit message for the newly created commit (that is, the one that introduced the changes of both "Commit 7" and "Commit 8"):

![](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_3.png" alt="Providing the commit message: Commits 7+8" width="1004" height="680" loading="lazy">
*Providing the commit message: Commits 7+8*

And look at the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_interactive_rebase.png" alt="The history after the interactive rebase" width="556" height="268" loading="lazy">
*The history after the interactive rebase*

Exactly as we wanted! On \`paul_branch\`, we have "Commit 9" (of course, it's a different object than the original "Commit 9"). This object points to "Commits 7+8", which is a single commit introducing the changes of both the original "Commit 7" and the original "Commit 8". This commit's parent is "Commit 4", where \`main\` is pointing to.

Oh wow, isn't that cool? 😎

\`git rebase\` grants you unlimited control over the shape of any branch. You can use it to reorder commits, or to remove incorrect changes, or modify a change in retrospect. Alternatively, you could perhaps move the base of your branch onto another commit, any commit that you wish.

### heading-how-to-use-the-onto-switch-of-git-rebase">How to Use the \`--onto\` Switch of \`git rebase\`

Let's consider one more example. Get to \`main\` again:

\`\`\`sh
git checkout main
\`\`\`

And delete the pointers to paul_branch and john_branch so you don't see them in the commit graph anymore:

\`\`\`sh
git branch -D paul_branch
git branch -D john_branch
\`\`\`

Next, branch from \`main\` to a new branch:

\`\`\`sh
git checkout -b new_branch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/create_new_branch.png" alt="Creating  that diverges from " width="634" height="202" loading="lazy">
_Creating \`new_branch\` that diverges from \`main\`_

This is the clean history you should have:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_new_branch.png" alt="A clean history with  that diverges from " width="1601" height="814" loading="lazy">
_A clean history with \`new_branch\` that diverges from \`main\`_

Now, change the file \`code.py\` (for example, add a new function) and commit your changes:

\`\`\`sh
nano code.py
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/code_py_1.png" alt="Adding the function  to " width="588" height="328" loading="lazy">
_Adding the function \`new_branch\` to \`code.py\`_

\`\`\`sh
git add code.py
git commit -m "Commit 10"
\`\`\`

Get back to \`main\`:

\`\`\`sh
git checkout main
\`\`\`

And introduce another change - adding a docstring at the beginning of the file:

![](https://freecodecamp.org/news/content/images/2023/12/code_py_2.png" alt="Added a docstring at the beginning of the file" width="588" height="331" loading="lazy">
*Added a docstring at the beginning of the file*

Time to stage and commit these changes:

\`\`\`sh
git add code.py
git commit -m "Commit 11"
\`\`\`

And yet another change, perhaps add \`@Author\` to the docstring:

![](https://freecodecamp.org/news/content/images/2023/12/code_py_3.png" alt="Added  to the docstring" width="587" height="380" loading="lazy">
*Added \`@Author\` to the docstring*

Commit this change as well:

\`\`\`sh
git add code.py
git commit -m "Commit 12"
\`\`\`

Oh wait, now I realize that I wanted you to make the changes introduced in "Commit 11" as a part of the \`new_branch\`. Ugh. What can you do?

Consider the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_12-2.png" alt="The history after introducing 'Commit 12'" width="1613" height="798" loading="lazy">
*The history after introducing "Commit 12"*

Instead of having "Commit 11" reside only on the \`main\` branch, I want it to be on *both* the \`main\` branch as well as \`new_branch\`. Visually, I would want to *move* it down the graph here:

![](https://freecodecamp.org/news/content/images/2023/12/push_commit_10_down.png" alt="Visually, I want you to 'push down' 'Commit 10'" width="1578" height="559" loading="lazy">
*Visually, I want you to "push down" "Commit 10"*

Can you see where I am going? 😇

Well, \`rebase\` allows you to basically replay the changes introduced in \`new_branch\`, those introduced in "Commit 10", as if they had been originally conducted on "Commit 11", rather than "Commit 4".

To do that, you can use other arguments of \`git rebase\`. Specifically, you can use \`git rebase --onto\`, which optionally takes three parameters:

\`\`\`sh
git rebase --onto <new_parent> <old_parent> <until>
\`\`\`

That is, you take all commits between \`old_parent\` and \`until\`, and you "cut" and "paste" them *onto* \`new_parent\`.

In this case, you'd tell Git that you want to take all the history introduced between the common ancestor of \`main\` and \`new_branch\`, which is "Commit 4", and have the new base for that history be "Commit 11". To do that, use:

\`\`\`sh
git rebase --onto <SHA_OF_COMMIT_1<span class="token file-descriptor important">1> main new_branch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_1.png" alt="The history before and after the rebase, 'Commit 10' has been 'pushed'" width="812" height="565" loading="lazy">
*The history before and after the rebase, "Commit 10" has been "pushed"*

And look at our beautiful history! 😍

![](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_2.png" alt="The history before and after the rebase, 'Commit 10' has been 'pushed'" width="1579" height="552" loading="lazy">
*The history before and after the rebase, "Commit 10" has been "pushed"*

Let's consider another case.

Say I started working on a new feature, and by mistake I started working from \`feature_branch_1\`, rather than from \`main\`.

So to emulate this, create \`feature_branch_1\`:

\`\`\`sh
git checkout main
git checkout -b feature_branch_1
\`\`\`

And erase \`new_branch\` so you don't see it in the graph anymore:

\`\`\`sh
git branch -D new_branch
\`\`\`

Create a simple Python file called \`1.py\`:

![](https://freecodecamp.org/news/content/images/2023/12/1_py_1.png" alt="A new file, , with " width="581" height="80" loading="lazy">
*A new file, \`1.py\`, with \`print('Hello world!')\`*

Stage and commit this file:

\`\`\`sh
git add 1.py
git commit -m  "Commit 13"
\`\`\`

Now branch out from \`feature_branch_1\` (this is the mistake you will later fix):

\`\`\`sh
git checkout -b feature_branch_2
\`\`\`

And create another file, \`2.py\`:

![](https://freecodecamp.org/news/content/images/2023/12/2_py_1.png" alt="Creating " width="561" height="90" loading="lazy">
*Creating \`2.py\`*

Stage and commit this file as well:

\`\`\`sh
git add 2.py
git commit -m  "Commit 14"
\`\`\`

And introduce some more code to \`2.py\`:

![](https://freecodecamp.org/news/content/images/2023/12/2_py_2.png" alt="Modifying " width="995" height="134" loading="lazy">
*Modifying \`2.py\`*

Stage and commit these changes too:

\`\`\`sh
git add 2.py
git commit -m  "Commit 15"
\`\`\`

So far you should have this history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_15.png" alt="The history after introducing 'Commit 15'" width="1600" height="446" loading="lazy">
*The history after introducing "Commit 15"*

Get back to \`feature_branch_1\` and edit \`1.py\`:

\`\`\`sh
git checkout feature_branch_1
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/1_py_2.png" alt="Modifying " width="563" height="84" loading="lazy">
*Modifying \`1.py\`*

Now stage and commit:

\`\`\`sh
git add 1.py
git commit -m  "Commit 16"
\`\`\`

Your history should look like this:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_16-1.png" alt="The history after introducing 'Commit 16'" width="1600" height="441" loading="lazy">
*The history after introducing "Commit 16"*

Say now you realize that you've made a mistake. You actually wanted \`feature_branch_2\` to be born from the \`main\` branch, rather than from \`feature_branch_1\`.

How can you achieve that?

Try to think about it given the history graph and what you've learned about the \`--onto\` flag for the \`rebase\` command.

Well, you want to "replace" the parent of your first commit on \`feature_branch_2\`, which is "Commit 14", so that it's on top of \`main\` branch - in this case, "Commit 12" - rather than the beginning of \`feature_branch_1\` - in this case, "Commit 13". So again, you will be creating a *new base*, this time for the first commit on \`feature_branch_2\`.

![](https://freecodecamp.org/news/content/images/2023/12/plan_commit14_15.png" alt="You want to move around 'Commit 14' and 'Commit 15'" width="1600" height="447" loading="lazy">
*You want to move around "Commit 14" and "Commit 15"*

How would you do that?

First, switch to \`feature_branch_2\`:

\`\`\`sh
git checkout feature_branch_2
\`\`\`

And now you can use:

\`\`\`sh
git rebase --onto main <SHA_OF_COMMIT_1<span class="token file-descriptor important">3>
\`\`\`

This tells Git to take the history with "Commit 13" as a base, and change that base to be "Commit 12" (pointed to by \`main\`) instead.

As a result, you have \`feature_branch_2\` based on \`main\` rather than \`feature_branch_1\`:

![](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_3.png" alt="The commit history after performing rebase" width="1600" height="443" loading="lazy">
*The commit history after performing rebase*

The syntax of the command is:

\`\`\`sh
git rebase --onto <new_parent> <old_parent>
\`\`\`

### heading-how-to-rebase-on-a-single-branch">How to Rebase on a Single Branch

You can also use \`git rebase\` while looking at the history of a single branch.

Let's see if you can help me here.

Say I worked from \`feature_branch_2\`, and specifically edited the file \`code.py\`. I started by changing all strings to be wrapped by double quotes rather than single quotes:

![](https://freecodecamp.org/news/content/images/2023/12/code_py_4.png" alt="Changing  into  in " width="588" height="382" loading="lazy">
*Changing \`'\` into \`"\` in \`code.py\`*

Then, I staged and committed:

\`\`\`sh
git add code.py
git commit -m "Commit 17"
\`\`\`

I then decided to add a new function at the beginning of the file:

![](https://freecodecamp.org/news/content/images/2023/12/code_py_5.png" alt="Adding the function " width="590" height="423" loading="lazy">
_Adding the function \`another_feature\`_

Again, I staged and committed:

\`\`\`sh
git add code.py
git commit -m "Commit 18"
\`\`\`

And now I realized that I actually forgot to change the single quotes to double quotes wrapping \`__main__\` (as you might have noticed), so I did that too:

![](https://freecodecamp.org/news/content/images/2023/12/code_py_6.png" alt="Changing  into " width="599" height="446" loading="lazy">
*Changing \`'__main__'\` into \`"__main__"\`*

Of course, I staged and committed this change:

\`\`\`sh
git add code.py
git commit -m "Commit 19"
\`\`\`

Now, consider the history:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_19.png" alt="The commit history after introducing 'Commit 19'" width="1600" height="462" loading="lazy">
*The commit history after introducing "Commit 19"*

It isn't really nice, is it? I mean, I have two commits that are related to one another, "Commit 17" and "Commit 19" (turning \`'\`s into \`"\`s), but they are split by the unrelated "Commit 18" (where I added a new function). What can we do? Can you help me?

Intuitively, I want to edit the history here:

![](https://freecodecamp.org/news/content/images/2023/12/plan_edit_commits_17_18.png" alt="These are the commits I want to edit" width="1600" height="436" loading="lazy">
*These are the commits I want to edit*

So, what would you do?

You are right!

I can \`rebase\` the history from "Commit 17" to "Commit 19", on top of "Commit 15". To do that:

\`\`\`sh
git rebase --interactive --onto <SHA_OF_COMMIT_1<span class="token file-descriptor important">5> <SHA_OF_COMMIT_1<span class="token file-descriptor important">5>
\`\`\`

Notice I specified "Commit 15" as the beginning of the range of commits, excluding this commit. And I didn't need to explicitly specify \`HEAD\` as the last parameter.

![](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_4.png" alt="Using  on a single branch" width="1023" height="391" loading="lazy">
*Using \`rebase --onto\` on a single branch*

(Note: If you follow the steps above with my repository and get a merge conflict, you may have a different configuration than on my machine with regards to whitespace characters at line endings. In that case, you can add the \`--ignore-whitespace\` switch to the \`rebase\` command, resulting in the following command: \`git rebase --ignore-whitespace --interactive --onto <SHA_OF_COMMIT_15> <SHA_OF_COMMIT_15>\`. If you are curious to find out more about this issue, search for \`autocrlf\`.)

After following your advice and running the \`rebase\` command (thanks! 😇) I get the following screen:

![](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_4.png" alt="Interactive rebase" width="904" height="638" loading="lazy">
*Interactive rebase*

So what would I do? I want to put "Commit 19" before "Commit 18", so it comes right after "Commit 17". I can go further and \`squash\` them together, like so:

![](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_5.png" alt="Interactive rebase - changing the order of commit and squashing" width="1010" height="396" loading="lazy">
*Interactive rebase - changing the order of commit and squashing*

Now when I get prompted for a commit message, I can provide the message "Commit 17+19":

![](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_6.png" alt="Providing a commit message" width="799" height="393" loading="lazy">
*Providing a commit message*

And now, see our beautiful history:

![](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_5.png" alt="The resulting history" width="1030" height="493" loading="lazy">
*The resulting history*

Thanks again!

### heading-more-rebase-use-cases-more-practice">More Rebase Use Cases + More Practice

By now I hope you feel comfortable with the syntax of rebase. The best way to actually understand it is to consider various cases and figure out how to solve them yourself.

With the upcoming use cases, I strongly suggest you stop reading after I've introduced each use case, and then try to solve it on your own.

<h4 id="heading-how-to-exclude-commits">How to Exclude Commits

Say you have this history on another repo:

![](https://freecodecamp.org/news/content/images/2023/12/another_history_1.png" alt="Another commit history" width="1600" height="350" loading="lazy">
*Another commit history*

Before playing around with it, store a tag to "Commit F" so you can get back to it later:

\`\`\`sh
git tag original_commit_f
\`\`\`

(A tag is a named reference to a commit, just like a branch - but it doesn't change when you add additional commits. It is like a constant named reference.)

Now, you actually don't want the changes in "Commit C" and "Commit D" to be included. You could use an interactive rebase like before and remove their changes. Or, you could use \`git rebase --onto\` again. How would you use \`--onto\` in order to "remove" these two commits?

You can rebase \`HEAD\` on top of "Commit B", where the old parent was actually "Commit D", and now it should be "Commit B". Consider the history again:

![](https://freecodecamp.org/news/content/images/2023/12/another_history_1-1.png" alt="The history again" width="1600" height="350" loading="lazy">
*The history again*

Rebasing so that "Commit B" is the base of "Commit E" means "moving" both "Commit E" and "Commit F", and giving them another base - "Commit B". Can you come up with the command yourself?

\`\`\`sh
git rebase --onto <SHA_OF_COMMIT_B> <SHA_OF_COMMIT_D> HEAD
\`\`\`

Notice that using the syntax above (exactly as provided) would *not* move *main* to point to the new commit, so the result is a "detached" \`HEAD\`. If you use \`gg\` or another tool that displays the history reachable from branches, it might confuse you:

![](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_6.png" alt="Rebasing with  results in a detached " width="859" height="462" loading="lazy">
*Rebasing with \`--onto\` results in a detached \`HEAD\`*

But if you simply use \`git log\` (or my alias \`git lol\`), you will see the desired history:

![](https://freecodecamp.org/news/content/images/2023/12/git_lol.png" alt="The resulting history" width="740" height="136" loading="lazy">
*The resulting history*

I don't know about you, but these kinds of things make me really happy. 😊😇

By the way, you could omit \`HEAD\` from the previous command as this is the default value for the third parameter. So just using:

\`\`\`sh
git rebase --onto <SHA_OF_COMMIT_B> <SHA_OF_COMMIT_D>
\`\`\`

Would have the same effect. The last parameter actually tells Git where the end of the current sequence of commits to rebase is. So the syntax of \`git rebase --onto\` with three arguments is:

\`\`\`sh
git rebase --onto <new_parent> <old_parent> <until>
\`\`\`

<h4 id="heading-how-to-move-commits-across-branches">How to Move Commits Across Branches

So let's say we get to the same history as before:

\`\`\`sh
git checkout original_commit_f
\`\`\`

And now I want only "Commit E" to be on a branch based on "Commit B". That is, I want to have a new branch, branching from "Commit B", with only "Commit E".

![](https://freecodecamp.org/news/content/images/2023/12/another_history_2.png" alt="The current history, considering 'Commit E'" width="1600" height="472" loading="lazy">
*The current history, considering "Commit E"*

So, what does this mean in terms of \`rebase\`? Consider the image above. What commit (or commits) should I rebase, and which commit would be the new base?

I know I can count on you here 😉

What I want is to take "Commit E", and this commit only, and change its base to be "Commit B". In other words, to replay the changes introduced in "Commit E" onto "Commit B".

Can you apply that logic to the syntax of git rebase?

Here it is (this time I'm writing \`<COMMIT_X>\` instead of \`<SHA_OF_COMMIT_X>\`, for brevity):

\`\`\`sh
git rebase --onto <COMMIT_B> <COMMIT_D> <COMMIT_E>
\`\`\`

Now the history looks like so:

![](https://freecodecamp.org/news/content/images/2023/12/history_after_rebase_3.png" alt="The history after rebase" width="1600" height="457" loading="lazy">
*The history after rebase*

Notice that \`rebase\` moved \`HEAD\`, but not any other reference named (such as a branch or a tag). In other words, you are in a detached \`HEAD\` state. So here too, using \`gg\` or another tool that displays the history reachable from branches and tags might confuse you. You can use \`git log\` (or my alias \`git lol\`) to display the reachable history from \`HEAD\`.

Awesome!

### heading-a-note-about-conflicts">A Note About Conflicts

Note that when performing a rebase, you may run into conflicts just as when merging. You may have conflicts because, when rebasing, you are trying to apply patches on a different base, perhaps where the patches do not apply.

For example, consider the previous repository again, and specifically, consider the change introduced in "Commit 12", pointed to by \`main\`:

\`\`\`sh
git show main
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/patch_commit_12.png" alt="The patch introduced in 'Commit 12'" width="714" height="453" loading="lazy">
*The patch introduced in "Commit 12"*

I already covered the format of \`git diff\` in detail in <a href="#chapter-6-diffs-and-patches">chapter 6</a>, but as a quick reminder, this commit instructs Git to add a line after the two lines of context:

<pre class="language-patch" tabindex="0"><code class="language-patch">
\`\`\`

This is a sample file

<pre>\`
And before these three lines of context:

\`\`\`patch
\`\`\`
def new_feature():
  print('new feature')
  
<pre>\`
Say you are trying to rebase "Commit 12" onto another commit. If, for some reason, these context lines don't exist as they do in the patch on the commit you are rebasing onto, then you will have a conflict.

### Zooming Out for the Big Picture

![Comparing rebase and merge](https://freecodecamp.org/news/content/images/2023/12/compare_rebase_merge.png)
_Comparing rebase and merge_

In the beginning of this chapter, I started by mentioning the similarity between \`git merge\` and \`git rebase\`: both are used to integrate changes introduced in different histories.

But, as you now know, they are very different in how they operate. While merging results in a _diverged_ history, rebasing results in a _linear_ history. Conflicts are possible in both cases. And there is one more column described in the table above that requires some close attention.

Now that you know what "Git rebase" is, and how to use interactive rebase or rebase \`--onto\`, as I hope you agree, \`git rebase\` is a super powerful tool. Yet, it has one huge drawback when compared with merging.

**Git rebase changes the history.**

This means that you should **not** rebase commits that exist outside your local copy of the repository, and that other people may have based their commits on.

In other words, if the only commits in question are those you created locally - go ahead, use rebase, go wild.

But if the commits have been pushed, this can lead to a huge problem - as someone else may rely on these commits that you later overwrite, and then you and they will have different versions of the repository.

This is unlike \`merge\` which, as we have seen, does not modify history.

For example, consider the last case where we rebased and resulted in this history:

![The history after rebase](https://freecodecamp.org/news/content/images/2023/12/history_after_rebase_3-1.png)
_The history after rebase_

Now, assume that I have already pushed this branch to the remote. And after I had pushed the branch, another developer pulled it and branched out from "Commit C". The other developer didn't know that meanwhile, I was locally rebasing my branch, and would later push it again.

This results in an inconsistency: the other developer works from a commit that is no longer available on my copy of the repository.

I will not elaborate on what exactly this causes in this book, as my main message is that you should definitely avoid such cases. If you're interested in what would actually happen, I'll leave a link to a useful resource in the [additional references](#additional-references-by-part). For now, let's summarize what we have covered.

### Recap - Understanding Git Rebase

In this chapter, you learned about \`git rebase\`, a super-powerful tool to rewrite history in Git. You considered a few use cases where git rebase can be helpful, and how to use it with one, two, or three parameters, with and without the \`--onto\` switch.

I hope I was able to convince you that \`git rebase\` is powerful - but also that it is quite simple once you get the gist. It is a tool you can use to "copy-paste" commits (or, more accurately, patches). And it's a useful tool to have under your belt. In essence, \`git rebase\` takes the patches introduced by commits, and replays them on another commit. As described in this chapter, this is useful in many different scenarios.

## Part 2 - Summary

In this part you learned about branching and integrating changes in Git.

You learned what a **diff** is, and the difference between a diff and a **patch**. You also learned how the output of \`git diff\` is constructed.

Understanding diffs is a major milestone for understanding many other processes within Git such as merging or rebasing.

Then, you got an extensive overview of merging with Git. You learned that **merging** is the process of **combining the recent changes from several branches into a single new commit**. The new commit has multiple parents - those commits which had been the tips of the branches that were merged. In most cases, merging combines the changes from two branches, and the resulting merge commit then has two parents - one from each branch.

We considered a simple, fast-forward merge, which is possible when one branch diverged from the base branch, and then just added commits on top of the base branch.

We then considered three-way merges, and explained the three-stage process:

* First, Git locates the merge base. As a reminder, this is the first commit that is reachable from both branches.
* Second, Git calculates two diffs - one diff from the merge base to the _first_ branch, and another diff from the merge base to the _second_ branch. Git generates patches based on those diffs.
* Third and last, Git applies both patches to the merge base using a 3-way merge algorithm. The result is the state of the new merge commit.

You saw the output of \`git diff\` when we are in a conflicting state, and how to resolve conflicts either manually or with VS Code.

Ultimately, you got to know Git rebase. You saw that \`git rebase\` is powerful - but also that it is quite simple once you understand what it does. It is a tool to "copy-paste" commits (or, more accurately, patches).

![Comparing rebase and merge](https:<span class="hljs-comment">//www.freecodecamp.org/news/content/images/2023/12/compare_rebase_merge-1.png)
_Comparing rebase and merge_

Both \`git merge\` and \`git rebase\` are used to integrate changes introduced in different histories.

Yet, they differ in how they operate. While merging results in a _diverged_ history, rebasing results in a _linear_ history. \`git rebase\` _changes_ the history, whereas \`git merge\` adds to the existing history.

With this deep understanding of diffs, patches, merge and rebase, you should feel confident introducing changes to a git repository.

The next part will focus on what happens when things go wrong - how you can change history (with or without \`git rebase\`), or find "lost" commits.

# Part 3 - Undoing Changes

Did you ever get to a point where you said: "Uh-oh, what did I just do?" I guess you have, just like about anyone who uses Git.

Perhaps you committed to the wrong branch. Perhaps you lost some code that you had written. Perhaps you committed something that you didn't mean to.

This part will give you the tools to rewrite history with confidence, thereby "undoing" all kinds of changes in Git. 

Just like the other parts of the book, this part will be practical yet in-depth - so instead of providing you with a list of things to do when things go wrong, we will understand the underlying mechanisms, so that you will feel confident whenever you get to the "uh-oh" moment. Actually, you will find these moments as opportunities for an interesting challenge, rather than a dreadful scenario.

## Chapter 9 - Git Reset

Our journey starts with a powerful command that can be used to undo many different actions with Git - \`git reset\`.

### A Short Reminder - Recording Changes

In [chapter 3](#chapter-3-how-to-record-changes-in-git), you learned how to record changes in Git. If you remember everything from this part, feel free to jump to the next section.

It is very useful to think about Git as a system for recording snapshots of a filesystem in time. Considering a Git repository, it has three "states" or "trees":

1. The **working directory**, a directory that has a repository associated with it.
2. The **staging area (index)** which holds the tree for the next commit.
3. The **repository**, which is a collection of commits and references.

![The three "trees" of a Git repo](https://freecodecamp.org/news/content/images/2023/12/3_trees.png)
_The three "trees" of a Git repo_

Note regarding the drawing conventions I use: I include \`.git\` within the working directory, to remind you that it is a folder within the project's folder on the filesystem. The \`.git\` folder actually contains the objects and references of the repository, as explained in [chapter 4](#chapter-4-how-to-create-a-repo-from-scratch).

#### Hands-on Demonstration

Use \`git init\` to initialize a new repository. Write some text into a file called \`1.txt\`:

\`\`\`bash
mkdir my_repo
cd my_repo
git init
echo Hello world > 1.txt
\`\`\`
Out of the three tree states described above, where is \`1.txt\` now?

In the working tree, as it hasn't yet been introduced to the index.

![](https://freecodecamp.org/news/content/images/2023/12/1_txt_working_dir.png" alt="The file  is now a part of the working dir only" width="1162" height="346" loading="lazy">
*The file \`1.txt\` is now a part of the working dir only*

In order to *stage* it, to *add* it to the index, use:

\`\`\`sh
git add 1.txt
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/1_txt_index.png" alt="Using  stages the file so it is now in the index as well" width="1164" height="346" loading="lazy">
*Using \`git add\` stages the file so it is now in the index as well*

Notice that once you stage \`1.txt\`, Git creates a blob object with the content of this file, and adds it to the internal object database (within \`.git\` folder), as covered in <a href="#chapter-3-how-to-record-changes-in-git">chapter 3</a> and <a href="#chapter-4-how-to-create-a-repo-from-scratch">chapter 4</a>. I do not draw it as part of the "repository" as in this representation, the "repository" refers to a tree of commits and their references, and this blob has not been a part of any commit.

Now, use \`git commit\` to commit your changes to the repository:

\`\`\`sh
git commit -m "Commit 1"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_1.png" alt="Using  creates a commit object in the repository" width="1151" height="437" loading="lazy">
*Using \`git commit\` creates a commit object in the repository*

You created a new **commit** object, which includes a pointer to a **tree** describing the entire **working tree**. In this case, this tree consists only of \`1.txt\` within the root folder. In addition to a pointer to the tree, the commit object includes metadata, such as timestamps and author information.

When considering the diagrams, notice that we only have a single copy of the file \`1.txt\` on disk, and a corresponding blob object in Git's object database. The "repository" tree now shows this file as it is part of the active commit - that is, the commit object "Commit 1" points to a tree that points to the blob with the contents of \`1.txt\`, the same blob that the index is pointing to.

For more information about the objects in Git (such as commits and trees), refer to [chapter 1](/freecodecamp.org/gitting-things-done-book/part-1-main-objects-and-introducing-changes.md#chapter-1-git-objects).

Next, create a new file, and add it to the index, as before:

\`\`\`sh
<span class="token builtin class-name">echo second file > 2.txt
git add 2.txt
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/2_txt_index.png" alt="The file  is in the working dir and the index after staging it with " width="1151" height="437" loading="lazy">
*The file \`2.txt\` is in the working dir and the index after staging it with \`git add\`*

Next, commit:

\`\`\`sh
git commit -m "Commit 2"
\`\`\`

Importantly, \`git commit\` does two things:

First, it creates a **commit object**, so there is an object within Git's internal object database with a corresponding SHA-1 value. This new commit object also points to the parent commit. That is the commit that \`HEAD\` was pointing to when you wrote the \`git commit\` command.

![](https://freecodecamp.org/news/content/images/2023/12/new_commit_object.png" alt="A new commit object has been created, at first —  still points to the previous commit" width="1164" height="439" loading="lazy">
*A new commit object has been created, at first - \`main\` still points to the previous commit*

Second, \`git commit\` **moves the pointer of the active branch** — in our case, that would be \`main\`, to point to the newly created commit object.

![](https://freecodecamp.org/news/content/images/2023/12/commit_updates_active_branch.png" alt=" also updates the active branch to point to the newly created commit object" width="1164" height="439" loading="lazy">
*\`git commit\` also updates the active branch to point to the newly created commit object*

### heading-introducing-git-reset">Introducing \`git reset\`

You will now learn how to reverse the process of introducing a commit. For that, you will get to know the command \`git reset\`.

<h4 id="heading-git-reset-soft">\`git reset --soft\`

The very last step you did before was to \`git commit\`, which actually means two things — Git created a commit object and moved \`main\`, the active branch. To undo this step, use the following command:

\`\`\`sh
git reset --soft HEAD~1
\`\`\`

The syntax \`HEAD~1\` refers to the first parent of \`HEAD\`. Consider a case where I had more than one commit in the commit-graph, say "Commit 3" pointing to "Commit 2", which is, in turn, pointing to "Commit 1. And consider \`HEAD\` was pointing to "Commit 3". You could use \`HEAD~1\` to refer to "Commit 2", and \`HEAD~2\` would refer to "Commit 1".

So, back to the command: \`git reset --soft HEAD~1\`

This command asks Git to change whatever \`HEAD\` is pointing to. (Note: In the diagrams below, I use \`*HEAD\` for "whatever \`HEAD\` is pointing to".) In our example, \`HEAD\` is pointing to \`main\`. So Git will only change the pointer of \`main\` to point to \`HEAD~1\`. That is, \`main\` will point to "Commit 1".

However, this command did **not** affect the state of the index or the working tree. So if you use \`git status\` you will see that \`2.txt\` is staged, just like before you ran \`git commit\`:

![](https://freecodecamp.org/news/content/images/2023/12/git_status_after_reset_soft.png" alt=" shows that  is in the index, but not in the active commit" width="739" height="330" loading="lazy">
*\`git status\` shows that \`2.txt\` is in the index, but not in the active commit*

The state is now:

![](https://freecodecamp.org/news/content/images/2023/12/reset_soft_1.png" alt="Resetting  to 'Commit 1'" width="1164" height="439" loading="lazy">
*Resetting \`main\` to "Commit 1"*

(Note: I removed \`2.txt\` from the "repository" in the diagram as it is not part of the active commit - that is, the tree pointed to by "Commit 1" does not reference this file. However, it has not been removed from the file system - as it still exists in the working tree and the index.)

What about \`git log\`? It will start from \`HEAD\` , go to \`main\`, and then to "Commit 1":

![](https://freecodecamp.org/news/content/images/2023/12/git_log_after_reset_soft.png" alt="The output of " width="892" height="190" loading="lazy">
*The output of \`git log\`*

Notice that this means that "Commit 2" is no longer reachable from our history.

Does that mean the commit object of "Commit 2" is deleted?

No, it's not deleted. It still resides within Git's internal object database of objects.

If you push the current history now, by using \`git push\`, Git will not push "Commit 2" to the remote server (as it is not reachable from the current \`HEAD\`), but the commit object *still exists* on your local copy of the repository.

Now, commit again - and use the commit message of "Commit 2.1" to differentiate this new object from the original "Commit 2":

\`\`\`sh
git commit -m "Commit 2.1"
\`\`\`

This is the resulting state:

![](https://freecodecamp.org/news/content/images/2023/12/commit_2_1.png" alt="Creating a new commit" width="1164" height="439" loading="lazy">
*Creating a new commit*

I omitted "Commit 2" as it is not reachable from \`HEAD\`, even though its object exists in Git's internal object database.

Why are "Commit 2" and "Commit 2.1" different? Even if we used the same commit message, and even though they point to the same tree object (of the root folder consisting of \`1.txt\` and \`2.txt\`), they still have different timestamps, as they were created at different times. Both "Commit 2" and "Commit 2.1" now point to "Commit 1", but only "Commit 2.1" is reachable from \`HEAD\`.

<h4 id="heading-git-reset-mixed">\`git reset --mixed\`

It's time to undo even further. This time, use:

\`\`\`sh
git reset --mixed HEAD~1
\`\`\`

(Note: \`--mixed\` is the default switch for \`git reset\`.)

This command starts the same as \`git reset --soft HEAD~1\`. That is, the command takes the pointer of whatever \`HEAD\` is pointing to now, which is the \`main\` branch, and sets it to \`HEAD~1\`, in our example - "Commit 1".

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_mixed_1.png" alt="The first step of  is the same as " width="1164" height="439" loading="lazy">
*The first step of \`git reset --mixed\` is the same as \`git reset --soft\`*

Next, Git goes further, effectively undoing the changes we made to the index. That is, changing the index so that it matches with the current \`HEAD\`, the new \`HEAD\` after setting it in the first step.

If we ran \`git reset --mixed HEAD~1\`, then \`HEAD\` (\`main\`) would be set to \`HEAD~1\` ("Commit 1"), and then Git would match the index to the state of "Commit 1" - in this case, it means that \`2.txt\` would no longer be part of the index.

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_mixed_2.png" alt="The second step of  is to match the index with the new " width="1164" height="439" loading="lazy">
*The second step of \`git reset --mixed\` is to match the index with the new \`HEAD\`*

It's time to create a new commit with the state of the original "Commit 2". This time you need to stage \`2.txt\` again before creating it:

\`\`\`sh
git add 2.txt
git commit -m "Commit 2.2"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_2_2.png" alt="Creating 'Commit 2.2'" width="1164" height="439" loading="lazy">
*Creating "Commit 2.2"*

Similarly to "Commit 2.1", I "name" this commit "Commit 2.2" to differentiate it from the original "Commit 2" or "Commit 2.1" - these commits result in the same state as the original "Commit 2", but they are different commit objects.

<h4 id="heading-git-reset-hard">\`git reset --hard\`

Go on, undo even more!

This time, use the \`--hard\` switch, and run:

\`\`\`sh
git reset --hard HEAD~1
\`\`\`

Again, Git starts with the \`--soft\` stage, setting whatever \`HEAD\` is pointing to (\`main\`), to \`HEAD~1\` ("Commit 1").

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_1-1.png" alt="The first step of  is the same as " width="1164" height="439" loading="lazy">
*The first step of \`git reset --hard\` is the same as \`git reset --soft\`*

Next, moving on to the \`--mixed\` stage, matching the index with \`HEAD\`. That is, Git undoes the staging of \`2.txt\`.

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_2-1.png" alt="The second step of  is the same as " width="1164" height="439" loading="lazy">
*The second step of \`git reset --hard\` is the same as \`git reset --mixed\`*

Next comes the \`--hard\` step, where Git goes even further and matches the working dir with the stage of the index. In this case, it means removing \`2.txt\` also from the working dir.

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_3.png" alt="The third step of  matches the state of the working dir with that of the index" width="1164" height="439" loading="lazy">
*The third step of \`git reset --hard\` matches the state of the working dir with that of the index*

So to introduce a change to Git, you have three steps: you change the working dir, the index, or the staging area, and then you commit a new snapshot with those changes. To undo these changes:

- If we use \`git reset --soft\`, we undo the commit step.
- If we use \`git reset --mixed\`, we also undo the staging step.
- If we use \`git reset --hard\`, we undo the changes to the working dir.

![](https://freecodecamp.org/news/content/images/2023/12/git_reset_switches.png" alt="The three main switches of " width="1005" height="290" loading="lazy">
*The three main switches of \`git reset\`*

### heading-real-life-scenarios">Real-Life Scenarios

<h4 id="heading-scenario-1">Scenario #1

So in a real-life scenario, write "I love Git" into a file (\`love.txt\`), as we all love Git 😍. Go ahead, stage and commit this as well:

\`\`\`sh
<span class="token builtin class-name">echo I love Git > love.txt
git add love.txt
git commit -m "Commit 2.3"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_2_3.png" alt="Creating 'Commit 2.3'" width="1157" height="439" loading="lazy">
*Creating "Commit 2.3"*

Also, save a tag so that you can get back to this commit later if needed:

\`\`\`sh
git tag scenario-1
\`\`\`

Oh, oops!

Actually, I didn't want you to commit it.

What I actually wanted you to do is write some more love words in this file before committing it.

What can you do?

Well, one way to overcome this would be to use \`git reset --mixed HEAD~1\`, effectively undoing both the committing and the staging actions you took:

\`\`\`sh
git reset --mixed HEAD~1
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/reset_commit_2_3.png" alt="Undoing the staging and committing steps" width="1166" height="439" loading="lazy">
*Undoing the staging and committing steps*

So \`main\` points to "Commit 1" again, and \`love.txt\` is no longer a part of the index. However, the file remains in the working dir. You can now add more content to it:

\`\`\`sh
<span class="token builtin class-name">echo and Gitting Things Done >> love.txt
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/adding_love_lyrics.png" alt="Adding more love lyrics" width="1151" height="439" loading="lazy">
*Adding more love lyrics*

Stage and commit your file:

\`\`\`sh
git add love.txt
git commit -m "Commit 2.4"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_2_4.png" alt="Introducing 'Commit 2.4'" width="1151" height="439" loading="lazy">
*Introducing "Commit 2.4"*

Well done!

You got this clear, nice history of "Commit 2.4" pointing to "Commit 1".

You now have a new tool in your toolbox, \`git reset\`.

This tool is super, super useful, and you can accomplish almost anything with it. It's not always the most convenient tool to use, but it's capable of solving almost any rewriting-history scenario if you use it carefully.

For beginners, I recommend using only \`git reset\` for almost any time you want to undo in Git. Once you feel comfortable with it, move on to other tools.

<h4 id="heading-scenario-2">Scenario #2

Let us consider another case.

Create a new file called \`new.txt\`; stage and commit:

\`\`\`sh
<span class="token builtin class-name">echo this is a new file > new.txt
git add new.txt
git commit -m "Commit 3"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_3.png" alt="Creating  and 'Commit 3'" width="1151" height="439" loading="lazy">
*Creating \`new.txt\` and "Commit 3"*

(Note: In the drawing I omitted the files from the repository to avoid clutter. Commit 3 includes \`1.txt\`, \`love.txt\` and \`new.txt\` at this stage).

Oops. Actually, that's a mistake. You were on \`main\`, and I wanted you to create this commit on a feature branch. My bad 😇

There are two most important tools I want you to take from this chapter. The *second* is \`git reset\`. The first and by far more important one is to whiteboard the current state versus the state you want to be in.

For this scenario, the current state and the desired state look like so:

![](https://freecodecamp.org/news/content/images/2023/12/scenario_2.png" alt="Scenario #2: current-vs-desired states" width="747" height="445" loading="lazy">
*Scenario #2: current-vs-desired states*

(Note: In following diagrams, I will refer to the current state as the "original" state - before starting the process of rewriting history.)

You will notice three changes:

<ol>
- \`main\` points to "Commit 3" (the blue one) in the current state, but to "Commit 2.4" in the desired state.
- \`feature_branch\` doesn't exist in the current state, yet it exists and points to "Commit 3" in the desired state.
- \`HEAD\` points to \`main\` in the current state, and to \`feature_branch\` in the desired state.

If you can draw this and you know how to use \`git reset\`, you can definitely get yourself out of this situation.

So again, the most important thing is to take a breath and draw this out.

Observing the drawing above, how do you get from the current state to the desired one?

There are a few different ways of course, but I will present one option only for each scenario. Feel free to play around with other options as well.

You can start by using \`git reset --soft HEAD~1\`. This would set \`main\` to point to the previous commit, "Commit 2.4":

\`\`\`sh
git reset --soft HEAD~1
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/scenario_2_1.png" alt="Changing ; 'Commit 3 is still there, just not reachable from " width="1164" height="449" loading="lazy">
*Changing \`main\`: "Commit 3" is still there, just not reachable from \`HEAD\`*

Peeking at the current-vs-desired diagram again, you can see that you need a new branch, right? You can use \`git switch -c feature_branch\` for it, or \`git checkout -b feature_branch\` (which does the same thing):

\`\`\`sh
git switch -c feature_branch
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/scenario_2_2.png" alt="Creating  branch" width="1167" height="450" loading="lazy">
_Creating \`feature_branch\` branch_

This command also updates \`HEAD\` to point to the new branch.

Since you used \`git reset --soft\`, you didn't change the index, so it currently has exactly the state you want to commit - how convenient! You can simply commit to \`feature_branch\`:

\`\`\`sh
git commit -m "Commit 3.1"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_3_1.png" alt="Committing to  branch" width="1167" height="450" loading="lazy">
_Committing to \`feature_branch\` branch_

And you got to the desired state.

<h4 id="heading-scenario-3">Scenario #3

Ready to apply your knowledge to additional cases?

Still on \`feature_branch\`, add some changes to \`love.txt\`, and create a new file called \`cool.txt\`. Stage them and commit:

\`\`\`sh
<span class="token builtin class-name">echo Some changes >> love.txt
<span class="token builtin class-name">echo Git is cool > cool.txt
git add love.txt
git add cool.txt
git commit -m "Commit 4"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_4.png" alt="The history, as well as the state of the index and the working dir after creating 'Commit 4'" width="1185" height="553" loading="lazy">
*The history, as well as the state of the index and the working dir after creating "Commit 4"*

Oh, oops, actually I wanted you to create two *separate* commits, one with each change...

Want to try this one yourself (before reading on)?

You can undo the committing and staging steps:

\`\`\`sh
git reset --mixed HEAD~1
\`\`\`

Following this command, the index no longer includes those two changes, but they're both still in your file system:

![](https://freecodecamp.org/news/content/images/2023/12/reset_commit_4.png" alt="Resulting state after using " width="1185" height="553" loading="lazy">
*Resulting state after using \`git reset --mixed HEAD~1\`*

So now, if you only stage \`love.txt\`, you can commit it separately:

\`\`\`sh
git add love.txt
git commit -m "Love"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_love.png" alt="Resulting state after committing the changes to " width="1162" height="529" loading="lazy">
*Resulting state after committing the changes to \`love.txt\`*

Then, do the same for \`cool.txt\`:

\`\`\`sh
git add cool.txt
git commit -m "Cool"
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/commit_separately.png" alt="Committing separately" width="1162" height="532" loading="lazy">
*Committing separately*

Nice!

<h4 id="heading-scenario-4">Scenario #4

To clear up the state, switch to \`main\` and use \`reset --hard\` to make it point to "Commit 3.1", while setting the index and the working dir to the state of "Commit 3.1":

\`\`\`sh
git checkout main
git reset --hard <SHA_OF_COMMIT_3_<span class="token file-descriptor important">1>
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/reset_main_commit_3_1.png" alt="Resetting  to 'Commit 3.1'" width="1140" height="522" loading="lazy">
*Resetting \`main\` to "Commit 3.1"*

Create another file (\`another.txt\`) with some text, and add some text to \`love.txt\`. Stage both changes, and commit them:

\`\`\`sh
<span class="token builtin class-name">echo Another file > another.txt
<span class="token builtin class-name">echo More love >> love.txt
git add another.txt
git add love.txt
git commit -m "Commit 4.1"
\`\`\`

This should be the result:

![](https://freecodecamp.org/news/content/images/2023/12/commit_more_changes.png" alt="A new commit" width="1150" height="544" loading="lazy">
*A new commit*

Oops...

So this time, I wanted it to be on another branch, but not a new branch, rather - an already-existing branch.

So what can you do?

I'll give you a hint. The answer is really short and really easy. What do we do first?

No, not \`reset\`. We *draw*. That's the first thing to do, as it would make everything else so much easier. So this is the current state:

![](https://freecodecamp.org/news/content/images/2023/12/scenario_4.png" alt="The new commit on  appears blue" width="1153" height="532" loading="lazy">
*The new commit on \`main\` appears blue*

And the desired state?

![](https://freecodecamp.org/news/content/images/2023/12/scenario_4_1-1.png" alt="We want the 'blue' commit to be on another, , branch\\label{fig-scenario-4-1}" width="1172" height="743" loading="lazy">
*We want the "blue" commit to be on another, \`existing\`, branch*

How do you get from the current state to the desired state, what would be easiest?

One way would be to use \`git reset\` as you did before, but there is another way that I would like you to try.

Note that the following commands indeed assume the branch \`existing\` exists on your repository, yet you haven't created it earlier. To match a state where this branch actually exists, you can use the following commands:

\`\`\`sh
git checkout <SHA_OF_COMMIT_<span class="token file-descriptor important">1>
git checkout -b existing
<span class="token builtin class-name">echo "Hello" > x.txt
git add x.txt
git commit -m "Commit X"
git checkout <SHA_OF_COMMIT_3_<span class="token file-descriptor important">1> -- love.txt
git commit -m "Commit Y"
git checkout main
\`\`\`

(The command \`git checkout <SHA_OF_COMMIT_3_1> -- love.txt\` copies the contents of \`love.txt\` from "Commit 3.1" to the index and the working dir, so that you can commit it on the \`existing\` branch. We need the state of \`love.txt\` on "Commit Y" to be the same as of "Commit 3.1" to avoid conflicts.)

Now your history should match the one shown in the picture with the caption "We want the "blue" commit to be on another, \`existing\`, branch".

First, move \`HEAD\` to point to existing branch:

\`\`\`sh
git switch existing
\`\`\`

![](https://freecodecamp.org/news/content/images/2023/12/switch_existing.png" alt="Switch to the  branch" width="1760" height="736" loading="lazy">
*Switch to the \`existing\` branch*

Intuitively, what you want to do is take the changes introduced in "Commit 4.1", and apply these changes ("copy-paste") on top of \`existing\` branch. And Git has a tool just for that.

To ask Git to take the changes introduced between a commit and its parent commit and just apply these changes on the active branch, you can use \`git cherry-pick\`, a command we introduced in <a href="#chapter-8-understanding-git-rebase">chapter 8</a>. This command takes the changes introduced in the specified revision and applies them to the state of the active commit. Run:

\`\`\`sh
git cherry-pick <SHA_OF_COMMIT_4_<span class="token file-descriptor important">1>
\`\`\`

You can specify the SHA-1 identifier of the desired commit, but you can also use \`git cherry-pick main\`, as the commit whose changes you are applying is the one \`main\` is pointing to.

\`git cherry-pick\` also creates a new commit object, and updates the active branch to point to this new object, so the resulting state would be:

![](https://freecodecamp.org/news/content/images/2023/12/cherry_pick.png" alt="The result after using " width="1760" height="736" loading="lazy">
*The result after using \`git cherry-pick\`*

I mark the commit as "Commit 4.2" since it has a different timestamp, parent and SHA-1 value than "Commit 4.1", though the changes it introduces are the same.

You made good progress - the desired commit is now on the \`existing\` branch! But we don't want these changes to exist on \`main\` branch. \`git cherry-pick\` only applied the changes to the existing branch. How can you remove them from \`main\`?

One way would be to switch back to \`main\`, and then \`reset\` it:

\`\`\`sh
git switch main
git reset --hard HEAD~1
\`\`\`

And the result:

![](https://freecodecamp.org/news/content/images/2023/12/reset_cherry_pick.png" alt="The resulting state after resetting " width="1760" height="736" loading="lazy">
*The resulting state after resetting \`main\`*

You did it!

Note that \`git cherry-pick\` actually computes the difference between the specified commit and its parent, and then applies the difference to the active commit. This means that sometimes, Git won't be able to apply those changes due to a conflict.

Also, note that you can ask Git to \`cherry-pick\` the changes introduced in any commit, not only commits referenced by a branch.

### heading-recap-git-reset">Recap - Git Reset

In this chapter, we learned how \`git reset\` operates, and clarified its three main modes of operation:

- \`git reset --soft <commit>\`, which changes whatever \`HEAD\` is pointing to - to \`<commit>\`.
- \`git reset --mixed <commit>\`, which goes through the \`--soft\` stage, and also sets the state of the index to match that of \`HEAD\`.
- \`git reset --hard <commit>\`, which goes through the \`--soft\` and \`--mixed\` stages, and then sets the state of the working dir to match that of the index.

You then applied your knowledge about \`git reset\` to solve some real-life issues that arise when using Git.

By understanding the way Git operates, and by whiteboarding the current state versus the desired state, you can confidently tackle all kinds of scenarios.

In the future chapters, we will cover additional Git commands and how they can help us solve all kinds of undesired situations.

`)])}const I=p(v,[["render",T],["__file","part-2-branching-and-integrating-changes.html.vue"]]),G=JSON.parse(`{"path":"/freecodecamp.org/gitting-things-done-book/part-2-branching-and-integrating-changes.html","title":"Part 2 - Branching and Integrating Changes","lang":"en-US","frontmatter":{"lang":"en-US","title":"Part 2 - Branching and Integrating Changes","description":"Article(s) > (3/6) Gitting Things Done – A Visual and Practical Guide to Git [Full Book]","category":["Git","Article(s)"],"tag":["blog","freecodecamp.org","git"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > (3/6) Gitting Things Done – A Visual and Practical Guide to Git [Full Book]"},{"property":"og:description","content":"Part 2 - Branching and Integrating Changes"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/gitting-things-done-book/part-2-branching-and-integrating-changes.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/gitting-things-done-book/part-2-branching-and-integrating-changes.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Part 2 - Branching and Integrating Changes"}],["meta",{"property":"og:description","content":"Article(s) > (3/6) Gitting Things Done – A Visual and Practical Guide to Git [Full Book]"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/size/w2000/2023/12/Gitting-Things-Done-Cover-with-Photo.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/size/w2000/2023/12/Gitting-Things-Done-Cover-with-Photo.png"}],["meta",{"name":"twitter:image:alt","content":"Part 2 - Branching and Integrating Changes"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"git"}],["meta",{"property":"article:published_time","content":"2024-01-08T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Part 2 - Branching and Integrating Changes\\",\\"image\\":[\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_definition.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/file_txt_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/new_file_txt_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/diff_format_lines.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/patch_asymmetric.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_2.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_1-1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/diff_structure_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/diff_structure_2.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/diff_structure_3.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/rm_diff.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_1-2.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/diff_example_changed.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_1-3.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/diff_structure_4.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_status_branch_diffs.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/nano_my_file.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/nano_my_file_after_change.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/diff_my_file.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/repo_state_commit_2_staging_area.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/repo_state_commit_2_git_diff-1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/nano_new_file.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/new_file_working_dir.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/repo_state_commit_3.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/new_file_edited.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/repo_state_start_end.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/add_p.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/repo_state_after_add_p.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_3.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_cached.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_HEAD.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_diagram_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_HEAD_1_HEAD.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_HEAD_HEAD_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_diagram_2.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_show_HEAD.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_diff_diagram_3.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/my_patch.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/new_file_after_applying.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/testing_file.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/testing_file_modified.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/testing_file_diff.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/testing_file_added_first_line.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/new_patch.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/testing_file_modifying_second_line.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_apply_new_patch.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_apply_new_patch_verbose.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_apply_c1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/new_patch-1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/commit_graph_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/commits_1_3.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_branch_new_feature.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_checkout_new_feature.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/code_py_before_changes.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/code_py_new_feature.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/commits_1_4.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_merge_new_feature.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_ff_merge.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/history_after_reset_after_merge.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_lol_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_log_after_lol_1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/create_john_branch.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/history_after_commit_6.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/merge_after_commit_6.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/merge_after_commit_6_paul_branch.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/3_way_merge.png\\\\\\" alt=\\\\\\"The three steps of the 3-way merge algorithm: (1\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_status_apply_john.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/create_merge_commit.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/history_after_reset_to_merge_commit_git_lol.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/git_show_HEAD-.png\\\\\\" alt=\\\\\\" (same as \\",\\"https://freecodecamp.org/news/content/images/2023/12/compare_rebase_merge.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/history_after_rebase_3-1.png\\",\\"https:<span class=\\\\\\"hljs-comment\\\\\\">//www.freecodecamp.org/news/content/images/2023/12/compare_rebase_merge-1.png\\",\\"https://freecodecamp.org/news/content/images/2023/12/3_trees.png\\"],\\"datePublished\\":\\"2024-01-08T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2024-01-08T00:00:00.000Z","isOriginal":false,"cover":"https://freecodecamp.org/news/content/images/size/w2000/2023/12/Gitting-Things-Done-Cover-with-Photo.png","gitInclude":[]},"headers":[{"level":2,"title":"Chapter 6 - Diffs and Patches","slug":"chapter-6-diffs-and-patches","link":"#chapter-6-diffs-and-patches","children":[{"level":3,"title":"Git Diff's History","slug":"git-diff-s-history","link":"#git-diff-s-history","children":[]},{"level":3,"title":"Time to Get Hands-On","slug":"time-to-get-hands-on","link":"#time-to-get-hands-on","children":[]},{"level":3,"title":"The Structure of a Diff","slug":"the-structure-of-a-diff","link":"#the-structure-of-a-diff","children":[]},{"level":3,"title":"How to Produce Diffs","slug":"how-to-produce-diffs","link":"#how-to-produce-diffs","children":[]},{"level":3,"title":"How to Apply Patches","slug":"how-to-apply-patches","link":"#how-to-apply-patches","children":[]},{"level":3,"title":"Recap - Git Diff and Patch","slug":"recap-git-diff-and-patch","link":"#recap-git-diff-and-patch","children":[]}]},{"level":2,"title":"Chapter 7 - Understanding Git Merge","slug":"chapter-7-understanding-git-merge","link":"#chapter-7-understanding-git-merge","children":[{"level":3,"title":"What is a Merge in Git?","slug":"what-is-a-merge-in-git","link":"#what-is-a-merge-in-git","children":[]},{"level":3,"title":"Time to Get Hands-on","slug":"time-to-get-hands-on-1","link":"#time-to-get-hands-on-1","children":[]},{"level":3,"title":"Time For a More Advanced Case","slug":"time-for-a-more-advanced-case","link":"#time-for-a-more-advanced-case","children":[]},{"level":3,"title":"How to Perform a Three-way Merge in Git","slug":"how-to-perform-a-three-way-merge-in-git","link":"#how-to-perform-a-three-way-merge-in-git","children":[]},{"level":3,"title":"Quick Recap of a Three-way Merge","slug":"quick-recap-of-a-three-way-merge","link":"#quick-recap-of-a-three-way-merge","children":[]},{"level":3,"title":"Moving on","slug":"moving-on","link":"#moving-on","children":[]}]}],"readingTime":{"minutes":88.97,"words":26691},"filePathRelative":"freecodecamp.org/gitting-things-done-book/part-2-branching-and-integrating-changes.md","localizedDate":"January 8, 2024","excerpt":"\\n"}`);export{I as comp,G as data};
