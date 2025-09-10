---
lang: en-US
title: "racting With JSON"
description: "Article(s) > (4/4) Working With JSON Data in Python"
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
      content: "Article(s) > (4/4) Working With JSON Data in Python"
    - property: og:description
      content: "racting With JSON"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-json/interacting-with-json.html
next: /realpython.com/python-json/README.md#conclusion
date: 2024-12-22
isOriginal: false
author:
  - name: Philipp Acsany
    url : https://realpython.com/team/pacsany/
cover: https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Working With JSON Data in Python",
  "desc": "In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data.",
  "link": "/realpython.com/python-json/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Working With JSON Data in Python"
  desc="In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data."
  url="https://realpython.com/python-json#interacting-with-json"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

So far, you’ve explored the JSON syntax and have already spotted some common JSON pitfalls like trailing commas and single quotes for strings. When writing JSON, you may have also spotted some annoying details. For example, neatly indented Python dictionaries end up being a blob of JSON data.

In the last section of this tutorial, you’ll try out some techniques to make your life easier as you work with JSON data in Python. To start, you’ll give your JSON object a well-deserved glow-up.

---

## Prettify JSON With Python

One huge advantage of the JSON format is that JSON data is human-readable. Even more so, JSON data is human-writable. This means you can open a JSON file in your favorite text editor and change the content to your liking. Well, that’s the idea, at least!

Editing JSON data by hand is not particularly easy when your JSON data looks like this in the text editor:

![JSON code without any indentation](https://files.realpython.com/media/json-blob.88bf08bcc362.png)

Even with word wrapping and syntax highlighting turned on, JSON data is hard to read when it’s a single line of code. And as a Python developer, you probably miss some [**whitespace**](/realpython.com/python-program-structure.md#whitespace-as-indentation). But worry not, Python has got you covered!

When you call `json.dumps()` or `json.dump()` to serialize a Python object, then you can provide the `indent` argument. Start by trying out `json.dumps()` with different indentation levels:

```py :collapsed-lines
import json
dog_friend = {
    "name": "Mitch",
    "age": 6.5,
}

print(json.dumps(dog_friend))
#
# {"name": "Mitch", "age": 6.5}

print(json.dumps(dog_friend, indent=0))
# 
# {
# "name": "Mitch",
# "age": 6.5
# }
#
print(json.dumps(dog_friend, indent=-2))
# 
# {
# "name": "Mitch",
# "age": 6.5
# }

print(json.dumps(dog_friend, indent=""))
# 
# {
# "name": "Mitch",
# "age": 6.5
# }

print(json.dumps(dog_friend, indent=" ⮑ "))
#
# {
#  ⮑ "name": "Mitch",
#  ⮑ "age": 6.5
# }
```

The default value for `indent` is `None`. When you call `json.dumps()` without `indent` or with `None` as a value, you’ll end up with one line of a compact JSON-formatted string.

If you want linebreaks in your JSON string, then you can set `indent` to `0` or provide an empty string. Although probably less useful, you can even provide a negative number as the indentation or any other string.

More commonly, you’ll provide values like `2` or `4` for `indent`:

```py
print(json.dumps(dog_friend, indent=2))
# 
# {
#   "name": "Mitch",
#   "age": 6.5
# }

print(json.dumps(dog_friend, indent=4))
# 
# {
#     "name": "Mitch",
#     "age": 6.5
# }
```

When you use positive integers as the value for `indent` when calling `json.dumps()`, then you’ll indent every level of the JSON object with the given `indent` count as spaces. Also, you’ll have newlines for each key-value pair.

::: note

To actually see the whitespace in the REPL, you can wrap the `json.dumps()` calls in `print()` function calls.

:::

The `indent` parameter works exactly the same for `json.dump()` as it does for `json.dumps()`. Go ahead and write the `dog_friend` dictionary into a JSON file with an indentation of `4` spaces:

```py
with open("dog_friend.json", mode="w", encoding="utf-8") as write_file:
    json.dump(dog_friend, write_file, indent=4)
```

When you set the indentation level when serializing JSON data, then you end up with prettified JSON data. Have a look at how the <VPIcon icon="iconfont icon-json"/>`dog_friend.json` file looks in your editor:

![Formatted JSON code](https://files.realpython.com/media/json-indented.faca531e903f.png)

Python can work with JSON files no matter how they’re indented. As a human, you probably prefer a JSON file that contains newlines and is neatly indented. A JSON file that looks like this is way more convenient to edit.

---

## Validate JSON in the Terminal

The convenience of being able to edit JSON data in the editor comes with a risk. When you move key-value pairs around or add strings with one quote instead of two, you end up with an invalid JSON.

To swiftly check if a JSON file is valid, you can leverage Python’s `json.tool`. You can run the `json.tool` module as an executable in the terminal using the `-m` switch. To see `json.tool` in action, also provide <VPIcon icon="iconfont icon-json"/>`dog_friend.json` as the `infile` positional argument:

```sh
python -m json.tool dog_friend.json
# 
# {
#   "name": "Mitch",
#   "age": 6.5
# }
```

When you run `json.tool` only with an `infile` option, then Python validates the JSON file and outputs the JSON file’s content in the terminal if the JSON is valid. Running `json.tool` in the example above means that <VPIcon icon="iconfont icon-json"/>`dog_friend.json` contains valid JSON syntax.

**Note:** The `json.tool` prints the JSON data with an indentation of 4 by default. You’ll explore this behavior in the next section.

To make `json.tool` complain, you need to invalidate your JSON document. You can make the JSON data of <VPIcon icon="iconfont icon-json"/>`dog_friend.json` invalid by removing the comma (`,`) between the key-value pairs:

```json{2} title="dog_friend.json"
{
  "name": "Mitch"
  "age": 6.5
}
```

After saving <VPIcon icon="iconfont icon-json"/>`dog_friend.json`, run `json.tool` again to validate the file:

```sh
python -m json.tool dog_friend.json
# 
# Expecting ',' delimiter: line 3 column 5 (char 26)
```

The `json.tool` module successfully stumbles over the missing comma in <VPIcon icon="iconfont icon-json"/>`dog_friend.json`. Python notices that there’s a delimiter missing once the `"age"` property name enclosed in double quotes starts in line 3 at position 5. Go ahead and try fixing the JSON file again. You can also be creative with invalidating <VPIcon icon="iconfont icon-json"/>`dog_friend.json` and check how `json.tool` reports your error. But keep in mind that `json.tool` only reports the first error. So you may need to go back and forth between fixing a JSON file and running `json.tool`.

Once <VPIcon icon="iconfont icon-json"/>`dog_friend.json` is valid, you may notice that the output always looks the same. Of course, like any well-made [**command-line interface**](/realpython.com/command-line-interfaces-python-argparse.md), `json.tool` offers you some options to control the program.

---

## Pretty Print JSON in the Terminal

In the previous section, you used `json.tool` to validate a JSON file. When the JSON syntax was valid, `json.tool` showed the content with newlines and an indentation of four spaces. To control how `json.tool` prints the JSON, you can set the `--indent` option.

If you followed along with the tutorial, then you’ve got a <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` file that doesn’t contain newlines or indentation.

When you pass in <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` to `json.tool`, then you can pretty print the content of the JSON file in your terminal. When you set `--indent`, then you can control which indentation level `json.tool` uses to display the code:

```sh :collapsed-lines
python -m json.tool hello_frieda.json --indent 2
# 
# {
#   "name": "Frieda",
#   "is_dog": true,
#   "hobbies": [
#     "eating",
#     "sleeping",
#     "barking"
#   ],
#   "age": 8,
#   "address": {
#     "work": null,
#     "home": [
#       "Berlin",
#       "Germany"
#     ]
#   },
#   "friends": [
#     {
#       "name": "Philipp",
#       "hobbies": [
#         "eating",
#         "sleeping",
#         "reading"
#       ]
#     },
#     {
#       "name": "Mitch",
#       "hobbies": [
#         "running",
#         "snacking"
#       ]
#     }
#   ]
# }
```

Seeing the prettified JSON data in the terminal is nifty. But you can step up your game even more by providing another option to the `json.tool` run!

By default, `json.tool` writes the output to [<VPIcon icon="fa-brands fa-python"/>`sys.stdout`](https://docs.python.org/3/library/sys.html#sys.stdout), just like you commonly do when calling the [**`print()` function**](/realpython.com/python-print/README.md). But you can also redirect the output of `json.tool` into a file by providing a positional `outfile` argument:

```sh
python -m json.tool hello_frieda.json pretty_frieda.json
```

With <VPIcon icon="iconfont icon-json"/>`pretty_frieda.json` as the value of the `outfile` option, you write the output into the JSON file instead of showing the content in the terminal. If the file doesn’t exist yet, then Python creates the file on the way. If the target file already exists, then you overwrite the file with the new content.

::: note

You can prettify a JSON file in place by using the same file as `infile` and `outfile` arguments.

:::

You can verify that the <VPIcon icon="iconfont icon-json"/>`pretty_frieda.json` file exists by running the `ls` [**terminal command**](/realpython.com/terminal-commands.md):

```sh{6,9}
ls -al
# 
# drwxr-xr-x@  8 realpython  staff   256 Jul  3 19:53 .
# drwxr-xr-x@ 12 realpython  staff   384 Jul  3 18:29 ..
# -rw-r--r--@  1 realpython  staff    44 Jul  3 19:25 dog_friend.json
# -rw-r--r--@  1 realpython  staff   286 Jul  3 17:27 hello_frieda.json 
# -rw-r--r--@  1 realpython  staff   484 Jul  3 16:53 hello_frieda.py
# -rw-r--r--@  1 realpython  staff    34 Jul  2 19:38 hello_world.json
# -rw-r--r--@  1 realpython  staff   594 Jul  3 19:45 pretty_frieda.json
```

The whitespace you added to <VPIcon icon="iconfont icon-json"/>`pretty_frieda.json` comes with a price. Compared to the original, unindented <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` file, the file size of <VPIcon icon="iconfont icon-json"/>`pretty_frieda.json` is now around double that. Here, the 308-byte increase may not be significant. But when you’re dealing with big JSON data, then a good-looking JSON file will take up quite a bit of space.

Having a small data footprint is especially useful when serving data over the web. Since the JSON format is the de facto standard for exchanging data over the web, it’s worth keeping the file size as small as possible. And again, Python’s `json.tool` has got your back!

---

## Minify JSON With Python

As you know by now, Python is a great helper when working with JSON. You can minify JSON data with Python in two ways:

1. Leverage Python’s `json.tool` module in the terminal
2. Use the `json` module in your Python code

Before, you used `json.tool` with the `--indent` option to add whitespace. Instead of using `--indent` here, you can use provide `--compact` to do the opposite and remove any whitespace between the key-value pairs of your JSON:

```sh
python -m json.tool pretty_frieda.json mini_frieda.json --compact
```

After calling the `json.tool` module, you provide a JSON file as the `infile` and another JSON file as the `outfile`. If the target JSON file exists, then you overwrite its contents. Otherwise, you create a new file with the filename you provide.

Just like with `--indent`, you provide the same file as a source and target file to minify the file in-place. In the example above, you minify <VPIcon icon="iconfont icon-json"/>`pretty_frieda.json` into <VPIcon icon="iconfont icon-json"/>`mini_frieda.json`. Run the `ls` command to see how many bytes you squeezed out of the original JSON file:

```sh{9-10}
ls -al
# 
# drwxr-xr-x@  9 realpython  staff   288 Jul  3 20:12 .
# drwxr-xr-x@ 12 realpython  staff   384 Jul  3 18:29 .
# -rw-r--r--@  1 realpython  staff    44 Jul  3 19:25 dog_friend.json
# -rw-r--r--@  1 realpython  staff   286 Jul  3 17:27 hello_frieda.json
# -rw-r--r--@  1 realpython  staff   484 Jul  3 16:53 hello_frieda.py
# -rw-r--r--@  1 realpython  staff    34 Jul  2 19:38 hello_world.json
# -rw-r--r--@  1 realpython  staff   257 Jul  3 20:12 mini_frieda.json 
# -rw-r--r--@  1 realpython  staff   594 Jul  3 19:45 pretty_frieda.json
```

Compared to <VPIcon icon="iconfont icon-json"/>`pretty_frieda.json`, the file size of <VPIcon icon="iconfont icon-json"/>`mini_frieda.json` is 337 bytes smaller. That’s even 29 bytes less than the original <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` file that didn’t contain any indentation.

To investigate where Python managed to remove even more whitespace from the original JSON, open the Python REPL again and minify the content of the original <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` file with Python’s `json` module:

```py
import json
with open("hello_frieda.json", mode="r", encoding="utf-8") as input_file:
    original_json = input_file.read()

json_data = json.loads(original_json)
mini_json = json.dumps(json_data, indent=None, separators=(",", ":"))
with open("mini_frieda.json", mode="w", encoding="utf-8") as output_file:
    output_file.write(mini_json)

```

In the code above, you use Python’s `.read()` to get the content of <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` as text. Then, you use `json.loads()` to deserialize `original_json` to `json_data`, which is a Python dictionary. You could use `json.load()` to get a Python dictionary right away, but you need the JSON data as a string first to compare it properly.

That’s also why you use `json.dumps()` to create `mini_json` and then use `.write()` instead of leveraging `json.dump()` directly to save the minified JSON data in <VPIcon icon="iconfont icon-json"/>`mini_frieda.json`.

As you learned before, `json.dumps` needs JSON data as the first argument and then accepts a value for the indentation. The default value for `indent` is `None`, so you could skip setting the argument explicitly like you do above. But with `indent=None`, you’re making your intention clear that you don’t want any indentation, which will be a good thing for others who read your code later.

The `separators` parameter for `json.dumps()` allows you to define a tuple with two values:

1. The separator between the key-value pairs or list items. By default, this separator is a comma followed by a space (`", "`).
2. The separator between the key and the value. By default, this separator is a colon followed by a space (`": "`).

By setting `separators` to `(",", ":")`, you continue to use valid JSON separators. But you tell Python not to add any spaces after the comma (`","`) and the colon (`":"`). That means that the only whitespace left in your JSON data can be whitespace appearing in key names and values. That’s pretty tight!

With both `original_json` and `mini_json` containing your JSON strings, it’s time to compare them:

```py
original_json
# 
# '{"name": "Frieda", "is_dog": true, "hobbies": ["eating", "sleeping", "barking"], "age": 8, "address": {"work": null, "home": ["Berlin", "Germany"]}, "friends": [{"name": "Philipp", "hobbies": ["eating", "sleeping", "reading"]}, {"name": "Mitch", "hobbies": ["running", "snacking"]}]}'

mini_json
# 
# '{"name":"Frieda","is_dog":true,"hobbies":["eating","sleeping","barking"], "age":8,"address":{"work":null,"home":["Berlin","Germany"]}, "friends":[{"name":"Philipp","hobbies":["eating","sleeping","reading"]}, {"name":"Mitch","hobbies":["running","snacking"]}]}'

len(original_json)
#
# 284

len(mini_json)
#
# 256
```

You can already spot the difference between `original_json` and `mini_json` when you look at the output. You then [**use the `len()` function**](/realpython.com/len-python-function.md) to verify that the size of `mini_json` is indeed smaller. If you’re curious about why the length of the JSON strings almost exactly matches the file size of the written files, then looking into [**Unicode & character encodings in Python**](/realpython.com/python-encodings-guide.md#one-byte-two-bytes-three-bytes-four) is a great idea.

Both `json` and `json.tool` are excellent helpers when you want to make JSON data look prettier, or if you want to minify JSON data to save some bytes. With the `json` module, you can conveniently interact with JSON data in your Python programs. That’s great when you need to have more control over the way you interact with JSON. The `json.tool` module comes in handy when you want to work with JSON data directly in your terminal.
