---
lang: en-US
title: "What's the Zen of Python?"
description: "Article(s) > What's the Zen of Python?"
icon: fa-brands fa-python
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
      content: "Article(s) > What's the Zen of Python?"
    - property: og:description
      content: "What's the Zen of Python?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/zen-of-python.html
prev: /programming/py/articles/README.md
date: 2023-06-07
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/Whats-the-Zen-of-Python_Watermarked.3ec4785e1bb9.jpg
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
  name="What's the Zen of Python?"
  desc="In this tutorial, you'll be exploring the Zen of Python, a collection of nineteen guiding principles for writing idiomatic Python. You'll find out how they originated and whether you should follow them. Along the way, you'll uncover several inside jokes associated with this humorous poem."
  url="https://realpython.com/zen-of-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Whats-the-Zen-of-Python_Watermarked.3ec4785e1bb9.jpg"/>

If you’ve been learning Python long enough, then you’ve likely seen or heard about the **Zen of Python**. Experienced Pythonistas often refer to it as a source of wisdom and guidance, especially when they want to settle an argument about certain design decisions in a piece of code. Others take these principles even more seriously by considering them a sort of Pythonic [<FontIcon icon="fas fa-globe"/>decalogue](https://merriam-webster.com/dictionary/decalogue).

In this tutorial, you’ll learn where to find the Zen of Python, how it came into existence, and how to interpret its mysterious aphorisms. You don’t need to be a Python master to understand the Zen of Python! But you do need to answer an important question: **What exactly is the Zen of Python?**

## In Short: It’s a Humorous Poem Listing Python Philosophies

According to the [<FontIcon icon="fa-brands fa-python"/>Python glossary](https://docs.python.org/3/glossary.html), which contains definitions of popular terms related to this programming language, the **Zen of Python** is a:

::: info Python Glossary

> Listing of Python design principles and philosophies that are helpful in understanding and using the language. The listing can be found by typing “`import this`” at the interactive prompt.

<SiteInfo
  name="Glossary"
  desc="The default Python prompt of the interactive shell. Often seen for code examples which can be executed interactively in the interpreter.,,..., Can refer to:- The default Python prompt of the i..."
  url="https://docs.python.org/3/glossary.html/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

:::

Indeed, when you type the indicated [**`import` statement**](/realpython.com/python-import.md) into an interactive [**Python REPL**](/realpython.com/python-repl.md), then you’ll be presented with the nineteen aphorisms that make up the Zen of Python:

```py
import this
# 
# The Zen of Python, by Tim Peters
# 
# Beautiful is better than ugly.
# Explicit is better than implicit.
# Simple is better than complex.
# Complex is better than complicated.
# Flat is better than nested.
# Sparse is better than dense.
# Readability counts.
# Special cases aren't special enough to break the rules.
# Although practicality beats purity.
# Errors should never pass silently.
# Unless explicitly silenced.
# In the face of ambiguity, refuse the temptation to guess.
# There should be one-- and preferably only one --obvious way to do it.
# Although that way may not be obvious at first unless you're Dutch.
# Now is better than never.
# Although never is often better than *right* now.
# If the implementation is hard to explain, it's a bad idea.
# If the implementation is easy to explain, it may be a good idea.
# Namespaces are one honking great idea -- let's do more of those!
```

The byline reveals the poem’s author, [<FontIcon icon="fa-brands fa-wikipedia-w"/>Tim Peters](https://en.wikipedia.org/wiki/Tim_Peters_(software_engineer)), who’s a renowned software engineer and a long-standing [**CPython**](/realpython.com/cpython-source-code-guide.md) core developer best known for inventing the [**Timsort**](/realpython.com/sorting-algorithms-python.md#the-timsort-algorithm-in-python) sorting algorithm. He also authored the [**`doctest`**](/realpython.com/python-doctest.md) and [**`timeit`**](/realpython.com/python-timer.md#estimating-running-time-with-timeit) modules in the Python standard library, along with making many other contributions.

Take your time to read through the Zen of Python and contemplate its wisdom. But don’t take the aphorisms literally, as they’re more of a guiding set of principles rather than strict instructions. You’ll learn about their humorous origins in the next section.

---

## How Did the Zen of Python Originate?

The idea of formulating a single document that would encapsulate Python’s fundamental philosophies emerged among the core developers in June 1999. As more and more people began coming to Python from other programming languages, they’d often bring their preconceived notions of software design that weren’t necessarily [<FontIcon icon="fas fa-globe"/>Pythonic](https://realpython.com/learning-paths/writing-pythonic-code/). To help them follow the spirit of the language, a set of recommendations for writing idiomatic Python was needed.

The initial discussion about creating such a document took place on the Python mailing list under the subject *The Python Way*. Today, you can find this conversation in the official [<FontIcon icon="fa-brands fa-python"/>Python-list archive](https://mail.python.org/pipermail/python-list/1999-June/subject.html). If you look closely at the [<FontIcon icon="fa-brands fa-python"/>first message from Tim Peters](https://mail.python.org/pipermail/python-list/1999-June/001951.html) in that thread, then you’ll notice that he clearly outlined the Zen of Python as a joke. That original form has stuck around until this day:

::: info Tim Peters from <FontIcon icon="fa-brands fa-python"/>mail.python.org

> Clearly a job for Guido alone – although I doubt it’s one he’ll take on (fwiw, I wish he would too!). Here’s the outline he would start from, though:
> 
> Beautiful is better than ugly.  
> Explicit is better than implicit.  
> Simple is better than complex.  
> Complex is better than complicated.  
> Flat is better than nested.  
> Sparse is better than dense.  
> Readability counts.  
> Special cases aren’t special enough to break the rules.  
> Although practicality beats purity.  
> Errors should never pass silently.  
> Unless explicitly silenced.  
> In the face of ambiguity, refuse the temptation to guess.  
> There should be one– and preferably only one –obvious way to do it.  
> Although that way may not be obvious at first unless you’re Dutch.  
> Now is better than never.  
> Although never is often better than *right* now.  
> If the implementation is hard to explain, it’s a bad idea.  
> If the implementation is easy to explain, it may be a good idea.  
> Namespaces are one honking great idea – let’s do more of those!
>
> There you go: 20 Pythonic Fec^H^H^HTheses on the nose, counting the one I’m leaving for Guido to fill in. If the answer to *any* Python design issue isn’t obvious after reading those – well, I just give up.

```component VPCard
{
  "title": "The Python Way",
  "desc": "",
  "link": "https://mail.python.org/pipermail/python-list/1999-June/001951.html/",
  "logo": "https://mail.python.org/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

The wink and the playful way of self-censoring some [<FontIcon icon="fa-brands fa-wikipedia-w"/>toilet humor](https://en.wikipedia.org/wiki/Toilet_humour) are clear giveaways that Tim Peters didn’t want anyone to take his comment too seriously.

::: note

In case you didn’t get the joke, he started to write something like *Feces* but then used `^H`—which represents a Backspace in older text editors like [**Vim**](/realpython.com/vim-and-python-a-match-made-in-heaven.md)—to delete the last three letters and make the word *Theses*. Therefore, the intended phrase is *20 Pythonic Theses*.

:::

Eventually, these nearly twenty theses got a proper name and were formally codified in a [<FontIcon icon="fa-brands fa-python"/>Python Enhancement Proposal](https://peps.python.org/pep-0001/) document. Each PEP document receives a number. For example, you might have stumbled on [**PEP 8**](/realpython.com/python-pep8.md), which is the style guide for writing readable Python code. Perhaps as an inside joke, the Zen of Python received the number [<FontIcon icon="fa-brands fa-python"/>PEP 20](https://peps.python.org/pep-0020/) to signify the incomplete number of aphorisms in it.

To win your next argument about what makes good Python code, you can back up your claims with the Zen of Python. If you’d like to refer to a specific aphorism instead of the entire poem, then consider visiting [<FontIcon icon="fas fa-globe"/>pep20.org](https://pep20.org/), which provides convenient clickable links to each principle.

And, in case you want to learn the poem by heart while having some fun, you can now listen to a [<FontIcon icon="fa-brands fa-youtube"/>song](https://youtu.be/i6G6dmVJy74) with the Zen of Python as its lyrics. [Barry Warsaw (<FontIcon icon="fa-brands fa-x-twitter"/>`pumpichank`)](https://x.com/pumpichank), another core developer involved with Python since its early days, composed and performed this musical rendition. The song became the closing track on a special vinyl record entitled [<FontIcon icon="fas fa-globe"/>*The Zen Side of the Moon*](https://edgedb.com/blog/the-zen-side-of-the-moon), which was [auctioned (<FontIcon icon="fa-brands fa-x-twitter"/>`pyladies`)](https://x.com/pyladies/status/1649988104433061888) at [**PyCon US 2023**](/realpython.com/python-news-april-2023.md#pycon-us-2023-celebrates-its-twentieth-anniversary).

Okay. Now that you have a rough idea of what the Zen of Python is and how it came about, you might be asking yourself whether you should really follow it.

---

## Should You Obey the Zen of Python?

As a tongue-in-cheek comment left on a mailing list, the Zen of Python should be taken with a grain of salt. That being said, it’s a set of reasonable guidelines that many Python developers abide by. They’d argue that the Zen of Python promotes elegant, readable, and idiomatic code aligned with the philosophy of the language.

Ultimately, whether you should follow the Zen of Python and to what extent is up to you because the guidelines are open for interpretation. Simply following them won’t magically make your code look Pythonic or help you make an informed design decision, which may depend on the use case. In contrast, the subjective and often seemingly contradictory advice that the Zen of Python provides can leave you feeling more confused than before.

Take the very first principle as an example:

> Beautiful is better than ugly.

What does *beautiful* or *ugly* mean exactly? How could you possibly measure how beautiful a given code snippet is? After all, one developer might disagree with another’s interpretation of beauty.

These other two principles seem to be at odds with each other:

> Special cases aren’t special enough to break the rules.  
> Although practicality beats purity.

According to the first one, you’re expected to always stick to the rules without breaking them. But immediately after, the following principle suggests that you should consider the practicality of a solution, even if it sometimes means breaking the rules anyway. Therefore, applying the Zen of Python without violating at least some of its principles is virtually impossible. You must choose between the ones to follow and those to bend or ignore.

[Chris Neugebauer (<FontIcon icon="fa-brands fa-x-twitter"/>`chrisjrn`)](https://x.com/chrisjrn) gave a relevant talk about the Zen of Python and its limitations at [**PyCascades 2023**](/realpython.com/python-news-march-2023.md#pycascades-2023-takes-place-in-vancouver-british-columbia), which you can [<FontIcon icon="fa-brands fa-youtube"/>watch online](https://youtu.be/LA1Ir0s4icw). He explores [**decorators**](/realpython.com/primer-on-python-decorators.md) and [**type hints**](/realpython.com/python-type-checking.md) as two primary examples of Python design decisions that don’t strictly comply with the Zen of Python.

Decorators can help you focus on the code’s high-level purpose by hiding uninteresting implementation details at the price of making the code more implicit. This complies with the readability principle but fails to favor explicit code. Type hinting, on the other hand, removes implicit behavior by adding complexity, which goes against the Zen of Python’s emphasis on simplicity.

Notice how the same feature can simultaneously follow the Zen of Python and not, depending on which angle you look at it from. In many cases, you’ll need to strike a balance and decide what makes the most sense for your project.

In conclusion, while the Zen of Python provides useful guidelines, you shouldn’t strictly adhere to it as a set of rules etched in stone. Instead, you should prioritize practicality and adapt your approach to the problem at hand. Consider other factors such as performance, business requirements, and team conventions when deciding whether to adhere to these opinionated guidelines.

---

## How Can You Interpret Some of the Aphorisms?

The Zen of Python consists of nineteen aphorisms, some of which favor one specific trait over another, providing opinions about what makes your code *better*:

```plaintext{1-6,9-10}
Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex. Complex is better than complicated. Flat is better than nested. Sparse is better than dense. Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never. Although never is often better than *right* now. If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

In this section, you’ll take a closer look at these guidelines, trying to come up with sensible interpretations for them.

The first principle in the Zen of Python states that:

> Beautiful is better than ugly.

While beauty is in the eye of the beholder, it’s undeniable that one of the factors behind Python’s popularity, particularly in the [<FontIcon icon="fas fa-globe"/>data science](https://realpython.com/learning-paths/data-science-python-core-skills/) community, is its approachable and aesthetically pleasing syntax. Consider the following function, which creates a [<FontIcon icon="fa-brands fa-wikipedia-w"/>sine wave](https://en.wikipedia.org/wiki/Sine_wave) with the specified amplitude, angular frequency, and phase shift:

```py
from math import sin

def sinusoid(A, ω, ϕ):
    return lambda t: A * sin(ω * t + ϕ)
```

This code reads almost like a mathematical formula thanks to Python’s compact syntax, which doesn’t get in your way. The use of Greek letters in [**variable**](/realpython.com/python-variables.md) names, so common in these types of equations, instantly makes the code relatable to anyone familiar with the underlying theory. Finally, the [**lambda expression**](/realpython.com/python-lambda.md) makes the code concise while maintaining readability. As you can see, Python’s clarity and [<FontIcon icon="fa-brands fa-wikipedia-w"/>expressive power](https://en.wikipedia.org/wiki/Expressive_power_(computer_science)) can be hard to beat.

The second principle in the Zen of Python says:

> Explicit is better than implicit.

This statement emphasizes the need for your code to be clear and easy to understand rather than relying on unspoken assumptions or hidden rules. For example, when you define a function, it’s much better to explicitly state the expected types of input parameters and the [**return**](/realpython.com/python-return-statement.md) value instead of forcing whoever reads your code to guess:

```py
from math import sin
from typing import Callable, TypeAlias

Amplitude: TypeAlias = float
AngularFrequency: TypeAlias = float
PhaseShift: TypeAlias = float
Time: TypeAlias = float
SineWave: TypeAlias = Callable[[Time], float]

def sinusoid(A: Amplitude, ω: AngularFrequency, ϕ: PhaseShift) -> SineWave:
 """Return a function that computes the sine wave at a given time."""
    return lambda t: A * sin(ω * t + ϕ)
```

Here, you’ve defined several [**type aliases**](/realpython.com/python310-new-features.md#type-unions-aliases-and-guards) with meaningful names and used them as type hints in your function’s parameters to help clarify their purpose and intended use. You’ve also added a [**docstring**](/realpython.com/python-project-documentation-with-mkdocs.md#understand-python-docstrings) explaining what your function returns. Now, anyone looking at your code should have a good idea of what it does and how to use it.

::: note

In case you haven’t seen type hints in Python before, the colons (`:`) in the code snippet above separate variable names from their corresponding data types. In other words, `A: Amplitude` means that the parameter `A` should have type `Amplitude`, and `Amplitude: TypeAlias` means that `Amplitude` is a type alias for some other type—in this case, [**`float`**](/realpython.com/python-numbers.md#floating-point-numbers).

:::

The next two principles from the Zen of Python are:

> Simple is better than complex.  
> Complex is better than complicated.

The simplest solutions are often the most elegant and efficient. This truth has been known since the Renaissance, as the famous saying “simplicity is the ultimate sophistication” is often attributed to Leonardo da Vinci.

Simplicity may not always be possible, though, as some systems are complex by nature, consisting of many moving parts and layers. But that doesn’t mean they have to be complicated or difficult to understand. You can often break a bigger problem down into smaller and more manageable subproblems. Python offers a variety of tools to help you with that, such as [**list comprehensions**](/realpython.com/list-comprehension-python.md), [**generators**](/realpython.com/introduction-to-python-generators.md), [**iterators**](/realpython.com/python-iterators-iterables.md), and more.

Another pair of guidelines from the Zen of Python is the following:

> Flat is better than nested.  
> Sparse is better than dense.

When it comes to the structure of your code, it’s generally preferable to keep things flat by avoiding deeply nested structures. In an earlier example, the lambda expression replaced an [**inner function**](/realpython.com/inner-functions-what-are-they-good-for.md), which might have looked like this:

```py
# ...

def sinusoid(A: Amplitude, ω: AngularFrequency, ϕ: PhaseShift) -> SineWave:
 """Return a function that computes the sine wave at a given time."""

    def wave(t: Time) -> float:
        return A * sin(ω * t + ϕ)

    return wave
```

This code is slightly more explicit and easier to understand, but it’s also nested and verbose. If you had multiple indentation levels nested inside one another, then it could quickly become cluttered and harder to follow.

On the other side of the spectrum, you might feel tempted to cram as much code as possible into a single line. This is where the second statement comes in. Instead of using one long line of dense code, it’s usually better to spread the individual instructions out, making them easier to reason about:

```py
def dense(A, f, ϕ):
    return lambda t: A * sin(2 * π * f * t + ϕ)

def sparse(A, f, ϕ):
    ω = 2 * π * f
    return lambda t: A * sin(ω * t + ϕ)
```

In this case, the `sparse()` function breaks a long formula into smaller parts by extracting the independent terms onto a separate line. While you now have more lines of code to read in the vertical direction, each is shorter and easier to comprehend individually.

The final two principles offering qualitative advice are:

> Now is better than never.  
> Although never is often better than *right* now.

The first one encourages you to take action by trying to implement a working prototype. By the way, Python is an excellent tool for prototyping! You can always keep iterating on your solution without falling into the [<FontIcon icon="fa-brands fa-wikipedia-w"/>premature optimization](https://en.wikipedia.org/wiki/Program_optimization#When_to_optimize) trap, which [<FontIcon icon="fa-brands fa-wikipedia-w"/>Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) famously called “the root of all evil” in computer science.

At the same time, you shouldn’t make decisions too hastily, rushing into implementation without giving it at least some thought. Practicing patience can save you from investing your time and effort in something that won’t return the desired results. Your intuition may be wrong, so there’s no point in working on something that [<FontIcon icon="fa-brands fa-wikipedia-w"/>ou’re not going to need](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) in the first place.

As you can tell, mastering the Zen of Python means carefully considering each piece of advice, even when the aphorisms may seem contradictory. While going through each and every line is beyond the scope of this tutorial, the more you work with Python, the more intuitive these proverbs will become.

---

## What Inside Jokes Does the Zen of Python Hide?

While the Zen of Python started as a joke, the humor doesn’t end there. Python is known for having lots of witty references sprinkled throughout the language. After all, its very name is a tribute to the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Monty Python](https://en.wikipedia.org/wiki/Monty_Python) comedy group, and the official documentation is full of puns that allude to their numerous sketches. For example, `spam` is a common placeholder name used instead of the more traditional [<FontIcon icon="fa-brands fa-wikipedia-w"/>`foobar`](https://en.wikipedia.org/wiki/Foobar) as an informal nod to the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Spam sketch](https://en.wikipedia.org/wiki/Spam_(Monty_Python_sketch)).

::: tip Fun Fact

The modern meaning of [<FontIcon icon="fa-brands fa-wikipedia"/>spam](https://en.wikipedia.org/wiki/Spamming) as unwanted digital communication also stems from that classic Monty Python sketch, which excessively repeats the word *spam*.

:::

There’s a [<FontIcon icon="fas fa-globe"/>funny story](https://wefearchange.org/2010/06/import-this-and-zen-of-python.html) about the phrase *import this*, which Barry Warsaw documented on his blog. In a nutshell, the phrase was chosen from hundreds of community submissions for a slogan that could be printed on a T-shirt for a Python conference in 2001. At the very last minute, Barry got the idea to actually implement <FontIcon icon="fa-brands fa-python"/>`this.py` and sneak it into the next Python release without telling anyone. The module would show the Zen of Python when imported.

To make the Zen of Python more difficult to find in [Python’s source code (<FontIcon icon="iconfont icon-github"/>`python/cpython`)](https://github.com/python/cpython), Barry and his small group of accomplices added the module with notifications disabled. They kept it to themselves and even went so far as to [<FontIcon icon="fa-brands fa-wikipedia-w"/>obfuscate](https://en.wikipedia.org/wiki/Obfuscation_(software)) the code using the [<FontIcon icon="fa-brands fa-wikipedia-w"/>ROT-13](https://en.wikipedia.org/wiki/ROT13) substitution cipher to conceal their secret message. It wasn’t until much later that someone finally discovered the hidden module.

::: note

Displaying the Zen of Python after importing `this` is just one of many [<FontIcon icon="fa-brands fa-wikipedia-w"/>Easter eggs](https://en.wikipedia.org/wiki/Easter_egg_(media)) smuggled into Python, but there are several more eggs awaiting discovery. You can get a head start by downloading the following guide:

:::

Have you found others? Share them in the comments below!

Ironically, when you look more closely at [`this.py` (<FontIcon icon="iconfont icon-github"/>`python/cpython`)](https://github.com/python/cpython/blob/main/Lib/this.py) in the Python source code, then you’ll immediately notice that it violates many of the Zen of Python principles itself:

```py :collapsed-lines title="Lib/this.py"
s = """Gur Mra bs Clguba, ol Gvz Crgref

Ornhgvshy vf orggre guna htyl.
Rkcyvpvg vf orggre guna vzcyvpvg.
Fvzcyr vf orggre guna pbzcyrk.
Pbzcyrk vf orggre guna pbzcyvpngrq.
Syng vf orggre guna arfgrq.
Fcnefr vf orggre guna qrafr.
Ernqnovyvgl pbhagf.
Fcrpvny pnfrf nera'g fcrpvny rabhtu gb oernx gur ehyrf.
Nygubhtu cenpgvpnyvgl orngf chevgl.
Reebef fubhyq arire cnff fvyragyl.
Hayrff rkcyvpvgyl fvyraprq.
Va gur snpr bs nzovthvgl, ershfr gur grzcgngvba gb thrff.
Gurer fubhyq or bar-- naq cersrenoyl bayl bar --boivbhf jnl gb qb vg.
Nygubhtu gung jnl znl abg or boivbhf ng svefg hayrff lbh'er Qhgpu.
Abj vf orggre guna arire.
Nygubhtu arire vf bsgra orggre guna *evtug* abj.
Vs gur vzcyrzragngvba vf uneq gb rkcynva, vg'f n onq vqrn.
Vs gur vzcyrzragngvba vf rnfl gb rkcynva, vg znl or n tbbq vqrn.
Anzrfcnprf ner bar ubaxvat terng vqrn -- yrg'f qb zber bs gubfr!"""

d = {}
for c in (65, 97):
    for i in range(26):
        d[chr(i+c)] = chr((i+13) % 26 + c)

print("".join([d.get(c, c) for c in s]))
```

This module doesn’t look particularly [<FontIcon icon="fas fa-globe"/>beautiful](https://pep20.org/#beautiful) or [<FontIcon icon="fas fa-globe"/>readable](https://pep20.org/#readability) due to the obfuscation, making its implementation [<FontIcon icon="fas fa-globe"/>hard to explain](https://pep20.org/#hard). Furthermore, single-letter variable names aren’t [<FontIcon icon="fas fa-globe"/>explicit](https://pep20.org/#explicit), and declaring them in the [**global scope**](/realpython.com/python-scope-legb-rule.md#modules-the-global-scope) ignores [<FontIcon icon="fas fa-globe"/>namespaces](https://pep20.org/#namespaces) altogether. Finally, there’s a [<FontIcon icon="fas fa-globe"/>simpler](https://pep20.org/#simple) way to decode the message using the `codecs` module instead of manually implementing the algorithm with nested loops that aren’t [<FontIcon icon="fas fa-globe"/>flat](https://pep20.org/#flat).

There’s yet another Easter egg hiding right before your eyes. One of the principles in the Zen of Python is a playful reference to [<FontIcon icon="fa-brands fa-wikipedia-w"/>Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum), the creator of Python, who’s originally from the Netherlands:

> Although that way may not be obvious at first unless you’re Dutch.

Guido is also known as the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Benevolent Dictator for Life (BDFL)](https://en.wikipedia.org/wiki/Benevolent_dictator_for_life) of Python, enjoying a great deal of respect and having influence over the language and its evolution. In 2018, he officially stepped down from that role, but he remains a key figure in the Python community.

The Zen of Python’s author has a great sense of humor. A long time ago, someone opened a [<FontIcon icon="fa-brands fa-python"/>ticket](https://bugs.python.org/issue3364) in Python’s old bug tracker to point out a punctuation error in another principle. The mistake is in the inconsistent use of the [<FontIcon icon="fa-brands fa-wikipedia-w"/>em dashes](https://en.wikipedia.org/wiki/Dash#Em_dash) (`—`) in the following sentence:

> There should be one– and preferably only one –obvious way to do it.

However, that mistake was intentional! The joke, as explained by Tim Peters himself, is that there’s disagreement about whether you should use spaces around em dashes or not:

::: info from bugs.python.org

> I’m afraid you missed the joke ;-) While you believe spaces are required on both sides of an em dash, there is no consensus on this point. For example, most (but not all) American authorities say /no/ spaces should be used. That’s the joke. In writing a line about “only one way to do it”, I used a device (em dash) for which at least two ways to do it (with spaces, without spaces) are commonly used, neither of which is obvious – and deliberately picked a third way just to rub it in.
> 
> This will never change ;-)

```component VPCard
{
  "title": "Message 69712 - Python tracker",
  "desc": "",
  "link": "https://bugs.python.org/msg69712/",
  "logo": "https://bugs.python.org/@@file/favicon.ico",
  "background": "rgba(50,115,246,0.2)"
}
```

:::

Apart from that, this aphorism directly addresses [<FontIcon icon="iconfont icon-perl"/>Perl](https://perl.org/) programmers, whose motto was “[<FontIcon icon="fas fa-globe"/>there is more than one way to do it](https://wiki.c2.com/?ThereIsMoreThanOneWayToDoIt),” often abbreviated to TIMTOWTDI and pronounced *Tim Toady*. During the 1990s and early 2000s, Perl and Python were fierce competitors, and their respective communities had a friendly rivalry. The Zen of Python was actually created as a subtle way to poke fun at Perl.

So, there you have it. Zen’s twenty principles, only nineteen of which have been written down, are full of clever jokes and references that only a true Pythonista will appreciate. Now you can consider yourself one of them!

---

## Conclusion

In this tutorial, you’ve explored the Zen of Python, a humorous poem listing opinionated Python philosophies authored by Tim Peters. Along the way, you’ve learned how it originated, what some of its aphorisms mean, and whether you should follow them.

You’ve also uncovered several inside jokes and references hidden in the Zen of Python, which is now an important part of Python’s culture. Now that you know the story behind it, why don’t you take a few minutes and read the Zen of Python one more time to appreciate its true brilliance?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What's the Zen of Python?",
  "desc": "In this tutorial, you'll be exploring the Zen of Python, a collection of nineteen guiding principles for writing idiomatic Python. You'll find out how they originated and whether you should follow them. Along the way, you'll uncover several inside jokes associated with this humorous poem.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/zen-of-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
