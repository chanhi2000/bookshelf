---
lang: en-US
title: "Uncovering Missing Features in the Standard REPL"
description: "Article(s) > (7/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > (7/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "Uncovering Missing Features in the Standard REPL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/uncovering-missing-features-in-the-standard-repl.html
date: 2023-01-25
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Python Standard REPL: Try Out Code and Ideas Quickly",
  "desc": "In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more.",
  "link": "/realpython.com/python-repl/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Python Standard REPL: Try Out Code and Ideas Quickly"
  desc="In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more."
  url="https://realpython.com/python-repl#uncovering-missing-features-in-the-standard-repl"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

Compared to a full-featured code editor, IDE, or REPL, the standard REPL is relatively minimal and doesn’t provide many features to help you code and make you more productive. This lack of features is probably due to the existence of [<VPIcon icon="fa-brands fa-python"/>IDLE](https://docs.python.org/3/glossary.html#term-IDLE), which also comes in the standard Python installation and provides a feature-rich REPL.

Here’s a non-exhaustive list of IDE-like features that the standard REPL doesn’t support:

- Automatic [<VPIcon icon="fa-brands fa-wikipedia-w"/>indentation](https://en.wikipedia.org/wiki/Indentation_(typesetting))
- [<VPIcon icon="fa-brands fa-wikipedia-w"/>Syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting)
- Contextual code or [<VPIcon icon="fa-brands fa-wikipedia-w"/>command history](https://en.wikipedia.org/wiki/Command_history)
- [<VPIcon icon="fa-brands fa-wikipedia-w"/>Bracket matching](https://en.wikipedia.org/wiki/Bracket_matching)
- Rich [<VPIcon icon="fa-brands fa-wikipedia-w"/>code completion](https://en.wikipedia.org/wiki/Autocomplete#In_source_code_editors) and code suggestions
- Dynamic code and [<VPIcon icon="fa-brands fa-wikipedia-w"/>type introspection](https://en.wikipedia.org/wiki/Type_introspection)
- [**Session sharing**](https://realpython.com/bpython-alternative-python-repl.md#share-your-repl-session) capabilities
- Dynamic help, source code, and documentation access

The standard REPL is a great tool that you can use to try out your code and get immediate feedback. It can come in handy when you don’t have access to more advanced tools. However, you need to be aware of its limitations.

Having all the features listed above at your disposal in a REPL session would improve your user experience when interacting with Python. They would increase your productivity and reduce the number of errors and typos that you’d make in your code.

Fortunately, the Python standard shell can be easily extended and customized. Therefore, you’ll find a few alternative REPLs that implement most of the above features and more. In the following section, you’ll learn about some alternative REPLs available for Python.
