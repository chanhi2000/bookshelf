---
lang: en-US
title: "Using Queues in Practice"
description: "Article(s) > (3/7) Python Stacks, Queues, and Priority Queues in Practice"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (3/7) Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:description
      content: "Using Queues in Practice"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python/using-queues-in-practice.html
date: 2022-06-29
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Stacks, Queues, and Priority Queues in Practice",
  "desc": "In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding.",
  "link": "/realpython.com/queue-in-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Stacks, Queues, and Priority Queues in Practice"
  desc="In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding."
  url="https://realpython.com/queue-in-python#using-queues-in-practice"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg"/>


---

## Using Queues in Practice

As mentioned in the introduction to this tutorial, queues are the backbone of many important algorithms. One particularly interesting area of application is visiting nodes in a [graph](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)), which might represent a map of roads between cities, for example. Queues can be useful in finding the shortest or the most optimal path between two places.

In this section, you’re going to use the queues that you just built to implement classic [graph traversal](https://en.wikipedia.org/wiki/Graph_traversal) algorithms. There are numerous ways to represent graphs in code and an equal number of Python libraries that already do that well. For the sake of simplicity, you’ll take advantage of the [networkx](https://networkx.org/) and [pygraphviz](https://pygraphviz.github.io/) libraries, as well as the widely used [DOT](https://en.wikipedia.org/wiki/DOT_(graph_description_language)) graph description language.

You can install those libraries into your [virtual environment](https://realpython.com/python-virtual-environments-a-primer/) using `pip`:

```sh
(venv) $ python -m pip install networkx pygraphviz
```

Alternatively, you can install all dependencies needed for the rest of this tutorial in one step by following the instructions in the `README` file that you’ll find in the supplemental materials. Note that installing pygraphviz can be a bit challenging because it requires a C compiler toolchain. Check the official [installation guide](https://pygraphviz.github.io/documentation/stable/install.html) for more details.

### Sample Data: Road Map of the United Kingdom

Once you’ve installed the required libraries, you’ll read a **weighted** and **undirected** graph of the [cities in the United Kingdom](https://en.wikipedia.org/wiki/List_of_cities_in_the_United_Kingdom) from a DOT file, which you can find in the accompanying materials:

**Get Source Code:** [Click here to get access to the source code and sample data](https://realpython.com/bonus/queue-code/) that you’ll use to explore queues in Python.

This graph has 70 nodes representing UK cities and 137 edges weighted by the estimated distance in miles between the connected cities:

[![Cities in the United Kingdom](https://files.realpython.com/media/roadmap.b8238a1b1c8c.png)](https://files.realpython.com/media/roadmap.b8238a1b1c8c.png)

Cities in the United Kingdom

Note that the graph depicted above is a simplified model of the road network in the UK, as it doesn’t account for the road types, their capacity, speed limits, traffic, or bypasses. It also ignores the fact that there’s usually more than one road connecting two cities. So, the shortest path determined by satellite navigation or [Google Maps](https://google.com/maps) will most likely differ from the one that you’ll find with queues in this tutorial.

That said, the graph above represents actual road connections between the cities as opposed to straight lines as the crow flies. Even though the edges might look like straight lines in the visualization, they most certainly aren’t in real life. Graphically, you can represent the same graph in a multitude of ways.

Next up, you’ll use the networkx library to read this graph into Python.

### Object Representation of the Cities and Roads

While networkx can’t read DOT files by itself, the library provides a few helper functions that delegate this task to other third-party libraries. You’ll use pygraphviz to read the sample DOT file in this tutorial:

```py
>>> import networkx as nx
>>> print(nx.nx_agraph.read_dot("roadmap.dot"))
MultiGraph named 'Cities in the United Kingdom' with 70 nodes and 137 edges
```

While pygraphviz might be a bit challenging to install on some operating systems, it’s by far the fastest and most compliant with the DOT format’s advanced features. By default, networkx represents graph nodes using textual identifiers that can optionally have an associated dictionary of attributes:

```py
>>> import networkx as nx
>>> graph = nx.nx_agraph.read_dot("roadmap.dot")
>>> graph.nodes["london"]
{'country': 'England',
 'latitude': '51.507222',
 'longitude': '-0.1275',
 'pos': '80,21!',
 'xlabel': 'City of London',
 'year': 0}
```

For example, the `"london"` string maps to a corresponding dictionary of key-value pairs. The [`pos`](https://graphviz.org/docs/attrs/pos/) attribute, which contains normalized coordinates after applying the [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection) to latitude and longitude, is respected by [Graphviz](https://graphviz.org/) for the placement of nodes in the graph visualization. The `year` attribute indicates when a city got its status. When equal to zero, it means [time immemorial](https://en.wikipedia.org/wiki/Time_immemorial).

Because that isn’t the most convenient way to think about graphs, you’ll define a custom data type representing a city in your road map. Go ahead, create a new file called `graph.py` and implement the following class in it:

```py
# graph.py

from typing import NamedTuple

class City(NamedTuple):
    name: str
    country: str
    year: int | None
    latitude: float
    longitude: float

    @classmethod
    def from_dict(cls, attrs):
        return cls(
            name=attrs["xlabel"],
            country=attrs["country"],
            year=int(attrs["year"]) or None,
            latitude=float(attrs["latitude"]),
            longitude=float(attrs["longitude"]),
        )
```

You extend a [named tuple](https://realpython.com/python-namedtuple/) to ensure that your node objects are [hashable](https://realpython.com/python-hash-table/#hashability-vs-immutability), which is required by networkx. You could use a properly configured [data class](https://realpython.com/python-data-classes/) instead, but a named tuple is hashable out of the box. It’s also comparable, which you might need later to determine the graph traversal order. The `.from_dict()` class method takes a dictionary of attributes extracted from a DOT file and returns a new instance of your `City` class.

To take advantage of your new class, you’re going to need to create a new graph instance and take note of the mapping of node identifiers to city instances. Add the following helper function to your `graph` module:

```py
# graph.py

import networkx as nx

# ...

def load_graph(filename, node_factory):
    graph = nx.nx_agraph.read_dot(filename)
    nodes = {
        name: node_factory(attributes)
        for name, attributes in graph.nodes(data=True)
    }
    return nodes, nx.Graph(
        (nodes[name1], nodes[name2], weights)
        for name1, name2, weights in graph.edges(data=True)
    )
```

The function takes a filename and a **callable factory** for the node objects, such as your `City.from_dict()` class method. It starts by reading a DOT file and building a mapping of node identifiers to the [object-oriented](https://realpython.com/python3-object-oriented-programming/) representation of the graph nodes. Finally, it returns that mapping and a new graph comprising nodes and weighted edges.

You can now start playing with the UK road map again in an interactive Python interpreter session:

```py
>>> from graph import City, load_graph

>>> nodes, graph = load_graph("roadmap.dot", City.from_dict)

>>> nodes["london"]
City(
 name='City of London',
 country='England',
 year=None,
 latitude=51.507222,
 longitude=-0.1275
)

>>> print(graph)
Graph with 70 nodes and 137 edges
```

After importing the helper function and the `City` class from your module, you load the graph from a sample DOT file and store the result in two variables. The `nodes` variable lets you obtain a reference to an instance of the `City` class by the specified name, whereas the `graph` variable holds the entire networkx `Graph` object.

When looking for the shortest path between two cities, you’ll want to identify the immediate **neighbors** of a given city to find the available routes to follow. You can do that in a few ways with a networkx graph. In the simplest case, you’ll call the `.neighbors()` method on a graph with the specified node as an argument:

```py
>>> for neighbor in graph.neighbors(nodes["london"]):
...     print(neighbor.name)
...
Bath
Brighton & Hove
Bristol
Cambridge
Canterbury
Chelmsford
Coventry
Oxford
Peterborough
Portsmouth
Southampton
Southend-on-Sea
St Albans
Westminster
Winchester
```

This only reveals the neighboring nodes without the possible weights of the connecting edges, such as distances or the estimated travel times, which you might need to know about to pick the best path. If you’d like to include the weights, then access a node using the square bracket syntax:

```py
>>> for neighbor, weights in graph[nodes["london"]].items():
...     print(weights["distance"], neighbor.name)
...
115 Bath
53 Brighton & Hove
118 Bristol
61 Cambridge
62 Canterbury
40 Chelmsford
100 Coventry
58 Oxford
85 Peterborough
75 Portsmouth
79 Southampton
42 Southend-on-Sea
25 St Albans
1 Westminster
68 Winchester
```

The neighbors are always listed in the same order in which you defined them in the DOT file. To sort them by one or more weights, you can use the following code snippet:

```py
>>> def sort_by(neighbors, strategy):
...     return sorted(neighbors.items(), key=lambda item: strategy(item[1]))
...
>>> def by_distance(weights):
...     return float(weights["distance"])
...
>>> for neighbor, weights in sort_by(graph[nodes["london"]], by_distance):
...     print(f"{weights['distance']:>3} miles, {neighbor.name}")
...
 1 miles, Westminster
 25 miles, St Albans
 40 miles, Chelmsford
 42 miles, Southend-on-Sea
 53 miles, Brighton & Hove
 58 miles, Oxford
 61 miles, Cambridge
 62 miles, Canterbury
 68 miles, Winchester
 75 miles, Portsmouth
 79 miles, Southampton
 85 miles, Peterborough
100 miles, Coventry
115 miles, Bath
118 miles, Bristol
```

First, you define a helper function that returns a list of neighbors and their weights sorted by the specified strategy. The strategy takes a dictionary of all the weights associated with an edge and returns a sorting key. Next, you define a concrete strategy that produces a floating-point distance based on the input dictionary. Finally, you iterate over the neighbors of London, sorted by distance in ascending order.

With this elementary knowledge of the networkx library, you can now move on to implementing graph traversal algorithms based on the custom queue data types that you built earlier.

### Breadth-First Search Using a FIFO Queue

In the breadth-first search algorithm, you look for a node that satisfies a particular condition by exploring the graph in concentric layers or levels. You start traversing the graph at an arbitrarily chosen **source node** unless the graph is a tree data structure, in which case you typically start at the **root node** of that tree. At each step, you visit all immediate neighbors of the current node before going deeper.

**Note:** To avoid getting stuck in a loop when the graph contains cycles, keep track of the neighbors that you’ve visited and skip them the next time you encounter them. For example, you can add the visited nodes to a Python set and later use the `in` operator to check if the set contains a given node.

For example, say you wanted to find any place in the United Kingdom that has been granted city status in the twentieth century, starting your search in Edinburgh. The networkx library already has many algorithms implemented, including the breadth-first search, which can help cross-check your future implementation. Call the `nx.bfs_tree()` function on your graph to reveal the breadth-first order of traversal:

```py
>>> import networkx as nx
>>> from graph import City, load_graph

>>> def is_twentieth_century(year):
...     return year and 1901 <= year <= 2000
...
>>> nodes, graph = load_graph("roadmap.dot", City.from_dict)
>>> for node in nx.bfs_tree(graph, nodes["edinburgh"]):
...     print("📍", node.name)
...     if is_twentieth_century(node.year):
...         print("Found:", node.name, node.year)
...         break
... else:
...     print("Not found")
...
📍 Edinburgh
📍 Dundee 📍 Glasgow 📍 Perth 📍 Stirling 📍 Carlisle 📍 Newcastle upon Tyne 📍 Aberdeen
📍 Inverness
📍 Lancaster
Found: Lancaster 1937
```

The highlighted lines indicate all six immediate neighbors of Edinburgh, which is your source node. Notice that they’re visited in sequence without interruption before moving to the next layer of the graph. The subsequent layer consists of the second-level neighbors starting from the source node.

You explore the unvisited neighbors of the highlighted cities. The first one is Dundee, whose neighbors include Aberdeen and Perth, but you’ve already visited Perth, so you skip it and only visit Aberdeen. Glasgow doesn’t have any unvisited neighbors, while Perth has only Inverness. Similarly, you visited Stirling’s neighbors but not Carlisle’s, which connects with Lancaster. You stop the search because Lancaster is your answer.

The result of your search may sometimes vary depending on your choice of the starting point, as well as the order of neighbors if there’s more than one node satisfying a condition. To ensure consistent results, you can sort the neighbors according to some criteria. For example, you could visit cities with a higher latitude first:

```py
>>> def order(neighbors):
...     def by_latitude(city):
...         return city.latitude
...     return iter(sorted(neighbors, key=by_latitude, reverse=True))

>>> for node in nx.bfs_tree(graph, nodes["edinburgh"], sort_neighbors=order):
...     print("📍", node.name)
...     if is_twentieth_century(node.year):
...         print("Found:", node.name, node.year)
...         break
... else:
...     print("Not found")
...
📍 Edinburgh
📍 Dundee 📍 Perth 📍 Stirling 📍 Glasgow 📍 Newcastle upon Tyne 📍 Carlisle 📍 Aberdeen
📍 Inverness
📍 Sunderland
Found: Sunderland 1992
```

Now, the answer is different because Newcastle is visited before Carlisle due to having a slightly higher latitude. In turn, this makes the breadth-first search algorithm find Sunderland before Lancaster, which is an alternative node matching your condition.

**Note:** In case you were wondering why `order()` wraps a list of sorted neighbors in a call to `iter()`, it’s because [`nx.bfs_tree()`](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.traversal.breadth_first_search.bfs_tree.html) expects an iterator object as input for its `sort_neighbors` argument.

Now that you’ve gotten the general idea of the breadth-first search algorithm, it’s time to implement it yourself. Because the breadth-first traversal is the basis for other interesting algorithms, you’ll extract its logic into a separate function that you can delegate to:

```py
# graph.py

from queues import Queue

# ...

def breadth_first_traverse(graph, source):
    queue = Queue(source)
    visited = {source}
    while queue:
        yield (node := queue.dequeue())
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)

def breadth_first_search(graph, source, predicate):
    for node in breadth_first_traverse(graph, source):
        if predicate(node):
            return node
```

The first function takes a networkx graph and the source node as arguments while yielding nodes visited with the breadth-first traversal. Note that it uses your **FIFO queue** from the `queues` module to keep track of the node neighbors, ensuring that you’ll explore them in sequence on each layer. The function also marks visited nodes by adding them to a [Python set](https://realpython.com/python-sets/), so that each neighbor is visited at most once.

**Note:** Instead of using a `while` loop along with the [walrus operator (`:=`)](https://realpython.com/python-walrus-operator/) to yield a dequeued node in one expression, you could take advantage of the fact that your custom queue is iterable by dequeuing elements using a `for` loop:

```py
def breadth_first_traverse(graph, source):
    queue = Queue(source)
    visited = {source}
    for node in queue:
        yield node
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
```

However, this relies on a non-obvious implementation detail in your `Queue` class, so you’ll stick with the more conventional `while` loop throughout the rest of this tutorial.

The second function builds on top of the first one by looping over the yielded nodes, and stops once the current node meets the expected criteria. If none of the nodes make the predicate truthy, then the function implicitly returns [`None`](https://realpython.com/null-in-python/).

To test your breadth-first search and traversal implementations in action, you can replace the convenience function built into networkx with your own:

```py
>>> from graph import (
...     City,
...     load_graph,
...     breadth_first_traverse,
...     breadth_first_search as bfs,
... )

>>> def is_twentieth_century(city):
...     return city.year and 1901 <= city.year <= 2000

>>> nodes, graph = load_graph("roadmap.dot", City.from_dict)
>>> city = bfs(graph, nodes["edinburgh"], is_twentieth_century)
>>> city.name
'Lancaster'

>>> for city in breadth_first_traverse(graph, nodes["edinburgh"]):
...     print(city.name)
...
Edinburgh
Dundee
Glasgow
Perth
Stirling
Carlisle
Newcastle upon Tyne
Aberdeen
Inverness
Lancaster
⋮
```

As you can see, the traversal order is identical to your first attempt with networkx, confirming that your algorithm works correctly for this data set. However, your functions don’t allow sorting the neighbors in a particular order. Try modifying the code so that it accepts an optional sorting strategy. You can click the collapsible section below to see one possible solution:

Solution: Sorting the NeighborsShow/Hide

```py
# graph.py

# ...

def breadth_first_traverse(graph, source, order_by=None):
    queue = Queue(source)
    visited = {source}
    while queue:
        yield (node := queue.dequeue())
 neighbors = list(graph.neighbors(node)) if order_by: neighbors.sort(key=order_by) for neighbor in neighbors:            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)

def breadth_first_search(graph, source, predicate, order_by=None):
 for node in breadth_first_traverse(graph, source, order_by):        if predicate(node):
            return node
```

The breadth-first search algorithm ensures that you’ll eventually explore all connected nodes in a graph while searching for one that satisfies the desired condition. You could use it to solve a maze, for example. The breadth-first traversal is also the foundation for finding the **shortest path** between two nodes in an undirected and unweighted graph. In the next section, you’ll adapt your code to do just that.

### Shortest Path Using Breadth-First Traversal

In many cases, the fewer the nodes on the path from source to destination, the shorter the distance. You could take advantage of this observation to estimate the shortest distance if the connections between your cities didn’t have a weight. That would be equivalent to having equal weight on every edge.

Traversing the graph using the breadth-first approach will produce a path guaranteed to have the *fewest* nodes. Sometimes there might be more than one shortest path between two nodes. For example, there are two such shortest paths between Aberdeen and Perth when you disregard the road distances. As before, the actual result in such a case will depend on how you order the neighboring nodes.

You can use networkx to reveal all the shortest paths between two cities, which will have the same minimal length:

```py
>>> import networkx as nx
>>> from graph import City, load_graph

>>> nodes, graph = load_graph("roadmap.dot", City.from_dict)

>>> city1 = nodes["aberdeen"]
>>> city2 = nodes["perth"]

>>> for i, path in enumerate(nx.all_shortest_paths(graph, city1, city2), 1):
...     print(f"{i}.", " → ".join(city.name for city in path))
...
1. Aberdeen → Dundee → Perth
2. Aberdeen → Inverness → Perth
```

After loading the graph, you [enumerate](https://realpython.com/python-enumerate/) the shortest paths between two cities and print them onto the screen. You can see there are only two shortest paths between Aberdeen and Perth. In contrast, London and Edinburgh have four distinct shortest paths with nine nodes each, but many longer paths exist between them.

How does breadth-first traversal help you find the shortest path exactly?

Whenever you visit a node, you must keep track of the previous node that led you to it by saving this information as a key-value pair in a dictionary. Later, you’ll be able to trace back your way from the destination to the source by following the previous nodes. Go back to your code editor and create another function by copying and adapting the code from your earlier `breadth_first_traverse()` function:

```py
# graph.py

# ...

def shortest_path(graph, source, destination, order_by=None):
    queue = Queue(source)
    visited = {source}
 previous = {}    while queue:
 node = queue.dequeue()        neighbors = list(graph.neighbors(node))
        if order_by:
            neighbors.sort(key=order_by)
        for neighbor in neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
 previous[neighbor] = node if neighbor == destination: return retrace(previous, source, destination)
```

This new function takes another node as an argument and optionally lets you order the neighbors using a custom strategy. It also defines an empty dictionary, which you populate when visiting a neighbor by associating it with the previous node on your path. All key-value pairs in this dictionary are immediate neighbors without any nodes between them.

If a path exists between your source and destination, then the function returns a list of nodes built with another helper function instead of yielding the individual nodes like `breadth_first_traverse()`.

**Note:** You could try refactoring this code by combining `shortest_path()` and `breadth_first_traverse()` into one function if you wanted to. However, experienced programmers generally agree that having a bit of repetition can sometimes be okay as long as it keeps your code easier to understand and focused on one responsibility.

To recreate the shortest path between your source and destination, you can iteratively look up the dictionary built earlier when you traversed the graph with the breadth-first approach:

```py
# graph.py

from collections import deque

# ...

def retrace(previous, source, destination):
    path = deque()

    current = destination
    while current != source:
        path.appendleft(current)
        current = previous.get(current)
        if current is None:
            return None

    path.appendleft(source)
    return list(path)
```

Because you start from the destination and work your way back, using the Python `deque` collection with a fast append operation on the left can be helpful. At each iteration, you add the current node to the path and move to the previous node. You repeat these steps until you reach the source node or there’s no previous node.

When you call the queue-based implementation of the shortest path, you get the same results as with networkx:

```py
>>> from graph import shortest_path

>>> " → ".join(city.name for city in shortest_path(graph, city1, city2))
'Aberdeen → Dundee → Perth'

>>> def by_latitude(city):
...     return -city.latitude
...
>>> " → ".join(
...     city.name
...     for city in shortest_path(graph, city1, city2, by_latitude)
... )
'Aberdeen → Inverness → Perth'
```

The first path follows the natural order of neighbors from the DOT file, whereas the second one prefers neighbors with a higher latitude, which you specify through a custom sort strategy. To enforce a descending order, you add the minus sign (`-`) in front of the `.latitude` attribute.

Note that a path may not exist at all for some nodes. For example, Belfast and Glasgow don’t have a land connection, because they’re located on two separate islands. You need to take a ferry to get from one city to the other. The breadth-first traversal can tell you whether two nodes remain **connected** or not. Here’s how to implement such a check:

```py
# graph.py

# ...

def connected(graph, source, destination):
    return shortest_path(graph, source, destination) is not None
```

After starting at the source node and traversing the entire subgraph of connected nodes, such as Northern Ireland, the dictionary of previous nodes won’t include your destination node. Therefore, retracing will stop immediately and return `None`, letting you know there’s no path between source and destination.

You can verify this in an interactive Python interpreter session:

```py
>>> from graph import connected
>>> connected(graph, nodes["belfast"], nodes["glasgow"])
False
>>> connected(graph, nodes["belfast"], nodes["derry"])
True
```

Awesome! With your custom FIFO queue, you can traverse the graph, find the shortest path between two nodes, and even determine whether they’re connected. By adding a small tweak to your code, you’ll be able to change the traversal from breadth-first to depth-first order, which you’ll do now.

### Depth-First Search Using a LIFO Queue

As the name implies, the depth-first traversal follows a path from the source node by plunging into the graph as deeply as possible before **backtracking** to the last edge crossing and trying another branch. Notice the difference in the traversal order when you modify an earlier example by replacing `nx.bfs_tree()` with `nx.dfs_tree()`:

```py
>>> import networkx as nx
>>> from graph import City, load_graph

>>> def is_twentieth_century(year):
...     return year and 1901 <= year <= 2000
...
>>> nodes, graph = load_graph("roadmap.dot", City.from_dict)
>>> for node in nx.dfs_tree(graph, nodes["edinburgh"]): ...     print("📍", node.name)
...     if is_twentieth_century(node.year):
...         print("Found:", node.name, node.year)
...         break
... else:
...     print("Not found")
...
📍 Edinburgh
📍 Dundee 📍 Aberdeen
📍 Inverness
📍 Perth 📍 Stirling 📍 Glasgow 📍 Carlisle 📍 Lancaster
Found: Lancaster 1937
```

Now, the highlighted neighbors of the source node are no longer explored in sequence. After reaching Dundee, the algorithm continues down the same path instead of visiting the next neighbor of Edinburgh on the first graph layer.

To facilitate backtracking, you can essentially replace the FIFO queue with a **LIFO queue** in your breadth-first traversal function, and you’ll arrive very close to a depth-first traversal. However, it’ll only behave correctly when traversing tree data structures. There’s a subtle difference in graphs with cycles, which requires an additional change in your code. Otherwise, you’ll implement a [stack-based graph traversal](https://11011110.github.io/blog/2013/12/17/stack-based-graph-traversal.html), which works quite differently.

**Note:** In [binary tree](https://en.wikipedia.org/wiki/Binary_tree) traversal, the depth-first search algorithm defines a few well-known [orderings](https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search) for the child nodes to visit—for example, pre-order, in-order, and post-order.

In the classic depth-first traversal, in addition to replacing the queue with a stack, you initially won’t mark the source node as visited:

```py
# graph.py

from queues import Queue, Stack

# ...

def depth_first_traverse(graph, source, order_by=None):
    stack = Stack(source)
    visited = set()
    while stack:
        if (node := stack.dequeue()) not in visited:
            yield node
            visited.add(node)
            neighbors = list(graph.neighbors(node))
            if order_by:
                neighbors.sort(key=order_by)
            for neighbor in reversed(neighbors):
                stack.enqueue(neighbor)
```

Notice that your visited nodes are initialized to an empty set before you start popping elements from the stack. You also check if the node was already visited much earlier than you would in the breadth-first traversal. When iterating the neighbors, you reverse their order to account for the LIFO queue’s reversal. Finally, you don’t mark the neighbors as visited immediately after pushing them onto the stack.

Because the depth-first traversal relies on the stack data structure, you can take advantage of the built-in **call stack** to save the current search path for later backtracking and rewrite your function [recursively](https://realpython.com/python-thinking-recursively/):

```py
# graph.py

# ...

def recursive_depth_first_traverse(graph, source, order_by=None):
    visited = set()

    def visit(node):
        yield node
        visited.add(node)
        neighbors = list(graph.neighbors(node))
        if order_by:
            neighbors.sort(key=order_by)
        for neighbor in neighbors:
            if neighbor not in visited:
                yield from visit(neighbor)

    return visit(source)
```

By doing so, you avoid maintaining a stack of your own, as Python pushes each function call on a stack behind the scenes for you. It pops one when the corresponding function returns. You only need to keep track of the visited nodes. Another advantage of the recursive implementation is the fact that you don’t have to reverse the neighbors when iterating over them, and you don’t push already visited neighbors onto the stack.

With the traversal function in place, you can now implement the depth-first search algorithm. Because both breadth-first and depth-first search algorithms look almost identical and only differ in the traversal order, you can refactor your code by delegating the common parts of both algorithms to a template function:

```py
# graph.py

# ...

def breadth_first_search(graph, source, predicate, order_by=None):
    return search(breadth_first_traverse, graph, source, predicate, order_by)

# ...

def depth_first_search(graph, source, predicate, order_by=None):
    return search(depth_first_traverse, graph, source, predicate, order_by)

def search(traverse, graph, source, predicate, order_by=None):
    for node in traverse(graph, source, order_by):
        if predicate(node):
            return node
```

Now, your `breadth_first_search()` and `depth_first_search()` functions call `search()` with the corresponding traversal strategy. Go ahead and test them in an interactive Python interpreter session:

```py
>>> from graph import (
...     City,
...     load_graph,
...     depth_first_traverse,
...     depth_first_search as dfs,
... )

>>> def is_twentieth_century(city):
...     return city.year and 1901 <= city.year <= 2000
...
>>> nodes, graph = load_graph("roadmap.dot", City.from_dict)
>>> city = dfs(graph, nodes["edinburgh"], is_twentieth_century)
>>> city.name
'Lancaster'

>>> for city in depth_first_traverse(graph, nodes["edinburgh"]):
...     print(city.name)
...
Edinburgh
Dundee
Aberdeen
Inverness
Perth
Stirling
Glasgow
Carlisle
Lancaster
⋮
```

Even though the search result happens to be the same as with your breadth-first search algorithm, you can clearly see that the order of traversal is now different and follows a linear path.

You’ve seen how choosing between a FIFO and a LIFO queue can affect the underlying graph traversal algorithm. So far, you’ve only considered the number of intermediate nodes when looking for the shortest path between two cities. In the next section, you’ll take it one step further by leveraging a priority queue to find the most optimal route, which may sometimes contain more nodes.

### Dijkstra’s Algorithm Using a Priority Queue

According to the graph in the sample DOT file, the paths with the **fewest nodes** between London and Edinburgh have exactly nine stops and a total distance ranging from 451 to 574 miles. There are four such paths:

| 451 miles | 460 miles | 465 miles | 574 miles |
| --- | --- | --- | --- |
| City of London | City of London | City of London | City of London |
| Coventry | Peterborough | Peterborough | Bristol |
| Birmingham | Lincoln | Nottingham | Newport |
| Stoke-on-Trent | Sheffield | Sheffield | St Asaph |
| Liverpool | Wakefield | Wakefield | Liverpool |
| Preston | York | York | Preston |
| Lancaster | Durham | Durham | Lancaster |
| Carlisle | Newcastle upon Tyne | Newcastle upon Tyne | Carlisle |
| Edinburgh | Edinburgh | Edinburgh | Edinburgh |

There’s a significant overlap between these paths, as they quickly merge at a few intersections before your destination. To some degree, they also overlap with the only path with the **shortest distance** between London and Edinburgh, equal to 436 miles, despite having two more stops:

1. City of London
2. St Albans
3. Coventry
4. Birmingham
5. Stoke-on-Trent
6. Manchester
7. Salford
8. Preston
9. Lancaster
10. Carlisle
11. Edinburgh

Sometimes, it’s worthwhile to take a detour on your route to save time, fuel, or miles, even if it means going through more places along the way.

When you throw edge weights into the mix, then interesting possibilities open up in front of you. For example, you can implement rudimentary artificial intelligence in a video game by assigning negative weights to edges that lead to a virtual enemy and positive weights that point you toward some reward. You may also represent moves in a game like the [Rubik’s Cube](https://rubiks.com/) as a [decision tree](https://en.wikipedia.org/wiki/Game_tree) to find the most optimal solution.

Perhaps the most common use for traversing a weighted graph is when [planning a route](https://en.wikipedia.org/wiki/Journey_planner). A recipe to find the shortest path in a weighted graph, or a [multigraph](https://en.wikipedia.org/wiki/Multigraph) with many parallel connections, is [Dijkstra’s algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm), which builds on top of the breadth-first search algorithm. However, Dijkstra’s algorithm uses a special **priority queue** instead of the regular FIFO queue.

Explaining [Dijkstra’s shortest path algorithm](https://youtube.com/watch?v=pVfj6mxhdMw) is beyond the scope of this tutorial. However, in a nutshell, you can break it down into the following two steps:

1. Build the [shortest-path three](https://en.wikipedia.org/wiki/Shortest-path_tree) from a fixed source node to every other node in the graph.
2. Trace back the path from the destination to the source node in the same way as you did before with the plain shortest-path algorithm.

The first part is about sweeping the weighted edges of every unvisited node in a [greedy](https://en.wikipedia.org/wiki/Greedy_algorithm) manner by checking whether they provide a cheaper connection from the source to one of the current neighbors. The total cost of a path from the source to the neighbor is the sum of the edge’s weight and the cumulative cost from the source to the currently visited node. Sometimes, a path consisting of more nodes will have a smaller total cost.

Here’s a sample result of the first step of Dijkstra’s algorithm for the paths originating in Belfast:

| City | Previous | Total Cost |
| --- | --- | --- |
| Armagh | Lisburn | 41 |
| Belfast | - | 0 |
| Derry | Belfast | 71 |
| Lisburn | Belfast | 9 |
| Newry | Lisburn | 40 |

The first column in the table above indicates a destination city on the shortest path from the source. The second column shows the previous city on the shortest path from the source through which you’ll arrive at your destination. The last column contains information about the total distance to a city from the source.

Belfast is the source city, so it has no previous node leading to it and a distance of zero. The source neighbors Derry and Lisburn, which you can reach from Belfast directly at the cost of their corresponding edges. To get to Armagh or Newry, going through Lisburn will give you the shortest total distance from Belfast.

Now, if you want to find the shortest path between Belfast and Armagh, then start at your destination and follow the previous column. To reach Armagh, you must go through Lisburn, and to get to Lisburn, you must start in Belfast. That’s your shortest path in reverse order.

You’ll only need to implement the first part of Dijkstra’s algorithm because you already have the second part, which is responsible for retracing the shortest path based on the previous nodes. However, to enqueue the unvisited nodes, you’ll have to use a **mutable version of a min-heap** so that you can update the element priorities as you discover cheaper connections. Expand the collapsible section below for the implementation of this new queue:

Complete Code For the Mutable Min-HeapShow/Hide

Internally, this specialized priority queue stores data class elements instead of tuples because the elements must be mutable. Notice the additional `order` flag, which makes the elements comparable, just like tuples:

```py
# queues.py

from collections import deque
from dataclasses import dataclass
from heapq import heapify, heappop, heappush
from itertools import count
from typing import Any

# ...

@dataclass(order=True)
class Element:
    priority: float
    count: int
    value: Any

class MutableMinHeap(IterableMixin):
    def __init__(self):
        super().__init__()
        self._elements_by_value = {}
        self._elements = []
        self._counter = count()

    def __setitem__(self, unique_value, priority):
        if unique_value in self._elements_by_value:
            self._elements_by_value[unique_value].priority = priority
            heapify(self._elements)
        else:
            element = Element(priority, next(self._counter), unique_value)
            self._elements_by_value[unique_value] = element
            heappush(self._elements, element)

    def __getitem__(self, unique_value):
        return self._elements_by_value[unique_value].priority

    def dequeue(self):
        return heappop(self._elements).value
```

This mutable min-heap behaves mostly the same as the regular priority queue that you coded before, but it also lets you peek or modify the priority of an element using the square bracket syntax.

Once you have all elements in place, you can finally connect them together:

```py
# graph.py

from math import inf as infinity
from queues import MutableMinHeap, Queue, Stack

# ...

def dijkstra_shortest_path(graph, source, destination, weight_factory):
    previous = {}
    visited = set()

    unvisited = MutableMinHeap()
    for node in graph.nodes:
        unvisited[node] = infinity
    unvisited[source] = 0

    while unvisited:
        visited.add(node := unvisited.dequeue())
        for neighbor, weights in graph[node].items():
            if neighbor not in visited:
                weight = weight_factory(weights)
                new_distance = unvisited[node] + weight
                if new_distance < unvisited[neighbor]:
                    unvisited[neighbor] = new_distance
                    previous[neighbor] = node

    return retrace(previous, source, destination)
```

Initially, the distance to all destination cities is unknown, so you assign an [infinite](https://docs.python.org/3/library/math.html#math.inf) cost to each unvisited city except for the source, which has a distance equal to zero. Later, when you find a cheaper path to a neighbor, you update its total distance from the source in the priority queue, which rebalances itself so that an unvisited node with the shortest distance will pop up first next time.

You can test-drive your Dijkstra’s algorithm interactively and compare it against the networkx implementation:

```py
>>> import networkx as nx
>>> from graph import City, load_graph, dijkstra_shortest_path

>>> nodes, graph = load_graph("roadmap.dot", City.from_dict)

>>> city1 = nodes["london"]
>>> city2 = nodes["edinburgh"]

>>> def distance(weights):
...     return float(weights["distance"])
...
>>> for city in dijkstra_shortest_path(graph, city1, city2, distance):
...     print(city.name)
...
City of London
St Albans
Coventry
Birmingham
Stoke-on-Trent
Manchester
Salford
Preston
Lancaster
Carlisle
Edinburgh

>>> def weight(node1, node2, weights):
...     return distance(weights)
...
>>> for city in nx.dijkstra_path(graph, city1, city2, weight):
...     print(city.name)
...
City of London
St Albans
Coventry
Birmingham
Stoke-on-Trent
Manchester
Salford
Preston
Lancaster
Carlisle
Edinburgh
```

Success! Both functions yield exactly the same shortest path between London and Edinburgh.

That concludes the theoretical part of this tutorial, which was quite intense. At this point, you have a pretty solid understanding of the different kinds of queues, you can implement them from scratch efficiently, and you know which one to choose in a given algorithm. In practice, however, you’re more likely to rely on the high-level abstractions provided by Python.
