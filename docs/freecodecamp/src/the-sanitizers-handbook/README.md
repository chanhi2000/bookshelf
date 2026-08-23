---
lang: en-US
title: "The Sanitizers Handbook: Memory, Initialization, and Races"
description: "Article(s) > The Sanitizers Handbook: Memory, Initialization, and Races"
icon: iconfont icon-cpp
category:
  - Dart
  - Flutter
  - C++
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - c++
  - cpp
  - c-plus-plus
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Sanitizers Handbook: Memory, Initialization, and Races"
    - property: og:description
      content: "The Sanitizers Handbook: Memory, Initialization, and Races"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-sanitizers-handbook/
prev: /academics/system-design/articles/README.md
date: 2026-08-22
isOriginal: false
author:
  - name: Hamdaan Ali
    url: https://freecodecamp.org/news/author/hamdaan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b4ab5b91-c6a8-488d-847e-7ca1e52e5db9.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Sanitizers Handbook: Memory, Initialization, and Races"
  desc="Some of the most dangerous native failures are produced by programs that appear to be working correctly. The cryptographic operation returns the right ciphertext. The parser rejects malformed input. T"
  url="https://freecodecamp.org/news/the-sanitizers-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b4ab5b91-c6a8-488d-847e-7ca1e52e5db9.png"/>

Some of the most dangerous native failures are produced by programs that appear to be working correctly.

The cryptographic operation returns the right ciphertext. The parser rejects malformed input. The cache survives its benchmark. The release candidate passes every unit and integration test.

But somewhere below those correct results, a wrapper still believes it owns a handle that's already transferred. A success path returns without initializing an output field. A finalizer is waiting to free an object whose lifetime is now controlled by another runtime. Two threads mutate the same state, but the scheduler hasn't chosen the interleaving that makes the race visible.

Nothing in the expected output necessarily reveals any of this.

The first observable failure may arrive hours later, after an allocator reuses a freed region, a garbage-collection cycle changes reachability, a shutdown path finally accounts for leaked allocations, or production traffic creates a synchronization pattern that the test suite never exercised. By then, the crashing stack often belongs to the victim of the bug rather than its author.

This is the gap sanitizers are built to close. They do more than make crashes easier to debug. They attach runtime meaning to assumptions that ordinary tests usually leave implicit: this address is still valid to access, this allocation still has a legitimate owner, this value was initialized before it influenced execution, or this shared-memory access is ordered by synchronization the runtime can observe.

AddressSanitizer (ASan), LeakSanitizer (LSan), MemorySanitizer (MSan), and ThreadSanitizer (TSan) aren't four variations of the same debugging mode. They observe different properties of the execution.

ASan tracks addressability and lifetime. LSan asks what allocations remain live at teardown and whether that remaining reachability makes sense. MSan follows initialization provenance. TSan reconstructs the happens-before relationships that make concurrent accesses legal.

The difficult part starts after the compiler accepts the flag.

A sanitizer build is only useful to the extent that you understand what it actually observed. Which modules were instrumented? Which allocator or synchronization operations were invisible to the runtime? Can the report be symbolized well enough to identify useful frames? Did the workload reach the ownership transition, failure path, or thread interleaving where the bug lives?

And once the lane is producing trustworthy evidence, where does it belong: on every pull request, in a slower scheduled job, or initially in observation mode while the baseline is understood?

Those questions become especially sharp at managed/native boundaries. A Dart, Java, Python, Swift, C#, or Rust wrapper may present a safe-looking API while depending on native reference counts, allocator pairing, borrowed pointers, transfer-on-success conventions, callbacks, arenas, and finalizers underneath. The language boundary doesn't remove those rules. It distributes them across two runtimes that may have very different ideas about ownership and lifetime.

Many of the examples in this handbook come back to that kind of boundary: code that looks straightforward from the outside but has to keep native lifetime rules intact underneath.

.<VPIcon icon="fas fa-folder-open"/>`google/`<VPIcon icon="fa-brands fa-dart-lang"/><VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` will serve as one recurring example. It combines Dart FFI, BoringSSL handles, finalizers, scoped cleanup, build hooks, and ownership transfer in a relatively compact system. It's also a useful example of a less glamorous but very common engineering constraint: sometimes the sanitizer setup you want is blocked by the surrounding toolchain, and you have to decide what useful runtime evidence you can obtain in the meantime.

That problem isn't specific to Dart or cryptography. Real systems rarely give you a perfectly instrumentable dependency graph, a cooperative runtime, complete symbols, and unlimited CI time all at once. The practical question is usually narrower: what can this build observe today, what can it not observe, and what workload would make the available evidence meaningful?

That's the argument of this handbook: **sanitizers make runtime contracts executable**. Ownership is a recurring part of that story, especially across FFI boundaries, but so are initialization and synchronization. Fuzzers, stress tests, failure injection, and concurrency probes create executions that challenge those contracts. Sanitizer runtimes make violations visible. CI determines whether those findings become durable regression protection or remain one-off debugging events.

The chapters that follow move from that model into shadow memory, leak reachability, initialization tracking, race detection, FFI ownership, workload design, report triage, and release policy. The goal is not merely to run sanitizers. It's to understand what a clean run actually tells you, what a report says about the assumptions in your code, and what remains outside the tool's field of view.

---

## Table of Contents

- [Prerequisites](#heading-prerequisites)
- [The Gap Between Correct Results and Valid Execution](#heading-the-gap-between-correct-results-and-valid-execution)
- [Sanitizers as Executable Ownership Contracts](#heading-sanitizers-as-executable-ownership-contracts)
- [The Four Sanitizers in Depth](#heading-the-four-sanitizers-in-depth)
- [Combining Sanitizers and Knowing What They Do Not Cover](#heading-combining-sanitizers-and-knowing-what-they-do-not-cover)
- [FFI Ownership Across Runtime Boundaries](#heading-ffi-ownership-across-runtime-boundaries)
- [Case Study:webcrypto.dart Issue #278](#heading-case-study-webcryptodart-issue-278)
- [Incident Patterns from Real Systems](#heading-incident-patterns-from-real-systems)
- [Fuzzing, Stress Harnesses, and Concurrency Probes](#heading-fuzzing-stress-harnesses-and-concurrency-probes)
- [How to Read and Triage Sanitizer Reports](#heading-how-to-read-and-triage-sanitizer-reports)
- [CI Policy and Acceptance Criteria](#heading-ci-policy-and-acceptance-criteria)
- [Production Strategy, Suppression Debt, and Metrics](#heading-production-strategy-suppression-debt-and-metrics)
- [Closing Perspective](#heading-closing-perspective)
- [References and Further Reading](#heading-references-and-further-reading)

::: note Prerequisites

This handbook assumes basic comfort with native-code debugging and concurrent programs. It builds on pointers, allocation, thread synchronization, build systems, and CI rather than reintroducing C or C++ fundamentals.

The focus here is dynamic execution evidence: what the sanitizer runtime can observe, what its report means, and how ownership, initialization, and synchronization assumptions should shape the workload and the pipeline around it.

Here's what you should already be comfortable with:

- Reading a native stack trace and moving between caller, callee, allocation, and cleanup paths.
- Basic ownership concepts such as borrowed versus owned pointers, transfer of ownership, reference counting, and deterministic cleanup.
- Heap and stack allocation at a practical level, including why allocator pairing and object lifetime matter.
- Concurrency fundamentals such as mutexes, atomics, thread creation, and the idea that ordering between threads must be established rather than assumed.
- Building and running tests from the command line, and understanding the difference between a local debug build and a CI build.

And here's what you need to follow along with the examples:

- A recent Clang/LLVM toolchain with access to `clang`, `clang++`, and `llvm-symbolizer`.
- A Linux or macOS environment for most compiler-based examples. Linux is the most practical environment for the complete set of examples and the Valgrind lane.
- A way to run the produced binaries and preserve their logs and crash artifacts.
- Optional access to Valgrind for the whole-process and FFI fallback examples.
- Optional Dart tooling for the <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` case study. You don't need Dart experience to follow the ownership analysis.
- And, less officially, enough patience to read a stack trace before blaming the last person who touched the file.

We won't go through a long compiler or environment setup walkthrough. The commands assume the relevant compiler and runtime packages are installed and focus on instrumentation, reports, workloads, and policy.

We also won't re-teach general memory management, threading, fuzzing, or compiler construction. Only the parts that change how a sanitizer result should be interpreted are developed in detail.

:::

---

## The Gap Between Correct Results and Valid Execution

Before getting into shadow memory, leak roots, origin tracking, or happens-before graphs, it helps to separate two properties that are easy to conflate: **functional correctness** and **execution validity**.

A conventional test asks a functional question: given this input, did the system return the expected value, mutate the expected state, or produce the expected side effect?

A sanitizer asks something different: was the execution that produced that result valid?

Those questions overlap, but they aren't equivalent. A function can return the correct plaintext while leaking a native key. A parser can reject malformed input while reading an uninitialized output length on the way to that rejection. A wrapper can work correctly for months while two different objects both believe they own the same native handle. A lock-free cache can pass every deterministic test and still contain a race that the scheduler hasn't exposed yet.

That distinction is the starting point for sanitizer work:

![Flowchart showing that a functional test can produce the expected output and still pass while hidden runtime-contract violations remain detectable by ASan, LSan, MSan, or TSan.](https://cdn.hashnode.com/uploads/covers/66b563581acaa21b16e7093a/c34c34ca-f4b8-4d11-b397-ca181d4f310f.svg)
<!-- TODO: mermaid화 -->

The diagram shows why a passing test is not always a valid execution. Sanitizers check the hidden runtime contracts that ordinary output-based tests can miss.

### Bugs Often Begin Far Away from the Crash

Memory bugs rarely fail where they begin.

The first mistake may be small: a missing reference increment, a pointer that remains usable after ownership moves, a cleanup callback removed from the wrong scope, an out-parameter left untouched on one success path, or a finalizer detached a little too late.

The visible failure may happen much later, in another component, on another thread, or during shutdown. By then, the stack at the crash site often describes the code that suffered from the bug rather than the code that created it.

Sanitizers help because they maintain runtime state that ordinary execution does not. ASan tracks whether memory is addressable and how that changes over an object's lifetime. MSan propagates initialization state. TSan records memory accesses and synchronization relationships. LSan examines what remains reachable when the process terminates.

That extra state gives you more than the final crash location. Depending on the tool, a report may show where an object was allocated and freed, where an uninitialized value originated, or which accesses raced across threads. The report still needs interpretation, but it gives you enough history to start reconstructing how the program reached the invalid state.

### Correct Outputs Can Hide Invalid Execution

Consider a native API that writes a 32-byte digest into a caller-provided buffer:

```cpp
bool digest(const uint8_t* input, size_t input_len, uint8_t* output, size_t* output_len);
```

A reasonable contract is that a true return means both output and \*output_len have been initialized. Now suppose one success path writes the digest but forgets to set the length.

A unit test that checks only the 32 digest bytes may still pass. The caller may even happen to read 32 from the uninitialized stack slot often enough that the bug stays hidden.

MSan asks a more useful question than “did the value happen to look right?” It asks whether that value had a legitimate initialization history before the program used it.

Lifetime bugs have the same shape. Suppose a wrapper transfers a native handle to another owner but leaves its finalizer attached. Nothing necessarily fails at the point of transfer. Ordinary tests may complete before the finalizer ever runs.

Under GC pressure, though, the old wrapper can eventually release the handle while the new owner still expects it to be alive. The next native access may then become a use-after-free.

The functional tests weren't wrong. They were just answering a different question. They verified the operation's result but they didn't exercise the object lifetime or GC timing needed to expose the ownership mistake.

### Sanitizers Still Need Workload Coverage

A sanitizer can only report a violation that occurs during an execution it observes.

ASan can't catch a stale pointer that nobody dereferences. TSan can't report a race if the conflicting accesses never overlap. LSan can't expose a leak in a path the workload never enters. MSan can't reveal an initialization bug if no input reaches the branch that skips the write.

This is where fuzzing, stress testing, failure injection, and concurrency probes become important. They aren't alternatives to sanitizers. They make interesting executions more likely to happen.

Coverage-guided fuzzing explores unusual input paths. Lifecycle stress repeatedly pushes objects through create, retain, transfer, fail, close, finalize, and teardown. Failure injection forces cleanup and rollback code that happy-path tests rarely visit. Concurrency probes make inconvenient thread schedules occur often enough to observe. Corpus replay keeps previously discovered failures from quietly returning.

The sanitizer's job is to make the resulting invalid state visible and, ideally, explain enough of its history to debug it.

That's why a hundred thousand short create/use/close cycles can tell you more about lifetime correctness than a benchmark that processes a gigabyte through one long-lived object. The benchmark spends most of its time in steady state. The lifecycle workload spends its time crossing the transitions where ownership mistakes tend to surface.

### Dynamic Analysis is Not Omniscient

A clean sanitizer run is useful evidence. It's not proof that the code is safe.

It tells you that, for this build and this workload, the parts of the program visible to the sanitizer didn't violate a contract the tool knew how to check.

That scope can be narrower than it first appears.

Some modules may not have been instrumented. A custom allocator may hide the logical object boundaries you care about. Synchronization may happen inside code TSan can't observe. Symbols may be missing or optimization may make stacks harder to reconstruct. A runtime may manage memory in ways that don't map cleanly onto the sanitizer's model. Suppressions intentionally remove some findings from view.

And none of those problems has to exist for a bug to be missed. A perfectly instrumented binary still tells you nothing about a path the workload never executes.

So after a clean run, the useful question is not:

> Are we safe now?

It is:

> What did this run actually observe, and what remained outside its field of view?

That is the right level of confidence to attach to dynamic analysis. A green sanitizer lane is strong runtime evidence about the executions it observed, not a certificate for the rest of the program.

---

## Sanitizers as Executable Ownership Contracts

The usual introduction to sanitizers is a list of bug classes: ASan finds use-after-free and out-of-bounds accesses, LSan finds leaks, MSan finds uses of uninitialized memory, and TSan finds data races.

That description is correct, but it's not especially helpful once you're looking at a real report.

A better model is to ask what assumption the program made that the sanitizer was able to disprove. In ownership-heavy code, that often means asking who was allowed to use a resource, who was responsible for releasing it, and whether that answer changed somewhere along the way.

For MSan and TSan, the same idea extends beyond ownership to initialization and synchronization: what had to be true for this operation to be valid, and did the observed execution actually establish it?

ASan's contract is about **addressability and lifetime**. The program behaves as though a region of memory is still legal to access. ASan maintains enough runtime state to say whether that's true. If the region has been freed, quarantined, or poisoned as a red zone, the access violates the runtime's view of that lifetime.

LSan looks at the other end of ownership. Instead of asking whether an object was accessed after its lifetime ended, it asks why an allocation's lifetime never ended at all. At process teardown, it traces reachable allocations from known roots. Memory that remains allocated without a reachable ownership path is reported as leaked. That's why I think of LSan as **terminal ownership accounting** rather than simply “the leak sanitizer.”

MSan tracks a different contract: **initialization provenance**. Addressable memory isn't necessarily valid data. A byte that was never initialized shouldn'y quietly become a branch condition, pointer, size, parameter, or return value. MSan propagates that state through the execution and reports when the program finally treats uninitialized state as meaningful.

TSan deals with **synchronization visibility**. Two threads may both access the same state, but if those accesses conflict, there must be an ordering relationship that makes them legal. TSan reconstructs the synchronization it can observe and reports accesses that remain unordered. That distinction matters: the program may believe a custom runtime, callback protocol, or external library provides synchronization, while TSan sees no such edge.

These models become particularly concrete around native APIs because native code tends to expose ownership decisions directly.

BoringSSL is a useful example, although the pattern isn't specific to cryptography. Its API conventions distinguish operations such as `get0`, `get1`, `set0`, and `set1` precisely because returning or accepting the same pointer type doesn't mean the same thing for ownership.

A `get0`-style result is borrowed. A `get1`-style result carries an owning reference. A `set0`-style operation transfers ownership, while `set1` retains a reference without transferring the caller's existing one. Reference-counted objects expose operations such as `*_up_ref`, and allocated objects have corresponding release functions.

Those names are doing real correctness work. If a wrapper flattens all of those cases into “some native pointer,” it discards information the API was deliberately trying to preserve.

That's how a wrapper ends up freeing a borrowed handle. Or continuing to use a handle after ownership was transferred. Or retaining a reference without ever releasing it. The pointer value itself hasn't changed. What changed was the program's right to use or destroy what it points to.

Finalizers make the same problem less obvious. A finalizer is usually attached while a wrapper owns a native resource. If ownership later moves into another object but the finalizer remains attached, both objects may now contain a cleanup path for the same resource. Nothing has to fail immediately. The eventual result depends on which cleanup path runs first: a double free, a stale access, or a lifetime that accidentally survives longer than intended.

MSan exposes a similar kind of disagreement at a different boundary. Suppose a function reports success, and the caller interprets success as “all outputs are initialized.” If one successful branch leaves an out-parameter untouched, the caller and callee are operating under different contracts even though neither side necessarily contains an obviously suspicious memory access.

TSan reports have the same shape when synchronization crosses abstraction boundaries. The code may be correct only if a particular lock, atomic operation, callback protocol, or runtime event establishes ordering. If that ordering doesn't exist (or exists somewhere the instrumented execution can't see) the report is telling you that the synchronization story is incomplete from the runtime's point of view.

So a sanitizer report is often more useful when read as a disagreement between components rather than as a local bad instruction. One part of the program says the object is alive, while another has already released it. One side says the result is initialized but the other never wrote it. One thread assumes another has published state safely but the observed synchronization graph says otherwise.

For FFI-heavy code, ownership is where these disagreements accumulate most quickly.

The following ownership-flow diagram is a useful mental model for FFI-heavy systems:

![Ownership-flow diagram for an FFI-heavy system showing how native handles move between allocators, managed wrappers, finalizers, scopes, arenas, and native libraries, and how mistakes can lead to double frees, leaks, or finalizer use-after-free bugs.](https://cdn.hashnode.com/uploads/covers/66b563581acaa21b16e7093a/c6d4d352-d055-44c4-8e69-ad8d27097f2f.png)

The diagram shows why FFI ownership needs explicit state changes. If a handle is borrowed, transferred, finalized, or scoped incorrectly, the result can be a leak, double free, or stale finalizer cleanup.

The same pattern shows up far beyond BoringSSL. Native APIs routinely distinguish uniquely owned objects, reference-counted objects, borrowed views, transferred handles, arena-owned memory, and temporary resources that must be released if an operation fails halfway through.

The terminology varies, but the questions do not:

Who owns the resource now? Is this reference borrowed or retained? What operation ends its lifetime? Does ownership move only on success? If cleanup is deferred, who's still responsible for it while that delay exists?

Those distinctions are what make sanitizer output easier to reason about. When ownership transitions are explicit, an ASan use-after-free can often be traced back to a specific transfer that left a stale owner behind. An LSan report can be tied to the reference that never reached its matching release. When the transitions are implicit, the sanitizer may still find the bug, but the report has to be reverse-engineered against an ownership model that was never clearly represented in the code.

The same principle applies to MSan and TSan even though their contracts are not ownership contracts in the narrow sense. APIs should make initialization postconditions explicit. Concurrent code should make synchronization relationships explicit. The less those rules depend on unwritten assumptions, the easier it is to understand what a sanitizer has actually disproved.

That's the useful sense in which these tools make contracts executable. They don't invent the ownership, initialization, or synchronization rules of the program. Those rules already exist. The sanitizer gives some of them runtime state, observes an execution, and tells you when the program behaves as though a rule were true when the evidence says otherwise.

---

## The Four Sanitizers in Depth

The four main sanitizers differ less in syntax than in what they're capable of knowing about the execution.

| Tool | Runtime question | Typical cost | Main limitation |
| --- | --- | --- | --- |
| **ASan** | Was this memory legal to access at this point in its lifetime? | Roughly 2× slowdown, plus memory overhead | Can't report accesses or logical object boundaries it can't observe |
| **LSan** | Which allocations remain unjustified at process end? | Low during execution. Most work occurs at teardown. | Conservative reachability isn't the same as intended ownership |
| **MSan** | Did uninitialized state influence execution? | Roughly 3× slowdown. Origin tracking adds more. | Requires a broadly instrumented dependency graph |
| **TSan** | Were conflicting accesses ordered by synchronization the runtime could see? | Roughly 5–15× slowdown with substantial memory overhead | Hidden synchronization and uninstrumented code complicate results |
| **Valgrind Memcheck** | What invalid access or leak behavior can whole-process binary instrumentation observe? | Much slower | Better suited to focused or fallback lanes than large always-on matrices |

The costs are only rough planning numbers. Workload shape, allocator behavior, dependency size, platform, and runtime architecture can move them considerably.

### AddressSanitizer (ASan): Addressability and Lifetime

AddressSanitizer is often introduced as a fast way to find memory corruption, but the model is more specific: ASan tracks whether a region of memory is addressable at the moment the program touches it.

The compiler instruments loads and stores so they can be checked against shadow metadata maintained by the runtime. Heap objects are surrounded by poisoned redzones. Freed memory is poisoned as well, and recently freed allocations are commonly held in quarantine before they can be reused.

Stack instrumentation applies the same idea to local lifetimes, which is how ASan can catch use-after-scope and, with the relevant support enabled, use-after-return.

That machinery is why ASan maps so naturally onto lifetime bugs. A wrapper can make an ownership mistake long before anything crashes. The mistake becomes visible to ASan only when it eventually turns into a concrete access to memory that the runtime considers dead or out of bounds.

The set of bugs ASan can catch is correspondingly broad: heap, stack, and global out-of-bounds accesses, use-after-free, use-after-scope, use-after-return, double free, invalid free, and, on supported platforms, leak detection through the sanitizer runtime.

For debugging builds, the compiler flags should favor useful reports rather than maximum optimization. A practical baseline is:

```sh
clang++ -O1 -g -fno-omit-frame-pointer -fno-optimize-sibling-calls -fsanitize=address -o my_tests sanitizer_tests.cc

ASAN_SYMBOLIZER_PATH="$(command -v llvm-symbolizer)"
ASAN_OPTIONS="detect_leaks=1:check_initialization_order=1" 
./my_tests
```

The build keeps debug information and frame pointers, and avoids sibling-call optimization so useful callers are less likely to disappear from a stack. The runtime invocation makes llvm-symbolizer available and enables leak detection plus initialization-order checking where the platform supports it.

There's no special value in those exact flags if they don't fit your build system. The point is to produce a binary whose failure can be explained. A sanitizer lane that saves a few percent of runtime but produces stacks nobody can reconstruct is a bad trade.

ASan also stops on the first detected error by default. That behavior is worth preserving during investigation.

Once the program has crossed into invalid memory state, later failures become less trustworthy. One stale write can corrupt a neighboring object, which changes a branch, which causes a second invalid access somewhere unrelated. Continuing may give you more reports, but not necessarily more independent bugs.

The first report is often the best evidence you'll get because the allocation, lifetime transition, and bad access are still relatively close to the original mistake.

ASan is powerful, but its result still has boundaries. Fully static linking isn't the normal supported model. On 64-bit systems, ASan reserves a large virtual address range for its shadow mapping. Partial instrumentation weakens what the runtime can see. Custom containers and allocators can hide logical object boundaries. The compact shadow scheme also has known edge cases around some partially out-of-bounds unaligned accesses.

None of those limitations make ASan weak. They simply define what a clean ASan run means: the accesses exercised by this workload didn't cross an addressability boundary that the instrumented runtime could observe.

#### How ASan shadow memory works

ASan gets much of its speed from using a compact shadow representation rather than maintaining a heavyweight metadata object for every allocation.

In the common mapping, one shadow byte describes eight bytes of application memory. A shadow value of zero means all eight corresponding bytes are addressable. Values from one through seven can represent a partially addressable tail, encoding how many leading bytes remain valid. Other non-zero values are used as poison markers for regions such as redzones, freed memory, or invalid stack lifetimes.

![Flowchart explaining ASan shadow memory: an 8-byte block of application memory maps to one shadow byte, where zero means all bytes are addressable, values 1 through 7 mean only that many leading bytes are addressable, and poison markers represent redzones, freed memory, or invalid stack lifetime.](https://cdn.hashnode.com/uploads/covers/66b563581acaa21b16e7093a/19ab5525-92ae-446d-897f-cd78ec834cf0.png)
<!-- TODO: mermaid화 -->

The diagram shows how ASan maps application memory to shadow memory so it can quickly decide whether a load or store touches valid, partially valid, or poisoned memory.

Before an instrumented load or store, compiler-generated code maps the application address to the corresponding shadow byte and checks whether the requested access is valid.

For ordinary heap allocations, the allocator places poisoned redzones around the object. When the object is freed, its memory becomes poisoned as well and is commonly held in quarantine for a while rather than being returned immediately for reuse.

That delay matters. Without it, a stale pointer can quickly start referring to a new, valid object at the same address. Keeping the region poisoned gives the old pointer more time to fail as a use-after-free.

Stack instrumentation uses the same general mechanism around local variables. Regions can be poisoned when a scope ends, and additional instrumentation can preserve poisoned state after a function returns to catch stack lifetime violations that would otherwise depend on whether the old frame happened to be reused.

The shadow model explains both ASan's speed and some of its blind spots.

ASan is very good when the invalid access crosses a boundary the compiler and runtime know about. It's less useful when an access happens entirely inside uninstrumented code, when inline assembly bypasses compiler-generated checks, or when an allocator presents several logical objects as one large addressable region.

There's also an important distinction between a **logical ownership bug** and an **addressability violation**. ASan doesn't know that your API says a pointer was transferred. It knows that memory eventually became poisoned and somebody touched it afterward. If the ownership model is wrong but no illegal access occurs during the run, ASan has nothing to report.

#### Read the first report as a causal narrative

An ASan report is usually easier to understand if you stop treating the top frame as the bug.

For a typical heap use-after-free, there are at least three points worth reconstructing:

- the access that finally touched invalid memory
- the allocation that created the object
- the deallocation that ended its lifetime

Depending on the report, you may also get shadow-memory context and thread-creation history.

Those stacks describe different beliefs about the same object.

The allocation stack tells you where the lifetime began. The free stack tells you where one part of the program decided that lifetime was over. The current access tells you who still believed the object was usable.

For example:

```plaintext
allocate native object
    -> hand pointer to wrapper
    -> transfer ownership elsewhere
    -> old cleanup path still runs
    -> new owner dereferences pointer
    -> ASan reports use-after-free
```

The dereference is where ASan notices the problem. The broken transition happened earlier.

That distinction matters in real fixes. Adding a null check around the victim access may suppress one crash while leaving the stale ownership state intact. The better repair is usually at the point where one owner stopped being an owner but the program failed to represent that change.

#### Custom allocators and interceptors

ASan works best when its view of allocation boundaries matches the boundaries the application cares about.

That's straightforward with ordinary `malloc`, `free`, `new`, and `delete`. It becomes more complicated with arenas, slabs, pools, region allocators, JIT heaps, placement construction, and library-specific allocators.

Consider a pool that requests a 1 MiB backing region from the system and then subdivides it into hundreds of 64-byte objects. From the system allocator's point of view, that may be one live allocation. Unless the pool cooperates with ASan, an overwrite from one 64-byte object into the next can remain entirely inside addressable backing memory.

The program has crossed a logical object boundary. ASan may have no corresponding poisoned boundary to catch.

Sanitizer-aware allocators usually handle this in one of a few ways. They can explicitly poison unused slots or gaps, annotate container boundaries through sanitizer APIs, or offer a test mode that delegates individual allocations to the system allocator so ASan can see them independently.

Workload design can help as well. Aggressive slot reuse makes stale references more likely to collide with changed lifetime state. Generation counters can expose stale handles at the allocator level. Repeated allocate/free/reallocate sequences are often more useful for lifetime testing than steady-state workloads that leave the same objects alive for minutes.

The important part is that allocator visibility isn't automatic.

If your allocator deliberately hides the application's object boundaries, enabling `-fsanitize=address` at the top of the build can't reconstruct those boundaries afterward. The allocator either has to expose them to ASan or the test environment has to use a configuration in which the boundaries become observable.

Interceptors have a similar role at common library boundaries. They allow the sanitizer runtime to understand operations that would otherwise happen inside library code. But interceptors aren't a substitute for complete instrumentation. They extend ASan's field of view. They don't make opaque code transparent.

#### Suppressions are not a repair strategy

Suppressions are sometimes necessary.

A report may originate in a third-party library you can't patch immediately. A platform component may already have an upstream fix that hasn't reached your supported environment. There may also be cases where the sanitizer runtime and a dependency interact badly enough that the lane can't remain usable without a temporary exception.

In those situations, suppress the specific problem, not the neighborhood around it.

A broad suppression is dangerous because it changes what a green sanitizer run means. Matching an entire library, namespace, or call path can hide a new and unrelated regression months after the original reason for the suppression has been forgotten.

For code you own, suppression should be unusual. If the report is real and actionable, hiding it because the fix is inconvenient defeats the reason for running ASan in the first place.

When a suppression is necessary, keep enough information beside it to understand why it exists: the narrowest stable match you can use, the underlying issue, the component responsible for resolving it, and some point at which the exception will be reviewed again.

Keep the lane sensitive to new failures, and treat every exception as a narrow, documented gap in what the current build can observe.

### LeakSanitizer (LSan): Terminal Ownership

Leaks have a different failure shape from use-after-free or buffer overflows. Nothing has to crash. The operation can return the right result, every test can pass, and the process can shut down normally while still leaving allocations behind.

Somewhere in that execution, ownership simply never reached its end.

LeakSanitizer is built around that point in the lifecycle. ASan watches accesses as the program runs. LSan does most of its interesting work when the process is shutting down, when it can inspect what heap allocations remain and how they're connected to live roots.

That makes leak detection especially useful for code where cleanup is easy to miss without affecting the immediate result: FFI wrappers, partial-construction failures, teardown paths, caches, reference-counted objects, and systems that rely partly on finalization.

Clang can run LSan as part of an ASan build, or independently with `-fsanitize=leak`. Most of the expensive work happens during leak checking rather than on every ordinary memory access, so the runtime overhead during the main body of the program is generally small.

The useful mental model is terminal ownership accounting. By the time the process reaches teardown, every allocation should either have been released or still have some legitimate reason to remain reachable. LSan reconstructs the second category from the runtime state it can inspect.

That distinction matters because many ownership bugs never become invalid accesses. A retained reference may simply survive forever. An error path may forget one cleanup call. A global or cache may accidentally keep an object graph alive. The application keeps working, the ownership path just never closes.

If you already have a working ASan configuration, enabling leak detection there is usually the most practical starting point. Stand-alone LSan is available and can be useful when full ASan instrumentation is undesirable or difficult to integrate, although it has historically received less testing than the ASan-integrated path.

A basic ASan-backed leak lane looks like this:

```sh
clang -O1 -g -fsanitize=address -fno-omit-frame-pointer \
-o leak_suite leak_suite.c

ASAN_SYMBOLIZER_PATH="$(command -v llvm-symbolizer)" \
ASAN_OPTIONS="detect_leaks=1" \
LSAN_OPTIONS="exitcode=23:suppressions=lsan.supp" \
./leak_suite
```

If you want leak-only coverage:

```sh
clang -O1 -g -fsanitize=leak -o leak_suite leak_suite.c
LSAN_OPTIONS="exitcode=23:suppressions=lsan.supp" ./leak_suite
```

The explicit exit code is useful in CI because it turns a leak report into an ordinary job failure. Suppressions let you keep known external findings from drowning out the code you are trying to measure, although they carry the same cost discussed elsewhere in this handbook: every suppression removes some amount of visibility.

A leak lane becomes valuable when its result has a clear interpretation. If the test allocates a resource, exercises its lifetime, releases everything it still owns, and exits, then an unexpected allocation at teardown is a fairly direct ownership signal. The larger and noisier the process, the more care that interpretation requires.

#### Reachability is not the same as intention

LSan is conservative because it has no direct knowledge of your ownership design. At shutdown, it inspects root-like regions such as thread stacks, registers, globals, and thread-local storage, then follows pointer-looking values into heap allocations. If an allocation remains reachable through that graph, LSan may leave it alone even when the application logically intended to release it.

![Flowchart showing how LSan checks for leaks at process shutdown by collecting roots from stacks, registers, globals, and thread-local storage, tracing pointer-like values, and separating reachable allocations from unreachable direct and indirect leaks.](https://cdn.hashnode.com/uploads/covers/66b563581acaa21b16e7093a/74b5c28a-6256-4b5f-bed4-311b0909b13f.png)
<!-- TODO: mermaid화 -->

The diagram shows how LSan traces reachability at shutdown. Unreachable allocations become leak reports, but reachable memory may still be logically wrong if the program meant to release it earlier.

This is one of the most important differences between leak detection and ordinary lifetime debugging.

Suppose an object should have been released during teardown, but a stale pointer to it remains in a global structure. From the program's point of view, cleanup is broken. From LSan's point of view, the allocation is still reachable.

The opposite case is easier to diagnose. If an allocation has no path back to any root LSan recognizes, it can report it as leaked and show the allocation stack that created it.

Direct and indirect leaks are worth reading together. A missing release for one parent object can leave an entire graph unreachable. Fixing that parent may eliminate many downstream leak records at once. Chasing every indirect allocation independently wastes time when they all share the same lost owner.

Reachability can also be intentional. Some runtimes keep process-lifetime caches. Libraries may initialize global state once and never tear it down because process exit will reclaim the pages anyway. Test frameworks and managed runtimes can leave allocations visible during shutdown that have little to do with the component under investigation.

That is why whole-application leak reports are often harder to interpret than focused ones.

For a library or FFI wrapper, a small helper process can be much more informative:

```plaintext
initialize runtime
    -> create native resources
    -> exercise success and failure paths
    -> release explicit owners
    -> allow deferred cleanup where relevant
    -> exit
```

The shorter that lifecycle is, the easier it becomes to answer the useful question: which allocations should still exist at this point?

Finalizer-driven code deserves extra care here. A managed object becoming unreachable doesn't necessarily mean its native resource has already been finalized by the time the process begins leak checking. If the test depends on eventual cleanup, the harness needs to account for the runtime's finalization behavior rather than treating process exit as a deterministic destructor call.

The same problem appears with asynchronous cleanup, worker threads, and background caches. A leak test that terminates before normal teardown completes can report memory that the real application would have released a moment later.

Those are workload problems rather than reasons to ignore LSan. The test needs to reach the state whose ownership you actually want to measure.

#### Bring the leak lane online gradually

Adding leak detection to an established codebase often produces an ugly first report.

Some of the findings will be real leaks in code you own. Others may come from dependencies, runtime shutdown behavior, process-lifetime caches, incomplete cleanup in the test harness, or allocations whose reachability needs more investigation.

Trying to make all of that blocking immediately usually produces one of two outcomes: a pile of broad suppressions or a CI lane that everyone learns to rerun and ignore.

Start by making the reports reproducible.

A deterministic direct leak in owned code is usually straightforward: fix it and keep the reproducer. For runtime or dependency findings, establish whether they're stable, whether they're actually reachable at shutdown, and whether a smaller process can separate them from the code under test.

Suppress only the cases you have enough evidence to understand, and keep those matches narrow.

As the baseline gets cleaner, tighten the failure policy. New direct leaks in a focused test can become blocking quickly. Findings from a managed runtime or a large host process may need more attribution before they deserve the same treatment.

This is also why leak **severity** and leak **correctness** should remain separate judgments. A four-byte allocation that leaks once during process startup may have negligible operational impact, but it still tells you that one ownership path doesn't terminate correctly. Whether it blocks a release depends on policy. Whether the ownership accounting is wrong is a different question.

A useful leak lane eventually reaches the point where a new report is surprising. When that happens, LSan stops being a periodic cleanup exercise and becomes a regression detector for ownership paths that previously had no executable check.

### MemorySanitizer (MSan): Initialization Provenance

ASan catches code using memory it should no longer be able to touch. MSan catches a different failure: the memory is perfectly addressable, but the value being read was never legitimately established.

That distinction matters because uninitialized data doesn't have to cause an immediate crash. It can become a length, a flag, a pointer offset, a branch condition, or an output returned to another layer. The program may carry that value for quite a while before it reaches an operation MSan considers observable.

This makes MSan particularly good at finding disagreements across API boundaries.

A caller sees a successful return and assumes every output promised by the API is ready to use. The callee has one branch that returns success without writing one of those outputs. Both pieces of code can look reasonable in isolation. The problem only becomes obvious when the caller consumes state that never acquired a valid initialization history.

Mozilla's NSS issue [<VPIcon icon="fa-brands fa-firefox"/>1767590](https://bugzilla.mozilla.org/show_bug.cgi?id=1767590) is a useful example. An output pointer was treated as initialized after a successful call even though one path through the callee could return success without writing it. MSan eventually reported the uninitialized value, but the more interesting defect was the API contract: the meaning of “success” was stronger in the caller than in the implementation.

That's a recurring MSan pattern. The report appears at the use site, while the bug often began earlier when some path failed to establish the state the caller was entitled to expect.

A basic MSan build looks like this:

```sh
clang++ -O1 -g -fno-omit-frame-pointer \
-fsanitize=memory -fsanitize-memory-track-origins=2 \
-o msan_suite msan_suite.cc

MSAN_SYMBOLIZER_PATH="$(command -v llvm-symbolizer)" \
./msan_suite
```

`-fsanitize=memory` enables the instrumentation. `-fsanitize-memory-track-origins=2` asks MSan to retain more information about where poisoned state came from and how it moved through memory.

Origin tracking is expensive. Regular MSan already carries substantial runtime and memory overhead, and tracking origins adds more. For difficult bugs, though, the extra information is often worth paying for.

Without origin information, a report may tell you that an uninitialized length reached a branch deep inside a decoder. With origins enabled, you may be able to trace that value back through several stores to an output structure allocated by the caller, then see that one recovery path never initialized a member.

That's the difference between knowing where bad state became visible and knowing where it entered the execution.

MSan works especially well around parsers, codecs, binary formats, cryptographic message processing, serialization, IPC, database pages, and APIs with output parameters. These systems routinely construct objects incrementally and pass partially populated state across several layers. An initialization mistake can survive a surprising distance before ordinary testing notices anything unusual.

#### What MSan actually propagates

Calling uninitialized memory “random bytes” is a useful shorthand, but it misses the mechanism that makes MSan interesting.

MSan maintains shadow state describing which bits of a value are initialized. Copies propagate that state. Arithmetic and other operations propagate it into their results. As values move through the program, the initialization history moves with them.

![Flowchart showing how MSan tracks uninitialized state from an uninitialized allocation or stack slot into poisoned shadow state, through copies or arithmetic, until a sensitive use such as a branch, pointer/index, parameter, or return value triggers an MSan report.](https://cdn.hashnode.com/uploads/covers/66b563581acaa21b16e7093a/fd6f93d8-dc63-4117-8cc8-f3afc1c58258.png)
<!-- TODO: mermaid화 -->

The diagram shows how MSan follows uninitialized state through the program and reports it only when the value is used in a way that affects execution.

Poisoned state can therefore survive several apparently harmless operations before anything is reported.

For example:

```plaintext
stack object allocated
    -> one field left unwritten
    -> structure copied
    -> field copied into a size variable
    -> size used in a conditional
    -> MSan reports uninitialized use
```

The branch is simply where the invalid state became semantically important. Fixing only that branch misses the earlier path that produced a partially initialized object.

The same applies to function boundaries. If a value is returned to a caller or passed into code that requires it to be initialized, MSan can report the transition even though the underlying memory address was valid the whole time.

This is why MSan reports often feel very different from ASan reports. With ASan, you're usually reconstructing the lifetime of an address. With MSan, you're reconstructing the history of a value.

Origin tracking adds another layer to that history. At the higher tracking level, MSan can retain information about where poisoned memory originated and where it was subsequently stored. That can be noisy and expensive, but it's extremely useful when the observable use is several abstraction layers away from the missed initialization.

#### MSan needs visibility through the dependency graph

MSan becomes much harder to trust when important parts of the execution aren't instrumented.

Suppose an uninstrumented library writes into a buffer. The bytes may be completely valid from the application's point of view, but MSan didn't observe the writes that initialized them. When instrumented code later consumes the buffer, the shadow state may still say that those bytes are poisoned.

The reverse problem also exists. Poisoned data can pass into uninstrumented code and be consumed there without MSan seeing the use.

Interceptors help at common library boundaries, but they don't make arbitrary opaque code visible. If initialization state crosses through a dependency that MSan doesn't understand, confidence in the resulting report drops.

For high-quality MSan coverage, the application and the libraries through which important state flows generally need to be rebuilt with compatible instrumentation. Depending on the environment, that can extend into the C/C++ runtime and other low-level dependencies.

This is why MSan often becomes its own build environment rather than another checkbox in the normal sanitizer matrix.

Projects with mostly source-built dependencies can make that environment quite complete. Projects that depend heavily on prebuilt native libraries, inline assembly, proprietary runtimes, or system components they can't rebuild have a harder time getting clean results.

That operational cost is real. So is the class of bug MSan finds. For code that parses attacker-controlled input or relies heavily on partially constructed outputs, the investment can be worthwhile even when the lane only covers a carefully selected part of the system.

#### Make success postconditions explicit

MSan has a habit of finding APIs where the return value says more than the implementation actually guarantees.

Consider a function like:

```cpp
bool decode(const uint8_t* input, size_t input_len,
            uint8_t* output, size_t* output_len);
```

A caller will naturally read true as a postcondition: output contains a valid result and `*output_len` says how much of it is valid.

If some successful branch writes output but leaves `*output_len` untouched, the implementation has created a state the API doesn't communicate.

The same problem appears with structures:

```plaintext
result.status = OK
result.data   = initialized
result.length = never written
```

Nothing about `status == OK` warns the caller that one field is unsafe to inspect.

Several designs avoid this ambiguity. Outputs can be initialized to valid defaults before control flow branches. A function can return a fully constructed result object rather than writing through several independent pointers. APIs that genuinely support complete, partial, and failed results can represent those states explicitly instead of overloading a single success code. Buffers with partial contents can return their valid length as part of the result rather than relying on an optionally written side channel.

Which design is appropriate depends on the API. The important property is that callers should be able to tell, from the interface and the return state, which values they're allowed to consume.

When MSan catches a missing initialization, adding `memset(..., 0, ...)` may be a correct fix in some cases. In others it merely turns undefined state into a plausible-looking default while leaving the API contract ambiguous.

The report is worth following back far enough to answer the more useful question: **which path allowed the caller to believe this value was ready when it was not?**

### ThreadSanitizer (TSan): Synchronization Visibility

ThreadSanitizer observes a part of execution that ordinary tests are particularly bad at validating: the ordering between accesses made by different threads.

A program can run successfully thousands of times with an actual data race simply because the scheduler keeps choosing harmless interleavings. TSan instruments memory accesses and synchronization operations so it can reconstruct enough of the execution to identify conflicting accesses that occurred without a valid ordering relationship.

That visibility comes at a substantial cost. TSan commonly slows programs by roughly 5–15x and can consume several times their normal memory. It also needs broad compiler instrumentation. The build machinery may make additional changes, such as producing position-independent executables where required by the runtime.

Those constraints are why TSan usually lives in its own build rather than being added casually to the normal test binary.

A typical setup is straightforward:

```sh
clang++ -O1 -g -fsanitize=thread 
-o tsan_suite tsan_suite.cc

TSAN_OPTIONS="halt_on_error=1:history_size=7" 
./tsan_suite
```

The compiler flag instruments the program for race detection. halt_on_error=1 makes the first reported race fail the run, while a larger history can give the report more context about earlier accesses.

As with the other sanitizers, useful symbols matter more than squeezing maximum performance out of the instrumented build. TSan reports often involve two stacks, multiple threads, and the synchronization events around them. Losing a caller or thread-creation stack to an overly aggressive build can make an already difficult race much harder to reconstruct.

The bigger operational problem is visibility across the rest of the process.

TSan needs to observe the synchronization that makes shared-memory accesses safe. That works well when locks, atomics, condition variables, thread creation, and other synchronization primitives pass through code the runtime understands. It becomes less reliable when part of the ordering happens inside prebuilt libraries, custom scheduler code, assembly, native callbacks, or runtime machinery that wasn't instrumented.

A report near one of those boundaries needs context before anybody labels it a false positive.

Mozilla's Bugzilla issue 1688716 is a useful example. The report involved graphics code where part of the relevant execution passed through non-instrumented code. The discussion had to account for the possibility that synchronization existed outside TSan's view.

That's a very different situation from two unsynchronized accesses in fully instrumented code you own.

The opposite blind spot matters too. If the conflicting accesses themselves happen inside uninstrumented code, TSan may never see the race at all. Partial instrumentation can therefore create both confusing reports at boundaries and genuine false negatives inside opaque modules.

For a serious TSan lane, it's worth knowing which parts of the process are instrumented before the first report arrives.

TSan also benefits much more than ASan from workloads designed specifically for the property being tested. A conventional unit suite may exercise the right functions while consistently producing the same thread schedules. Race detection needs repetition, contention, and overlap.

That affects where the lane belongs. A short TSan smoke test may still be useful on pull requests, but expensive concurrency workloads are often better suited to scheduled runs, targeted changes, or pre-release testing. The CI section later in the handbook goes into that tradeoff in more detail.

#### Happens-before is the working mental model

TSan doesn't simply look for “two threads touched the same variable.”

It records memory accesses and synchronization events, then asks whether conflicting accesses are ordered by a happens-before relationship. If two threads touch the same memory, at least one access writes, and no observable synchronization orders those operations, TSan has the shape of a data race.

![Sequence diagram showing writer and reader threads with synchronization between them. A release/unlock/signal followed by an acquire/lock/wait creates ordered accesses with no data race, while a write and read without observable ordering are conflicting unordered accesses that TSan can report.](https://cdn.hashnode.com/uploads/covers/66b563581acaa21b16e7093a/20a3c7d3-872f-4eed-8f0c-060a35559201.png)
<!-- TODO: mermaid화 -->

The diagram shows how synchronization creates the ordering TSan needs to see. Without that observable ordering, conflicting accesses across threads can become a TSan report.

A mutex creates ordering that TSan understands. An unlock in one thread followed by a lock in another can establish the required edge. Correct acquire/release atomics can do the same. Thread creation and join, condition variables, and other recognized synchronization primitives also contribute to the happens-before graph.

For example, consider a simple publication pattern:

```plaintext
writer:
    initialize object
    -> release/store ready flag

reader:
    acquire/load ready flag
    -> read object
```

If the release/acquire pair is implemented correctly and visible to TSan, the writes that initialized the object can be ordered before the reader consumes it.

Replace that protocol with an ordinary unsynchronized boolean and the program may still appear to work on a particular machine. TSan no longer has an ordering edge connecting the accesses.

The same problem appears with custom synchronization. A home-grown lock in assembly may be perfectly correct at the hardware level while remaining invisible to the sanitizer. From TSan's point of view, the accesses on either side can look unordered because the event that connects them never entered its model.

That's why a TSan report has two possible debugging directions. Sometimes the synchronization is genuinely missing. Sometimes the synchronization exists but TSan can't observe it. The report itself gives you the conflicting accesses, while understanding the instrumentation boundary tells you which situation you are dealing with.

#### Be skeptical of “benign races”

“Benign race” is a dangerous phrase because it usually describes observed behavior rather than a defined synchronization rule.

A field may appear harmless because every value seen so far is acceptable. That still leaves several problems.

In C and C++, an actual data race generally puts the program into undefined-behavior territory. Compiler transformations aren't constrained by the timing assumptions that made the code appear safe during testing.

The raced field may also participate in a larger invariant. An unsynchronized flag can look harmless while another field is expected to change with it. Seeing one update without the other can expose a state the programmer never intended to exist.

Maintenance makes the argument weaker still. A value that genuinely did not matter when the race was introduced may later become part of a lifetime decision, callback protocol, or security check while the old unsynchronized access remains untouched.

There are legitimate cases where a TSan report comes from instrumentation gaps or from synchronization the runtime can't see. Those deserve investigation at the boundary.

When both conflicting accesses are in instrumented code you own and no ordering mechanism connects them, “benign” should require a much stronger explanation than “we've never seen it break.”

Often the eventual repair is simple: use an atomic with the appropriate memory ordering, put the state behind the existing mutex, or redesign the object so the conflicting accesses no longer occur concurrently.

The harder part is identifying which ordering the code was relying on before the report exposed that it was missing.

#### Make the race easier to schedule

TSan only reports races that happen during the observed run.

A million lines of concurrency code can pass cleanly if the workload never produces the relevant overlap. Conversely, a focused test that repeatedly attacks one lifecycle boundary can expose a race in seconds.

Useful concurrency probes deliberately increase the probability of the schedules you care about.

If two operations should be safe when they begin at nearly the same time, start the threads from a barrier. If a race may exist between callback completion and object destruction, repeat that transition thousands of times. If a registry supports concurrent lookup and removal, hammer both operations from several workers.

Test-only yields can be useful around narrow windows:

```plaintext
thread A:
    read state
    -> yield
    -> update shared object

thread B:
    close object
    -> release shared state
```

The yield doesn't create the bug. It gives an already legal scheduler interleaving more room to occur.

Similar techniques work for callback registration and cancellation, attach/detach cycles, shutdown while work is still completing, and races between explicit cleanup and background teardown.

Randomization can help explore a larger scheduling space, but record the seed and the operation sequence. A TSan report that occurs once overnight and can't be reproduced locally is much more expensive to investigate than one whose workload can be replayed.

The workload should remain faithful to behavior the real system can produce. Artificial contention is useful, but impossible object lifetimes are not. The test should make an existing race easier to schedule rather than inventing a concurrency model the application never uses.

A good TSan workload therefore spends its time around transitions: publish and consume, register and unregister, start and stop, close and complete, and retain and release. Those are the places where two threads are most likely to disagree about what state is currently safe to touch.

---

## Combining Sanitizers and Knowing What They Do Not Cover

There's no useful “enable everything” sanitizer build.

The tools maintain different runtime metadata, impose different instrumentation requirements, and often need very different workloads. Some combinations fit naturally into the same binary. Others should be treated as separate builds with their own dependency graphs and CI budgets.

Understanding those boundaries matters because a large sanitizer matrix can still give weak evidence if the combinations are poorly chosen or important parts of the process remain opaque.

### Combinations That Work Well Together

ASan and UndefinedBehaviorSanitizer are commonly enabled together. Their checks cover different parts of the execution and coexist well in many Clang builds:

```sh
clang++ -O1 -g -fno-omit-frame-pointer \
-fsanitize=address,undefined \
-fno-sanitize-recover=all \
app.cc -o app_sanitized
```

ASan watches addressability and lifetime. UBSan catches language-level undefined behavior such as invalid shifts, misaligned accesses, invalid enum values, and enabled integer-overflow checks.

UBSan isn't a major subject of this handbook, but it belongs in this discussion because the eventual memory failure may begin somewhere that ASan doesn't model.

An invalid size calculation can lead to an undersized allocation. A bad cast can send execution through an impossible type state. Misaligned access or arithmetic overflow can corrupt assumptions long before the program crosses a poisoned ASan boundary. In those cases, the UBSan finding may be closer to the original defect than the ASan crash that follows it.

Recovery policy is worth choosing deliberately. Letting UBSan continue can expose several categories during one run, which is useful during broad discovery. Failing on the first finding keeps the execution closer to the first known invalid state and is often easier to reason about in a regression lane.

Leak detection also commonly shares the ASan build. On supported platforms, LSan can run through the ASan runtime and perform its reachability analysis when the process exits. That gives the same binary both access-violation coverage during execution and leak accounting at teardown.

Standalone LSan remains useful when leak checking is needed without the rest of the ASan instrumentation. The choice is mostly operational: if a reliable ASan build already exists, using its leak support usually keeps the number of distinct build configurations smaller.

### TSan and MSan Deserve Separate Builds

TSan belongs in a different binary from ASan.

Both tools instrument memory accesses heavily and maintain runtime state for very different purposes. TSan needs access histories and synchronization metadata while ASan needs shadow addressability state and allocator integration. In practice, they should be treated as separate observability environments rather than variations of one sanitizer job.

That separation is useful anyway because the workloads should differ.

An ASan lane may get excellent value from parser tests, lifecycle stress, and failure-path coverage. A TSan lane needs concurrency: overlapping operations, repeated thread transitions, callback races, shutdown while work is active, and enough repetition for interesting schedules to occur.

Its performance budget is different too. A workload that's perfectly reasonable under ASan may be far too expensive under TSan.

MSan needs its own environment for another reason: initialization provenance is only trustworthy when enough of the code carrying that state is instrumented.

Adding `-fsanitize=memory` to the application while leaving important native dependencies opaque can break the initialization history MSan is trying to follow. Serious MSan setups tend to look like instrumented dependency graphs rather than ordinary application builds with one extra compiler flag.

That makes the build matrix asymmetric, and that's fine.

A project might run ASan+UBSan on most changes, leak detection as part of the same binary, TSan against a smaller concurrency-heavy workload, and MSan only in an environment where the relevant dependencies can be rebuilt correctly. The useful question is what each lane can observe reliably, not whether every tool appears in the same CI stage.

### Hardware-Assisted and Production-Side Checks

Software ASan is only one way to observe lifetime and bounds failures.

Hardware-assisted AddressSanitizer and Arm Memory Tagging Extension use tagged memory and pointers to detect mismatches between the pointer being used and the allocation it is supposed to reference. On supported 64-bit Arm systems, that can make memory checking practical in environments where the overhead of conventional ASan would be difficult to carry.

The tradeoffs are different from software ASan.

The tag space is finite, so stale pointers can occasionally collide with a valid tag and escape detection. Platform support determines where the checks can run. The exact treatment of stack, global, and allocator behavior also differs from conventional ASan.

What these mechanisms buy is access to executions that ordinary sanitizer CI may never see: longer-running workloads, device-specific behavior, realistic allocator pressure, and in some cases production or near-production traffic.

Guarded allocators, hardened allocators, sampled memory checking, crash telemetry, and canary deployments fit into the same broader strategy. Each observes a different slice of runtime behavior at a cost that may be acceptable outside a fully instrumented test environment.

Their findings should feed back into the deterministic test setup whenever possible. A sampled production use-after-free becomes much more valuable once its lifecycle can be reproduced under ASan. A long-running memory-growth pattern can become a focused LSan workload. A concurrency failure observed only under load can become a TSan stress case.

Production-side checking expands the executions you get to observe. The compiler sanitizer builds remain the place where those failures can usually be reproduced with richer instrumentation and tighter control.

### What a Green Sanitizer Matrix Actually Tells You

A sanitizer matrix answers a narrower question than “is this program correct?”

It tells you what happened during the executions the instrumented runtime was able to observe.

That leaves a lot outside the claim.

Business logic can be wrong while every sanitizer stays quiet. Authorization can be incomplete. A cryptographic protocol can be misused. Timing and other side channels can exist in completely memory-safe code. A lock-free algorithm can be race-free and still fail its intended linearizability guarantees.

Even within memory safety and concurrency, workload coverage remains a hard boundary. Code that never executes can't produce a dynamic report.

Instrumentation creates another boundary. ASan can't enforce object boundaries hidden inside an allocator it doesn't understand. MSan loses initialization history across opaque code. TSan can't reconstruct synchronization that never becomes visible to its runtime. A third-party module that was never instrumented may contain bugs none of the surrounding sanitizer jobs can see.

Suppressions narrow the claim further. A green run means the runtime found no **unsuppressed** violation it knew how to report. Every suppression therefore changes the meaning of “clean.”

It helps to be precise about the claim attached to a successful run:

> For this build, under this workload, the instrumented execution did not violate the runtime properties this sanitizer was able to observe.

That may sound modest, but it's a useful engineering statement. It tells you exactly where the remaining work belongs.

If the workload is weak, improve the workload. If a dependency is opaque, instrument more of the dependency graph where practical. If one class of failure falls outside ASan's model, add the tool that can observe it. If the remaining uncertainty comes from API design rather than runtime coverage, static analysis, code review, stronger ownership types, or interface changes may provide better leverage than another sanitizer job.

A good sanitizer setup grows by closing known gaps in evidence, not by accumulating compiler flags.

---

## FFI Ownership Across Runtime Boundaries

FFI bugs tend to repeat because the boundary has to reconcile two different lifetime models. The managed side may use garbage collection and finalizers, while the native side may use explicit frees, reference counts, arenas, or ownership-transfer APIs.

The failure is rarely “FFI” in the abstract. More often, the two sides simply disagree about who owns a resource at a particular moment.

One recurring failure is **ownership transfer without state transfer**. A wrapper creates or receives a native handle, passes ownership somewhere else, but continues to represent that handle as usable. Nothing about the pointer itself says that ownership moved. Unless the wrapper changes state as part of the transfer, the old owner can still free it, attach cleanup to it, or use it later.

This is where APIs that distinguish borrowing, retaining, and transferring ownership become valuable. BoringSSL is a particularly explicit example: conventions such as `get0`, `get1`, `set0`, and `set1` communicate whether a reference is borrowed, owned, adopted, or retained. A wrapper that reduces all of those cases to the same pointer representation loses information the native API was deliberately exposing. That's how borrowed handles get freed, transferred handles get reused, and owning references quietly leak.

Another common failure is **losing the release mechanism**. Knowing that you own an allocation isn't enough. You also need to know how that allocation must be released. Native libraries may pair allocations with a specific free function, return reference-counted objects that require a decrement operation, or hand back memory owned by an arena rather than by the caller.

BoringSSL again gives a simple example: memory allocated through `OPENSSL_malloc` is expected to be released through `OPENSSL_free`. If a wrapper treats that memory as interchangeable with memory from another allocator, the mistake may remain invisible until teardown or until ASan, Valgrind, or another memory checker reaches the mismatched release.

The broader rule is that an owning wrapper should preserve the resource's destruction semantics, not merely its address.

A third failure comes from **treating finalization as destruction**. A finalizer can eventually release a native resource, but it doesn't give you deterministic lifetime. Its timing depends on runtime reachability and garbage collection, not on the lexical point where the program stopped needing the object.

That distinction matters whenever the native resource has a meaningful lifetime of its own. File descriptors, native handles, cryptographic contexts, GPU objects, database handles, and similar resources often need explicit release semantics. A finalizer is useful as a fallback, but it shouldn't quietly become a second independent owner.

Transfer makes this especially dangerous. If a managed object hands its native handle to another owner but leaves its finalizer attached, both sides may now believe they're responsible for cleanup. The wrapper should invalidate its own state as part of the move: detach the finalizer, clear the handle, or otherwise make subsequent use fail immediately.

Failure paths create another class of bug. Code can be perfectly correct on the successful path and still have no coherent ownership story when an operation fails halfway through.

Suppose a function allocates three temporary native objects and transfers one of them only if an import succeeds. The failure path must release everything that was never transferred. The success path must release the remaining temporaries without also releasing the object whose ownership moved. Those are separate questions: **does cleanup run on every exit, and which objects still belong to that cleanup path when it runs?**

This is why cleanup scopes, RAII guards, `defer`-style mechanisms, and similar patterns are useful. They make cleanup the default, then require successful ownership transfers to explicitly remove an object from that cleanup responsibility. Without that distinction, the same code can leak on failure and double-free on success.

A small C++ example shows what it looks like when those states are represented explicitly. BoringSSL provides the concrete API here, but the pattern applies to any reference-counted native handle:

```cpp :collapsed-lines
#include <openssl/evp.h>
#include <memory>
#include <stdexcept> 

struct PKeyDeleter { 
    void operator()(EVP_PKEY* p)
    const noexcept { EVP_PKEY_free(p); } 
};

using UniquePKey = std::unique_ptr<EVP_PKEY, PKeyDeleter>; 

class KeySlot { 
    public: 
        // The slot owns exactly one reference. 
        explicit KeySlot(UniquePKey key) : key_(std::move(key)) {} 

        // Borrow without changing ownership. 
        EVP_PKEY* borrow() const noexcept { 
            return key_.get();
        } 

        // Transfer ownership out. The slot becomes empty.
        UniquePKey take() {
            return std::move(key_); 
        } 
        
        // Create another owning reference for shared use.
        UniquePKey clone_ref() const {
            if (!key_) { 
                throw std::logic_error("empty slot"); 
            }

            if (EVP_PKEY_up_ref(key_.get()) != 1) { 
                throw std::runtime_error("EVP_PKEY_up_ref failed"); 
            } 
            return UniquePKey(key_.get()); 
        } 
        bool empty() const noexcept {
            return key_ == nullptr;
        }

    private: UniquePKey key_; 
};
```

The useful part is that the different ownership operations no longer look identical. `borrow()` exposes the handle without creating another owner. `take()` moves the owning reference and leaves the source empty. `clone_ref()` explicitly creates another owning reference.

The type system can't prevent every lifetime bug, but it can make ownership transitions much harder to perform accidentally. That gives ASan and LSan a cleaner model to test as well: a stale access or leaked reference is more likely to point back to a specific broken transition rather than to a sea of indistinguishable raw pointers.

Managed FFI code often has to encode the same states more explicitly because the language's normal object lifetime doesn't automatically describe the native object's lifetime. A wrapper can still make the distinction visible:

```dart :collapsed-lines
import 'dart:ffi' as ffi;

final class NativeHandle extends ffi.Opaque {}

final class OwnedNativeHandle {
    OwnedNativeHandle(this._ptr, this._free, this._finalizer)
        : _token = Object() {
            _finalizer.attach(this, _ptr.cast(), detach: _token);
    }

    ffi.Pointer<NativeHandle>? _ptr;
    final void Function(ffi.Pointer<NativeHandle>) _free;
    final ffi.NativeFinalizer _finalizer;
    final Object _token;

    bool get isMoved => _ptr == null;

    ffi.Pointer<NativeHandle> borrow() {
        final ptr = _ptr;
        
        if (ptr == null) {
            throw StateError('Native handle is no longer owned here');
        }

        return ptr;
    }

    ffi.Pointer<NativeHandle> move() {
        final ptr = borrow();
        
        _finalizer.detach(_token);
        _ptr = null;

        return ptr;
    }

    void close() {
        final ptr = _ptr;
        
        if (ptr == null) return;

        _finalizer.detach(_token);
        _ptr = null;
        _free(ptr);
    }
}
```

Here, `move()` is more than a pointer return. It changes the wrapper's state. Once ownership leaves, the previous owner can't borrow the handle again, and its finalizer no longer has permission to release it. `close()` follows the same rule and is safe to call more than once because the ownership state changes before the native free occurs.

The exact representation will differ by language and runtime. Some systems use nullable handles, some use dedicated moved states, some hide the pointer behind an owning object, and others rely on linear or affine types. What matters is that a transfer changes the old owner's state in a way the rest of the program can observe.

Temporary ownership needs the same treatment. A lexical cleanup scope can make “release unless transferred” explicit:

```dart :collapsed-lines
final class Scope {
    final Map<Object, void Function()> _cleanup = {};

    T own<T extends Object>(T handle, void Function(T) dispose) {
        if (_cleanup.containsKey(handle)) {
            throw StateError('Handle is already owned by this scope');
        }

        _cleanup[handle] = () => dispose(handle);
        return handle;
    }

    T move<T extends Object>(T handle) {
        final cleanup = _cleanup.remove(handle);
        if (cleanup == null) {
            throw StateError('Cannot move a handle this scope does not own');
        }
        return handle;
    }

    void close() {
        Object? firstError;
        
        for (final cleanup in _cleanup.values.toList().reversed) {
            try {
                cleanup();
            } catch (error) {
                firstError ??= error;
            }
        }

        _cleanup.clear();

        if (firstError != null) {
            throw StateError('Scope cleanup failed: $firstError');
        }
    }
}
```

The scope owns everything registered with it until one of two things happens: cleanup runs, or ownership is explicitly moved somewhere else. That makes early returns and partial failures much easier to reason about because the default behavior is cleanup rather than “remember every object that was successfully allocated so far.”

This is also where the different sanitizer models start to line up around the same ownership story. If a transferred object is still released by its previous owner, ASan may eventually catch the resulting use-after-free or invalid access. If an error path forgets to release something it still owns, LSan or a leak-oriented lane may expose it at teardown. If a native call reports success without fully initializing an output structure, MSan can reveal a different boundary-contract failure. If close, callback, or cleanup paths race across threads, TSan can expose the missing synchronization when those operations are visible to its runtime.

The tools report different symptoms, but the design work is often the same: make ownership, release, transfer, and lifetime transitions explicit enough that there's only one reasonable interpretation at each boundary.

That's the useful frame for the <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` case study that follows. Dart, BoringSSL, native build hooks, and finalizers make the details specific, but the underlying problems are not. They're the same ownership questions any managed/native boundary eventually has to answer: who owns this resource now, how must it be released, what changes when ownership moves, and what happens when the operation fails halfway through?

---

## Case Study: <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` Issue #278

<VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` is a useful example because several ownership systems meet in one fairly small surface area. In the browser, the package can rely on the platform Web Crypto implementation. Outside the browser, it crosses into native code through `dart:ffi` and uses BoringSSL underneath. Dart build hooks are responsible for producing the native assets.

That means a single operation can involve Dart object reachability, native reference counting, explicit allocation and cleanup, finalizers, and build tooling that determines how much of the resulting process a debugger can actually see.

A mistake at one layer doesn't necessarily fail there. A wrapper can return the right cryptographic result while leaving behind a leaked native object, or keep a finalizer attached to a handle whose ownership has already moved elsewhere.

Issue #278 was opened as part of the work leading up to the 1.0.0 release. The existing tests already covered the functional side of the package reasonably well. The harder question was what happened underneath those successful operations: whether native objects were released correctly, whether ownership transfers left stale owners behind, whether scopes and finalizers agreed about who was responsible for cleanup, and whether garbage-collection timing could expose lifetime bugs that ordinary tests would miss.

Those questions show up directly in constructs such as `NativeFinalizer`, `_Scope`, and `_SslAllocator`. BoringSSL also makes ownership distinctions that the Dart wrapper has to preserve. Some references are borrowed, some are retained, and some calls take ownership. When ownership moves into native code, the Dart side can't continue behaving as though it owns the same handle. The wrapper may need to remove it from a cleanup scope, detach a finalizer, or invalidate the handle entirely.

The natural next step was to run those paths under stronger memory-safety tooling. That's where the surrounding toolchain became part of the problem.

### Why Valgrind Came First

The sanitizer path was blocked in the Dart SDK. <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` relies on build hooks for its native assets, while sanitizer-enabled testing didn't yet support that setup cleanly. The missing work was tracked upstream in Dart SDK issue #63489. There was a second problem around AOT packaging and symbolization. With compiled Dart code packaged into the runtime in the existing layout, native tooling couldn't expose the symbols in the form sanitizer reports needed. That work was tracked separately in issue #63435. So simply adding a sanitizer flag inside <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` wouldn't have produced a reliable sanitizer lane. The project first needed SDK support for building the right native assets under sanitizers and for producing reports that could be mapped back to useful code.

Valgrind didn't depend on that integration in the same way. So PR #295 added a Linux Memcheck lane that could run against the existing test path while the sanitizer work remained blocked upstream.

The workload was deliberately aimed at native-object lifetimes rather than at general algorithm coverage. It exercised AES-GCM, HMAC, ECDH, RSA-OAEP, key import and export, failed imports, and repeated creation of short-lived objects.

The algorithms themselves weren't the interesting part. Those operations drive different allocation and cleanup paths. Key import may allocate several temporary objects before ownership settles. A failed import exercises cleanup that the successful path never touches. Repeated short-lived operations put more pressure on finalization and native teardown than a long-running throughput test with a handful of persistent objects.

That's exactly where a memory checker is useful. The test still verifies that the operation works, but the dynamic-analysis lane can also ask whether anything was leaked, freed incorrectly, or left alive after the wrapper believed the operation was finished.

Valgrind also exposed a practical problem that appears whenever a memory checker is placed around a managed runtime: not every reported allocation necessarily belongs to the library being tested.

The lane reported both definite and possible leaks, but only definite leaks failed CI. Possible leaks remained visible in the output because some could come from Dart VM runtime behavior rather than <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` itself. There was little value in making an ambiguous category blocking before the project could reliably attribute it.

That distinction matters beyond Valgrind. A useful CI gate needs a failure category the team understands well enough to act on. Broader findings can still be recorded and investigated without pretending they all carry the same confidence.

### What the Case generalizes

The interesting part of this case is not that one Dart package happened to use Valgrind.

The first broader lesson is that **the toolchain is part of sanitizer coverage**. A compiler may support ASan or LSan perfectly well, but that doesn't mean every package, runtime, test runner, native-asset pipeline, or AOT layout can produce a useful instrumented execution. If the relevant code can't be built, loaded, or symbolized correctly, the sanitizer flag alone buys very little.

The second is that the workload has to follow the ownership model. Running more crypto operations isn't inherently useful. Running operations that repeatedly allocate, transfer, fail, close, and finalize native resources is. The same applies to database bindings, image codecs, language runtimes, GPU wrappers, JNI code, Python extensions, or any other FFI-heavy system.

The third is that ownership transitions need to be visible on both sides of the boundary. When the native side adopts a handle, the managed side should stop looking like an owner immediately. When cleanup belongs to a lexical scope, a successful transfer should remove the object from that scope. A finalizer can remain a fallback, but it shouldn't silently compete with deterministic cleanup for the same resource.

Finally, a blocked sanitizer integration doesn't have to mean no dynamic checking at all. In this case, the SDK couldn't yet support the sanitizer-backed test path the project wanted. Valgrind still provided a way to exercise native lifetimes in CI, while the missing sanitizer support remained tracked upstream.

The progression looked roughly like this:

![](https://cdn.hashnode.com/uploads/covers/66b563581acaa21b16e7093a/d64605ac-41ae-468a-be14-749fb3347dd9.png)
<!-- TODO: mermaid화 -->

.<VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` didn't get the sanitizer lane it ultimately wanted from this work. The SDK couldn't support it yet. What the project did get was a repeatable native-lifetime workload, a Linux memory-checking lane that could run in CI, and upstream issues that made the remaining tooling gaps explicit.

That's a useful pattern well beyond Dart: enforce the runtime properties you can observe today, and keep the missing coverage visible until the toolchain can support something stronger.

---

## Incident Patterns from Real Systems

Real incidents are most useful when they expose a failure mode that shows up elsewhere. The names and CVEs matter less than the shape of the bug: what had to happen for it to appear, what the sanitizer could see, and where the fix actually belonged.

### Pattern 1: A use-after-free that only appeared under fuzzing

Mozilla's IndexedDB issue associated with CVE-2024-7528 is a good example of why ASan and fuzzing work so well together.

The use-after-free wasn't waiting on an obvious happy-path test. It needed a particular lifecycle state to occur first. Coverage-guided fuzzing pushed the code into that state, and ASan caught the stale access with enough allocation and deallocation history to reconstruct what had happened.

The important part is the sequence. A generated input reaches an object lifetime that normal tests rarely exercise. ASan catches the invalid access, the crashing input is kept, and the fix is made at the ownership transition that created the stale reference, not at the line that happened to dereference it.

Once the input is minimized, it should stay in the regression corpus. That's how a one-off sanitizer finding becomes a permanent test.

### Pattern 2: Success returned before the output was fully valid

The NSS S/MIME bug associated with CVE-2022-31741 is more interesting than the phrase “use of uninitialized memory” makes it sound.

The caller treated a successful return as permission to use an output value. One path in the callee, though, could return success without initializing that output. MSan caught the uninitialized value later, but the actual bug was the disagreement between the return value and the output contract.

That distinction matters. Zeroing the variable at the call site might silence one report, but it would leave the API ambiguous. A successful call should establish a clear postcondition: either the output is fully initialized, or the API needs a way to represent partial state explicitly.

MSan is especially useful in this class of bug because it shows where the value became observable, while origin tracking can often point back to the path where initialization was skipped.

### Pattern 3: A race report at an instrumentation boundary

Mozilla's TSan work around graphics code shows a different problem. A race report can be difficult to interpret when part of the synchronization story lives in code TSan can't see.

Suppose two accesses look unordered from TSan's point of view, but one of the modules involved isn't instrumented. If that module contains the synchronization that makes the accesses safe, TSan has no way to reconstruct the ordering. The reverse is also true: a real race inside uninstrumented code may never be reported at all.

That's why instrumentation boundaries should be part of race triage from the beginning. Before calling a report a false positive, map which modules were instrumented and which synchronization primitives were visible to the runtime. If the ordering depends on opaque code, either reproduce with a more complete instrumented stack or suppress that boundary narrowly and document why.

The dangerous shortcut is to treat “TSan can't see the whole system” as equivalent to “the race is harmless.”

### Pattern 4: A small leak that still points to broken ownership

Leak reports are easy to dismiss when the retained allocation is small. Sometimes that's a reasonable severity decision. It's not the same thing as saying the ownership is correct.

A deterministic leak means some path allocated or retained something and never completed the corresponding release. Even a few bytes can be useful evidence because the same path may run in a loop, sit behind a long-lived request, be triggered repeatedly by invalid input, or accumulate during failure handling.

It helps to keep three questions separate:

- **Impact:** How often can the path run, how much memory does each execution retain, and can an external actor trigger it repeatedly?
- **Correctness:** Which owner failed to release the allocation, or which reference kept it alive unexpectedly?
- **Policy:** Does this block the current release, and what test or workload will make sure the leak doesn't return?

A leak can be low impact and still represent a real ownership bug. That distinction is worth preserving, especially in long-running services and FFI-heavy code where a small per-operation leak can become significant over time.

---

## Fuzzing, Stress Harnesses, and Concurrency Probes

A sanitizer can only report a violation that actually occurs during the run. Instrumentation gives you visibility into bad execution, but it doesn't make the program visit the interesting paths on its own.

That's where workload design comes in.

Fuzzers are good at exploring input space. Stress harnesses repeatedly push objects through lifetime transitions. Concurrency probes increase the number of thread interleavings the program experiences. They complement sanitizers because each makes a different kind of otherwise-rare execution easier to reach.

### Fuzzing: Explore Paths Ordinary Inputs Don't Reach

LLVM's libFuzzer is an in-process, coverage-guided fuzzer. A target is linked into the test binary and exposed through an entry point such as `LLVMFuzzerTestOneInput`. libFuzzer mutates inputs, observes which mutations reach new code through coverage instrumentation, and keeps inputs that expand that coverage.

A small target might look like this:

```cpp
#include <cstddef>
#include <cstdint>

extern "C" void ParseOrImport(const uint8_t* data, size_t size);

extern "C" int LLVMFuzzerTestOneInput(const uint8_t* data, size_t size) {
  ParseOrImport(data, size);
  return 0;
}
```

With ASan:

```sh
clang++ -O1 -g -fsanitize=fuzzer,address \
fuzz_target.cc -o fuzz_target

./fuzz_target corpus/
```

And, when the dependency graph can be instrumented sufficiently for MSan:

```sh
clang++ -O1 -g -fsanitize=fuzzer,memory \
-fsanitize-memory-track-origins=2 \
fuzz_target.cc -o fuzz_target_msan

./fuzz_target_msan corpus/
```

The wrapper function is intentionally uninteresting. Most of the work is in choosing the boundary behind it.

A useful fuzz target is narrow enough that mutations reach meaningful states quickly. It should be deterministic, reasonably fast, and free of behavior such as process exits or unrelated global state that makes individual inputs difficult to reproduce. Parsers, decoders, protocol handlers, deserializers, key importers, file readers, and similar boundaries are natural targets because small changes in input can send execution through very different allocation and error-handling paths.

The sanitizer and the fuzzer do different jobs. The fuzzer may discover the path that leaves a pointer stale or an output partially initialized. ASan or MSan is what notices that the resulting execution is invalid.

The NSS S/MIME bug discussed earlier is a useful example of that relationship. An unusual message reached a decoder path where a successful return didn't imply that an output had actually been initialized. The interesting part wasn't merely that the input was malformed. It was that the input reached a state in which the API's initialization contract broke.

Once a fuzz input exposes a bug, keep the input. Minimize it if possible, reproduce the failure with the same sanitizer, fix the underlying defect, and add the minimized case to the regression corpus. Otherwise the fuzzer has found the same class of bug only once.

### Stress Harnesses: Exercise the Transitions

Fuzzing is less effective when the interesting variable isn't the input but the object's lifetime.

A stale finalizer, a missed reference decrement, or a cleanup path that runs incorrectly after the tenth create/close cycle may not require unusual bytes at all. It requires the same lifecycle to happen enough times, or in the right sequence.

That's what a stress harness is for.

Instead of sending one large workload through a long-lived object, create and destroy many short-lived ones. Alternate successful operations with failures. Repeatedly acquire and release references. Exercise import followed by export, open followed by close, register followed by unregister, attach followed by detach. If the runtime allows it, introduce GC pressure between those transitions. If allocation reuse matters, create enough churn that recently freed memory is likely to be reused.

For example, a wrapper around a native resource might be exercised as:

```text
create
  -> use
  -> close

create
  -> transfer
  -> destroy previous wrapper
  -> use new owner
  -> close

create
  -> partially initialize
  -> fail
  -> clean up

repeat thousands of times
```

That kind of workload is deliberately different from a throughput benchmark. A benchmark may spend most of its time using one object whose ownership never changes. A lifetime harness spends its time crossing the boundaries where ownership does change.

This applies well beyond FFI wrappers. Connection pools, reference-counted caches, plugin lifecycles, asynchronous request objects, GPU resources, file descriptors, temporary arenas, and callback registrations can all benefit from the same treatment.

### Failure Injection Belongs Here Too

Some cleanup paths are difficult to exercise because ordinary execution rarely fails at the right point.

If an operation allocates four resources in sequence, testing only complete success and immediate failure leaves several intermediate states untouched. A useful harness can force the second, third, or fourth operation to fail and then check what remains.

That often reveals bugs such as:

- cleanup that assumes initialization completed
- resources released twice because ownership had already moved
- objects leaked only after partial construction
- error paths that leave output state looking valid
- callbacks or registrations that survive a failed setup

For ownership-heavy code, these intermediate failure states are often more interesting than malformed input.

### Concurrency Probes: Make the Race Happen

TSan has a different coverage problem. It can't report a race merely because two operations could overlap in theory. The conflicting accesses must occur during the observed execution.

Short, deterministic unit tests are often poor at producing those schedules.

A concurrency probe deliberately raises the odds. Start workers from the same barrier instead of one after another. Repeat the critical operation many times. Vary worker counts. Race registration against removal, close against completion, creation against shutdown, and publication against destruction. Where appropriate, test-only yields or short scheduling points can widen a window that normally exists for only a few instructions.

A deliberately racy example makes the basic idea visible:

```cpp
#include <atomic>
#include <thread>

struct SharedState {
  int plain_counter = 0;
  std::atomic<bool> stop{false};
};

void writer(SharedState* s) {
  while (!s->stop.load(std::memory_order_relaxed)) {
    s->plain_counter++;  // Intentionally unsynchronized.
  }
}

void reader(SharedState* s) {
  for (int i = 0; i < 1000000; ++i) {
    (void)s->plain_counter;  // Intentionally unsynchronized.
  }

  s->stop.store(true, std::memory_order_relaxed);
}

int main() {
  SharedState state;

  std::thread t1(writer, &state);
  std::thread t2(reader, &state);

  t1.join();
  t2.join();
}
```

There's nothing subtle about the bug in that example. The useful part is the shape of the harness: concurrent work is repeated enough that the conflicting accesses are likely to overlap.

Real probes should target transitions that already exist in the system. If a callback can complete while an object is closing, race those operations. If a registry is read while another thread removes entries, hammer both sides. If explicit cleanup and background cleanup can touch the same state, force them to overlap.

The goal isn't to manufacture behavior the real program could never produce. It's to stop relying on the scheduler to stumble across a legal but inconvenient interleaving by accident.

Recording random seeds, operation sequences, worker counts, and other scheduling inputs also matters. A race that appears once in a nightly run but can't be reconstructed locally is much harder to fix than one whose workload can be replayed.

### Treat Discoveries as Regression Inputs

Fuzzing and stress testing become much more valuable when their outputs survive the debugging session.

For a fuzzer, that usually means keeping the minimized crashing or leaking input in the corpus. For a lifecycle harness, it may mean preserving the exact operation sequence that triggered the failure. For a concurrency test, it can mean retaining the seed, worker count, or schedule parameters that made the race reproducible.

OSS-Fuzz is a useful model here even for projects that never use the service itself. Its workflow treats fuzz targets, corpora, sanitizer builds, reproducers, and regression testing as parts of the same system rather than separate debugging activities.

That's the habit worth copying: keep fuzz targets with the code they exercise, version useful corpus inputs, make failures reproducible outside the fuzzing infrastructure, and replay previously failing inputs under sanitizer builds.

The larger point is simple. Sanitizer coverage is partly a property of the build, but it's also a property of the workload. ASan can't catch the stale pointer nobody dereferences. MSan can't expose the partially initialized state no test reaches. TSan can't report an interleaving that never occurs.

Good instrumentation tells you when an execution became invalid. Good workload design makes the executions worth observing happen often enough to find.

---

## How to Read and Triage Sanitizer Reports

A sanitizer report is evidence, not a diagnosis.

The top frame tells you where the runtime finally noticed something was wrong. That may be the place to start reading, but it's often not the place where the bug began. A useful triage session works backward from the report until the failed lifetime, initialization, or synchronization assumption becomes clear.

### First, Make Sure the Report is Worth Trusting

There's little value in reasoning from a stack full of raw addresses.

Before changing code, make sure the failing binary has useful debug information, the symbols belong to that exact build, and the module you care about was actually instrumented. CI makes this easier to get wrong than it sounds: an old symbol bundle, a rebuilt binary, or a report copied from a different job can produce a perfectly plausible but useless stack.

For Clang sanitizer builds, `-g` and `-fno-omit-frame-pointer` are a sensible baseline, with `llvm-symbolizer` available when the test runs. If optimization is making the stack difficult to reconstruct, a moderate optimization level and `-fno-optimize-sibling-calls` can help.

Keep the exact sanitized binary and its symbols with the report. The same goes for the sanitizer options, suppression files, reproducer, and anything else needed to recreate that execution.

Unsymbolized hexadecimal addresses aren't a badge of low-level seriousness. They're missing observability.

### Read the Report According to What the Tool is Actually Accusing You Of

It's tempting to put ASan, LSan, MSan, TSan, and Valgrind findings into one bucket called “memory bugs.” That usually leads debugging in the wrong direction.

An ASan use-after-free is fundamentally a lifetime question: why did one part of the program still believe the object was usable after another part ended its lifetime?

An LSan report asks something different. The allocation survived until teardown, so which owner was supposed to release it, and what prevented that ownership from reaching an end?

With MSan, the interesting question is usually not “why wasn't this variable zero?” It's where the program acquired the right to treat that value as initialized. Often the answer leads back to an output parameter, a partially constructed object, or a success path whose postconditions were weaker than the caller assumed.

A TSan report is about ordering. Two conflicting accesses happened without a synchronization relationship the runtime could establish. The debugging job is to find the edge that should have ordered them and determine whether it's missing or simply hidden behind an instrumentation boundary.

Valgrind invalid reads and writes need a little more classification because they can point to several of these problems: stale ownership, bounds mistakes, allocator misuse, or behavior complicated by the surrounding runtime.

The distinction matters because a local change can easily hide the symptom without repairing the contract. Zero-initializing an MSan-reported buffer may make the poison disappear while leaving an ambiguous API untouched. Adding a delay around a TSan race may make one test pass without introducing any synchronization at all.

### Treat the Stacks as a Timeline

For a use-after-free, the current access is only one event in the story.

The allocation stack tells you where the object's lifetime began. The free stack tells you where somebody decided that lifetime was over. The current stack tells you who still disagreed.

That disagreement is usually more useful than whichever line happens to be at the top of the report.

The same idea applies to the other sanitizers. With MSan, the use stack shows where an uninitialized value finally mattered, while origin tracking can point toward where the value first entered the program without a valid initialization history. With TSan, neither conflicting access is meaningful on its own. Thread creation, publication, locks, atomics, and other synchronization events are part of the same story.

It often helps to reduce the report mentally to something like:

```text
object created
    -> ownership transferred
    -> old owner still retains access
    -> new owner destroys object
    -> old owner dereferences stale handle
```

Or for an initialization bug:

```text
output allocated
    -> rare branch skips initialization
    -> function still reports success
    -> caller consumes output
```

Once the sequence is written down, the crash line often stops looking like the right place to fix the bug.

### Minimize the Reproducer Without Removing the Thing That Makes the Bug Possible

“Minimal reproducer” is sometimes taken too literally.

The smallest useful reproducer isn't necessarily the program with the fewest lines. It's the smallest one that still preserves the conditions the bug depends on.

For an FFI lifetime bug, removing the managed runtime may also remove the finalizer behavior that triggers it. Replacing a pool allocator with `malloc` can eliminate the reuse pattern that makes a stale pointer visible. Simplifying a concurrent test to one thread certainly makes the program smaller, but it also removes the race.

The same caution applies to optimization level, GC pressure, input structure, thread count, allocator configuration, and instrumentation boundaries. Strip away unrelated code aggressively, but keep the mechanics that make the failure real.

A good reproducer should make the report easier to reason about without turning it into a different program.

### Fix the Ownership or Synchronization Mistake, Not Just the Reported Access

Sanitizers often expose problems at the point where an earlier design decision finally became unsafe.

A stale pointer might be fixed properly by invalidating a wrapper after ownership moves. A leak may require making one object explicitly responsible for releasing a retained reference. An MSan report may lead to changing an API so that success always produces a fully initialized result. A TSan finding may expose a flag that was treated as “basically atomic” but actually needs a defined synchronization protocol.

Sometimes the correct fix really is a local bounds check or an initialization statement. But it's worth asking one more question before stopping: **what allowed the invalid state to exist in the first place?**

That question is particularly useful at FFI and library boundaries, where several callers can otherwise repeat the same mistake in slightly different forms.

### Keep the Failure After You Fix it

A sanitizer bug that disappears after a patch but leaves no regression test behind is easy to rediscover months later.

The reproducer should become part of the normal engineering record. A fuzzing failure belongs in the regression corpus. A lifecycle bug can become a focused unit test or teardown workload. A race may need its triggering seed, worker count, or operation sequence preserved alongside the test.

Then rerun that exact workload under the same sanitizer that found the problem.

That last part matters. A normal unit test passing after an ASan fix doesn't prove that the ASan failure is gone. The instrumented execution that originally exposed the bug should be the one that closes it.

The goal of triage is therefore not merely to make the report disappear. It's to reconstruct why the execution became invalid, repair that assumption at the right boundary, and leave behind a workload that will catch the same mistake if it returns.

---

## CI Policy and Acceptance Criteria

Once sanitizer reports are reproducible and trustworthy, the next question is where they belong in CI.

Putting every tool on every pull request is rarely the right answer. ASan, MSan, TSan, leak detection, fuzzing, and whole-process tools impose very different costs and depend on different levels of instrumentation. A useful CI setup reflects those differences instead of treating sanitizers as one generic “safety” job.

The practical split is between **fast checks that protect the merge path** and **slower jobs that search for failures the regular test suite is unlikely to expose**.

ASan is often the easiest sanitizer to put close to the normal development loop. Its overhead is noticeable but usually manageable, and the failures it reports (use-after-free, out-of-bounds access, invalid free, double free) are rarely findings you want to knowingly merge. For native-heavy projects, an ASan build combined with UBSan is a reasonable pre-merge lane if the build and test suite can support it.

Leak detection is slightly different. When LSan runs as part of the ASan build, it may fit into the same lane. Whether every leak should block immediately depends on how clean the runtime environment is. A focused native test binary with deterministic teardown can usually be strict from the beginning. A managed runtime or large host process may first need a baseline so that application leaks can be separated from runtime residue.

TSan usually belongs farther from the critical merge path. The runtime cost is much higher, and a useful TSan run needs workloads that actually create meaningful concurrency. Running a short unit suite under TSan on every commit can be expensive while still giving poor race coverage. A nightly run, a pre-release lane, or a targeted job for concurrency-heavy changes often provides more useful evidence.

MSan has a different constraint. Its value depends heavily on how much of the dependency graph can be instrumented. If the application and its important libraries can be built in a consistent MSan environment, it can be an excellent gate for initialization bugs. If half the stack is opaque, forcing it into the ordinary PR matrix may produce more confusion than confidence. In many projects, MSan ends up as a dedicated build rather than a routine variant of the normal test job.

Fuzzing also has two different CI roles. The expensive search for new inputs can run continuously or on a schedule, while previously discovered inputs should be cheap enough to replay much more often. Once a crashing testcase has been minimized and checked into the corpus, there's little reason to wait for another fuzzing campaign to learn that the same bug came back.

A typical policy might therefore look something like this:

| Lane | Where it usually fits | What should fail it |
| --- | --- | --- |
| Normal tests | Every change | Functional test failure |
| ASan + UBSan | Pre-merge where practical | Any trusted, unsuppressed finding |
| Leak detection | Pre-merge or scheduled | Deterministic leaks attributable to owned code |
| TSan | Scheduled, pre-release, or targeted | Unsuppressed races in instrumented code you own |
| MSan | Dedicated or scheduled build | Trusted uninitialized-value reports |
| Fuzz regression | Pre-merge or frequent | A saved input that crashes, hangs, or reproduces a sanitizer failure |
| Full fuzzing | Scheduled or continuous | New findings become triage artifacts rather than ordinary test failures |
| Valgrind / other fallback analysis | Where compiler sanitizers can't yet run | High-confidence invalid accesses and leak categories chosen by the project |

The exact schedule matters less than the reasoning behind it. A five-minute ASan job that catches real regressions belongs much closer to the developer than a two-hour TSan workload. A nightly MSan build may be more valuable than an unreliable per-PR job against half-instrumented dependencies.

CI cost should follow the quality of the evidence, not a desire to make the matrix look comprehensive.

### Decide What a Red Lane Means

A sanitizer job shouldn't be red merely because the tool printed something unusual. It should be red because the project has decided that a particular class of evidence represents a defect it's unwilling to accept.

For ASan, that bar is usually straightforward: a reproducible unsuppressed memory-safety violation in code you own should fail the build.

MSan can be treated similarly once the instrumented environment is complete enough that the reports are trusted. An uninitialized value influencing execution isn't something to wave through because the test happened to finish successfully.

TSan needs a little more context around instrumentation boundaries, but a race between accesses in code you own should normally block once the report has been confirmed. “It only happens under TSan” isn't a useful acceptance criterion.

Leak policy tends to need the most judgment. A deterministic direct leak from a focused native test is very different from a possible leak reported while an entire managed runtime is shutting down. The <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` case study is a useful example: definite Valgrind leaks could be made blocking while possible leaks remained visible until they could be attributed with more confidence.

That's a better pattern than either extreme. Ignoring all leak reports wastes useful ownership evidence. Failing every ambiguous allocation from day one can make the lane unusable.

### Keep Discovery Separate from Regression

There's also a useful distinction between a job that's **looking for new bugs** and one that's **making sure an old bug hasn't returned**.

A fuzzer running for hours is doing discovery. A saved fuzz input replayed in a few milliseconds is regression testing.

A TSan stress job running millions of operations is discovery. A small reproducer for a race fixed last month is regression testing.

A large teardown workload looking for new leaks is discovery. A ten-line helper binary that reproduces a previously fixed ownership leak is regression testing.

The second category should usually move closer to the merge path. Once a difficult failure has been reduced to something cheap and deterministic, there's little value in leaving it trapped inside the expensive job that originally found it.

This is one of the ways sanitizer coverage becomes cheaper over time: expensive discovery produces small regression tests.

### Preserve Enough Context to Debug the Failure

When a sanitizer lane does fail, CI should leave behind more than a red status.

The useful artifacts are the ones needed to reconstruct the same execution: the sanitized binary, matching symbols, raw report, sanitizer options, suppression files, and any input, seed, or workload parameters that triggered the failure.

A fuzzing job should keep the crashing input. A concurrency workload should keep the seed or operation sequence when one exists. A toolchain-specific build should record the compiler and sanitizer runtime versions that produced the report.

This doesn't need to be tied to GitHub Actions, GitLab CI, Buildkite, Jenkins, or any other runner. The implementation syntax changes but the requirement does not. A developer looking at the failure tomorrow should be able to reproduce the same instrumented execution without reverse-engineering the CI machine.

### Write the Policy Down

The worst time to decide whether a sanitizer finding is release-blocking is when a release is already waiting on it.

A project should have a small, explicit set of rules for each lane: what it's expected to observe, what findings fail it, which categories are informational, and what kinds of suppressions are allowed.

Those rules can evolve. A new leak lane may begin by collecting reports while the baseline is understood, then become blocking for deterministic leaks once the noise has been removed. A TSan job may start nightly and later move onto selected pull requests when its workload becomes faster. An MSan environment may expand as more dependencies become instrumentable.

What matters is that a green lane has a stable meaning.

“ASan passed” should mean more than “the CI command exited zero.” It should mean that the expected code was instrumented, the intended workload ran, reports were symbolized, and no finding in the project's blocking categories occurred.

That's the point of CI policy around sanitizers: not to maximize the number of tools in the matrix, but to make each green result say something you actually trust.

---

## Production Strategy, Suppression Debt, and Metrics

Most sanitizer builds are designed for testing rather than broad production use. Their runtime cost, memory footprint, and instrumentation requirements make them a poor fit for many live workloads.

Production still matters to the sanitizer program. It tells you which workloads matter, which failures escaped pre-production, and where the instrumented lanes are too narrow. The useful connection is a feedback loop: production exposes behavior that testing missed, and that behavior becomes a new sanitizer workload, reproducer, or regression test.

### Bring New Lanes Online Before They're Perfect

New sanitizer jobs are rarely clean on the first run.

An existing codebase may already contain real defects, third-party reports, runtime residue, missing symbols, incomplete instrumentation, or suppressions inherited from earlier work. Making every finding blocking immediately can leave the team with a permanently red job and no clear idea which findings deserve action.

A practical rollout starts by collecting reports and learning the baseline. Fix deterministic bugs in code you own. Separate those findings from dependency noise and instrumentation gaps. Make the interesting failures reproducible. Once a category is understood well enough that a new report has a clear meaning, that category can become blocking.

The lane should keep moving in that direction. An observation-only job that stays observational indefinitely is collecting data, but it hasn't become much of an engineering control.

Waiting for a perfectly clean baseline before adding the lane causes a different problem. The cleanup work often happens because the findings are visible and recurring. Keeping the job out of CI until everything is already fixed can postpone that work indefinitely.

### Suppressions Should Feel Temporary

Some suppressions are unavoidable. A third-party library may have a known race you can't patch immediately. A runtime may keep allocations alive until shutdown. An instrumentation boundary may produce a report that can't yet be resolved cleanly.

Trouble starts when the suppression file becomes the place where inconvenient findings go to disappear.

A useful suppression should tell the next person enough to understand why it exists: what report is being hidden, where it comes from, why it can't be fixed now, who owns the follow-up, and what issue tracks the work.

The match should be as narrow as practical. Suppressing an entire library or namespace can silence today's known problem together with an unrelated regression introduced later.

Age is often more informative than the raw count. Five recent suppressions tied to active upstream bugs may be manageable. Five suppressions that nobody has reviewed in three years describe a different state of the program.

When the underlying defect is fixed, remove the suppression in the same change. Leaving it behind keeps the sanitizer blind to code that no longer needs an exception.

It's useful to think of suppressions as **observability debt**. Each one may be justified, but each one also weakens what a clean run can honestly tell you. Count them, track their age, and keep old exceptions visible enough that they are hard to forget.

### Keep Enough of the Build to Explain a Failure Later

Symbolization feels like a local debugging detail until a sanitizer fails only in CI.

At that point, the report is useful only if its addresses can be tied back to the exact binary that produced them. Rebuilding from the same commit isn't always equivalent. Optimization, linker decisions, generated code, and toolchain versions can all change the layout.

For sanitizer jobs worth keeping, retain the artifacts needed to reconstruct the failure: the instrumented binary, matching debug information, raw sanitizer output, relevant runtime options, and the input or workload that triggered the report. Build IDs and compiler/runtime versions are useful when the pipeline produces several variants of the same program.

Managed runtimes, JITs, AOT compilers, and plugin systems need additional care because a native address may not map directly to an ordinary source file.

The Dart AOT issue discussed in the <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` case study is a good example. Native tooling could observe the bad execution, but the report lost much of its practical value if the runtime layout prevented useful Dart symbols from appearing in the stack.

A sanitizer report is only as useful as your ability to connect it back to the code that produced it. Preserving symbolization belongs in the build and release setup, not in a developer's bag of local debugging tricks.

### Feed Production Findings Back into Sanitizer Workloads

A clean sanitizer matrix still covers only the executions produced by the test environment.

Production sees different object lifetimes, request mixtures, allocator pressure, machine sizes, thread schedules, and long-running behavior. Where the platform supports them, guarded allocators, hardware-assisted memory tagging, sampling, canary deployments, and richer crash telemetry can expose failures that never appeared in CI.

Those mechanisms provide a different kind of evidence. Some are sampled or platform-specific rather than deterministic. Their value is that they observe executions the sanitizer lab may never produce on its own, and those findings can feed back into the test system.

When a production crash points to a lifetime edge that no existing stress test exercises, turn that lifecycle into an ASan workload. If telemetry shows memory growth after a particular failure path, build a focused teardown case and run it under leak detection. If a concurrency failure appears only under high load, preserve the relevant operation sequence and attack it with a TSan stress test.

That feedback loop keeps the sanitizer workloads tied to the behavior of the real system without trying to make production itself look like the sanitizer lab.

### Measure Whether the Lanes Are Becoming More Useful

Sanitizer programs can produce plenty of numbers. The useful ones tend to answer three practical questions:

1. **Are we finding real bugs?**
2. **Can we reproduce them?**
3. **Is the cost of doing so still reasonable?**

A small set of metrics usually tells you more than a large dashboard:

| Metric | What it can tell you |
| --- | --- |
| New trusted findings over time | Whether memory, lifetime, or race regressions are still entering the codebase |
| Suppression count and age | Whether known blind spots are shrinking or quietly becoming permanent |
| Reproducer success rate | Whether failures can actually be turned into engineering work |
| Time to a useful symbolized stack | Whether the debugging infrastructure is doing its job |
| Lane flake rate | Whether failures mean “bug” or merely “rerun the job” |
| Runtime and compute cost | Whether the lane still belongs where it currently runs |
| Saved fuzz or stress failures replayed successfully | Whether previous discoveries remain protected by regression coverage |

Those numbers need context.

A sanitizer lane becoming faster isn't an improvement if symbolization was removed to get there. A TSan job with zero flakes may simply be running a workload that barely creates concurrency. A fuzz corpus can show impressive line coverage while still missing the lifecycle transition where ownership actually breaks.

Even a falling bug count is ambiguous. The codebase may genuinely be getting healthier, or the workload may have stopped reaching interesting paths.

Metrics are useful when they help distinguish those cases. Once the number itself becomes the target, it becomes easy to improve the dashboard while making the underlying evidence worse.

### What Maturity Looks Like

A mature sanitizer program has a CI matrix whose results are understood and useful. The number of jobs is secondary.

Its lanes have understood failure modes. Reports can be reproduced. Suppressions are narrow and temporary. Old bugs become cheap regression tests. Expensive discovery jobs are used where they add information that faster jobs can't. Production incidents feed new workloads back into the instrumented environment.

Over time, “Are we running ASan, TSan, and MSan?” becomes less interesting than “What classes of invalid execution can still pass through this system without us seeing them?”

That second question exposes the gaps that matter: weak workload coverage, opaque dependencies, poor symbolization, ownership transitions the tests never exercise, or synchronization the tooling can't observe.

A sanitizer program improves as those blind spots become smaller, better understood, and harder for new regressions to hide inside.

---

## Closing Perspective

Sanitizers are most useful when they become part of how a system is built and tested, rather than something switched on after a crash.

ASan, LSan, MSan, and TSan observe different failures, but their reports all force the program to answer questions it was already depending on.

Was this memory still valid to access? Who was responsible for releasing it? Had this value actually been initialized before it was used? What synchronization ordered these two accesses?

Those assumptions exist with or without instrumentation. Sanitizers make some of them observable at runtime.

That's also why the compiler flag is only a small part of the setup. The relevant code has to be instrumented. The workload has to reach the lifetime transition, failure path, or thread interleaving where the assumption can break. The report has to retain enough symbol information to reconstruct what happened.

CI needs a clear policy for which findings are trusted, which are still being investigated, and which gaps are knowingly outside the lane.

Ownership is a recurring theme in this handbook because native boundaries make lifetime assumptions especially easy to lose. Borrowing, retaining, transferring, and releasing aren't bookkeeping details. They determine who may still touch a resource and who must eventually destroy it. Finalizers, cleanup scopes, custom allocators, and FFI wrappers add more places where two parts of the program can end up with different answers.

The <VPIcon icon="fa-brands fa-dart-lang"/>`webcrypto.dart` case study shows the same problem from the tooling side. The sanitizer path the project wanted was blocked upstream, so the work proceeded with a memory-checking path the existing build system could support. The native-lifetime workload still became testable, the higher-confidence findings could still be enforced, and the missing sanitizer support stayed visible instead of being treated as solved.

The details there are specific to Dart, BoringSSL, build hooks, and Valgrind. The situation is not. MSan loses authority when initialization crosses code it can't instrument. TSan becomes harder to interpret when synchronization happens inside an opaque dependency. ASan can't enforce logical object boundaries that a custom allocator never exposes.

A clean run only means something when you understand those boundaries.

The same applies after a bug is found. A useful report becomes a reproducer. A reproducer becomes a regression test. Repeated ownership failures may justify changing an API instead of adding another local fix. A race that appears only under stress should leave behind a workload capable of producing that overlap again. Suppressions should disappear when the reason for them disappears.

Over time, this changes the value of the sanitizer program. Individual reports still matter, but the larger payoff is a codebase in which lifetime, initialization, and synchronization mistakes have fewer places to remain invisible.

A green sanitizer lane isn't a certificate that the program is safe. It's evidence that a particular set of runtime contracts survived a particular set of executions.

The useful question after that run is what the lane still couldn't see.

**Sanitizers aren't debug flags.** They're executable checks on the contracts your program already depends on.

::: info References and Further Reading

**Sanitizer Documentation and Design**

```component VPCard
{
  "title": "AddressSanitizer — Clang 24.0.0git documentation",
  "desc": "AddressSanitizer is a fast memory error detector. It consists of a compiler instrumentation module and a run-time library. The tool can detect the following types of bugs ...",
  "link": "https://clang.llvm.org/docs/AddressSanitizer.html",
  "logo": "https://clang.llvm.org/favicon.ico",
  "background": "rgba(220,60,1,0.2)"
}
```

```component VPCard
{
  "title": "LeakSanitizer — Clang 24.0.0git documentation",
  "desc": "LeakSanitizer is a run-time memory leak detector. It can be combined with AddressSanitizer to get both memory error and leak detection, or used in a stand-alone mode. LSan adds almost no performance overhead until the very end of the process, at which point there is an extra leak detection phase.",
  "link": "https://clang.llvm.org/docs/LeakSanitizer.html",
  "logo": "https://clang.llvm.org/favicon.ico",
  "background": "rgba(220,60,1,0.2)"
}
```

```component VPCard
{
  "title": "MemorySanitizer — Clang 24.0.0git documentation",
  "desc": "MemorySanitizer is a detector of uninitialized memory use. It consists of a compiler instrumentation module and a run-time library. Typical slowdown introduced by MemorySanitizer is 3x. Here is a not comprehensive of list cases when MemorySanitizer will report an error ...",
  "link": "https://clang.llvm.org/docs/MemorySanitizer.html",
  "logo": "https://clang.llvm.org/favicon.ico",
  "background": "rgba(220,60,1,0.2)"
}
```

```component VPCard
{
  "title": "ThreadSanitizer — Clang 24.0.0git documentation",
  "desc": "ThreadSanitizer is a tool that detects data races. It consists of a compiler instrumentation module and a run-time library. Typical slowdown introduced by ThreadSanitizer is about 5x-15x. Typical memory overhead introduced by ThreadSanitizer is about 5x-10x.",
  "link": "https://clang.llvm.org/docs/ThreadSanitizer.html",
  "logo": "",
  "background": "rgba(undefined,0.2)"
}
```

<SiteInfo
  name="AddressSanitizerAlgorithm - Wiki"
  desc="AddressSanitizer, ThreadSanitizer, MemorySanitizer - google/sanitizers"
  url="https://github.com/google/sanitizers/wiki/AddressSanitizerAlgorithm"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/026110c45dc629330ff32259b2c370c965e6e672cbdd9d534ae73185ead058ee/google/sanitizers"/>

<SiteInfo
  name="AddressSanitizerLeakSanitizer - Wiki"
  desc="AddressSanitizer, ThreadSanitizer, MemorySanitizer - google/sanitizers"
  url="https://github.com/google/sanitizers/wiki/AddressSanitizerLeakSanitizer"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cdb48ec5206d5951eda1371b6cdf74fd8b139d981fa2c56864ee7b533361a95e/google/sanitizers"/>

<SiteInfo
  name="ThreadSanitizerCppManual - Wiki"
  desc="AddressSanitizer, ThreadSanitizer, MemorySanitizer - google/sanitizers"
  url="https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cdb48ec5206d5951eda1371b6cdf74fd8b139d981fa2c56864ee7b533361a95e/google/sanitizers"/>

```component VPCard
{
  "title": "AddressSanitizer: A Fast Address Sanity Checker | USENIX",
  "desc": "Konstantin Serebryany, Derek Bruening, Alexander Potapenko, and Dmitriy Vyukov, Google Memory access bugs, including buffer overflows and uses of freed heap memory, remain a serious problem for programming languages like C and C++. Many memory error detectors exist, but most of them are either slow or detect a limited set of bugs, or both...",
  "link": "https://usenix.org/conference/atc12/technical-sessions/presentation/serebryany",
  "logo": "https://usenix.org/themes/motherboard/favicon.ico",
  "background": "rgba(90,0,2,0.2)"
}
```

<SiteInfo
  name="MemorySanitizer: fast detector of uninitialized memory use in C++"
  desc="This paper presents MemorySanitizer, a dynamic tool that detects uses of uninitialized memory in C and C++. The tool is based on compile time instrumentation and relies on bit-precise shadow memory at run-time. Shadow propagation technique is used to avoid false positive reports on copying of uninitialized memory..."
  url="https://research.google/pubs/memorysanitizer-fast-detector-of-uninitialized-memory-use-in-c//"
  logo="https://gstatic.com/images/branding/googleg_gradient/1x/googleg_gradient_standard_20dp.png"
  preview="https://storage.googleapis.com/gweb-research2023-media/images/HO_previewImage1.width-800.format-jpeg.jpg"/>

```component VPCard
{
  "title": "Valgrind",
  "desc": "Official Home Page for valgrind, a suite of tools for debugging and profiling. Automatically detect memory management and threading bugs, and perform detailed profiling.  The current stable version is valgrind-3.27.1.",
  "link": "https://valgrind.org/docs/manual/mc-manual.html/",
  "logo": "https://valgrind.org/favicon.ico",
  "background": "rgba(116,36,15,0.2)"
}
```

**Fuzzing and Continuous Testing**

```component VPCard
{
  "title": "libFuzzer – a library for coverage-guided fuzz testing. - LLVM",
  "desc": "LibFuzzer is an in-process, coverage-guided, evolutionary fuzzing engine. LibFuzzer is linked with the library under test, and feeds fuzzed inputs to the library via a specific fuzzing entrypoint (aka “target function”); the fuzzer then tracks which areas of the code are reached, and generates mutations on the corpus of input data in order to maximize the code coverage. The code...",
  "link": "https://llvm.org/docs/LibFuzzer.html/",
  "logo": "https://llvm.org/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

```component VPCard
{
  "title": "OSS-Fuzz",
  "desc": "Documentation for OSS-Fuzz",
  "link": "https://google.github.io/oss-fuzz/",
  "logo": "https://google.github.io/oss-fuzz/favicon.ico",
  "background": "rgba(114,83,237,0.2)"
}
```

```component VPCard
{
  "title": "Ideal integration",
  "desc": "Documentation for OSS-Fuzz",
  "link": "https://google.github.io/oss-fuzz/advanced-topics/ideal-integration/",
  "logo": "https://google.github.io/oss-fuzz/favicon.ico",
  "background": "rgba(114,83,237,0.2)"
}
```

```component VPCard
{
  "title": "Reproducing",
  "desc": "Documentation for OSS-Fuzz",
  "link": "https://google.github.io/oss-fuzz/advanced-topics/reproducing//",
  "logo": "https://google.github.io/oss-fuzz/favicon.ico",
  "background": "rgba(114,83,237,0.2)"
}
```

**Ownership, FFI, and the Anchor Case Study**

<SiteInfo
  name="boringssl/API-CONVENTIONS.md at main · google/boringssl"
  desc="Mirror of BoringSSL. Contribute to google/boringssl development by creating an account on GitHub."
  url="https://github.com/google/boringssl/blob/main/API-CONVENTIONS.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/86e5f96245ca4f3d31da885bf4b97fbf81cffdf375a20ee35388db8033e22669/google/boringssl"/>

<SiteInfo
  name="boringssl/include/openssl/evp.h at main · google/boringssl"
  desc="Mirror of BoringSSL. Contribute to google/boringssl development by creating an account on GitHub."
  url="https://github.com/google/boringssl/blob/main/include/openssl/evp.h/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/86e5f96245ca4f3d31da885bf4b97fbf81cffdf375a20ee35388db8033e22669/google/boringssl"/>

<SiteInfo
  name="google/webcrypto.dart"
  desc="Cross-platform implementation of Web Cryptography APIs"
  url="https://github.com/google/webcrypto.dart/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/06417af4999cb839b4f23368f17a98dcf463e57536c13add1b51e61862ae00e5/google/webcrypto.dart"/>

<SiteInfo
  name="FFI safety: add valgrind and memory-pressure testing · Issue #278 · google/webcrypto.dart"
  desc="Before 1.0.0, we should add stronger memory-safety testing for the FFI/native path. The current test suite gives us good functional coverage, but native crypto code also needs protection against: l..."
  url="https://github.com/google/webcrypto.dart/issues/278/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/8e8e301bb3669be67095106a36b9611611f8c8f3b3762cdbb56541b88bcd8cdd/google/webcrypto.dart/issues/278"/>

<SiteInfo
  name="Hooks"
  desc="Run custom build scripts."
  url="https://dart.dev/tools/hooks"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

<SiteInfo
  name="dart build"
  desc="Command-line tool for building Dart applications."
  url="https://dart.dev/tools/dart-build/"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

<SiteInfo
  name="Dart overview"
  desc="A short introduction to Dart."
  url="https://dart.dev/overview/"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

<SiteInfo
  name="[dartdev] `dart build cli` support a separate aotruntime mode? · Issue #63435 · dart-lang/sdk"
  desc="The Dart SDK, including the VM, JS and Wasm compilers, analysis, core libraries, and more. - [dartdev] `dart build cli` support a separate aotruntime mode? · Issue #63435 · dart-lang/sdk"
  url="https://github.com/dart-lang/sdk/issues/63435/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/8db15beba22fc1c0035f7a89d07aa0aa5874da48a069e1fcd91ae22f54d62146/dart-lang/sdk/issues/63435"/>

<SiteInfo
  name="[hooks] Support code assets in `dart test -c cli --target-sanitizer` · Issue #63489 · dart-lang/sdk"
  desc="The Dart SDK, including the VM, JS and Wasm compilers, analysis, core libraries, and more. - [hooks] Support code assets in `dart test -c cli --target-sanitizer` · Issue #63489 · dart-lang/sdk"
  url="https://github.com/dart-lang/sdk/issues/63489/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/471fef2e8843327146a7ac56ff5c306c769a87505e07a99302582655cedee5bb/dart-lang/sdk/issues/63489"/>

**Public Incident References**

```component VPCard
{
  "title": "1767590 - (CVE-2022-31741) Uninitialized variable leads to invalid/arbitrary memory read in S/MIME decryption",
  "desc": "RESOLVED (djackson) in NSS - Libraries. Last updated 2024-05-30.",
  "link": "https://bugzilla.mozilla.org/show_bug.cgi?id=1767590",
  "logo": "https://bugzilla.mozilla.org/extensions/BMO/web/images/favicon.svg",
  "background": "rgba(26,168,245,0.2)"
}
```

```component VPCard
{
  "title": "1688716 - ThreadSanitizer: data race ../src/util/u_thread.h:197:4 in iris_dri.so",
  "desc": "RESOLVED (twsmith) in Core - Graphics. Last updated 2021-09-13.",
  "link": "https://bugzilla.mozilla.org/show_bug.cgi?id=1688716",
  "logo": "https://bugzilla.mozilla.org/extensions/BMO/web/images/favicon.svg",
  "background": "rgba(26,168,245,0.2)"
}
```

```component VPCard
{
  "title": "1879437 - LeakSanitizer: detected memory leaks [@ js::jit::JitHintsMap::addIonHint]",
  "desc": "RESOLVED (dpalmeiro) in Core - JavaScript Engine: JIT. Last updated 2024-05-30.",
  "link": "https://bugzilla.mozilla.org/show_bug.cgi?id=1879437/",
  "logo": "https://bugzilla.mozilla.org/extensions/BMO/web/images/favicon.svg",
  "background": "rgba(26,168,245,0.2)"
}
```

```component VPCard
{
  "title": "1895951 - (CVE-2024-7528) AddressSanitizer: heap-use-after-free [@ mozilla::Result<mozilla::Ok, nsresult> mozilla::dom::indexedDB::Key::EncodeAsString<unsigned char>] with READ of size 1",
  "desc": "VERIFIED (jvarga) in Core - Storage: IndexedDB. Last updated 2025-03-24.",
  "link": "https://bugzilla.mozilla.org/show_bug.cgi?id=1895951/",
  "logo": "https://bugzilla.mozilla.org/extensions/BMO/web/images/favicon.svg",
  "background": "rgba(26,168,245,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Sanitizers Handbook: Memory, Initialization, and Races",
  "desc": "Some of the most dangerous native failures are produced by programs that appear to be working correctly. The cryptographic operation returns the right ciphertext. The parser rejects malformed input. T",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-sanitizers-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
