---
lang: en-US
title: "Flutter Frontend Systems Design: How to Think Like a Senior Engineer in the AI Age"
description: "Article(s) > Flutter Frontend Systems Design: How to Think Like a Senior Engineer in the AI Age"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Flutter Frontend Systems Design: How to Think Like a Senior Engineer in the AI Age"
    - property: og:description
      content: "Flutter Frontend Systems Design: How to Think Like a Senior Engineer in the AI Age"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/flutter-frontend-systems-design-how-to-think-like-a-senior-engineer-in-the-ai-age.html
prev: /programming/dart/articles/README.md
date: 2026-08-10
isOriginal: false
author:
  - name: Jesutoni Aderibigbe
    url: https://freecodecamp.org/news/author/ToniAderibigbe/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/682cb489-c8fd-4530-9226-357edb4e8c19.png
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
  name="Flutter Frontend Systems Design: How to Think Like a Senior Engineer in the AI Age"
  desc="Systems design has always been treated as a backend problem. Ask a group of Flutter engineers what systems design means, and most will describe server architecture: load balancers, databases, and micr"
  url="https://freecodecamp.org/news/flutter-frontend-systems-design-how-to-think-like-a-senior-engineer-in-the-ai-age"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/682cb489-c8fd-4530-9226-357edb4e8c19.png"/>

Systems design has always been treated as a backend problem.

Ask a group of Flutter engineers what systems design means, and most will describe server architecture: load balancers, databases, and microservices.

Ask them to design a distributed cache or sketch out a message queue, and they'll hesitate. Ask them to design the Flutter client for a social feed, and they'll open a new file and start writing widgets.

That's the gap. And it's closing fast.

As Flutter applications grow more complex with real-time features, offline support, multiple platform targets, and AI-generated code that still needs to be maintainable, the architectural decisions you make before writing a single widget become just as important as your backend architecture.

Senior Flutter interviews at product companies increasingly test this skill. The engineers who can clearly explain *why* they chose a particular architecture, the trade-offs they considered, and the problems they were optimizing for are the ones who get hired and promoted.

This article is structured in two halves. The first half explains what frontend systems design actually is and why it matters for Flutter engineers specifically in 2026. The second half works through a full mock interview answer for one of the most common scenario questions: designing the Flutter architecture for a social feed with infinite scroll, likes, comments, and real-time updates. We'll walk through the kind of answer that separates mid-level from senior in an interview room.

::: note Prerequisites

This article assumes you're a working Flutter developer comfortable with state management (Riverpod, Bloc, or similar), REST APIs, and basic Dart. You don't need backend experience, but familiarity with concepts like caching, pagination, and WebSockets will help you follow the deeper sections.

No code setup is required. This is a thinking and architecture article, not a tutorial. Dart/Flutter snippets are used to ground abstract ideas in concrete implementation.

:::

---

## 1. What is Frontend Systems Design?

Systems design is the practice of making high-level decisions about how a software system is structured before implementation begins: how its components are divided, how they communicate, how it handles scale, failure, and change over time.

On the backend, this means deciding between microservices and a monolith, choosing a database, designing an API contract, and planning for horizontal scaling. The feedback loop is fast: a bad database schema causes slow queries within days, and a poorly designed API breaks clients immediately.

On the frontend, the consequences of bad design are slower and quieter. A 600-line screen widget still ships. A god-class repository with 40 methods still works. State leaks between sessions only surface after a frustrated user reports it.

Frontend systems design asks the same category of questions, applied to the client layer:

- How do you divide a large app into independently-buildable features?
- Where does business logic live, and what enforces that boundary?
- How does data flow from the network to the screen and back?
- What happens when the network fails, the API changes shape, or the user logs out mid-session?
- How do you design components that can be tested in isolation?
- How do you structure the app so a team of engineers can work on it without stepping on each other?

These aren't widget questions. They're architecture questions. And they have answers: principled ones, with real tradeoffs.

---

## 2. Why Flutter Engineers Can't Ignore It Anymore

Three forces are pushing systems design into the Flutter conversation in a way that simply didn't exist three years ago.

### Flutter Apps Are No Longer Just UIs

With Serverpod and Dart Frog on the server, Jaspr on the web, and Flutter on mobile and desktop, Dart is now a genuinely full-stack language. Engineers making architecture decisions that span mobile, web, and server in the same codebase need systems thinking, not just widget composition skills.

When your Freezed model is shared between the Flutter client and the Dart backend, the boundary between "frontend" and "backend" design dissolves. You're designing a system.

### AI Agents Expose Bad Architecture Immediately

This is the new pressure point. When Claude Code or any AI coding agent reads your project cold, it has no accumulated mental model to compensate for messiness. It reads files sequentially. It works within a limited context window. It makes decisions based on the patterns it sees.

A codebase with tangled dependencies, inconsistent naming, and business logic scattered across the widget tree produces unreliable AI output. This doesn't happen because the AI is wrong, but because the code doesn't communicate its own structure clearly enough to be navigated by something without human intuition.

Good systems design and AI-navigable architecture are almost identical. Feature-first structure, clear layer boundaries, consistent naming, small, focused files. These aren't just team hygiene practices anymore. They're what make AI-assisted development actually work at scale.

### Senior Flutter Interviews Now Test it Explicitly

As Flutter matures and product companies build larger apps with larger teams, the interview bar has risen. A mid-level Flutter interview might test widget lifecycle and state management fundamentals. A senior interview tests your ability to design a system you've never seen before, live, under pressure, while explaining your thinking out loud.

If you haven't thought about this before walking into that room, you'll be caught off guard.

---

## 3. The Interview Format: What to Expect

Frontend systems design interviews at senior level typically run 45–60 minutes. You're given a vague scenario, like "design the **Flutter client for a social feed"**, and you're expected to drive the conversation.

The interviewer isn't looking for a single correct answer. They're watching how you think:

- Do you clarify requirements before jumping to solutions?
- Do you identify the hard problems (real-time sync, optimistic UI, offline states) rather than the easy ones?
- Do you make tradeoffs explicitly rather than just picking the thing you know best?
- Can you go deep on any layer when pushed?

The biggest mistake candidates make is opening Xcode or a code file immediately and starting to build. Systems design interviews are whiteboard conversations, not implementation sessions. Draw boxes. Name the layers. Talk through the data flow before writing a single method signature.

---

## 4. How to Structure Your Answer

Use this framework for any frontend systems design question:

1. **Clarify requirements (5 minutes)** What platforms? How many users? Offline support? Real-time? Authentication? What's in scope for this conversation? Never assume.
2. **Define the data model (5–10 minutes)** What are the core entities? What are their relationships? This anchors every architectural decision that follows.
3. **Design the layer architecture (10 minutes)** How is the app divided? What are the layers? What enforces the boundaries between them?
4. **Solve the hard problems one by one (20–25 minutes)** Pagination. Optimistic UI. Real-time sync. Offline. Performance. Go deep on each one, and name the tradeoffs.
5. **Address failure states (5 minutes)** What breaks? What's the user experience when it does? Senior answers always include error handling.
6. **Summarise and invite questions (5 minutes)** Recap the key decisions and the tradeoffs you made. Show you can hold the whole picture.

---

## 5. Mock Interview: Design a Social Feed

> **Interviewer:** Design the Flutter client architecture for a social feed. Users can scroll through posts, like and comment on them, and receive real-time updates when new posts arrive.

This is the answer.

### Step 1: Clarify Requirements

Before touching architecture, ask the questions that constrain your decisions.

> *"A few questions before I start. What platforms are we targeting? Mobile only, or web and desktop too? How many users are we designing for? Is this a startup MVP or an app at scale? Do we need offline support? How real-time does real-time need to be? Are we talking push notifications, or should the feed update while the user is looking at it? And what's the authentication model? Are users logged in, or is there a guest mode?"*

For this walkthrough, assume:

- Mobile (iOS + Android), with web on the roadmap
- Tens of thousands of MAU. Not Twitter scale, but meaningful.
- Offline: show cached content, queue interactions
- Real-time: live feed updates while the screen is open (WebSocket)
- Auth: logged-in users only

These answers change every architectural decision that follows. Offline support means a local cache layer. Live updates while the screen is open means WebSockets, not polling. Web on the roadmap means avoiding anything mobile-only in the business logic layer.

### Step 2: Define the Data Model

Start with the entities and their relationships. Draw these before writing any code.

```dart :collapsed-lines
// Core entities

@freezed
class Post with _$Post {
  const factory Post({
    required String id,
    required String authorId,
    required String authorName,
    required String authorAvatarUrl,
    required String content,
    String? imageUrl,
    required int likeCount,
    required int commentCount,
    required bool isLikedByMe,      // derived from current user context
    required DateTime createdAt,
  }) = _Post;
}

@freezed
class Comment with _$Comment {
  const factory Comment({
    required String id,
    required String postId,
    required String authorId,
    required String authorName,
    required String content,
    required DateTime createdAt,
  }) = _Comment;
}

@freezed
class FeedPage with _$FeedPage {
  const factory FeedPage({
    required List<Post> posts,
    required String? nextCursor,    // null = end of feed
  }) = _FeedPage;
}
```

A few design decisions embedded in this model are worth calling out explicitly in an interview:

`isLikedByMe` **lives on the Post.** You could derive this from a separate user-likes table, but embedding it in the post response is simpler and makes the UI stateless. The screen doesn't need to join two data sources to render a like button.

**Cursor-based pagination, not offset.** `nextCursor` rather than `page: 2`. Offset pagination breaks when new posts are inserted at the top. Item 20 on page 2 becomes item 21, and you either show a duplicate or skip an item. Cursors are stable.

**`likeCount` and `commentCount` are integers, not arrays.** You don't fetch all likers to render a post. You fetch the count and a flag. This is a deliberate API contract decision that prevents unbounded payload size.

### Step 3: Design the Layer Architecture

A feed is a good test of layer discipline because data flows in multiple directions: down from the API, up from user interactions, and sideways from real-time events. A flat architecture collapses quickly.

Here's the structure:

```sh :collapsed-lines title="file structure"
lib/
├── core/
│   ├── network/          # Dio client, interceptors, token refresh
│   ├── cache/            # Local storage abstraction (Hive or Isar)
│   ├── realtime/         # WebSocket connection manager
│   └── errors/           # Typed error classes
└── features/
    └── feed/
        ├── data/
        │   ├── models/   # Post, Comment, FeedPage (Freezed)
        │   ├── sources/
        │   │   ├── feed_remote_source.dart   # API calls
        │   │   └── feed_local_source.dart    # Cache reads/writes
        │   └── repositories/
        │       └── feed_repository.dart      # Coordinates remote + local
        └── presentation/
            ├── screens/
            │   └── feed_screen.dart
            ├── widgets/
            │   ├── post_card.dart
            │   ├── like_button.dart
            │   └── comment_sheet.dart
            └── providers/
                ├── feed_provider.dart        # Paginated post list
                ├── like_provider.dart        # Like/unlike actions
                └── realtime_provider.dart    # WebSocket events → state
```

A couple things worth noting here:

First, the repository is the only component that talks to both the remote source and the local source. Providers call the repository. The repository decides whether to hit the network or return cached data. Screens never know the data came from cache.

Second, the real-time layer is separate from the data fetching layer. It's a common mistake to wire WebSocket events directly into the same provider that manages pagination, and it becomes impossible to test or reason about. The `realtime_provider` receives events and patches the feed state and the `feed_provider` manages the paginated list. They coordinate through Riverpod's `ref`, not through direct dependency.

### Step 4: Pagination and Infinite Scroll

Infinite scroll is the first hard problem. The naïve implementation: a `ListView` that loads everything falls apart at a few hundred posts.

Here's a Riverpod `AsyncNotifier` that handles cursor-based pagination:

```dart :collapsed-lines
@riverpod
class FeedNotifier extends _$FeedNotifier {
  static const _pageSize = 20;
  String? _nextCursor;
  bool _isFetchingMore = false;

  @override
  Future<List<Post>> build() async {
    // Load first page + seed from cache if available
    final cached = await ref.read(feedLocalSourceProvider).getCachedPosts();
    if (cached.isNotEmpty) {
      // Show cache immediately, refresh in background
      _refreshInBackground();
      return cached;
    }
    return _fetchPage(cursor: null);
  }

  Future<void> loadMore() async {
    if (_isFetchingMore || _nextCursor == null) return;
    _isFetchingMore = true;

    final currentPosts = state.valueOrNull ?? [];
    final page = await ref
        .read(feedRepositoryProvider)
        .getFeedPage(cursor: _nextCursor, limit: _pageSize);

    _nextCursor = page.nextCursor;
    state = AsyncData([...currentPosts, ...page.posts]);
    _isFetchingMore = false;
  }

  Future<List<Post>> _fetchPage({required String? cursor}) async {
    final page = await ref
        .read(feedRepositoryProvider)
        .getFeedPage(cursor: cursor, limit: _pageSize);
    _nextCursor = page.nextCursor;
    await ref.read(feedLocalSourceProvider).cachePosts(page.posts);
    return page.posts;
  }

  void _refreshInBackground() {
    Future.microtask(() async {
      final freshPosts = await _fetchPage(cursor: null);
      state = AsyncData(freshPosts);
    });
  }

  bool get hasMore => _nextCursor != null;
}
```

In the screen, trigger `loadMore()` before the user reaches the bottom, not at the last item, but a few items before it:

```dart
NotificationListener<ScrollNotification>(
  onNotification: (notification) {
    if (notification.metrics.pixels >
        notification.metrics.maxScrollExtent - 400) {
      ref.read(feedNotifierProvider.notifier).loadMore();
    }
    return false;
  },
  child: ListView.builder(
    itemCount: posts.length + (hasMore ? 1 : 0),
    itemBuilder: (context, index) {
      if (index == posts.length) return const FeedLoadingIndicator();
      return PostCard(post: posts[index]);
    },
  ),
)
```

The 400-pixel threshold means the next page starts loading before the user sees the end of the list. The experience feels seamless.

### Step 5: Optimistic UI for Likes and Comments

Optimistic UI is the practice of updating the local state immediately when a user takes an action, before the server confirms it, then rolling back if the server rejects it. It's what makes a like button feel instant rather than laggy.

The pattern has three steps: apply the optimistic update, fire the network request, and roll back on failure.

```dart :collapsed-lines
@riverpod
class LikeNotifier extends _$LikeNotifier {
  @override
  void build() {}

  Future<void> toggleLike(String postId) async {
    final feedNotifier = ref.read(feedNotifierProvider.notifier);
    final currentPosts = ref.read(feedNotifierProvider).valueOrNull ?? [];

    // Find the post
    final postIndex = currentPosts.indexWhere((p) => p.id == postId);
    if (postIndex == -1) return;
    final post = currentPosts[postIndex];

    // Step 1: Apply optimistic update immediately
    final optimisticPost = post.copyWith(
      isLikedByMe: !post.isLikedByMe,
      likeCount: post.isLikedByMe ? post.likeCount - 1 : post.likeCount + 1,
    );
    feedNotifier.patchPost(postIndex, optimisticPost);

    // Step 2: Fire the network request
    try {
      await ref.read(feedRepositoryProvider).toggleLike(postId);
    } catch (e) {
      // Step 3: Roll back on failure
      feedNotifier.patchPost(postIndex, post);
      // Show a snackbar or error indicator
    }
  }
}
```

The `patchPost` method on `FeedNotifier` replaces a single post in the list without rebuilding the whole feed. This is an important performance detail when the list has hundreds of items.

**The tradeoff to name explicitly in an interview:** optimistic UI can produce an inconsistent state if the server is the source of truth for like counts. Two users liking simultaneously might both see their local count increment from 41 to 42, but the real count is 43. For a social app, this is usually acceptable. You show the user their action was registered, and the next feed refresh corrects the count. For financial transactions, an optimistic UI is inappropriate. Know where to draw the line.

### Step 6: Real-Time Updates

Real-time feed updates and new posts appearing while the user is looking at the screen require a persistent connection. WebSocket is the right tool here. Server-Sent Events work too, but WebSocket is bidirectional, which matters if you later want to push events (typing indicators, presence).

Design the WebSocket layer as a singleton service, not inside the feed feature:

```dart :collapsed-lines title="core/realtime/realtime_service.dart"
class RealtimeService {
  WebSocketChannel? _channel;
  final _controller = StreamController<RealtimeEvent>.broadcast();

  Stream<RealtimeEvent> get events => _controller.stream;

  Future<void> connect(String token) async {
    _channel = WebSocketChannel.connect(
      Uri.parse('wss://api.yourapp.com/ws?token=$token'),
    );

    _channel!.stream.listen(
      (data) {
        final event = RealtimeEvent.fromJson(jsonDecode(data as String));
        _controller.add(event);
      },
      onError: (_) => _scheduleReconnect(),
      onDone: () => _scheduleReconnect(),
    );
  }

  void _scheduleReconnect() {
    Future.delayed(const Duration(seconds: 3), connect);
  }

  void dispose() {
    _channel?.sink.close();
    _controller.close();
  }
}
```

Then in the feed layer, listen to the stream and patch state when new posts arrive:

```dart
@riverpod
class RealtimeFeedNotifier extends _$RealtimeFeedNotifier {
  StreamSubscription? _subscription;

  @override
  void build() {
    _subscription = ref
        .read(realtimeServiceProvider)
        .events
        .where((e) => e.type == RealtimeEventType.newPost)
        .listen((event) {
      final newPost = Post.fromJson(event.payload);
      ref.read(feedNotifierProvider.notifier).prependPost(newPost);
    });

    ref.onDispose(() => _subscription?.cancel());
  }
}
```

**The UX decision worth raising in an interview:** do you silently prepend new posts to the top of the feed, or do you show a "3 new posts, tap to refresh" banner?

Silent prepend is jarring: the user is reading post 5, and suddenly they're reading post 8. The banner pattern (used by Twitter/X and LinkedIn) is almost always the better choice. It signals freshness without disrupting reading position.

### Step 7: Offline and Error States

An offline-capable feed has two distinct requirements: show something useful when there's no connection, and queue interactions (likes, comments) so they fire when connectivity returns.

For showing cached content, the repository pattern handles this cleanly:

```dart title="feed_repository.dart"
Future<List<Post>> getFeed({String? cursor}) async {
  try {
    final page = await _remoteSource.getFeedPage(cursor: cursor);
    await _localSource.cachePosts(page.posts);
    return page.posts;
  } on DioException catch (e) {
    if (e.type == DioExceptionType.connectionError) {
      // Network unavailable — return cache
      final cached = await _localSource.getCachedPosts();
      if (cached.isNotEmpty) return cached;
    }
    rethrow;
  }
}
```

For queuing interactions offline, keep a simple pending actions queue in local storage:

```dart
@freezed
class PendingAction with _$PendingAction {
  const factory PendingAction.like({
    required String postId,
    required bool isLike,
    required DateTime queuedAt,
  }) = PendingLike;

  const factory PendingAction.comment({
    required String postId,
    required String content,
    required DateTime queuedAt,
  }) = PendingComment;
}
```

When connectivity returns (detected via `connectivity_plus`), drain the queue and fire each action in order. If an action fails after retry, surface it to the user. Don't silently drop it.

### Step 8: Performance Considerations

A feed is one of the most performance-sensitive screens in any app. There are a few non-negotiable practices:

First, use `ListView.builder`, never `ListView` with a `children` list. Builder renders only the items currently on screen. A `children` list renders all of them at once (which would be catastrophic for a feed of 200+ posts).

Second, keep `PostCard` build methods cheap. Every rebuild of a postcard is expensive at scale. Use `const` constructors everywhere possible. Avoid rebuilding the whole card when only the like count changes. Isolate the like button into its own Riverpod consumer.

```dart
// Bad — whole PostCard rebuilds when like changes
class PostCard extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final post = ref.watch(feedNotifierProvider)
        .valueOrNull
        ?.firstWhere((p) => p.id == postId);
    // ...
  }
}

// Good — only LikeButton rebuilds
class LikeButton extends ConsumerWidget {
  final String postId;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final post = ref.watch(
      feedNotifierProvider.select(
        (state) => state.valueOrNull?.firstWhere((p) => p.id == postId),
      ),
    );
    // Only rebuilds when this specific post's like state changes
  }
}
```

Third, cache network images aggressively. Use `cached_network_image` with a memory cache limit. On a feed with avatars and post images, uncached network images are the single biggest source of jank.

And lastly, dispose WebSocket connections on screen exit. Don't keep a real-time connection alive when the user navigates away. Riverpod's `ref.onDispose` makes this straightforward, but it's easy to miss.

---

## 6. Other Questions to Prepare For

The social feed covers most of the hard architectural territory. These additional questions round out your preparation:

**Architecture & structure:**

- How would you structure a large Flutter app for a team of 10 engineers?
- How do you handle shared state between two features that shouldn't know about each other?
- Walk me through how you'd design the data layer for an offline-first app.

**State management:**

- Compare Riverpod, Bloc, and Redux from an architecture standpoint (not just API differences).
- How do you prevent the state from leaking between sessions after a user logs out?

**Networking & data:**

- How would you handle token refresh across concurrent requests?
- Walk me through optimistic UI for a financial transaction. How is it different from liking a post?

**Performance:**

- A screen has 10,000 items. How do you render it without jank?
- How do you design an image-loading system for a feed with mixed media types?

**Multi-platform:**

- How would you share models and business logic between a Flutter mobile app and a Dart backend?
- What changes about your architecture when you add a web as a target?

For each of these, use the same framework: clarify the constraints, define the data model, name the layers, solve the hard problems explicitly, and address failure states.

---

## 7. Key Takeaways

Systems design is not a backend discipline that Flutter engineers are exempt from. It's a way of thinking about software that becomes unavoidable as apps grow in complexity, teams grow in size, and AI agents become part of the development workflow.

The social feed scenario illustrates five principles that apply across every frontend systems design problem:

### 1. Layer Boundaries Are Load-bearing

The repository pattern, the separation of real-time from data fetching, and the isolation of pending actions aren't academic choices. They're what makes the system testable, navigable, and maintainable when requirements change.

### 2. The Data Model Anchors Everything

Decisions you make in the model (like cursor-based pagination, `isLikedByMe` on the post, and integer counts instead of arrays) ripple through every layer. Get the model right before designing anything else.

### 3. Optimistic UI is a UX Contract, Not Just a Pattern

When you apply an optimistic update, you're making a promise to the user. Know when that promise is appropriate (social interactions) and when it isn't (financial transactions).

### 4. Real-time is an Architecture Concern, Not a Feature

A WebSocket connection is a persistent resource that needs to be managed, connected when needed, disconnected when not, and reconnected on failure. Design it as infrastructure, not as part of a single screen.

### 5. Offline is a First-class State

Not an edge case, not a "nice to have." In markets with unreliable connectivity, which includes most of the world's fastest-growing mobile markets, an app that shows nothing when the network drops is a broken app.

The engineers who understand these principles and can articulate them out loud under interview pressure are the ones who get hired to build the systems that millions of people use.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Flutter Frontend Systems Design: How to Think Like a Senior Engineer in the AI Age",
  "desc": "Systems design has always been treated as a backend problem. Ask a group of Flutter engineers what systems design means, and most will describe server architecture: load balancers, databases, and micr",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/flutter-frontend-systems-design-how-to-think-like-a-senior-engineer-in-the-ai-age.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
