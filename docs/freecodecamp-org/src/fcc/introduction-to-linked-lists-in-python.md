---
lang: en-US
title: "Linked Lists in Python - Explained with Examples"
description: "Article(s) > Linked Lists in Python - Explained with Examples"
icon: fa-brands fa-python
category:
  - Python
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Linked Lists in Python - Explained with Examples"
    - property: og:description
      content: "Linked Lists in Python - Explained with Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/introduction-to-linked-lists-in-python.html
prev: /programming/py/articles/README.md
date: 2022-09-23
isOriginal: false
author: Fakorede Damilola
cover: https://freecodecamp.org/news/content/images/2022/09/chain-3481377_1280.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Linked Lists in Python - Explained with Examples"
  desc="By Fakorede Damilola Different programming languages offer different ways to store and access data. Some of the data structures you can use are collections such as arrays, lists, maps, sets, and so on.  These all do an awesome job storing and accessi..."
  url="https://freecodecamp.org/news/introduction-to-linked-lists-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/09/chain-3481377_1280.jpg"/>

Different programming languages offer different ways to store and access data.

Some of the data structures you can use are collections such as arrays, lists, maps, sets, and so on.

These all do an awesome job storing and accessing data, but sometimes you might need something different. Another data structure commonly used is called a Linked List.

---

## What is a Linked List?

Linked Lists are a data structure that store data in the form of a chain. The structure of a linked list is such that each piece of data has a connection to the next one (and sometimes the previous data as well). Each element in a linked list is called a node.

You can think of it as an actual chain, where each ring or node is connected.  

![Something like this](https://freecodecamp.org/news/content/images/2022/09/A-chain.png)

Like every other data structure, linked lists have their pros and cons:

### Advantages of Linked Lists:

1. Because of the chain-like system of linked lists, you can add and remove elements quickly. This also doesn't require reorganizing the data structure unlike arrays or lists. Linear data structures are often easier to implement using linked lists.
2. Linked lists also don't require a fixed size or initial size due to their chainlike structure.

### Disadvantages of a Linked Lists:

1. More memory is required when compared to an array. This is because you need a pointer (which takes up its own memory) to point you to the next element.
2. Search operations on a linked list are very slow. Unlike an array, you don't have the option of random access.

---

## When Should You Use a Linked List?

You should use a linked list over an array when:

1. You don't know how many items will be in the list (that is one of the advantages - ease of adding items).
2. You don't need random access to any elements (unlike an array, you cannot access an element at a particular index in a linked list).
3. You want to be able to insert items in the middle of the list.
4. You need constant time insertion/deletion from the list (unlike an array, you don't have to shift every other item in the list first).

These are a few things you should consider before trying to implement a linked list.

Now with all the theory out of the way, it's time to implement one. We'll do this using Python, but most of what we learn here applies to any language you are using. The most important thing is to understand how it works.

---

## How to Use Linked Lists in Python

Here's a trick when creating a Linked List. It's something that helped me understand it much better.

You just have to realize that every item that you will be adding to the list is just a node (similar to a ring in a chain). What differentiates the **head** (which is the first node in the list) is that you gave it the title **head**, and then you started adding other nodes to it.

Remember that a Linked List is similar to how a chain is coupled together. Joe is here with some rings, and he is going to help us.

![](https://freecodecamp.org/news/content/images/2022/09/Joe-and-the-chain.png)

I will be using this to illustrate as we go...so you can think along these lines (this is not an art class - I repeat, this is not an art class).

So let's create the nodes first:

```py
class Node:    
    def __init__(self,value):        
        self.value = value        
        self.next = None
```

That is it. We add the `value` because for anything to be added to the linked list, it should at least have some value (for example, except in rare situations, you don't add an empty string to an array, right?).

The `next` means that it is possible we want to chain other nodes - I mean, that is the major aim of a linked list.

Next we are going to define some basic functions:

```py
class LinkedList:
    def __init__(self,head=None):
        self.head = head    
        def append(self, new_node):
            current = self.head
            if current:
                while current.next:
                    current = current.next
                current.next = new_node
            else:
                self.head = new_node
```

The `append()` method lets you add a new node to the list. Let's explore how it works.

![](https://freecodecamp.org/news/content/images/2022/09/append.png)

If I have two values - say 1 and 2 - and I want to add them to the list, the first thing is to define them as individual nodes (that is, as rings of a chain). I can do that like this:

```py
e1 = Node(1)
e2 = Node(2)
```

I can now define a linked list since I have my nodes ready. A linked list (like the chains we see - always has a head, right?), so I can define my linked list with a head value which basically is just another node (ring):

```py
ll = LinkedList(e1)
```

Now from the code above, `e1` is the head of the linked list, which is just a fancy way of saying the starting point of my linked list. I can add more items to it, and since each chain has to be connected (that is, inside each other), I have to first set up the base case to check if the list has a head.

What makes a linked list is the fact that it has a starting point. If it doesn't, we simply need to set the new element to the head. But if it already has a head, I have to go through the whole list and keep checking to see if any of the nodes has a `next` that is empty (that is, `None`).

Again, a linked list is like a chain, right? So every node should point to another with the `next` pointer. Once a node has a next that is `none`, it simply means that it is the end of the list. So I can easily add the new node in that position.

Let's create a method to **delete** a node. But before we do, let's think about it for a second. Imagine you have a chain, and you find out a ring is weak. What do you do?

You first find the weak ring, then you remove it and connect the one before it and after it together. But if the weak ring is the first one, that is easy - you just remove it and you don't really have to join anything. The second ring automatically becomes the head of the chain. Try to visualize that.

We want to do the same thing here. So we first find the weak ring - in this case that will be the value we are looking for - and then we will take the one before and the one after and join them together:

```py
class LinkedList:    
    def __init(...)    
    def append(...)    
      def delete(self, value):
        """Delete the first node with a given value."""
        current = self.head
        if current.value == value:
            self.head = current.next
        else:
            while current:
                if current.value == value:
                    break
                prev = current
                current = current.next
            if current == None:
                return
            prev.next = current.next
            current = None
```

So what we are doing here is simply going through each node to see if that is the value we want to remove. But as we move through the list, we have to keep track of the value before (we still have to join the list back together). We do this with `prev = current` as you can see above or below.

![](https://freecodecamp.org/news/content/images/2022/09/delete-1.png)

So when the node has been found, the `prev` which contains the node before it, can be easily switched (that is, the next value) to point to another node - in this case the other nodes connected to the node we want to remove. I hope this makes sense.

Let's work on **inserting a node** into a particular position. We will use our chain analogy to understand this better.

When you hold a chain, and you actually want to increase the length of the chain, you have three options. You can:

1. Add a link (element) to the beginning of the chain (this should be pretty simple, right?)
2. Add it to the end of the chain (kind of similar to 1)
3. Or you can add it at any point in the middle (a little trickier)

![](https://freecodecamp.org/news/content/images/2022/09/insert3.png)

One thing you should have in mind is that wherever you decide to add it, you have to join the other nodes back to it. That's only possible if you keep track of the other nodes with a loop.

Let's see that in action:

```py
    class LinkedList:   
    def __init(...)    
    def append(...) 
    def delete(...)
    def insert(self, new_element, position):
        """Insert a new node at the given position.
        Assume the first position is "1".
        Inserting at position 3 means between
        the 2nd and 3rd elements."""
        count=1
        current = self.head
        if position == 1:
            new_element.next = self.head
            self.head = new_element
        while current:
            if count+1 == position:
                new_element.next =current.next
                current.next = new_element
                return
            else:
                count+=1
                current = current.next
            # break

        pass
```

We are given a position to insert the node in the code above. If the position is one, it means it is going to be the root. Since we are not so sure, we can initialize a loop and a counter to keep track of the loop.

If the position we are to insert is one (that is, the root), simply store the current root in a dummy variable, create a new root, and then add the previous root (that is, the whole chain) to this new root.

If the position is not one, keep going through the chain until you find the position.

Finally for this article, let's work on displaying the values of our linked list in any format you want - for example, printing it out or adding it to a list collection. I will just be printing the values out.

This is pretty straightforward, similar to a physical chain: you just look through everywhere there is a node and get the value, then move to the next node:

![](https://freecodecamp.org/news/content/images/2022/09/print.png)

```py
class LinkedList:   
    def __init(...)    
    def append(...) 
    def insert(...)
    def delete(...)    
    def print(self):
        current = self.head
        while current:
            print(current.value)
            current = current.next
```

So that is all on linked lists for now! We will work on solving a few questions on linked lists later on.

---

## Wrapping Up

In this article, I've explained:

- How a linked list works
- The pros and cons of a linked list
- How to implement a linked list with Python

You can find the code for [this article here (<VPIcon icon="iconfont icon-github"/>`fakoredeDamilola/articles`)](https://github.com/fakoredeDamilola/articles/blob/master/code/linkedList.py). Thank you for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Linked Lists in Python - Explained with Examples",
  "desc": "By Fakorede Damilola Different programming languages offer different ways to store and access data. Some of the data structures you can use are collections such as arrays, lists, maps, sets, and so on.  These all do an awesome job storing and accessi...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/introduction-to-linked-lists-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
