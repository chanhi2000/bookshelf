---
lang: en-US
title: "Graph Algorithms in Python: BFS, DFS, and Beyond"
description: "Article(s) > Graph Algorithms in Python: BFS, DFS, and Beyond"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Graph Algorithms in Python: BFS, DFS, and Beyond"
    - property: og:description
      content: "Graph Algorithms in Python: BFS, DFS, and Beyond"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/graph-algorithms-in-python-bfs-dfs-and-beyond.html
prev: /programming/py/articles/README.md
date: 2025-09-04
isOriginal: false
author:
  - name: Oyedele Tioluwani
    url : https://freecodecamp.org/news/author/Tioluwani/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756916679855/9b173128-ed79-4ae0-8cc8-79fca17662dd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Graph Algorithms in Python: BFS, DFS, and Beyond"
  desc="Have you ever wondered how Google Maps finds the fastest route or how Netflix recommends what to watch? Graph algorithms are behind these decisions. Graphs, made up of nodes (points) and edges (connections), are one of the most powerful data structur..."
  url="https://freecodecamp.org/news/graph-algorithms-in-python-bfs-dfs-and-beyond"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756916679855/9b173128-ed79-4ae0-8cc8-79fca17662dd.png"/>

Have you ever wondered how Google Maps finds the fastest route or how Netflix recommends what to watch? Graph algorithms are behind these decisions.

Graphs, made up of nodes (points) and edges (connections), are one of the most powerful data structures in computer science. They help model relationships efficiently, from social networks to transportation systems.

In this guide, we will explore two core traversal techniques: Breadth-First Search (BFS) and Depth-First Search (DFS). Moving on from there, we will cover advanced algorithms like Dijkstra’s, `A*`, Kruskal’s, Prim’s, and Bellman-Ford.

---

## Understanding Graphs in Python

A graph consists of **nodes (vertices)** and **edges (relationships)**.

For examples, in a social network, people are nodes and friendships are edges. Or in a roadmap, cities are nodes and roads are edges.

There are a few different types of graphs:

- **Directed**: edges have direction (one-way streets, task scheduling).
- **Undirected**: edges go both ways (mutual friendships).
- **Weighted**: edges have values (distances, costs).
- **Unweighted**: edges are equal (basic subway routes).

Now that you know what graphs are, let’s look at the different ways they can be represented in Python.

---

## Ways to Represent Graphs in Python

Before diving into traversal and pathfinding, it’s important to know how graphs can be represented. Different problems call for different representations.

### Adjacency Matrix

An adjacency matrix is a 2D array where each cell `(i, j)` shows whether there is an edge from node `i` to node `j`.

- In an **unweighted graph**, `0` means no edge, and `1` means an edge exists.
- In a **weighted graph**, the cell holds the edge weight.

This makes it very quick to check if two nodes are directly connected (constant-time lookup), but it uses more memory for large graphs.

```py
graph = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0]
]
```

Here, the matrix shows a fully connected graph of 3 nodes. For example, `graph[0][1] = 1` means there is an edge from node 0 to node 1. ### Adjacency List

An adjacency list represents each node along with the list of nodes it connects to.

This is usually more efficient for sparse graphs (where not every node is connected to every other node). It saves memory because only actual edges are stored instead of an entire grid.

```py
graph = {
    'A': ['B','C'],
    'B': ['A','C'],
    'C': ['A','B']
}
```

Here, node `A` connects to `B` and `C`, and so on. Checking connections takes a little longer than with a matrix, but for large, sparse graphs, it’s the better option.

### Using NetworkX

When working on real-world applications, writing your own adjacency lists and matrices can get tedious. That’s where **NetworkX** comes in, a Python library that simplifies graph creation and analysis.

With just a few lines of code, you can build graphs, visualize them, and run advanced algorithms without reinventing the wheel.

```py
import networkx as nx
import matplotlib.pyplot as plt

G = nx.Graph()
G.add_edges_from([('A','B'), ('A','C'), ('B','C')])
nx.draw(G, with_labels=True)
plt.show()
```

This builds a triangle-shaped graph with nodes A, B, and C. NetworkX also lets you easily run algorithms like shortest paths or spanning trees without manually coding them.

Now that we’ve seen different ways to represent graphs, let’s move on to traversal methods, starting with Breadth-First Search (BFS).

---

## Breadth-First Search (BFS)

The basic idea behind BFS is to explore a graph one layer at a time. It looks at all the neighbors of a starting node before moving on to the next level. A queue is used to keep track of what comes next.

BFS is particularly useful for:

- Finding the shortest path in unweighted graphs
- Detecting connected components
- Crawling web pages

Here’s an example:

```py
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])

    while queue:
        node = queue.popleft()
        print(node, end=" ")
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)


graph = {
    'A': ['B','C'],
    'B': ['A','D','E'],
    'C': ['A','F'],
    'D': ['B'],
    'E': ['B','F'],
    'F': ['C','E']
}

bfs(graph, 'A')
```

Here’s what’s going on in this code:

- `graph` is a dict where each node maps to a list of neighbors.
- `deque` is used as a FIFO queue so we visit nodes level-by-level.
- `visited` keeps track of nodes we’ve already processed so we don’t loop forever on cycles.
- In the loop, we pop a node, print it, then for each unvisited neighbor, we mark it visited and enqueue it.

And here’s the output:

```py
A B C D E F
```

Now that we have seen how BFS works, let’s turn to its counterpart: Depth-First Search (DFS).

---

## Depth-First Search (DFS)

DFS works differently from BFS. Instead of moving level by level, it follows one path as far as it can go before backtracking. Think of it as diving deep down a trail, then returning to explore the others.

We can implement DFS in two ways:

- **Recursive DFS**, which uses the function call stack
- **Iterative DFS**, which uses an explicit stack

DFS is especially useful for:

- Cycle detection
- Maze solving and puzzles
- Topological sorting

Here’s an example of recursive DFS:

```py
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    if node not in visited:
        print(node, end=" ")
        visited.add(node)
        for neighbor in graph[node]:
            dfs_recursive(graph, neighbor, visited)

graph = {
    'A': ['B','C'],
    'B': ['A','D','E'],
    'C': ['A','F'],
    'D': ['B'],
    'E': ['B','F'],
    'F': ['C','E']
}

dfs_recursive(graph, 'A')
#
# A B D E F C
```

- `visited` is a set that tracks nodes already processed so you don’t loop forever on cycles.
- On each call, if `node` hasn’t been seen, it’s printed, marked visited, then the function recurses into each neighbor.

Explanation: DFS visits B after A, goes deeper into D, then backtracks to explore E and F, and finally visits C.

And here’s an example of iterative DFS:

```py
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node not in visited:
            print(node, end=" ")
            visited.add(node)
            stack.extend(reversed(graph[node]))

dfs_iterative(graph, 'A')
#
# A B D E F C
```

- `visited` tracks nodes you’ve already processed so you don’t loop on cycles.
- `stack` is LIFO (last in, first out) – you `pop()` the top node, process it, then push its neighbors.
- `reversed(graph[node])` pushes neighbors in reverse so they’re visited in the original left-to-right order (mimicking the usual recursive DFS).

With BFS and DFS explained, we can now move on to algorithms that solve more complex problems, starting with Dijkstra’s shortest path algorithm.

---

## Dijkstra’s Algorithm

Dijkstra’s algorithm is built on a simple rule: always visit the node with the smallest known distance first. By repeating this, it uncovers the shortest path from a starting node to all others in a weighted graph that doesn’t have negative edges.

```py
import heapq

def dijkstra(graph, start):
    heap = [(0, start)]
    shortest_path = {node: float('inf') for node in graph}
    shortest_path[start] = 0

    while heap:
        cost, node = heapq.heappop(heap)
        for neighbor, weight in graph[node]:
            new_cost = cost + weight
            if new_cost < shortest_path[neighbor]:
                shortest_path[neighbor] = new_cost
                heapq.heappush(heap, (new_cost, neighbor))
    return shortest_path

graph = {
    'A': [('B',1), ('C',4)],
    'B': [('A',1), ('C',2), ('D',5)],
    'C': [('A',4), ('B',2), ('D',1)],
    'D': [('B',5), ('C',1)]
}

print(dijkstra(graph, 'A'))
#
# {'A': 0, 'B': 1, 'C': 3, 'D': 4}
```

Here’s what’s going on in this code:

- `graph` is an adjacency list: each node maps to a list of `(neighbor, weight)` pairs.
- `shortest_path` stores the current best-known distance to each node ($\infinity$ initially, 0 for `start`).
- `heap` (priority queue) holds frontier nodes as `(cost, node)`, always popping the smallest cost first.
- For each popped `node`, it relaxes its edges: for each `(neighbor, weight)`, compute `new_cost`. If `new_cost` beats `shortest_path[neighbor]`, update it and push the neighbor with that cost.

Moving on, let’s look at an extension of this algorithm: *A Search.\**

---

## `A*` Search

`A*` works like Dijkstra’s but adds a heuristic function that estimates how close a node is to the goal. This makes it more efficient by guiding the search in the right direction.

```py
import heapq

def heuristic(node, goal):
    heuristics = {'A': 4, 'B': 2, 'C': 1, 'D': 0}
    return heuristics.get(node, 0)

def a_star(graph, start, goal):
    g_costs = {node: float('inf') for node in graph}
    g_costs[start] = 0
    came_from = {}

    heap = [(heuristic(start, goal), start)]

    while heap:
        f, node = heapq.heappop(heap)

        if f > g_costs[node] + heuristic(node, goal):
            continue

        if node == goal:
            path = [node]
            while node in came_from:
                node = came_from[node]
                path.append(node)
            return path[::-1], g_costs[path[0]]

        for neighbor, weight in graph[node]:
            new_g = g_costs[node] + weight
            if new_g < g_costs[neighbor]:
                g_costs[neighbor] = new_g
                came_from[neighbor] = node
                heapq.heappush(heap, (new_g + heuristic(neighbor, goal), neighbor))

    return None, float('inf')

graph = {
    'A': [('B',1), ('C',4)],
    'B': [('A',1), ('C',2), ('D',5)],
    'C': [('A',4), ('B',2), ('D',1)],
    'D': []
}

print(a_star(graph, 'A', 'D'))
#
# (['A', 'B', 'C', 'D'], 4)
```

This one’s a little more complex, so here’s what’s going on:

- `graph`: adjacency list – each node maps to `[(neighbor, weight), ...]`.
- `heuristic(node, goal)`: returns an estimate `h(node)` (lower is better). It’s passed `goal` but in this demo uses a fixed dict.
- `g_costs`: best known cost from `start` to each node ($\infinity$ initially, 0 for start).
- `heap`: min-heap of `(priority, node)` where `priority = g + h`.
- `came_from`: backpointers to reconstruct the path once we pop the goal.

Then in the main loop:

- We pop the node with smallest priority.
- If it’s the goal, we backtrack via `came_from` to build the path and return it with `g_costs[goal]`.
- Otherwise, we relax the edges: for each `(neighbor, weight)`, compute `new_cost = g_costs[node] + weight`. If `new_cost` improves `g_costs[neighbor]`, update it, set `came_from[neighbor] = node`, and push `(new_cost + heuristic(neighbor, goal), neighbor)`.

Next up, let’s move from shortest paths to spanning trees. This is where Kruskal’s algorithm comes in.

---

## Kruskal’s Algorithm

Kruskal’s algorithm builds a Minimum Spanning Tree (MST) by sorting all edges from smallest to largest and adding them one at a time, as long as they don’t create a cycle. This makes it a greedy algorithm as it always picks the cheapest option available at each step.

The implementation uses a Disjoint Set (Union-Find) data structure to efficiently check whether adding an edge would create a cycle. Each node starts in its own set, and as edges are added, sets are merged.

```py
class DisjointSet:
    def __init__(self, nodes):
        self.parent = {node: node for node in nodes}
        self.rank = {node: 0 for node in nodes}
    def find(self, node):
        if self.parent[node] != node:
            self.parent[node] = self.find(self.parent[node])
        return self.parent[node]
    def union(self, node1, node2):
        r1, r2 = self.find(node1), self.find(node2)
        if r1 != r2:
            if self.rank[r1] > self.rank[r2]:
                self.parent[r2] = r1
            else:
                self.parent[r1] = r2
                if self.rank[r1] == self.rank[r2]:
                    self.rank[r2] += 1

def kruskal(graph):
    edges = sorted(graph, key=lambda x: x[2])
    mst, ds = [], DisjointSet({u for e in graph for u in e[:2]})
    for u,v,w in edges:
        if ds.find(u) != ds.find(v):
            ds.union(u,v)
            mst.append((u,v,w))
    return mst

graph = [('A','B',1), ('A','C',4), ('B','C',2), ('B','D',5), ('C','D',1)]
print(kruskal(graph))
#
# [('A','B',1), ('C','D',1), ('B','C',2)]
```

Here, the MST includes the smallest edges that connect all nodes without forming cycles. Now that we have seen Kruskal’s, we can move further to analyze another algorithm.

---

## Prim’s Algorithm

Prim’s algorithm also finds an MST, but it grows the tree step by step. It starts with one node and repeatedly **adds the smallest edge** that connects the current tree to a new node. Think of it as expanding a connected “island” until all nodes are included.

This implementation uses a **priority queue (heapq)** to always select the smallest available edge efficiently.

```py
import heapq

def prim(graph, start):
    mst, visited = [], {start}
    edges = [(w, start, n) for n,w in graph[start]]
    heapq.heapify(edges)

    while edges:
        w,u,v = heapq.heappop(edges)
        if v not in visited:
            visited.add(v)
            mst.append((u,v,w))
            for n,w in graph[v]:
                if n not in visited:
                    heapq.heappush(edges, (w,v,n))
    return mst

graph = {
    'A':[('B',1),('C',4)],
    'B':[('A',1),('C',2),('D',5)],
    'C':[('A',4),('B',2),('D',1)],
    'D':[('B',5),('C',1)]
}
print(prim(graph,'A'))
#
# [('A','B',1), ('B','C',2), ('C','D',1)]
```

Notice how the algorithm gradually expands from node `A`, always picking the lowest-weight edge that connects a new node.

Let’s now look at an algorithm that can handle graphs with negative edges: Bellman-Ford.

---

## Bellman-Ford Algorithm

Bellman-Ford is a shortest path algorithm that can handle negative edge weights, unlike Dijkstra’s. It works by **relaxing all edges repeatedly**: if the current path to a node can be improved by going through another node, it updates the distance. After `V-1` iterations (where `V` is the number of vertices), all shortest paths are guaranteed to be found.

This makes it slightly slower than Dijkstra’s but more versatile. It can also detect negative weight cycles by checking for further improvements after the main loop.

```py
def bellman_ford(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    for _ in range(len(graph)-1):
        for u in graph:
            for v,w in graph[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
    return dist

graph = {
    'A':[('B',4),('C',2)],
    'B':[('C',-1),('D',2)],
    'C':[('D',3)],
    'D':[]
}
print(bellman_ford(graph,'A'))
#
# {'A': 0, 'B': 4, 'C': 2, 'D': 5}
```

Here, the shortest path to each node is found, even though there’s a negative edge (`B → C` with weight -1). If there had been a negative cycle, Bellman-Ford would detect it by noticing that distances keep improving after `V-1` iterations.

With the main algorithms explained, let’s move on to some practical tips for making these implementations more efficient in Python.

---

## Optimizing Graph Algorithms in Python

When graphs get bigger, little tweaks in how you write your code can make a big difference. Here are a few simple but powerful tricks to keep things running smoothly.

### 1. Use `deque` for BFS

If you use a regular Python list as a queue, popping items from the front takes longer the bigger the list gets. With `collections.deque`, you get instant ($O\left(1\right)$) pops from both ends. It’s basically built for this kind of job.

```py
from collections import deque

queue = deque([start])  # fast pops and appends
```

### 2. Go Iterative with DFS

Recursive DFS looks neat, but Python doesn’t like going too deep – you’ll hit a recursion limit if your graph is very large. The fix? Write DFS in an iterative style with a stack. Same idea, no recursion errors.

```py
def dfs_iterative(graph, start):
    visited, stack = set(), [start]
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            stack.extend(graph[node])
```

### 3. Let NetworkX Do the Heavy Lifting

For practice and learning, writing your own graph code is great. But if you’re working on a real-world problem – say analyzing a social network or planning routes – the NetworkX library saves tons of time. It comes with optimized versions of almost every common graph algorithm plus nice visualization tools.

```py
import networkx as nx

G = nx.Graph()
G.add_edges_from([('A','B'), ('A','C'), ('B','D'), ('C','D')])

print(nx.shortest_path(G, source='A', target='D'))
#
# ['A', 'B', 'D']
```

Instead of worrying about queues and stacks, you can let NetworkX handle the details and focus on what the results mean.

::: important Key Takeaways

- An adjacency matrix is fast for lookups but is memory-heavy.
- An adjacency list is space-efficient for sparse graphs.
- NetworkX makes graph analysis much easier for real-world projects.
- BFS explores layer by layer, DFS explores deeply before backtracking.
- Dijkstra’s and `A*` handle shortest paths.
- Kruskal’s and Prim’s build spanning trees.
- Bellman-Ford works with negative weights.

:::

---

## Conclusion

Graphs are everywhere, from maps to social networks, and the algorithms you have seen here are the building blocks for working with them. Whether it is finding paths, building spanning trees, or handling tricky weights, these tools open up a wide range of problems you can solve.

Keep experimenting and try out libraries like NetworkX when you are ready to take on bigger projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Graph Algorithms in Python: BFS, DFS, and Beyond",
  "desc": "Have you ever wondered how Google Maps finds the fastest route or how Netflix recommends what to watch? Graph algorithms are behind these decisions. Graphs, made up of nodes (points) and edges (connections), are one of the most powerful data structur...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/graph-algorithms-in-python-bfs-dfs-and-beyond.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
