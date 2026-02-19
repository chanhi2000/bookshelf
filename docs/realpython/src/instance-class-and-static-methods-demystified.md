---
lang: en-US
title: "Python's Instance, Class, and Static Methods Demystified"
description: "Article(s) > Python's Instance, Class, and Static Methods Demystified"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Python's Instance, Class, and Static Methods Demystified"
    - property: og:description
      content: "Python's Instance, Class, and Static Methods Demystified"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/instance-class-and-static-methods-demystified.html
prev: /programming/py/articles/README.md
date: 2025-03-17
isOriginal: false
author:
  - name: Martin Breuss
    url: https://realpython.com/team/mbreuss/
cover: https://files.realpython.com/media/Pythons-Instance-Class-and-Static-Methods-Demystified_Watermarked.5bce71bc29d0.jpg
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
  name="Python's Instance, Class, and Static Methods Demystified"
  desc="In this tutorial, you'll compare Python's instance methods, class methods, and static methods. You'll gain an understanding of when and how to use each method type to write clear and maintainable object-oriented code."
  url="https://realpython.com/instance-class-and-static-methods-demystified"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-Instance-Class-and-Static-Methods-Demystified_Watermarked.5bce71bc29d0.jpg"/>

Instance, class, and static methods each serve a distinct role in Python, and knowing when to use one over another is key to writing clean, maintainable code. Instance methods operate on individual objects using `self`, while class methods use `cls` to access class-level data. Static methods, on the other hand, provide organizational structure without relying on class or instance state.

When you understand the differences between these three method types, you’ll be in a better spot to know when to write an instance method, class method, or a static method. Ultimately, this’ll help you design better maintainable object-oriented Python code.

::: info By the end of this tutorial, you’ll understand that

- **Instance methods** access the state of a **specific object** through the **`self`** parameter.
- You create **class methods** with the **`@classmethod`** decorator and use them for operations that involve **class-level data**.
- You use **static methods** for **utility functionality** that doesn’t need class or instance data, and you create them with the **`@staticmethod`** decorator.
- Using class methods and static methods in your classes can **improve class design** and code maintainability.

:::

Keep reading to see all three method types in action. You’ll even bake some digital pizza while working on a real-world example with all three method types in a `Pizza` class. If you develop an intuitive understanding for their differences, you’ll be able to write [**object-oriented**](/realpython.com/glossary/oop.md) Python code that communicates its intent more clearly and is easier to maintain in the long run.

::: info Get Your Code

[<VPIcon icon="fas fa-globe"/>Click here to download the free sample code](https://realpython.com/bonus/instance-class-and-static-methods-demystified-code/) you’ll use to learn about instance, class, and static methods in Python.

<SiteInfo
  name="Python's Instance, Class, and Static Methods Demystified (Sample Code) – Real Python"
  desc=""
  url="https://realpython.com/bonus/instance-class-and-static-methods-demystified-code//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://realpython.com/static/social-default-image.5e1aa4786b3a.png"/>

:::

::: tip Take the Quiz

Test your knowledge with our interactive “Python's Instance, Class, and Static Methods Demystified” quiz. You’ll receive a score upon completion to help you track your learning progress:

![Python classmethods, staticmethods, and instance methods](https://files.realpython.com/media/Pythons-Instance-Class-and-Static-Methods-Demystified_Watermarked.5bce71bc29d0.jpg)

<SiteInfo
  name="Python's Instance, Class, and Static Methods Demystified Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of instance, class, and static methods in Python. By working through this quiz, you'll revisit the differences between these methods and how to use them effectively in your Python code."
  url="https://realpython.com/quizzes/instance-class-and-static-methods-demystified//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-Instance-Class-and-Static-Methods-Demystified_Watermarked.5bce71bc29d0.jpg"/>

In this quiz, you'll test your understanding of instance, class, and static methods in Python. By working through this quiz, you'll revisit the differences between these methods and how to use them effectively in your Python code.

:::

---

## Compare Instance Methods vs Class Methods vs Static Methods

If you’re here for a quick reminder of how the three method types differ from one another, then consider the following overview that compares them:

- **Instance methods** use a `self` parameter pointing to an [**instance**](/realpython.com/glossary/instance.md) of the [**class**](/realpython.com/glossary/class.md). They can access and modify instance state through `self` and class state through `self.__class__`. These are the most common methods in Python classes.
- **Class methods** use a `cls` parameter pointing to the class itself. They can modify class-level state through `cls`, but they can’t modify individual instance state.
- **Static methods** don’t take `self` or `cls` parameters. They can’t modify instance or class state directly, and you’ll mainly use them for organizational purposes and namespacing.

If you need to revisit information quickly, there’s nothing quite like a table. So here are the most important aspects of the three different types of methods in Python classes summed up in a table:

| Type | Decorator | Parameter | Instance Access | Class Access | Use Case |
| --- | --- | --- | --- | --- | --- |
| **Instance** | None needed | `self` | ✅ | ✅ | Operations on individual instances. |
| **Class** | `@classmethod` | `cls` | ❌ | ✅ | Factory methods, alternative constructors, or any method that deals with class-level data. |
| **Static** | `@staticmethod` | No `self` or `cls` | ❌ | ❌ | Utility methods that don’t need instance or class data. |

That’s enough super-condensed, repetitive reference information! If you want to know what all of this means in practice, and you like to learn by running code snippets and reasoning about them, then keep on reading.

Next, you’ll explore the differences between instance, class, and static methods in a somewhat abstract code example. Abstract you say? Don’t worry—it involves runnable code, and it’s there to set the stage for a more practical example later on.

---

## Gain Insight Through an Abstract Example

To get warmed up, you’ll write a small Python file called <VPIcon icon="fa-brands fa-python"/>`demo.py` with a bare-bones Python class that contains stripped-down examples of all three method types:

```py title="demo.py"
class DemoClass:
    def instance_method(self):
        return ("instance method called", self)

    @classmethod
    def class_method(cls):
        return ("class method called", cls)

    @staticmethod
    def static_method()
        return ("static method called",)
```

Inside <VPIcon icon="fa-brands fa-python"/>`demo.py`, you create `DemoClass`—a descriptively named custom class with the sole purpose of demoing the differences between instance methods, class methods, and static methods.

Consequently, you also implement one of each of the three method types and name them accordingly. They each return a [tuple](https://realpython.com/python-tuple/) containing information to help you trace what’s going on, as well as the arguments the method received, such as `self` and `cls`. The output will help you understand which [**objects**](/realpython.com/glossary/object/) each of the methods can access.

::: note

Naming these parameters `self` and `cls` is just a convention—but it’s a strong one in the Python community! You could name them `foo` and `bar` and get the same result. However, if you stray from the convention, then you may get disapproving looks from your coworkers or anyone reading your code.

For functionality, all that matters is that you position them first in the parameter list for the method. For maintainability, sanity, and out of respect for others, you should always use `self` and `cls` in the classes you define.

:::

Now it’s time to call these demo methods in a new [R**EP**L](/realpython.com/glossary/repl.md) session. Import `DemoClass` and create an instance of it, then start by calling the **instance method**:

```py
from demo import DemoClass

obj = DemoClass()

obj.instance_method()
#
# ('instance method called', <demo.DemoClass object at 0x100a30d70>)
```

The output confirms that `.instance_method()` has access to the object instance through the `self` argument. Python prints the object instance as `<demo.DemoClass object at 0x100a30d70>`. When you call the instance method, Python replaces the `self` argument with the instance object, `obj`.

Instance methods can also access the class itself through the `self.__class__` attribute. This makes instance methods powerful in terms of access restrictions. They can modify state on the object instance *and* on the class itself.

Next, you can try out the **class method**:

```py
>>> obj.class_method()
('class method called', <class 'demo.DemoClass'>)
```

Calling `.class_method()` shows that the method doesn’t have access to the `DemoClass` instance object that the instance method had access to. However, it can access the class, which you can see by the output `<class 'demo.DemoClass'>`. This output represents the class object itself. Remember that everything in Python is an object, even classes themselves!

Notice how Python automatically passes the class as the first argument to the function when you call `obj.class_method()`. Calling a class method in Python through the **dot notation** triggers this behavior. The `self` parameter on instance methods works in the same way. Now, Python automatically passes the instance as the first argument when you call an instance method on an instance object.

Finally, it’s time to call the **static method**:

```py
obj.static_method()
#
# ('static method called',)
```

You get your information message as output but no additional objects. This confirms that static methods can neither access the object instance state nor the class state. They work like regular functions but belong to the namespace of the class. They also belong to the namespace of each instance.

::: note

Were you surprised that you can successfully call `.static_method()` directly on the instance object? Behind the scenes, Python enforces access restrictions by not passing in `self` or `cls` when you call a static method using the dot notation.

:::

Now, take a look at what happens when you attempt to call these methods on the class itself without creating an object instance beforehand. To do this properly, you should start a new [**REPL session**](/realpython.com/python-repl/README.md) to ensure there are no existing instances of the class:

```py
from demo import DemoClass

DemoClass.class_method()
#
# ('class method called', <class 'demo.DemoClass'>)

DemoClass.static_method()
#
# ('static method called',)

DemoClass.instance_method()
#
# Traceback (most recent call last):
#  ...
# TypeError: DemoClass.instance_method()
# ⮑ missing 1 required positional argument: 'self'
```

You’re able to call `.class_method()` and `.static_method()` just fine, but attempting to call `.instance_method()` fails with a [**`TypeError`**](/realpython.com/builtin-exceptions/typeerror.md).

This is to be expected because in this case, you didn’t create an object instance and tried calling an instance method directly on the class itself. Since there’s no way for Python to populate the `self` argument, the call fails.

However, you don’t *need* to call an instance method on the instance object like you did previously. In the end, that’s just [**syntactic sugar**](/realpython.com/syntactic-sugar-python/README.md) that Python implements to make the call more intuitive. If you want, you can ignore the syntactic sugar of the dot notation syntax and pass the instance object manually to get the same result:

```py
obj = DemoClass()

DemoClass.instance_method(obj)
#
# ('instance method called', <demo.DemoClass object at 0x100a30d70>)
```

In this case, you manually pass the `obj` instance to the instance method while calling the instance method on the class object. Doing so produces the same result as calling the instance method on the instance, without explicitly passing `self`.

Now that you’ve worked through this bare-bones example and have a better understanding of how the different method types work, you’re ready to look at a more realistic example of when to use each of the three method types.

---

## Apply Your Knowledge With a Practical Example

The basic example from the previous section shows the distinction between instance methods, class methods, and static methods. However, it’s quite abstract and doesn’t give you a good idea of why and when you might want to use one method type over another. To connect what you learned with the real world, you’ll now explore this topic with a more realistic example.

Everyone loves pizza, so it’ll be your delicious and circular gateway to implementing instance methods, class methods, and a static method in the real world. Go ahead and define a basic `Pizza` class in <VPIcon icon="fa-brands fa-python"/>`pizza.py`:

```py
class Pizza:
    def __init__(self, toppings):
        self.toppings = list(toppings)

    def __repr__(self):
        return f"Pizza({self.toppings})"
```

The class contains the two [**special methods**](/realpython.com/glossary/magic-method/) `.__init__()` and `.__repr__()`. Both of these methods operate on the instance, so you don’t need to add a [**decorator**](https://realpython.com/primer-on-python-decorators.md). It’s common to set up these two special methods for most of your custom Python classes:

- `.__init__()` controls object instantiation.
- `.__repr__()` provides a string representation for when you need to display an object.

If you’re not familiar with these two special methods, then you may want to first read more about [**class constructors**](/realpython.com/python-class-constructor.md) and [**customizing object representation**](/realpython.com/python-repr-vs-str.md). But feel free to skip that and keep going with this tutorial. [**Understanding special methods**](/realpython.com/python-magic-methods.md) isn’t crucial to grasp how to distinguish between instance, class, and static methods.

The `Pizza` class defines a data [**attribute**](/realpython.com/glossary/attribute/) called `.toppings`. You can use any [**iterable**](/realpython.com/glossary/iterable/) containing the pizza toppings when you create an instance of the class. However, the `.__init__()` method casts this into a [**list**](/realpython.com/python-list/README.md), as your class definition will assume this attribute is a list.

You can explore your new `Pizza` class in a REPL session:

```py
from pizza import Pizza

Pizza(["cheese", "tomatoes"])
#
# Pizza(['cheese', 'tomatoes'])
```

Yum! Cheese and tomato pizza. That’s already a good start, but of course there’s a lot more to pizza. You want to customize the toppings on your pizza, so it’s time to add two instance methods that can handle the task.

### When to Use Instance Methods

Instance methods are the most common methods in Python classes. You use them when you want to implement functionality that can access and change the state of an instance.

Maybe you’ll have to deal with fussy customers in a pizza restaurant who want to change the toppings on their pizza. So, you’ll go ahead and add two instance methods to your `Pizza` class.

As you learned earlier, an instance method is a function that has access to a specific instance of the class. Therefore, an instance method can change the data stored in the object.

The Python community uses the parameter name `self` by convention to refer to the instance within an instance method. It’s so common that your [**integrated development environment (IDE)**](/realpython.com/glossary/ide.md) may automatically fill this parameter for you.

Add two instance methods called `.add_topping()` and `.remove_topping()` to the class:

```py title="pizza.py"
class Pizza:
    # ...

    def add_topping(self, topping):
        self.toppings.append(topping)

    def remove_topping(self, topping):
        if topping in self.toppings:
            self.toppings.remove(topping)
```

With this edit to <VPIcon icon="fa-brands fa-python"/>`pizza.py`, you add two new instance methods that can change the state of a `Pizza` instance—allowing you to add and remove toppings to satisfy your customers’ every taste bud. You can now call these instance methods in a new REPL session to try out their functionality:

```py
from pizza import Pizza
a_pizza = Pizza(["cheese", "tomatoes"])
a_pizza
#
# Pizza(['cheese', 'tomatoes'])

a_pizza.add_topping("garlic")
a_pizza
#
# Pizza(['cheese', 'tomatoes', 'garlic'])

a_pizza.remove_topping("cheese")
a_pizza
#
# Pizza(['tomatoes', 'garlic'])
```

The data contained within the attribute `.toppings` changes when you call these instance methods. Therefore, a `Pizza` instance contains the data about the toppings and the ability to make changes to the data. This is the key principle of objects in [**object-oriented programming**](/realpython.com/python3-object-oriented-programming/README.md).

So, when should you use instance methods? In short, you should use instance methods when you need to access and edit the data that an instance of your class holds.

### When to Use Class Methods

You use a class method when you need to access or modify class-level data, such as class attributes. Another common use case for `@classmethod` is to create factory methods that return class instances with specific configurations.

Everyone has their favorite pizza variation, and with the existing code you can already create an endless number of delicious pizza variations:

```py
Pizza(["mozzarella", "tomatoes"])
#
# Pizza(['mozzarella', 'tomatoes'])

Pizza(["mozzarella", "tomatoes", "ham", "mushrooms"])
#
# Pizza(['mozzarella', 'tomatoes', 'ham', 'mushrooms'])

Pizza(["mozzarella"] * 4)
#
# Pizza(['mozzarella', 'mozzarella', 'mozzarella', 'mozzarella'])
```

However, the Italians figured out their pizza taxonomy centuries ago, so each delicious type of pizza has its own name. It’s a good idea to take advantage of that rich pizza history and give the users of your `Pizza` class a better interface for creating the types of pizza they crave.

A nice, clean way to do that is by using class methods as [**factory methods**](/realpython.com/factory-method-python/README.md) for the different kinds of pizza you can create:

```py title="pizza.py"
class Pizza:
    # ...

    @classmethod
    def margherita(cls):
        return cls(["mozzarella", "tomatoes"])

    @classmethod
    def prosciutto(cls):
        return cls(["mozzarella", "tomatoes", "ham"])
```

Note how the `.margherita()` and `.prosciutto()` factory methods use the `cls` argument instead of calling the `Pizza` constructor directly.

This is a trick you can use to follow the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Don’t Repeat Yourself (DRY)](https://en.wikipedia.org/wiki/Don't_repeat_yourself) principle. If you decide to rename this class at some point, you won’t have to remember to update the constructor name in all of the factory methods.

Now, what can you do with these factory methods? It’s time to try them out. Since you made changes to <VPIcon icon="fa-brands fa-python"/>`pizza.py`, you’ll need a new REPL session:

```py
from pizza import Pizza

Pizza.margherita()
#
# Pizza(['mozzarella', 'tomatoes'])

Pizza.prosciutto()
#
# Pizza(['mozzarella', 'tomatoes', 'ham'])
```

You can use the factory methods to create new `Pizza` objects that are configured the way you want them. They all use the same `.__init__()` constructor internally and simply provide a shortcut for remembering the various toppings.

Since these methods still create an instance of the class, you can also use other methods on the instances they create, such as `.add_topping()`:

```py
a_pizza = Pizza.prosciutto()
a_pizza
#
# Pizza(['mozzarella', 'tomatoes', 'ham'])

a_pizza.add_topping("garlic")
a_pizza
#
# Pizza(['mozzarella', 'tomatoes', 'ham', 'garlic'])
```

Another way to look at this use of class methods is that they allow you to define [**alternative constructors**](/realpython.com/python-multiple-constructors.md) for your classes.

Python only allows one `.__init__()` method per class, but it’s possible to add as many alternative constructors as necessary by using class methods. This can make the interface for your classes self-documenting and simplify their usage.

So, when should you use class methods? In short, you should use class methods when you need to access and edit the data that’s tied to your class object rather than an instance of it. You can also use them to create alternative constructors for your class.

### When to Use Static Methods

You can use static methods when you need utility functions that don’t access or modify class or instance data, but where the functionality they provide still logically belongs within the class’s namespace.

Let’s stretch the pizza analogy even thinner, and add a static method that allows users to quickly fetch the diameter in inches based on common pizza sizes:

```py title="pizza.py"
class Pizza:
    # ...

    @staticmethod
    def get_size_in_inches(size):
 """Returns the diameter in inches for common pizza sizes."""
        size_map = {
            "small": 8,
            "medium": 12,
            "large": 16,
        }
        return size_map.get(size, "Unknown size")
```

You added a static method `.get_size_in_inches()` that allows you to input a string describing a pizza size. The method then returns the diameter of that size in inches.

The static method doesn’t have access to the instance or the class—and it doesn’t need that access. All that the method does is perform a [**dictionary**](/realpython.com/python-dicts/README.md) lookup to return a number. You can call the static method both on a `Pizza` instance and the class itself:

```py
from pizza import Pizza

a_pizza = Pizza(["mozzarella", "tomatoes"])
a_pizza.get_size_in_inches("medium")
#
# 12

Pizza.get_size_in_inches("small")
#
# 8
```

That functionality makes sense because the toppings on a pizza won’t influence what size your medium pizza will be—even though you may wish that it did!

It’s purely for convenience and organizational purposes that static methods are part of the namespaces of the class and the instance. That convenience can be helpful because as a programmer-turned-pizza-baker, you may still sometimes need to look up how large a specific size of pizza should be. With `.get_size_in_inches()`, you can do that quickly.

Static methods can’t access class or instance state because they don’t take a `cls` or `self` argument. While this may seem like a limitation, it also clearly signals that the method is independent of everything else in the class.

Flagging a method as a static method is a hint that a method won’t modify class or instance state. This restriction is also enforced by the Python runtime. Using `@staticmethod` enables you to communicate clearly about parts of your class architecture so that new development work is naturally guided to happen within these set boundaries.

::: note

Of course, it’s possible to defy these restrictions. But in practice, static methods can often help prevent accidental modifications that would go against the original design intent.

:::

Static methods also have benefits when it comes to [**writing test code**](/realpython.com/python-testing/README.md) since they’re completely independent from the rest of the class. You don’t have to worry about setting up a complete class instance before you can test the static method in a [**unit test**](/realpython.com/python-unittest/README.md). You can just fire away like you would to test a regular function. This can make future maintenance less of an effort.

So, when should you use static methods? In short, you should use static methods when you want to tie utility functionality related to your class right into its namespace.

---

## Conclusion

By now, you’ve seen that instance, class, and static methods each play a distinct role in designing maintainable, object-oriented Python code. When you use them intentionally, these three method types can improve your code’s clarity, reusability, and testability.

::: info In this tutorial, you learned that

- **Instance methods** encapsulate logic that operates **on individual objects**, giving you direct access to instance-specific state through `self`.
- **Class methods** focus on **class-level concerns**, providing an elegant way to create **factory methods** and alternative constructors through `cls`.
- **Static methods** act as **stand-alone utilities** that fit neatly within a class’s **namespace**.
- Choosing the right method type helps **communicate developer intent** by clarifying which data each method cares about.
- Using all three method types intentionally reduces bugs and improves maintainability by setting up **structured boundaries in class design**.

:::

The next time you design a Python class, take a moment to consider whether your methods need access to instance data, class data, or neither. If it makes sense, then place a decorator before your method definition to make your code both more readable and more robust.

Use all three method types in combination with Python’s other object-oriented features to create classes that are intuitive to read and straightforward to maintain. Happy coding—and happy pizza-making!

::: info Get Your Code

[<VPIcon icon="fas fa-globe"/>Click here to download the free sample code](https://realpython.com/bonus/instance-class-and-static-methods-demystified-code/) you’ll use to learn about instance, class, and static methods in Python.

<SiteInfo
  name="Python's Instance, Class, and Static Methods Demystified (Sample Code) – Real Python"
  desc=""
  url="https://realpython.com/bonus/instance-class-and-static-methods-demystified-code//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://realpython.com/static/social-default-image.5e1aa4786b3a.png"/>

:::

---

## Frequently Asked Questions

Now that you have some experience with instance, class, and static methods in Python, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial.

::: details What is the difference between an instance method and a class method?

An instance method requires a class instance and accesses it through `self`, allowing you to modify instance-specific data. A class method uses `cls` to access and modify class-level data without needing an instance.

:::

::: details When do you use an instance method?

Use an instance method when you need to perform operations that modify or rely on the instance’s specific data and state.

:::

::: details When do you use a class method?

Use a class method when you need to access or modify class-level data or create factory methods that return class instances with specific configurations.

:::

::: details When do you use a static method?

Use a static method when you need a utility function that doesn’t access or modify class or instance data, but logically belongs within the class’s namespace.

:::

::: details What’s the benefit of using class methods and static methods?

Class methods and static methods help communicate developer intent, provide structure, and enforce boundaries in class design, making code easier to maintain and understand.

:::

::: tip Take the Quiz

Test your knowledge with our interactive “Python's Instance, Class, and Static Methods Demystified” quiz. You’ll receive a score upon completion to help you track your learning progress:

![Python classmethods, staticmethods, and instance methods](https://files.realpython.com/media/Pythons-Instance-Class-and-Static-Methods-Demystified_Watermarked.5bce71bc29d0.jpg)

<SiteInfo
  name="Python's Instance, Class, and Static Methods Demystified Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of instance, class, and static methods in Python. By working through this quiz, you'll revisit the differences between these methods and how to use them effectively in your Python code."
  url="https://realpython.com/quizzes/instance-class-and-static-methods-demystified//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-Instance-Class-and-Static-Methods-Demystified_Watermarked.5bce71bc29d0.jpg"/>

In this quiz, you'll test your understanding of instance, class, and static methods in Python. By working through this quiz, you'll revisit the differences between these methods and how to use them effectively in your Python code.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python's Instance, Class, and Static Methods Demystified",
  "desc": "In this tutorial, you'll compare Python's instance methods, class methods, and static methods. You'll gain an understanding of when and how to use each method type to write clear and maintainable object-oriented code.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/instance-class-and-static-methods-demystified.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
