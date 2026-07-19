---
lang: en-US
title: "“Relaxation and its Role in Vision”: The 1977 PhD Thesis That Helped Shape Modern AI Research"
description: "Article(s) > “Relaxation and its Role in Vision”: The 1977 PhD Thesis That Helped Shape Modern AI Research"
icon: fas fa-language
category:
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > “Relaxation and its Role in Vision”: The 1977 PhD Thesis That Helped Shape Modern AI Research"
    - property: og:description
      content: "“Relaxation and its Role in Vision”: The 1977 PhD Thesis That Helped Shape Modern AI Research"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/relaxation-and-its-role-in-vision-the-1977-phd-thesis-that-helped-shape-modern-ai-research.html
prev: /ai/llm/articles/README.md
date: 2026-07-22
isOriginal: false
author:
  - name: Mohammed Fahd Abrah
    url: https://freecodecamp.org/news/author/mohammed-fahd-abrah/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f1fe2707-f951-401a-9b08-54c5e1c2a3d9.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="“Relaxation and its Role in Vision”: The 1977 PhD Thesis That Helped Shape Modern AI Research"
  desc="When people think of Geoffrey Hinton, they usually think of backpropagation, Boltzmann Machines, Deep Belief Networks, or the deep learning revolution that transformed artificial intelligence. But few"
  url="https://freecodecamp.org/news/relaxation-and-its-role-in-vision-the-1977-phd-thesis-that-helped-shape-modern-ai-research"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f1fe2707-f951-401a-9b08-54c5e1c2a3d9.png"/>

When people think of Geoffrey Hinton, they usually think of backpropagation, Boltzmann Machines, Deep Belief Networks, or the deep learning revolution that transformed artificial intelligence.

But few people look further back to the beginning of his research career.

In 1977, nearly a decade before the famous backpropagation paper, Hinton completed his PhD thesis at the University of Edinburgh titled "Relaxation and its Role in Vision." At first glance, it seems to be a thesis about computer vision and relaxation methods. That was exactly what I expected when I began reading it.

As I worked through the thesis, however, I realized that it was about much more than a vision algorithm. Many of the ideas that would later define Hinton's research were already taking shape. The terminology was different, the math was simpler, and neural networks hadn't yet become the focus of his work. But the same way of thinking was already there.

This review isn't a chapter-by-chapter summary of the thesis. Instead, it focuses on the ideas that stood out to me while reading it and explores how many of them reappeared in Hinton's later work. Some of these ideas became central to modern AI, while others remain surprisingly overlooked despite being discussed nearly fifty years ago.

Looking back, what impressed me most was not that the thesis predicted specific algorithms. It was that it introduced a consistent way of thinking about intelligence, perception, and computation that would continue to shape Hinton's research for decades.

I hope this review encourages more people to read this remarkable thesis, not simply as a historical document, but as the starting point of one of the most influential research journeys in artificial intelligence.

---

## Thesis Overview

In this review, we'll explore Geoffrey Hinton's 1977 PhD thesis, “Relaxation and its Role in Vision”, completed at the University of Edinburgh.

We'll begin by looking at the central problem Hinton set out to solve and the ideas that motivated his relaxation approach. From there, we'll explore how the thesis represents uncertainty, reasons about competing hypotheses, and searches for globally consistent interpretations.

Next, we'll examine the puppet program, the relaxation operator, the role of schemas and stored knowledge, the SETTLE system, and Hinton's comparisons with other approaches of the time. We'll also discuss the limitations he identified in his own method and why they mattered.

Finally, we'll look at how many of the ideas introduced in this thesis reappeared throughout Hinton's later work and helped shape the development of modern AI.

If you'd like to follow along, you can also read the original thesis:

::: info Relaxation and its Role in Vision

```component VPCard
{
  "title": "Relaxation and its Role in Vision",
  "desc": "It is argued that a visual system, especially one which handles imperfect data, needs a way of selecting the best consistent combination from among the many interrelated, locally plausible hypotheses about how parts or aspects of the visual input may be interpreted. A method is presented in which each hypothesis is given a supposition value between 0 and 1. A parallel relaxation I operator, based on the plausibilities of hypotheses and the logical relations between them, is then used to modify the supposition values, and the process is repeated until the best consistent set of hypotheses have supposition values of approximately 1, and the rest have values of approximately 0. The method is incorporated in a program which can interpret configurations of overlapping rectangles as puppets. For this task it is possible to formulate all the potentially relevant hypotheses before using relaxation to select the best consistent set. For more complex tasks, it is necessary to use relaxation on the locallyplausible interpretations to guide the search for locally less obvious ones. Ways of doing this are discussed. Finally, an implemented system is presented which allows the user to specify schemas and inference rules, and uses relaxation to control the building of a network of instances of the schemas, when presented with data about some instances and relations between them",
  "link": "https://era.ed.ac.uk/items/02e3dc47-0325-4574-a4d9-b09c3063b4ee/",
  "logo": "https://era.ed.ac.uk/assets/era/images/favicons/era-favicon.ico",
  "background": "rgba(131,0,101,0.2)"
}
```

:::

Here is an infographic gives a quick overview of Geoffrey Hinton's 1977 PhD thesis. It summarizes the main ideas, how the relaxation method works, its applications, its limitations, and why many of these ideas still matter today.

![Infographic summarizing Geoffrey Hinton's 1977 PhD thesis, Relaxation and Its Role in Vision. It highlights the thesis's main ideas, methodology, key findings, applications, limitations, and its influence on modern AI.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/255a53c5-2e86-4fa5-b80d-07deb770dda0.png)

---

## The Core Challenge: Why Visual Systems Can't Afford to Guess Too Soon

Before exploring the ideas in Hinton's thesis, it helps to understand the problem he set out to solve. The opening chapter asks a deceptively simple question: **How can a visual system choose the correct interpretation when a single image may support many plausible explanations?**

This is the central challenge of visual perception. Real-world scenes are often ambiguous or partially hidden, so a system can't afford to commit to one interpretation too early. A premature decision can introduce errors that spread through the rest of the reasoning process and lead to an incorrect understanding of the entire scene.

The real challenge is to keep multiple plausible interpretations alive until there is enough evidence to determine which one is most consistent.

Hinton argues that the common approaches of the 1970s didn't solve this problem. One approach, known as the **principle of least commitment**, delayed decisions by leaving information unspecified. According to Hinton, this simply postponed the real issue because it offered no way to compare competing hypotheses or determine how they should become consistent with one another.

Another approach assigned fixed meanings to low-level visual features. But since the meaning of a feature depends on its surrounding context, these rigid definitions often failed when objects were partially hidden or appeared in different situations.

The infographic below summarizes the central challenge Hinton identifies at the beginning of his thesis. Rather than committing to the first plausible interpretation of a visual scene, he argues that a vision system should maintain many competing hypotheses simultaneously and allow them to interact until they converge on a single, globally consistent explanation.

It also highlights two contemporary approaches that Hinton rejects, the *principle of least commitment* and *rigid feature semantics*, because, in his view, they avoid the core problem instead of solving it.

This framing establishes the motivation for the relaxation framework developed throughout the rest of the thesis.

![Infographic on Hinton 1977 PhD thesis explaining parallel relaxation.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/2e04e5d9-5ad0-4a2b-8e87-c117b28d6b34.png)

---

## The First Appearance of Thinking as Optimization

One of the most interesting ideas in Hinton's thesis is that perception isn't a matter of instantly recognizing an object. Instead, he treats it as a process of finding the best explanation for what the eyes are seeing.

Rather than committing to a single interpretation from the start, the system considers many possible hypotheses at the same time. Some support each other, others compete, and their confidence changes as they interact. Through repeated updates, weak explanations gradually disappear while the strongest and most consistent interpretation emerges.

Although Hinton applies this idea to visual perception, the underlying principle reaches far beyond computer vision. It introduces a way of thinking about intelligence as an optimization problem: many possible explanations compete until the system settles on the one that best fits the available evidence.

Looking back, this idea feels surprisingly familiar. The same general philosophy later appeared in probabilistic inference, energy-based models, Conditional Random Fields (CRFs), Boltzmann Machines, and many other approaches where intelligence emerges by searching for the most consistent solution rather than making a single immediate decision.

---

## Vision Is Inference, Not Pattern Matching

One idea that stands out throughout the thesis is Hinton's view of what it actually means to see. He argues that vision is not simply recognizing patterns or assigning an image to a category. Instead, perception is the process of building an internal explanation of the scene.

A visual system doesn't immediately know what it's looking at. It must decide which objects are present, how they relate to one another, and which interpretation best explains the available evidence. In other words, seeing is a process of inference, not just recognition.

Hinton also rejects the idea that perception works by simply comparing an input with a collection of stored templates. He argues that this view is too limited to explain how we understand complex and unfamiliar scenes.

Instead, perception is presented as a constructive process. The system builds an interpretation by combining evidence, relationships, and prior knowledge until a coherent explanation emerges. It's not retrieving an answer from memory but actively constructing one.

Reading this today is striking because it closely resembles ideas that became popular decades later. Modern generative models and latent variable methods are also built around the idea of explaining observations by inferring the hidden structure that produced them.

These ideas also feel remarkably close to modern representation learning, where the goal isn't to memorize examples but to learn meaningful internal representations that can explain new observations.

Hinton was exploring these ways of thinking in 1977, long before they became a central theme in modern AI.

---

## Why Perception Requires Hypotheses

Hinton argues that perception can't be a purely reactive process. A visual system often receives incomplete, ambiguous, or even misleading information, so it can't simply accept the first interpretation that comes to mind.

Instead, it must begin with several possible explanations. As more evidence is considered, some hypotheses become more convincing while others are weakened or rejected. The final interpretation is reached only after this process of evaluation and refinement.

Although Hinton doesn't describe it using modern Bayesian terminology, the underlying idea is remarkably similar. Rather than making an immediate decision, the system continuously updates its beliefs as evidence accumulates until the most consistent explanation remains.

---

## From Binary Decisions to Degrees of Belief

Another idea that feels remarkably modern is Hinton's decision to avoid treating hypotheses as simply true or false. Instead, every hypothesis is assigned a value between 0 and 1 that reflects how strongly the system currently believes it. As the relaxation process unfolds, these values are updated repeatedly until the most consistent interpretation stands out while the others gradually fade away.

Today, we use different terms for similar concepts, including probabilities, belief values, confidence scores, activations, and logits. The terminology has evolved over the years, but the underlying idea remains the same: intelligence often depends on representing uncertainty instead of making immediate, irreversible decisions.

The infographic below illustrates how Hinton's relaxation process operates after hypotheses have been assigned continuous belief values.

Rather than selecting a single answer immediately, the system repeatedly updates all competing hypotheses in parallel, using both numerical constraints and individual preferences until one coherent interpretation gradually emerges.

By replacing rigid yes-or-no decisions with continuous optimization, the relaxation framework makes it possible to search efficiently for a globally consistent solution.

![Infographic showing Hinton's idea of giving each hypothesis a confidence value between 0 and 1 instead of a true-or-false decision. It illustrates how these values are repeatedly updated until the most consistent interpretation remains.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/4ab39c8f-8a0d-41db-a2a5-3f0669c52010.png)

---

## Distributed Computation Before Neural Networks

One of the most forward-looking ideas in the thesis is that intelligence shouldn't depend on a single central controller making every decision. Instead, Hinton describes a system made up of many local hypotheses that interact with one another at the same time. Each contributes a small part of the final solution, and together they produce a coherent interpretation.

Instead of focusing on individual components, Hinton emphasizes how these connections allow information to flow through the system until a consistent interpretation emerges.

This way of thinking feels surprisingly familiar today. Modern neural networks are also built on the idea that complex behavior can emerge from the combined activity of many simple units rather than from one component directing the entire process.

The terminology is different from modern deep learning, but the emphasis on networks, interactions, and distributed computation is already clearly visible.

---

## Parallelism as the Natural Way to Compute

Another idea that stands out is Hinton's emphasis on parallel computation. At a time when most computers were designed to execute instructions one after another, he argued that perception is better viewed as many processes working simultaneously and influencing one another.

Looking back, this was an unusually forward-looking perspective. Decades before massively parallel hardware became common, Hinton was already describing computation in a way that closely resembles how modern neural networks run today, with many simple operations happening at the same time rather than one step after another.

---

## Constraint Propagation

A recurring idea throughout the thesis is that no hypothesis should be evaluated in isolation. Instead, each one influences the others through a network of constraints. When the confidence of one hypothesis changes, that change spreads across the network, strengthening compatible explanations and weakening conflicting ones.

This idea later became a common theme in several areas of AI. Graphical models, factor graphs, message passing, and belief propagation all rely on the same basic intuition: local interactions can gradually lead to a globally consistent solution.

Although these methods were developed later and use different mathematical frameworks, it's not difficult to see the conceptual connection.

To demonstrate how constraints interact during relaxation, Hinton chose a deliberately simplified vision problem instead of real photographs.

A user first drew several transparent, overlapping rectangles on a graphics terminal. Some rectangles represented genuine parts of a stick-figure puppet, such as the torso, arms, or legs, while others acted as irrelevant distractors.

Every overlap between rectangles became a candidate joint, and the system generated competing hypotheses about which rectangles belonged to the puppet and which overlaps represented real connections. Its goal was to identify the interpretation with the greatest number of mutually consistent instantiated joints, while remaining robust to missing body parts and irrelevant clutter.

By removing the complexity of natural images, Hinton isolated the combinatorial challenge of visual interpretation while keeping the problem mathematically manageable.

The infographic below illustrates how Hinton used this simplified puppet domain to evaluate the relaxation framework. By reducing vision to identifying consistent body parts and joints, the example isolates the core challenge of combining many competing local hypotheses into a single globally consistent interpretation.

Although intentionally simple, the puppet experiment captures the essential reasoning problem of computer vision: many local hypotheses compete simultaneously, constraints propagate between them, and only the globally most consistent interpretation survives.

Hinton presents the domain as a controlled laboratory for studying these interactions before extending the same relaxation principles to more realistic vision problems.

![Infographic showing Hinton's puppet test problem, where overlapping rectangles represent possible body parts. The system uses constraints and relaxation to identify the combination of rectangles that forms the most consistent stick-figure puppet.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/f62ac4d9-75bb-448a-9485-b3bf8ee26284.png)

---

## Local Rules Can Produce Global Intelligence

One of the ideas I enjoyed most in this thesis is how a complex solution emerges from simple local interactions. Each hypothesis only needs to communicate with the hypotheses directly connected to it. There's no central component that knows the correct answer or controls the entire process.

As information flows through the network, the system gradually settles on a consistent interpretation. The final result emerges from cooperation rather than command.

This same principle continues to appear throughout AI research. Neural networks, swarm intelligence, graph neural networks, and belief propagation all demonstrate how complex behavior can arise from many simple components following local rules.

The puppet task wasn't just a toy example. It was a complete program with its own processing pipeline. Starting from a drawing of overlapping rectangles, the system generated hypotheses, applied constraints, repeatedly updated their confidence, and finally selected the most consistent interpretation.

The infographic below illustrates how Hinton's entire relaxation framework fits together as a complete computational pipeline. It shows how hypothesis generation, constraint construction, iterative relaxation, and final selection work as successive stages of a single reasoning process.

Rather than relying on a central controller or modern end-to-end training, the system reaches a coherent solution through repeated local interactions among competing hypotheses. This illustrates how simple local rules can produce globally consistent behavior.

![Infographic showing the end-to-end pipeline of Hinton's puppet program. Starting from overlapping rectangles, the system generates hypotheses, builds constraints, applies the relaxation operator, iteratively updates hypothesis values, and produces the most consistent puppet interpretation.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/888228de-11a4-46f9-9759-efb24fbe2742.png)

---

## Why Local Consistency Is Not Enough

One important point Hinton makes is that solving small local conflicts doesn't necessarily produce the best overall interpretation. A hypothesis may fit well with its immediate neighbors while still contributing to an incorrect explanation of the entire scene.

For that reason, the system must evaluate how all the hypotheses work together rather than judging each one independently.

This shift from local agreement to finding the best overall solution is a key theme throughout the thesis. It also reflects a broader direction that AI would later take, where many problems are formulated as global optimization rather than a collection of isolated local decisions.

---

## Relaxation as a Way of Reasoning

As I read the thesis, I began to see relaxation as more than just an algorithm. It is a way of approaching difficult problems. Instead of trying to reach the correct answer in a single step, the system starts with tentative beliefs, refines them through repeated interactions, and continues until the solution becomes stable.

This idea feels surprisingly familiar today. Although the mathematics is different, many modern methods follow the same pattern. Gradient descent improves parameters step by step, the Expectation-Maximization (EM) algorithm alternates between refinement stages, belief propagation repeatedly exchanges information, and diffusion models generate samples through a sequence of gradual updates.

The methods are different, but the underlying philosophy is remarkably similar: good solutions often emerge through many small improvements rather than one decisive computation.

So how does relaxation actually work? Hinton's answer is surprisingly simple. During each update, the system balances two forces: one keeps the hypotheses consistent with the constraints, while the other gently pushes them toward better explanations. Repeating this process eventually leads to a stable solution.

The infographic below illustrates how Hinton translates this reasoning process into a concrete computational procedure. Rather than making a single decision, the relaxation operator repeatedly updates all hypotheses in parallel, applying the same two-force rule until the entire network settles into a stable, globally consistent state.

The process shows how simple local updates can collectively produce a coherent global interpretation.

![Infographic explaining Hinton's relaxation operator. Each update balances a constraint force that keeps hypotheses consistent with a preference force that nudges them toward better interpretations, repeating until the system reaches a stable solution.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/caae92a0-9e65-4519-81d7-f1c8d36ec239.png)

---

## The Importance of Equilibrium

Another idea that appears throughout the thesis is the importance of allowing the system to reach a stable state. The final interpretation isn't imposed by a central controller or chosen by a fixed rule. Instead, it emerges naturally as the hypotheses interact until no further changes are needed.

This idea became a recurring theme in Hinton's later work. Hopfield Networks, Boltzmann Machines, and energy-based models all rely on systems evolving toward stable configurations through their own internal dynamics. Although the models are different, the underlying intuition is much the same: a good solution is one the system naturally settles into.

Hinton didn't just describe what worked. He also analyzed the situations where relaxation could break down, discussing both the possibility of converging to ambiguous intermediate solutions and the architectural limitations of the overall framework.

The infographic below illustrates these two limitations. During relaxation, the system may converge to a stable solution that lies between discrete interpretations rather than fully committing to a single one.

It also highlights a broader architectural weakness: hypothesis generation and hypothesis selection remain separate stages, preventing later reasoning from influencing which candidate hypotheses are created in the first place.

Hinton openly presents these limitations, which later AI systems addressed through more integrated and end-to-end learning approaches.

![Infographic explaining a limitation of Hinton's relaxation method. It shows how the system can converge to a stable non-integer solution between two valid interpretations instead of reaching a single clear answer.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/428377bb-a51b-4a23-ad7b-9843346d1cb8.png)

---

## From Symbolic Decisions to Numerical Reasoning

One of the subtle but important shifts in the thesis is the move away from treating knowledge as simply true or false. Instead of relying on rigid symbolic decisions, Hinton represents beliefs with numerical values that can increase or decrease as new evidence is considered.

This may seem like a small design choice, but it reflects a much broader change in how intelligent systems can reason. Rather than forcing early decisions, the system keeps track of uncertainty and adjusts its beliefs over time. Looking back, this is the same direction that much of modern machine learning would eventually follow.

Hinton didn't develop these ideas in isolation. In the thesis, he evaluates his relaxation framework alongside other prominent approaches of the time, highlighting their different ways of representing uncertainty and reasoning about visual scenes.

The infographic below compares three approaches side by side. Using the same line-labeling problem as a common benchmark, it shows how Waltz's filtering algorithm, fuzzy-weight models, and Hinton's relaxation framework represent uncertainty, update hypotheses, and enforce consistency.

Hinton argues that his supposition-value framework provides a more principled way to reason under uncertainty by combining continuous confidence values with explicit numerical constraints, allowing competing interpretations to evolve toward a globally consistent solution.

![Infographic comparing Hinton's L.P. relaxation method with Waltz filtering and fuzzy-weight models. It highlights how the three approaches represent uncertainty and why Hinton argued that his supposition-value framework provided a stronger solution.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/84706725-4aa3-444d-89f4-13cbac4b4920.png)

---

## Why Perception Is a Search Problem

One of the ideas that repeatedly appears throughout the thesis is that perception is fundamentally a search process. A visual system isn't simply recognizing an object from what it sees. Instead, it's searching through many possible explanations to find the one that best fits the available evidence.

This distinction is more important than it might first appear. Recognition suggests that the answer is already obvious and only needs to be retrieved. Search assumes that the correct interpretation must be discovered by exploring alternatives and resolving uncertainty.

Even today, that way of thinking continues to shape many approaches to artificial intelligence.

If perception is a search problem, the next question becomes what the system is actually searching through. Hinton answers this by introducing a geometric view of the search process, where every possible interpretation occupies a position within a structured space of feasible solutions.

The infographic below illustrates this geometric perspective. It represents all valid hypothesis assignments as points inside a feasible search space, where the corners correspond to clean all-or-nothing interpretations and intermediate points represent uncertain or partial beliefs.

Rather than searching directly among discrete solutions, the relaxation process moves continuously through this space, gradually improving the current state until it converges on the highest-scoring feasible interpretation.

This geometric perspective provides an intuitive way to understand how relaxation transforms a difficult combinatorial search into a continuous optimization problem.

![Infographic showing Hinton's view of perception as a search through many possible interpretations. It illustrates a search space of feasible states and how hill climbing gradually moves the system from uncertain states to the best consistent interpretation.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/28b9bb53-2961-4818-affc-5812a5d26ee9.png)

---

## Beyond Pattern Recognition: Why Internal Representations Matter More Than the Final Output

One of the most thought-provoking parts of the thesis is Hinton's criticism of viewing perception as nothing more than pattern recognition. He argues that recognizing visual features alone can't explain how we understand a scene. A vision system must also determine how objects are related, how their parts fit together, and how those relationships combine into a coherent interpretation of the world.

This emphasis on relationships is central to Hinton's view of perception. Understanding a scene requires more than identifying individual objects. The system must represent objects, their constituent parts, and the structural relationships that connect them into larger wholes. In other words, perception is fundamentally about building a structured representation of the scene rather than recognizing isolated patterns.

As I read the thesis, one theme kept resurfacing: Hinton is less interested in the final answer than in the internal representation the system builds while interpreting a scene. The goal isn't simply to assign a label to an image, but to construct a structured description that captures the relationships between its components. The final decision is simply the outcome of this richer reasoning process.

Looking back, this perspective was remarkably forward-looking. Many modern AI systems have moved beyond simple classification toward learning internal representations that capture structure, relationships, and context. Although today's models use very different mathematical tools, the underlying intuition is strikingly similar.

Throughout his later career, Hinton consistently emphasized that the quality of an intelligent system depends less on its final output than on the representations it learns along the way.

---

## The Importance of Intermediate and Hierarchical Representations

One idea that caught my attention is Hinton's discussion of intermediate-level hypotheses. Rather than moving directly from visual input to a final interpretation, he argues that perception benefits from intermediate representations that bridge the gap between raw observations and complete understanding.

Understanding a scene happens at multiple levels. Simple elements combine to form larger structures, and those structures become part of an even richer interpretation. Perception is built gradually through a hierarchy rather than all at once.

Looking back, these ideas feel strikingly familiar. Modern deep learning is built on the principle of intermediate-level hypotheses, with each layer learning increasingly abstract representations before reaching a final prediction.

And the idea of hierarchical perception would continue to appear throughout Hinton's later research. Whether in Deep Belief Nets, Capsule Networks, or hierarchical generative models, the same principle remains: meaningful representations are built layer by layer, with each level capturing patterns that the previous one could not.

The terminology has once again changed, but the intuition is much the same: complex understanding is achieved through a hierarchy of intermediate representations, not in a single step.

---

## Schemas and Stored Knowledge

In the later chapters, Hinton introduces the idea of schemas as a way to organize knowledge and connect it to perception. Rather than treating perception and stored knowledge as separate processes, he shows how they can work together to interpret what the system observes.

One of the most interesting ideas in these chapters is Hinton's view of schemas. Instead of storing exact examples, he argues that knowledge should capture the rules, relationships, and constraints that define a category. This allows the system to interpret new situations by reasoning about their underlying structure rather than simply matching what it has already seen.

Reading this today, it's easy to see why the idea remains relevant. Although the terminology has changed, many modern AI systems also rely on learned internal representations that support generalization instead of memorization. In that sense, Hinton's discussion of schemas can be seen as an early step toward concepts that later evolved into latent representations and internal world models.

The infographic below illustrates Hinton's contrast between schema-based reasoning and template matching. Instead of relying on stored examples, schemas represent structural knowledge through roles, relationships, and constraints that guide interpretation. New observations are understood by satisfying these structural relationships rather than by finding an exact match to a memorized template.

This perspective foreshadows later developments in representation learning, where successful generalization depends on learning underlying structure instead of memorizing individual examples.

![Infographic explaining Hinton's idea of schemas. It compares schema-based knowledge with template matching, showing how rules and relationships help a system understand new examples instead of relying on exact stored patterns.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/f69efb55-9f33-4a4a-95ae-c1fb624f1e3a.png)

---

## The SETTLE System

One part of the thesis that deserves far more attention is **SETTLE**, an experimental reasoning system Hinton developed to combine schemas, inference rules, and relaxation into a single computational framework. It's often overshadowed by the earlier chapters on relaxation, but it reveals how Hinton was already thinking about integrating multiple forms of reasoning rather than treating them as separate processes.

Instead of applying rules independently or storing knowledge in isolation, SETTLE allows schemas, inference rules, relaxation, and dynamic network construction to cooperate while the system gradually builds the most consistent interpretation from uncertain evidence.

Looking back, SETTLE is interesting not because it resembles modern AI systems in detail, but because it reflects Hinton's early effort to integrate knowledge, reasoning, and inference into a unified computational process.

The infographic below illustrates how these components interact within SETTLE. Inference rules generate candidate conclusions while the relaxation process continuously evaluates their consistency. This allows evidence, rules, and competing hypotheses to influence one another until they converge on the most coherent interpretation.

![Infographic explaining Hinton's SETTLE system. It shows how schemas, inference rules, and relaxation work together to evaluate evidence, make inferences, and build the most consistent interpretation.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/9b7dd4e4-482e-4da3-ae00-dbe617d1e124.png)

---

## Uncertainty and Ambiguity as the Foundation of Reasoning

One theme that runs throughout the thesis is that uncertainty isn't a problem to avoid but a natural starting point for perception. A visual system doesn't begin with complete knowledge or immediate confidence. Instead, it starts with tentative assumptions that are gradually strengthened, weakened, or discarded as more evidence is taken into account.

Closely related to this is Hinton's treatment of ambiguity. Rather than viewing multiple possible interpretations as a failure of perception, he accepts them as an unavoidable consequence of incomplete information.

A visual scene can support several plausible explanations, and the system should allow those possibilities to coexist until enough evidence is available to distinguish between them. Instead of forcing an early decision, it gradually moves toward the most consistent interpretation.

Although Hinton's thesis predates modern probabilistic graphical models and Bayesian inference methods, its underlying perspective is remarkably close to probabilistic thinking.

The mathematical tools would evolve considerably over the following decades, but the central idea remained the same: intelligent systems should reason under uncertainty rather than expect complete and perfect information from the start. Looking back, it's not difficult to see why this perspective became one of the defining principles of modern AI.

---

## The Whole Picture

The infographic below provides an overview of Hinton's thesis by bringing together its main contributions in a single view. It compares his relaxation framework with other approaches available in the late 1970s, outlines the different application domains explored throughout the thesis (from simplified vision tasks to schema-based reasoning and the SETTLE system) and concludes with the key limitations Hinton openly identifies.

Taken together, these elements show that the thesis is not only a proposal for a relaxation algorithm, but also a broader research program for reasoning under uncertainty that influenced many ideas developed in later AI systems.

![Infographic summarizing Hinton's 1977 thesis. It compares his relaxation method with contemporary approaches, outlines the main application domains explored in the thesis, and highlights the key open problems Hinton identified for future research.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/0299d21d-cf99-4afb-b5ec-b9892ba68e59.png)

---

## A Consistent Philosophy Across Five Decades

After finishing the thesis, what impressed me most was not a single algorithm or experiment. It was the continuity of Hinton's thinking. Many of the ideas introduced in 1977 reappear throughout the rest of his career, even though the mathematical tools and models changed dramatically.

The thesis begins with relaxation, competing hypotheses, distributed constraints, optimization, and stable solutions. Later came Boltzmann Machines, backpropagation, Deep Belief Networks, AlexNet, the Forward-Forward algorithm, and more recently, his ideas on mortal computation.

At first glance, these contributions seem very different. Yet they're connected by a remarkably consistent research philosophy.

Throughout his career, Hinton has viewed intelligence as something that emerges from the interaction of many simple computational elements rather than from a central controller. He has consistently emphasized distributed knowledge over isolated symbols, inference over simple recognition, rich internal representations over final outputs, optimization as the mechanism for intelligent behavior, and uncertainty as something to be represented and refined rather than ignored.

Looking back from today, Hinton's 1977 thesis feels less like an isolated piece of early research and more like the beginning of an intellectual journey that would shape nearly five decades of artificial intelligence research.

This final infographic illustrates these conceptual connections. Rather than presenting Hinton's later work as direct implementations of his thesis, it shows how many of its central ideas, including continuous confidence values, optimization-based perception, structured knowledge representations, and integrated reasoning, continued to reappear in later developments such as Boltzmann Machines, backpropagation, Deep Belief Networks, and energy-based models.

The emphasis isn't on a single line of technical development, but on the remarkable continuity of the research philosophy that connects Hinton's earliest work to many of his later contributions.

![Infographic summarizing the main ideas from Hinton's 1977 thesis and showing how they reappeared in later work, including Boltzmann Machines, backpropagation, Deep Belief Networks, and energy-based models, highlighting the continuity of his research philosophy.](https://cdn.hashnode.com/uploads/covers/69ce92860ff860b6de01ed93/42ecd143-9088-4541-9473-b1f32987b844.png)

---

## Permission to Publish

Before writing this review, I contacted Professor Geoffrey Hinton to request permission to publish an educational review of his thesis. Professor Hinton kindly granted permission for the publication of this review.

The article is written entirely in my own words and reflects my own interpretation of the thesis, with full acknowledgment of the original work.

::: info Further Reading

```component VPCard
{
  "title": "Relaxation and its Role in Vision",
  "desc": "It is argued that a visual system, especially one which handles imperfect data, needs a way of selecting the best consistent combination from among the many interrelated, locally plausible hypotheses about how parts or aspects of the visual input may be interpreted. A method is presented in which each hypothesis is given a supposition value between 0 and 1. A parallel relaxation I operator, based on the plausibilities of hypotheses and the logical relations between them, is then used to modify the supposition values, and the process is repeated until the best consistent set of hypotheses have supposition values of approximately 1, and the rest have values of approximately 0. The method is incorporated in a program which can interpret configurations of overlapping rectangles as puppets. For this task it is possible to formulate all the potentially relevant hypotheses before using relaxation to select the best consistent set. For more complex tasks, it is necessary to use relaxation on the locallyplausible interpretations to guide the search for locally less obvious ones. Ways of doing this are discussed. Finally, an implemented system is presented which allows the user to specify schemas and inference rules, and uses relaxation to control the building of a network of instances of the schemas, when presented with data about some instances and relations between them",
  "link": "https://era.ed.ac.uk/items/02e3dc47-0325-4574-a4d9-b09c3063b4ee",
  "logo": "https://era.ed.ac.uk/assets/era/images/favicons/era-favicon.ico",
  "background": "rgba(131,0,101,0.2)"
}
```

```component VPCard
{
  "title": "Vision",
  "desc": "David Marr's posthumously published Vision (1982) influenced a generation of brain and cognitive scientists, inspiring many to enter the field. In Vision, Ma...",
  "link": "https://mitpress.mit.edu/9780262514620/vision/",
  "logo": "https://dhjhkxawhe8q4.cloudfront.net/mit-press/wp-content/uploads/2024/07/11131143/cropped-favicon-192x192.png",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Probabilistic Reasoning in Intelligent Systems"
  desc="Probabilistic Reasoning in Intelligent Systems is a complete and accessible account of the theoretical foundations and computational methods that unde"
  url="https://shop.elsevier.com/books/probabilistic-reasoning-in-intelligent-systems/pearl/978-0-08-051489-5"
  logo="https://shop.elsevier.com/images/elsevier-favicon.svg"
  preview="https://secure-ecsd.elsevier.com/covers/80/Tango2/large/9780080514895.jpg"/>

```component VPCard
{
  "title": "Learning representations by back-propagating errors - Nature",
  "desc": "We describe a new learning procedure, back-propagation, for networks of neurone-like units. The procedure repeatedly adjusts the weights of the connections in the network so as to minimize a measure of the difference between the actual output vector of the net and the desired output vector. As a result of the weight adjustments, internal ‘hidden’ units which are not part of the input or output come to represent important features of the task domain, and the regularities in the task are captured by the interactions of these units. The ability to create useful new features distinguishes back-propagation from earlier, simpler methods such as the perceptron-convergence procedure1.",
  "link": "https://nature.com/articles/323533a0/",
  "logo": "https://nature.com/static/images/favicons/nature/favicon.ico",
  "background": "rgba(0,102,153,0.2)"
}
```

```component VPCard
{
  "title": "Parallel Distributed Processing",
  "desc": "What makes people smarter than computers? These volumes by a pioneering neurocomputing group suggest that the answer lies in the massively parallel architect...",
  "link": "https://mitpress.mit.edu/9780262680530/parallel-distributed-processing-volume-1/",
  "logo": "https://dhjhkxawhe8q4.cloudfront.net/mit-press/wp-content/uploads/2024/07/11131143/cropped-favicon-192x192.png",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Neural networks and physical systems with emergent collective computational abilities"
  desc="Computational properties of use of biological organisms or to the construction of computers can emerge as collective properties of systems having a large number of simple equivalent components (or neurons). The physical meaning of ..."
  url="https://pmc.ncbi.nlm.nih.gov/articles/PMC346238/"
  logo="https://cdn.ncbi.nlm.nih.gov/pmc/pd-medc-pmc-cloudpmc-viewer/production/bb3d0162/var/data/static/img/favicons/favicon-16x16.png"
  preview="https://cdn.ncbi.nlm.nih.gov/pmc/cms/images/pmc-card-share.jpg?_=0"/>

- ~~[Hinton, Osindero & Teh (2006) – *A Fast Learning Algorithm for Deep Belief Nets*](https://cs.toronto.edu/~hinton/absps/fastnc.pdf)~~

```component VPCard
{
  "title": "ImageNet Classification with Deep Convolutional Neural Networks",
  "desc": "We trained a large, deep convolutional neural network to classify the 1.3 million high-resolution images in the LSVRC-2010 ImageNet training set into the 1000 different classes. On the test data, we achieved top-1 and top-5 error rates of 39.7\% and 18.9\% which is considerably better than the previous state-of-the-art results. The neural network, which has 60 million parameters and 500,000 neurons, consists of five convolutional layers, some of which are followed by max-pooling layers, and two globally connected layers with a final 1000-way softmax. To make training faster, we used non-saturating neurons and a very efficient GPU implementation of convolutional nets. To reduce overfitting in the globally connected layers we employed a new regularization method that proved to be very effective.",
  "link": "https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html/",
  "logo": "https://papers.nips.cc/favicon.ico",
  "background": "rgba(und74,111,165,0.2)"
}
```

<SiteInfo
  name="Deep Learning"
  desc="An introduction to a broad range of topics in deep learning, covering mathematical and conceptual background, deep learning techniques used in industry, and research perspectives.“Written by three experts in the field, Deep Learning is the only comprehensive book on the subject.”—Elon Musk, cochair of OpenAI; cofounder and CEO of Tesla and SpaceXDeep learning is a form of machine learning that enables computers to learn from experience and understand the world in terms of a hierarchy of concepts. Because the computer gathers knowledge from experience, there is no need for a human computer operator to formally specify all the knowledge that the computer needs. The hierarchy of concepts allows the computer to learn complicated concepts by building them out of simpler ones; a graph of these hierarchies would be many layers deep. This book introduces a broad range of topics in deep learning. The text offers mathematical and conceptual background, covering relevant concepts in linear algebra, probability theory and information theory, numerical computation, and machine learning. It describes deep learning techniques used by practitioners in industry, including deep feedforward networks, regularization, optimization algorithms, convolutional networks, sequence modeling, and practical methodology; and it surveys such applications as natural language processing, speech recognition, computer vision, online recommendation systems, bioinformatics, and videogames. Finally, the book offers research perspectives, covering such theoretical topics as linear factor models, autoencoders, representation learning, structured probabilistic models, Monte Carlo methods, the partition function, approximate inference, and deep generative models. Deep Learning can be used by undergraduate or graduate students planning careers in either industry or research, and by software engineers who want to begin using deep learning in their products or platforms. A website offers supplementary material for both readers and instructors."
  url="https://books.google.com/books/about/Deep_Learning.html?hl=id&id=omivDQAAQBAJ/"
  logo="https://books.google.com/favicon.ico"
  preview="https://books.google.com.my/books/publisher/content?id=omivDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70KFrbd5qOTEjThz5POj1OXDhGIQweW4EnX5rkqkZFbWGnKBcdMV2lY0bkUGGmnERakPcVmZxjWKNHCz64PnFWX2KgXnjQWgDDucacXDFwzSWv4r_aNv9RK6kktwROFPgc0vgNj"/>

<PDF url="https://microsoft.com/en-us/research/wp-content/uploads/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf" />

<PDF url="https://arxiv.org/pdf/2006.11239" />

<PDF url="https://arxiv.org/pdf/2212.13345" />

:::

::: info Contact Me

- [Github (<VPIcon icon="iconfont icon-github"/>`MOHAMMEDFAHD`)](https://github.com/MOHAMMEDFAHD)
- [X (<VPIcon icon="fa-brands fa-x-twitter"/>`programmingoce`)](https://x.com/programmingoce)
- [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`mohammed-abrah-6435a63ba`)](https://linkedin.com/in/mohammed-abrah-6435a63ba/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "“Relaxation and its Role in Vision”: The 1977 PhD Thesis That Helped Shape Modern AI Research",
  "desc": "When people think of Geoffrey Hinton, they usually think of backpropagation, Boltzmann Machines, Deep Belief Networks, or the deep learning revolution that transformed artificial intelligence. But few",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/relaxation-and-its-role-in-vision-the-1977-phd-thesis-that-helped-shape-modern-ai-research.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
