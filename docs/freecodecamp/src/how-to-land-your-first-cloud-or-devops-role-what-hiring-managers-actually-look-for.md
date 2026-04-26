---
lang: en-US
title: "How to Land Your First Cloud or DevOps Role: What Hiring Managers Actually Look For"
description: "Article(s) > How to Land Your First Cloud or DevOps Role: What Hiring Managers Actually Look For"
icon: fas fa-user-tie
category:
  - DevOps
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - career
  - tip
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Land Your First Cloud or DevOps Role: What Hiring Managers Actually Look For"
    - property: og:description
      content: "How to Land Your First Cloud or DevOps Role: What Hiring Managers Actually Look For"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-land-your-first-cloud-or-devops-role-what-hiring-managers-actually-look-for.html
prev: /devops/articles/README.md
date: 2026-04-30
isOriginal: false
author:
  - name: Tolani Akintayo
    url: https://freecodecamp.org/news/author/tolani-akintayo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/374e807b-a67f-4f04-a639-dfa230b0ba5f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "DevOps > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Land Your First Cloud or DevOps Role: What Hiring Managers Actually Look For"
  desc="You've completed three AWS courses. You have notes from a dozen Docker tutorials. You know what Kubernetes is, what CI/CD means, and you can explain Infrastructure as Code without hesitating. And yet "
  url="https://freecodecamp.org/news/how-to-land-your-first-cloud-or-devops-role-what-hiring-managers-actually-look-for"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/374e807b-a67f-4f04-a639-dfa230b0ba5f.png"/>

You've completed three AWS courses. You have notes from a dozen Docker tutorials. You know what Kubernetes is, what CI/CD means, and you can explain Infrastructure as Code without hesitating.

And yet the applications go out, and nothing comes back.

This is one of the most frustrating experiences in tech. You're genuinely learning, genuinely putting in the time, and you have nothing to show for it in terms of results. You start to wonder if the market is too competitive, if you need one more certification, or if there's some hidden door everyone else found that you're missing.

The truth is simpler and more actionable than any of that: **hiring managers can't see your YouTube watch history. They can see your GitHub.** Most beginners optimize for learning. Hired candidates optimize for proof.

In this guide, you'll get an honest breakdown of the nine factors hiring managers actually evaluate when they look at a junior cloud or DevOps candidate and a concrete 90-day plan to address each one. By the end, you'll know exactly where you stand and exactly what to do next.

---

## The Three Patterns That Keep Beginners Stuck

### Pattern 1: The Tutorial Loop

Week 1: You watch eight hours of Docker content. Week 2: You start an AWS course and get 70% through. Week 3: A Kubernetes series looks interesting, so you start that instead. Week 4: You open LinkedIn and wonder why you're not getting callbacks.

Watching tutorials feels like progress. It's comfortable, passive, and has no failure state. Nothing breaks. Nothing goes wrong.

The problem is that it produces nothing a hiring manager can evaluate. Courses and certifications tell an employer what you've been exposed to. Your GitHub tells them what you can actually do.

### Pattern 2: The Theory-Practice Gap

You can explain CI/CD fluently. You've read the Kubernetes documentation. You understand the conceptual difference between a container and a virtual machine.

But you've never taken a simple application, containerized it, connected it to a pipeline, and deployed it to a cloud server with a real URL that someone can visit.

In an interview, "I understand how it works" and "I have built this and here is the link" are not equivalent answers. Hiring managers hear the first version from hundreds of candidates. The second version gets callbacks.

### Pattern 3: Silent Learning

This one is perhaps the most painful pattern because the learning is real. You're putting in the work every day but nobody knows. No GitHub activity. No LinkedIn posts. No community presence. Just cold applications sent from job boards to ATS systems that filter you out before a human ever sees your name.

The hard truth: people get hired through people. A hiring manager who has seen your LinkedIn post about a problem you solved is significantly more likely to give your résumé serious attention than a stranger who applied through a portal.

---

## What Hiring Managers Are Actually Evaluating

I've grouped the nine factors that follow into three buckets: **Mindset**, **Execution**, and **Visibility**. The order matters: mindset shapes how you execute, and execution is what powers visibility.

| Bucket | Covers | Factors |
| --- | --- | --- |
| **Mindset** | How you think about problems and your career | Factors 2, 7, 8, 9 |
| **Execution** | What you actually build and demonstrate | Factors 1, 3 |
| **Visibility** | Whether the right people know you exist | Factors 4, 5, 6 |

Let's go through each one.

---

## Factor 1: Proof of Work (The Non-Negotiable)

If there's one thing to take from this entire article, it's this: **no portfolio means no serious consideration.** The most technically capable candidate in the applicant pool is invisible without proof of work.

This isn't about impressing anyone with complexity. It's about demonstrating that you can take a system from zero to deployed, documented, and working.

Here's the checklist every portfolio project should meet before you consider it done:

- **It's deployed**: there's a real URL you can share, not "it works on my machine"
- **It has a CI/CD pipeline**: code changes are automatically tested and deployed
- **Infrastructure is defined as code**: not manually clicked together in the AWS console
- **It has monitoring and alerting**: you know when it breaks before users tell you
- **It's documented**: a README explains what it does, how to run it, and how it works
- **It's on GitHub publicly**: with real commit history showing iterative work

If your project meets all six criteria, you have proof of work. If it meets four of six, you have a project in progress. Finish it before you start applying.

### The Three Projects That Cover Everything

You don't need ten projects. You need two to three projects that together demonstrate the full range of DevOps skills.

#### Project 1 : The Full-Stack Deploy Pipeline

This is the foundational DevOps project every beginner should build first.

Take any simple web application – a Python Flask app, a Node.js API, or even a static site. Containerize it with Docker. Write a CI/CD pipeline that runs tests, builds the Docker image, and deploys to a cloud server automatically on every push to the main branch. You can also set up Nginx as a reverse proxy and add an uptime monitor (UptimeRobot has a free tier).

Tools: GitHub Actions, Docker, AWS EC2 or [<VPIcon icon="fas fa-globe"/>Render.com](http://Render.com), Nginx.

Why it matters to a hiring manager: it proves you can automate a full deployment workflow end-to-end. The hiring manager can visit your URL, see it running, and inspect your pipeline history.

This single project puts you ahead of most applicants who only have course completion screenshots.

#### Project 2: Infrastructure as Code with Terraform

Write Terraform code that provisions a complete environment: a VPC, public and private subnets, an EC2 instance with properly scoped security group rules, and an S3 bucket for remote state. Destroy it and recreate it from scratch to prove the code actually works. Add a GitHub Actions workflow that runs `terraform plan` on pull requests and `terraform apply` on merge to main.

Tools: Terraform, AWS (or Azure/GCP), GitHub Actions.

Why it matters: Infrastructure as Code with Terraform is a required skill at almost every company running cloud infrastructure. Showing you can write, version-control, and automate Terraform demonstrates a core professional competency.

#### Project 3: Monitoring and Observability Stack

Deploy a monitoring stack using Docker Compose: Prometheus scraping metrics from your application and the host, Grafana dashboards showing CPU, memory, request rates, and error rates, and Alertmanager configured to send alerts to Slack or email when thresholds are crossed. Connect this to your Project 1 application so the pipeline deploys and the monitoring watches it.

Tools: Prometheus, Grafana, Alertmanager, Node Exporter, Docker Compose.

Why it matters: most beginner portfolios have zero observability work. This project immediately signals that you understand production engineering, not just deployment. Any senior DevOps engineer or SRE reviewing your application will notice it and it will set you apart.

![GitHub profile showing three pinned DevOps portfolio repositories with descriptive names ](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/da9e25be-9b59-48c8-9cf0-9cfdb050c277.png)

---

## Factor 2: System-Level Thinking

This is the mindset that separates a DevOps engineer from someone who just knows a collection of tools. System-level thinking means you can see the whole picture, not just the part you happen to be working on at any given moment.

Here's the mental test hiring managers are running throughout your interview: *can you trace a user request from the moment they click a button to the moment they see a response, and explain what happens at every layer in between?*

Here's the full journey of a web request, the map of modern infrastructure every DevOps engineer needs to understand:

| Step | Layer | What's happening and what can go wrong |
| --- | --- | --- |
| 1 | User's Browser | The user types a URL. The browser needs to find the server. |
| 2 | DNS Resolution | The domain is translated into an IP address. DNS misconfigurations mean users can't reach you at all. |
| 3 | CDN / Edge Network | Traffic hits a CDN (Cloudflare, CloudFront) first. Static assets are served from the nearest edge. SSL terminates here. |
| 4 | Load Balancer | Routes the request to an available application server. If all targets are unhealthy, users get 502/503 errors. |
| 5 | Compute / Application Servers | The application code runs here in containers, on VMs, or in server-less functions. Business logic executes. |
| 6 | Database Layer | The application reads from or writes to a database. Slow queries or a full disk causes slow responses or outages. |
| 7 | Cache Layer | Redis or Memcached caches frequently-read data. Cache misses cause extra database load. |
| 8 | Response Returns | The response travels back through the stack and the user sees the result. |
| 9 | Logging and Monitoring | Every step above should emit logs and metrics. Good monitoring alerts you before users notice a problem. |

Why does this matter in an interview? Consider two candidates answering the question: *"Tell me about a time something broke in production."*

> Candidate A: "The website was down."
> 
> Candidate B: "The load balancer health checks were failing because the app containers were running out of memory due to a memory leak introduced in the previous deploy. We identified it via memory metrics in Grafana, rolled back, and added a memory limit to the container spec."

Same incident. Completely different answer. System-level thinking is what makes the difference.

---

## Factor 3: Software Engineering Fundamentals

Many beginners rush to learn Kubernetes and Terraform before mastering the foundations that make those tools make sense. This creates a knowledge structure that looks impressive but has no solid base underneath it.

Here are the fundamentals that actually matter and what to do if you have a gap in any of them:

### 1. Linux and the Command Line

DevOps tools run on Linux. CI/CD jobs run in Linux containers. SSH is the front door to every server. If the terminal makes you uncomfortable, you're not ready for a production environment. This is not a preference, it's a prerequisite.

Start with daily Linux practice. The [Linux Foundation's free introductory materials](https://training.linuxfoundation.org/training/introduction-to-linux/) are a solid starting point. And here's a [**solid freeCodeCamp course on Linux basics.**](/freecodecamp.org/learn-the-basics-of-the-linux-operating-system.md)

### 2. Networking Fundamentals

DNS, TCP/IP, HTTP/HTTPS, load balancing, firewalls, VPCs, subnets these concepts appear in every cloud architecture. Without them, Terraform and Kubernetes are magic boxes. Study the request flow in Factor 2 above until you can draw it from memory without looking.

Here's a [**computer networking fundamentals course**](/freecodecamp.org/computer-networking-fundamentals.md) to get you started.

### 3. Scripting: Bash and Python

CI/CD pipelines are scripts. Automation is scripting. If you cannot write a Bash script that reads a config file, calls an API, and handles errors gracefully your automation ceiling is very low. Fix this by writing one small, useful script every week. Solve real problems with code.

Here's a helpful tutorial on [**shell scripting in Linux for beginners**](/freecodecamp.org/shell-scripting-crash-course-how-to-write-bash-scripts-in-linux.md).

### 4. Git and Version Control

Not just `git commit` and `git push`. Branching strategies, pull requests, merge conflicts, rebasing, and tagging releases are all standard practice in professional DevOps teams. Use Git for everything including your personal learning notes. Practice branching workflows intentionally.

Here's a [**full book on all the Git basics**](/freecodecamp.org/gitting-things-done-book.md) (and some more advanced topics, too) you need to know.

### 5. Docker and Containers

Docker is the universal packaging format for modern software. Understanding layers, multi-stage builds, volumes, networking, and container security is the floor not the ceiling. Every project you build should be containerized. Write your Dockerfiles by hand instead of copying them.

Here's a course on [**Docker and Kubernetes**](/freecodecamp.org/learn-docker-and-kubernetes-hands-on-course.md) to get you started,

---

## Factor 4: Communication Skills

Technical skills set your ceiling. Communication skills determine how fast you reach it. This is the most consistently underestimated factor among beginner DevOps candidates.

Two candidates with identical technical ability will have very different career outcomes based on how clearly they communicate. Here's what that looks like in practice:

**Architecture explanation**: Can you describe how your project works to someone who has never seen it? Can you draw the architecture on a whiteboard and walk someone through your design decisions and the trade-offs you made?

**Trade-off articulation**: *"I chose X over Y because..."* is one of the most powerful phrases in a technical interview. It shows you understand that every decision has pros and cons and you made a conscious, reasoned choice rather than just copying a tutorial.

**Written documentation**: A README is your project's cover letter. A well-written README with clear setup instructions, an architecture diagram, and documented decisions demonstrates engineering maturity that most beginners don't show.

Here's a quick test: open your most recent project on GitHub and read the README as if you're a hiring manager seeing it for the first time. Does it answer these questions?

- What does this project do, and why did you build it?
- What does the architecture look like?
- How do I run this locally, and how do I deploy it?
- What decisions did you make, and why?
- What would you improve if you continued working on it?

If you answered "no" to more than two of those rewrite the README before applying anywhere. This single action will meaningfully improve your response rate.

**Interview communication**: Hiring managers assess communication throughout the entire interview not just your answers. Thinking out loud, structuring your responses, and admitting uncertainty honestly are all evaluated.

---

## Factor 5: Consistency Over Intensity

Hiring managers are pattern recognition machines. They look at your GitHub contribution graph, your LinkedIn activity, and your learning trajectory and form an impression before reading a single word on your résumé.

A binge-learning approach, 10-hour weekends followed by weeks of nothing produces a GitHub graph that tells the wrong story. Thirty minutes of focused daily practice for six months beats a monthly 10-hour binge. At the six-month mark, the daily practitioner has 90 hours of focused work. The binge learner has 60 with significantly worse retention.

![GitHub contribution graph showing 12 months of consistent activity with regular commits across the year](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/1315bb8d-9e4e-4f84-836f-4e02b83c75ce.webp)

Here's how to build consistency in practice:

- Pick a time slot in your day that you will protect. Thirty minutes is enough to make progress.
- Define a four-week learning sprint with a specific goal, not "learn Terraform" but "build and deploy a VPC with Terraform and write the README."
- Keep a private learning journal: date, what you studied, what you built, what confused you.
- When the sprint ends, evaluate what you built and plan the next one.

What to avoid: declaring publicly on LinkedIn that you're "grinding DevOps full time" and then disappearing for six weeks. The absence is noticed. Only commit publicly to what you will actually sustain.

---

## Factor 6: Networking and Visibility

This is the factor most beginners resist most, and the one that makes the biggest practical difference in time-to-hire.

Most DevOps jobs are filled through people referrals, community connections, LinkedIn conversations. A warm introduction from someone who has seen your work outweighs fifty cold applications every time.

Here are three ways to build visibility without it feeling performative:

### Community Engagement

Join communities where DevOps engineers actually talk: AWS User Groups, local DevOps meetups, DevOps Discord servers, Reddit communities like r/devops and r/kubernetes. You don't need to be the expert. Ask specific questions, answer what you genuinely know, and show up consistently. After three to six months, people will recognize your name.

### LinkedIn Content

Post once per week about something you learned, built, or got stuck on. Not marketing – documentation. A post that says *"This week I configured Prometheus alerting for a Docker Compose stack. Here's what tripped me up and how I solved it"* attracts recruiters, leads to conversations, and builds a searchable record of your growth over time.

### Asking Good Questions in Public

When you get stuck and figure it out, write it up. Post the solution in the same community where you asked the question. Answer someone else's version of the same question later. You position yourself as a helpful, engaged learner, exactly who hiring managers want to hire.

Here's a concrete three-month visibility sprint to follow:

| Timeframe | Action |
| --- | --- |
| Week 1-2 | Update your LinkedIn headline: "Cloud / DevOps Engineer in Training │ Building with AWS, Docker, Terraform". Connect with 20 people in DevOps engineers, recruiters, hiring managers. Add a short personal note when connecting. |
| Week 3-4 | Write your first LinkedIn post. Document something you built or learned this week. Keep it honest and specific. 150–200 words is enough. |
| Month 2 | Join one community. Introduce yourself. Answer one question per week. |
| Month 3 | Post consistently once per week. Engage with others' posts. Start appearing in recruiter searches. |

By month three, recruiters searching for "DevOps" in your location will encounter your activity. Some of the best entry-level DevOps opportunities come from exactly this kind of low-pressure visibility.

---

## Factor 7: Ownership Mindset

This factor is less about personality type and more about observable behavior. Hiring managers are looking for evidence that you finish what you start not just that you start things.

Here's what the contrast looks like:

| What hiring managers frequently see | What hiring managers want to see |
| --- | --- |
| "I started a Kubernetes project and encountered a lot of issues" | "Here is a complete project. It deploys to AWS, has a CI/CD pipeline, is monitored, and you can access it at this URL right now." |
| "I was working through a Terraform course, learnt a lot about XYZ." | "I finished it, documented it, and wrote a post about what I learned." |

Ownership mindset has three components. First, finish things: a complete, simple project is worth ten times more than ten incomplete complex ones. Second, take responsibility without blame when something breaks: ownership means identifying the cause, fixing it, and adding monitoring so it doesn't happen again. Third, self-direct your learning you don't wait for someone to tell you what to learn next. You see a gap, identify how to close it, and close it. This is what "junior who can work independently" actually means in job descriptions.

---

## Factor 8: Business Awareness

Technical skill gets you in the door. Business awareness keeps you there and accelerates your career.

The core question hiring managers are testing is: *can you connect your technical decisions to cost, uptime, and user impact?* Infrastructure decisions are business decisions. Cloud costs are typically the second-largest engineering expense at most companies after salaries. A misconfigured auto-scaling group or a forgotten large EC2 instance can burn thousands of dollars overnight.

Here are a few benchmark questions worth being able to answer comfortably:

- If your company has a 99.9% SLA, how many minutes of downtime per month is that? (About 43 minutes.)
- If you move workloads from on-demand EC2 instances to Reserved Instances, what's the approximate cost saving? (Around 40–60%.)
- If your CI/CD pipeline takes 45 minutes per build and you run 20 builds per day, how much developer wait time does that represent weekly?

Most junior candidates can't answer these fluently in an interview. Candidates who can stand out immediately not because the questions are hard, but because so few people bother to connect infrastructure and business.

The simple habit to build: whenever you describe a technical decision in your project documentation or in an interview, add the business dimension. "I configured auto-scaling" becomes "I configured auto-scaling to handle traffic spikes, which eliminated the cost of over-provisioning and reduced our estimated monthly cloud spend by approximately $X."

---

## Factor 9: Learning Agility

Everyone claims to be a fast learner. It's the most overused phrase in technology job applications. Here's how to make it actually mean something.

Saying "I'm a fast learner" in an interview is table stakes. The question is whether you can prove it. Proof sounds like this: *"I had never used GitHub Actions before. I needed a CI/CD pipeline for a project I was building. In 48 hours, I had a working pipeline that runs tests, builds a Docker image, and deploys to AWS."*

What makes that credible: it names a specific tool, a specific timeframe, and a specific outcome. There is a GitHub repository with a commit history and a working pipeline that a hiring manager can actually look at.

Learning agility is not about knowing many tools shallowly. It's about picking up new tools quickly because you deeply understand the underlying concepts. Tool names change every few years. Concepts networking, automation, observability, reliability do not.

To build a concrete track record of learning agility: once a month, pick one tool you haven't used. Follow its quick-start guide. Build something small. Document what was difficult. Post about it. This is your learning agility portfolio visible, dated, and specific.

---

## Your 90-Day Action Plan

Here is a concrete, sequential plan that takes you from where you are now to your first DevOps interview-ready state.

### Month 1: Build Your Foundation

Focus entirely on Project 1 from the Proof of Work section. Build it completely. Deploy it. Get the live URL. Don't start Project 2 until Project 1 meets all six checklist criteria.

Alongside the build: 30 minutes of Linux and Bash scripting practice daily. This isn't optional, it's the foundation everything else runs on.

### Month 2: Expand Your Execution and Start Your Visibility

Begin Project 2 (Terraform IaC). Write your first LinkedIn post, it doesn't need to be polished, it needs to be specific. Join one community and introduce yourself.

### Month 3: Complete the Portfolio and Document Everything

Finish all three projects to full checklist standard. Polish every README. Add architecture diagrams. Optimize your GitHub profile, pin your three best repos, write a profile README that describes who you are and what you build, and add links to your live project URLs.

### Month 4 Onward: Apply with Strategy

Don't start applying before month four. Apply with real proof of work in hand. Target five to ten quality applications per week rather than spraying a hundred. Include your GitHub and your best project's live URL in every application. For roles at companies where you have a community connection, reach out to that person before applying.

Track every application in a spreadsheet: company, role, date applied, status, outcome, notes. After thirty applications, you'll have enough data to see what's working and what isn't.

Here's the full 90-day breakdown:

| Timeframe | Focus | Milestone |
| --- | --- | --- |
| Week 1-2 | Linux fundamentals. Set up GitHub profile. Start Project 1. | Foundation |
| Week 3-4 | Complete Project 1 CI/CD pipeline. Deploy. Get live URL. Write README. | First Proof of Work |
| Month 2 | Begin Project 2. First LinkedIn post. Join one community. | Visibility begins |
| Month 2-3 | Complete Project 2. Scaffold monitoring (Project 3). Post weekly on LinkedIn. | Building momentum |
| Month 3 | Finish all 3 projects to checklist standard. Polish READMEs and GitHub profile. | Portfolio complete |
| Month 4+ | Apply strategically. Continue posting and community engagement. | Active job search |

---

## Honest Self-Assessment: Where Do You Stand?

Go through each statement below. Be completely honest: this is for you, not anyone else.

| Statement | Action if the answer is No |
| --- | --- |
| I can explain a web request end-to-end (DNS → load balancer → compute → database → logs) | Study Factor 2 until you can draw this from memory |
| I have at least one deployed project with a live URL | This is Priority 1. Nothing else matters more right now. |
| My best project has a CI/CD pipeline that auto-deploys on push | Add this to your existing project this week |
| I have written infrastructure as code (Terraform or CloudFormation) | Project 2 is your next build target |
| My projects have READMEs that explain architecture and decisions | Spend one hour today rewriting your README |
| I have posted about my learning on LinkedIn in the last 30 days | Post something today, document what you built last week |
| I am part of at least one DevOps community | Join r/devops or an AWS Discord server this week |
| I can write a Bash script that solves a real automation problem | 30 minutes of daily scripting practice for the next 30 days |
| I can explain what I built, why I made each decision, and what I'd change | Practice saying this out loud about each project until it's fluent |

Count your "no" answers. Each one is a specific, actionable gap, not a vague sense of being behind. That's the difference between this self-assessment and the anxious feeling of "I'm not ready yet." You're not behind. You just have a prioritized list of what to build next.

---

## Conclusion

Here's what you know now that most beginners still don't:

The gap between you and a DevOps job isn't a gap in certifications, a gap in courses completed, or a gap in the number of tools you've heard about. It's a gap in proof of work, visibility, and the consistency with which you execute.

Hiring managers aren't looking for someone who has watched everything. They're looking for someone who has built something, documented it, deployed it, monitored it, and can clearly explain every decision they made along the way.

The path isn't secret. It's just work. Build two to three complete projects that meet the full checklist. Document everything. Show up consistently in communities and on LinkedIn. Apply with strategy. Iterate based on feedback.

If you want a production-grade reference to support your DevOps journey complete with real Terraform modules, CI/CD workflow templates, infrastructure runbooks, and platform engineering patterns used in real startup environments [<VPIcon icon="fas fa-globe"/>The Startup DevOps Field Guide](https://coachli.co/tolani-akintayo/PR-H4oQS) was built for exactly this stage of your career.

The information gap between you and your first DevOps role is smaller than you think. The execution gap is where the work is. Start today.

::: info References and Recommended Resources

<SiteInfo
  name="DevOps Roadmap: Learn to become a DevOps Engineer or SRE"
  desc="Step by step guide for DevOps, SRE or any other Operations Role in 2026"
  url="https://roadmap.sh/devops/"
  logo="https://roadmap.sh/manifest/favicon.ico"
  preview="https://roadmap.sh/og/roadmap/devops"/>

<SiteInfo
  name="DORA | Get Better at Getting Better"
  desc="DORA is a long running research program that seeks to understand the capabilities that drive software delivery and operations performance. DORA helps teams apply those capabilities, leading to better organizational performance."
  url="https://dora.dev/"
  logo="https://dora.dev/favicon-16x16.png"
  preview="https://dora.dev/img/misc/dora_social_image.png"/>

<SiteInfo
  name="Introduction to Linux (LFS101) | Linux Foundation Education"
  desc="Develop a good working knowledge of Linux using both the graphical interface and command line with this free introduction to Linux course."
  url="https://training.linuxfoundation.org/training/introduction-to-linux//"
  logo="https://training.linuxfoundation.org/wp-content/uploads/2018/07/cropped-unnamed-192x192.png"
  preview="https://training.linuxfoundation.org/wp-content/uploads/2020/09/LFS101_sg.png"/>

<SiteInfo
  name="The Phoenix Project"
  desc="The bestselling book that introduced the software development world to the theory of DevOps and the Three Ways."
  url="https://itrevolution.com/product/the-phoenix-project//"
  logo="https://itrevolution.com/wp-content/uploads/2022/05/cropped-it-rev-fav-icon-200x200.png"
  preview="https://itrevolution.com/wp-content/uploads/2018/02/TPP_Front_4th-ed_foil-comp_RGB-scaled.jpg"/>

```component VPCard
{
  "title": "explainshell.com - match command-line arguments to their help text",
  "desc": "match command-line arguments to their help text",
  "link": "https://explainshell.com//",
  "logo": "https://explainshell.com/favicon.ico",
  "background": "rgba(87,149,243,0.2)"
}
```

<SiteInfo
  name="About the repository README file - GitHub Docs"
  desc="You can add a README file to your repository to tell other people why your project is useful, what they can do with your project, and how they can use it."
  url="https://docs-internal.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/repositories.png"/>

```component VPCard
{
  "title": "Overview | Prometheus",
  "desc": "Prometheus project documentation for Overview",
  "link": "https://prometheus.io/docs/introduction/overview//",
  "logo": "https://prometheus.io/icon.svg?7aa022e51797bcef",
  "background": "rgba(240,142,116,0.2)"
}
```

<SiteInfo
  name="AWS | Terraform | HashiCorp Developer"
  desc="Create, manage, and destroy AWS infrastructure using Terraform. Step-by-step, command-line tutorials will walk you through the Terraform basics for the first time."
  url="https://developer.hashicorp.com/terraform/tutorials/aws-get-started/"
  logo="https://developer.hashicorp.com/favicon.svg"
  preview="https://developer.hashicorp.com/og-image/terraform.jpg"/>

<SiteInfo
  name="GitHub Actions documentation - GitHub Docs"
  desc="Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow."
  url="https://docs-internal.github.com/en/actions/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

- [**freeCodeCamp - Learn Linux for Beginners**](/freecodecamp.org/learn-linux-for-beginners-book-basic-to-advanced.md): Comprehensive Linux guide available on freeCodeCamp.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Land Your First Cloud or DevOps Role: What Hiring Managers Actually Look For",
  "desc": "You've completed three AWS courses. You have notes from a dozen Docker tutorials. You know what Kubernetes is, what CI/CD means, and you can explain Infrastructure as Code without hesitating. And yet ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-land-your-first-cloud-or-devops-role-what-hiring-managers-actually-look-for.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
