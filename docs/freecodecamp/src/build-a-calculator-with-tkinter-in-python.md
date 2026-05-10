---
lang: en-US
title: "How to Build a Calculator with Tkinter in Python"
description: "Article(s) > How to Build a Calculator with Tkinter in Python"
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
      content: "Article(s) > How to Build a Calculator with Tkinter in Python"
    - property: og:description
      content: "How to Build a Calculator with Tkinter in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-calculator-with-tkinter-in-python.html
prev: /programming/py/articles/README.md
date: 2026-05-15
isOriginal: false
author:
  - name: Sara Jadhav
    url: https://freecodecamp.org/news/author/Eccentric-/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/0ae14c91-3e47-464c-b392-1026321a7764.png
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
  name="How to Build a Calculator with Tkinter in Python"
  desc="In this tutorial, you'll learn how to create a simple arithmetic calculator in Python with Tkinter. The project will be one of your first steps towards building an actual GUI in Python. This is a hand"
  url="https://freecodecamp.org/news/build-a-calculator-with-tkinter-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/0ae14c91-3e47-464c-b392-1026321a7764.png"/>

In this tutorial, you'll learn how to create a simple arithmetic calculator in Python with Tkinter. The project will be one of your first steps towards building an actual GUI in Python.

This is a hands-on tutorial, which will help you form your early GUI projects. It's meant for anyone who wants to start building visual projects in Python.

The Tkinter library is a standard built-in Python library which helps us make Graphical User Interfaces in Python. Since it's a built-in library, we don't have to separately install it. So, once you have Python installed on your computer, you just have to set it up and you're good to follow along here.

But keep in mind that Tkinter may not be installed with your Python from the distributor end. To check if it's installed or not, open your command prompt and type:

```sh
python -m tkinter
```

This will open up a Tkinter specimen window if Tkinter is installed and working on your computer.

::: note Prerequisites

Before starting, here are some prerequisites for this tutorial which will help you get the most out of it:

- Basic Python Syntax
- Understanding of how to import and use libraries and its different functions
- Understanding of how to use different attributes of the module

Now that we know what we need to proceed in this tutorial, let's actually dive-in the process!

The first step for building any project is to create a clear-cut idea of what you want to build. Let's look at what we're going to make.

:::

---

## What Do We Want to See in Our Project?

We're going to build a simple arithmetic calculator. The calculator works as follows:

- It has all the numerals (0, 1, 2, ...., 9) in a keyboard.
- It has basic arithmetic (+, -, /, \*, =) operators lining the keyboard.
- The calculator is non-resizable, that is the user can't extend the width or the height of the application window.
- The calculator has a screen above the keyboard which shows the user input and the final answer.
- Finally, the calculator has an 'AC' button which stands for 'All Clear' which erases everything on the output screen of the window and allows the user to use it again.

With this, we have a clear idea about what we're going to build.

Also, you can create the UI beforehand and place the widgets accordingly on the window. Here's an image of the UI we'll create in this tutorial:

![UI of the calculator](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/93d8458d-f829-4edb-9651-622a14f9444a.png)

---

## How to Set Up the Window

To set up our main window where we'll later add our widgets, first we need to import the Tkinter library into our program. Then we'll initialize the window using the `tk.Tk()` function. To display the window on the screen continuously until we quit manually, we'll use the `mainloop()` function. Here's what the code looks like:

```py
import tkinter as tk

# screen initialization
root = tk.Tk()

# This keeps the window active
root.mainloop()
```

The`root` variable represents our window. So, from now on, we'll be adding the widgets to this window.

When a user hits "Run", you'll see a blank window on your screen as shown in the image below. Congrats! This is your first GUI.

![Blank tkinter window](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/ee60f1d8-ea5b-415d-96bf-90941ecd9424.png)

---

## How to Name the Window

The 'tk' written on the Title Bar is the default title of the window. To set our own window title, we can use the `title()` function. The following code shows how you can do that:

```py
import tkinter as tk

root = tk.Tk()

# Naming the window
root.title("Calculator")

root.mainloop()
```

On executing the program, we get the following window:

![Blank window with title changed to 'Calculator'](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/ef6ca391-3744-4915-9118-4996124adc85.png)

Now you should be able to see that the title of the window changed successfully.

---

## How to Create Frames in the Window

After setting up the window, now we have to place the buttons on it. For placing the buttons, we need to create a container in which we'll put them.

The container could be the main window, but we'll avoid that for this project. This is because we want to place some buttons to the side of and below others to create our keyboard. To make it easier, we'll create Frame containers.

A Frame container represents a vertical column of the window. The initial dimension of the frame is 0 x 0. The frame resizes accordingly when we place a widget in it.

We'll create four frames in our window. The first frame will contain the buttons 1, 4, 7, and AC. The second frame will contain the buttons 2, 5, 8, and 0, the third frame will contain the buttons 3, 6, 9, and =, and the last frame will contain the buttons +, -, x, and / (just like in the UI shown above).

We can create frames in Tkinter using `tk.Frame()`. We'll pass the parent container for the Frame – that is, the main window in its argument. The following code should make it clear:

```py
import tkinter as tk

# screen initialization
root = tk.Tk()

# Naming the window
root.title("Calculator")

# Creating Frames
frame1 = tk.Frame(root)
frame1.pack(side='left', anchor='n')
frame2 = tk.Frame(root)
frame2.pack(side='left', anchor='n')
frame3 = tk.Frame(root)
frame3.pack(side='left', anchor='n')
frame4 = tk.Frame(root)
frame4.pack(side='left', anchor='n')

# This keeps the window active
root.mainloop()
```

The `pack()` function embeds the Frame geometrically on the window. The `side='left'` parameter embeds the Frames to the extreme left of the screen. By default, this is set to the center. `anchor='n'` tells us that the widgets should be placed starting from the very top of the frame. By default, the widgets start adding from the center of the Frame. The 'n' in the `anchor='n'` stands for 'North'.

An important thing to note is that, since we defined `frame1` early in the program, it will occupy the extreme left portion of the window. But even though `frame2` is also set to occupy extreme left, the two frames `frame1` and `frame2` won't overlap. Instead `frame2` will take a position so that it goes as far left as it can go on the window without overlapping `frame1`. So frames `frame1`, `frame2`, `frame3` and `frame4` are side by side on the left side of the window.

---

## How to Add Buttons to the Window

We can create a button widget in Tkinter by using the `tk.Button()` function. The `tk.Button()` function consists of various parameters:

- **master:** This allows us to provide the parent container in which we have to place our button. This expects a container object.
- **text:** In this parameter, we have to pass the text which we want to display on our button. This expects a string.
- **font:** This expects a tuple with the first element providing the name of the font and the next element providing the font size.
- **image:** This allows us to put an image over our button.
- **bg:** This allows us to set the background colour for our button.
- **fg:** This allows us to set the foreground colour for our button.
- **activebackground:** When the button is clicked, the colour passed in this parameter becomes visible.
- **command:** This allows us to link a command to the button.

Now that we know the basics of creating a button, lets actually create the keyboard of our calculator.

To create the keyboard, we have to put quite a few buttons on the window. To make our work easier, we'll define a function to create our buttons, just with different text. Let's look at the code below:

```py :collapsed-lines
import tkinter as tk

# screen initialization
root = tk.Tk()

# Naming the window
root.title("Calculator")

frame1 = tk.Frame(root)
frame1.pack(side='left', anchor='n')
frame2 = tk.Frame(root)
frame2.pack(side='left', anchor='n')
frame3 = tk.Frame(root)
frame3.pack(side='left', anchor='n')
frame4 = tk.Frame(root)
frame4.pack(side='left', anchor='n')

pixel = tk.PhotoImage(width=55, height=55)

def buttons(text, frame):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg="#333300", fg="white", compound="center")
    return button


def buttons_ops(text, frame, bg, fg):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg=bg, fg=fg, activebackground="black",
                        compound="center")
    return button

btn1 = buttons('1',frame1).pack()
btn4 = buttons('4', frame1).pack()
btn7 = buttons('7', frame1).pack()

btn2 = buttons('2', frame2).pack()
btn5 = buttons('5', frame2).pack()
btn8 = buttons('8', frame2).pack()
btn0 = buttons_ops('0', frame2, '#333300', 'white').pack()

plus = buttons_ops('+', frame4, 'black', 'white').pack()
minus= buttons_ops('-', frame4,  'black', 'white').pack()
mul = buttons_ops('x', frame4, 'black', 'white').pack()
div = buttons_ops('/', frame4, 'black', 'white').pack()

btn3 = buttons('3', frame3).pack()
btn6 = buttons('6', frame3).pack()
btn9 = buttons('9', frame3).pack()

# This keeps the window active
root.mainloop()
```

Now let's break it down:

First, we created an Tkinter image object via `tk.PhotoImage()`. This is a transparent image. The purpose behind creating this image is to set a perfect width and height of the button pixel-wise. The `compound='center'` ensures that the button text is aligned at the center of the transparent image.

You can change the size of the button by changing the `width` and `height` parameters of the `pixel` object.

Secondly, we created a function which takes the 'text' and the 'container frame' as the argument. Inside the function, we created a button object and returned it. For the numerical buttons, we've created the function `buttons` whereas for operator buttons, we've created the function `buttons_ops`. This was done only to ensure different style of buttons (in terms of background and foreground, and so on).

You can change the colours of the buttons by making changes in the `bg` and `fg` parameters of the `tk.Button()` function.

Then we created all the buttons with these two functions. The `pack()` function puts the buttons in their respective places. Remember that we haven't created the `=` and `AC` buttons.

When we execute the program, the following window will pop up:

![Window with embedded buttons](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/012c6883-d79b-44fa-8171-0c6cfc837b4e.png)

You can try clicking the buttons to make sure that everything is working great up to this point.

---

## How to Add the Output Screen of the Calculator

For the output screen of the calculator, we'll be using the `Entry` object in Tkinter. The `Entry` object will be the best match in this case because we want a single line screen to showcase the user input. We could also use a `Text` object, but it provides a multiline area. So here, we'll just be using the `Entry` object.

Also, since we want the output screen to be on the top of the keyboard, we need to define and embed this object before embedding the frames.

The `Entry` object is created using the `tk.Entry()` function. This has similar parameters to the `tk.Button()` function. The following code creates an entry box:

```py :collapsed-lines
import tkinter as tk

# screen initialization
root = tk.Tk()

# Naming the window
root.title("Calculator")

# creating the output screen
entry = tk.Entry(root, width=9, font=('Arial', 38, 'bold'), state='readonly')
entry.pack(pady=(30, 10))


frame1 = tk.Frame(root)
frame1.pack(side='left', anchor='n')
frame2 = tk.Frame(root)
frame2.pack(side='left', anchor='n')
frame3 = tk.Frame(root)
frame3.pack(side='left', anchor='n')
frame4 = tk.Frame(root)
frame4.pack(side='left', anchor='n')

pixel = tk.PhotoImage(width=55, height=55)

def buttons(text, frame):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg="#333300", fg="white", compound="center")
    return button


def buttons_ops(text, frame, bg, fg):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg=bg, fg=fg, activebackground="black",
                        compound="center")
    return button

btn1 = buttons('1',frame1).pack()
btn4 = buttons('4', frame1).pack()
btn7 = buttons('7', frame1).pack()

btn2 = buttons('2', frame2).pack()
btn5 = buttons('5', frame2).pack()
btn8 = buttons('8', frame2).pack()
btn0 = buttons_ops('0', frame2, '#333300', 'white').pack()

plus = buttons_ops('+', frame4, 'black', 'white').pack()
minus= buttons_ops('-', frame4,  'black', 'white').pack()
mul = buttons_ops('x', frame4, 'black', 'white').pack()
div = buttons_ops('/', frame4, 'black', 'white').pack()

btn3 = buttons('3', frame3).pack()
btn6 = buttons('6', frame3).pack()
btn9 = buttons('9', frame3).pack()

# This keeps the window active
root.mainloop()
```

In the code above, we put the parent container of the `entry` object as the main window `root`. I set the `width` parameter to 9 as it fit well with the dimensions of the window and the keyboard. You can try it out with different values for width and set a perfectly sized output screen.

You may have noticed that we didn't use the `pack()` on the same line as object definition. This is because using `pack()` on the same line as object definition is a bad practice as it limits certain functionality.

So, why did we use the `pack()` function on the same line while creating buttons? This is because we didn't work heavily with the buttons in this project, so we attempted to reduce the lines of code.

In the `tk.Entry()` function, we set `state='readonly'`. This prohibits any direct text input into the the output screen. That means, we can only use the buttons to show the characters on the output screen. By default, this is set to `state='normal'`, which allows direct input from the keyboard into the entry box.

The `pady` parameter inside the `pack()` function leaves the given amount of pixels above and below the object. To perform such an operation, let's say to pad 10 pixels on both sides of the object, we can write `pady=10` .

Here, we didn't want the same amount of padding above and below the object. So we used a tuple with first element representing the pixels to pad above the output screen, and the second element representing the pixels to pad below the output screen.

Up until now, our GUI looks as shown below:

![Window with embedded output screen](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/dc15d02d-2243-4751-b825-53d5b4061daf.png)

We can now see that the output screen is set perfectly.

---

## How to Make the Numbers Visible on the Output Screen

Next step is to make characters visible on the output screen. Every button that we click should render on the output screen. For this, we have to link commands to each button. Let's first look at the code and then see how it works:

```py :collapsed-lines
import tkinter as tk

# screen initialization
root = tk.Tk()

# Naming the window
root.title("Calculator")

entry = tk.Entry(root, width=9, font=('Arial', 38, 'bold'),state='readonly')
entry.pack(pady=(30, 10))


frame1 = tk.Frame(root)
frame1.pack(side='left', anchor='n')
frame2 = tk.Frame(root)
frame2.pack(side='left', anchor='n')
frame3 = tk.Frame(root)
frame3.pack(side='left', anchor='n')
frame4 = tk.Frame(root)
frame4.pack(side='left', anchor='n')

pixel = tk.PhotoImage(width=55, height=55)

def command(text):
    entry.config(state='normal')
    entry.insert(tk.END, text) 
    entry.config(state='readonly')  


def buttons(text, frame):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg="#333300", fg="white", compound="center",
                       command=lambda :command(text))
    return button


def buttons_ops(text, frame, bg, fg):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg=bg, fg=fg, activebackground="black",
                        compound="center", command=lambda:command(text))
    return button

btn1 = buttons('1',frame1).pack()
btn4 = buttons('4', frame1).pack()
btn7 = buttons('7', frame1).pack()

btn2 = buttons('2', frame2).pack()
btn5 = buttons('5', frame2).pack()
btn8 = buttons('8', frame2).pack()
btn0 = buttons_ops('0', frame2, '#333300', 'white').pack()

plus = buttons_ops('+', frame4, 'black', 'white').pack()
minus= buttons_ops('-', frame4,  'black', 'white').pack()
mul = buttons_ops('x', frame4, 'black', 'white').pack()
div = buttons_ops('/', frame4, 'black', 'white').pack()

btn3 = buttons('3', frame3).pack()
btn6 = buttons('6', frame3).pack()
btn9 = buttons('9', frame3).pack()

# This keeps the window active
root.mainloop()
```

In the code above, we defined a new function called `command()`. This function takes one argument `text`. Inside the function, we changed the `state` of the `entry` object to `normal` via `config`. By doing this, we can now make changes in the text of the `entry` object.

Then we used the `insert()` function for the `entry` object. The `insert()` function appends the `text` argument to the existing set of characters.

The first argument of the `insert()` function takes the index where the text will be inserted. `tk.END` represents the last character of the text in the object. The second argument of the `insert()` function takes the text that is to be inserted.

Finally, we change the `state` of the object again to `readonly` to prohibit any outside input other than our defined calculator keyboard.

Now let's look at the `buttons` and the `buttons_ops` functions. You may have noticed that we've added the `command` parameter to the `tk.Button()` function. The `lambda` tells the program to perform the command only when the button is clicked.

Collectively, `command=lambda:command(text)` means that, on clicking the buttons which we have defined up until now, it executes the `command()` function and shows the pressed button character on the output screen.

Now try clicking some buttons on your window. They should appear on the output screen as shown below:

![Image of the calculator showing input on the calculator screen](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/e8cc0cd5-dc0c-4f01-9b21-7dec6874d00f.png)

---

## How to Add a Scrollbar to the Output Screen

Now, you might have encountered a problem: when you input a large number of characters, you were able to see only the first few characters. The rest were invisible.

To tackle this, we'll add a scrollbar to the output screen.

First, we'll create a scrollbar object via `tk.Scrollbar()` before the `entry` object. The following code shows how:

```py :collapsed-lines
import tkinter as tk

# screen initialization
root = tk.Tk()

# Naming the window
root.title("Calculator")

scrollbar = tk.Scrollbar(root, orient='horizontal')

entry = tk.Entry(root, width=9, font=('Arial', 38, 'bold'), state='readonly', xscrollcommand=scrollbar.set)
entry.pack(pady=(30, 10))

scrollbar.config(command=entry.xview)
scrollbar.pack()

frame1 = tk.Frame(root)
frame1.pack(side='left', anchor='n')
frame2 = tk.Frame(root)
frame2.pack(side='left', anchor='n')
frame3 = tk.Frame(root)
frame3.pack(side='left', anchor='n')
frame4 = tk.Frame(root)
frame4.pack(side='left', anchor='n')

pixel = tk.PhotoImage(width=55, height=55)

def command(text):
    entry.config(state='normal')
    entry.insert(tk.END, text)
    entry.config(state='readonly')


def buttons(text, frame):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg="#333300", fg="white", compound="center",
                       command=lambda :command(text))
    return button


def buttons_ops(text, frame, bg, fg):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg=bg, fg=fg, activebackground="black",
                        compound="center", command=lambda:command(text))
    return button

btn1 = buttons('1',frame1).pack()
btn4 = buttons('4', frame1).pack()
btn7 = buttons('7', frame1).pack()

btn2 = buttons('2', frame2).pack()
btn5 = buttons('5', frame2).pack()
btn8 = buttons('8', frame2).pack()
btn0 = buttons_ops('0', frame2, '#333300', 'white').pack()

plus = buttons_ops('+', frame4, 'black', 'white').pack()
minus= buttons_ops('-', frame4,  'black', 'white').pack()
mul = buttons_ops('x', frame4, 'black', 'white').pack()
div = buttons_ops('/', frame4, 'black', 'white').pack()

btn3 = buttons('3', frame3).pack()
btn6 = buttons('6', frame3).pack()
btn9 = buttons('9', frame3).pack()

# This keeps the window active
root.mainloop()
```

The `orient` parameter in the `tk.Scrollbar()` object determines the nature of the scrollbar. Here, we've aligned it with the X-axis. We also added a parameter in the original `entry` object. The `xscrollcommand` sets the scrollbar to the output screen.

Then we connected the scrollbar to the entry object by setting `command=entry.xview` and embedded the scrollbar in the output screen.

The following image shows the scrollbar. You can use the arrow signs to navigate forward or backward through the text:

![Image of calculator with the scrollbar](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/29d0fd37-a94f-4bad-af24-6627055fd4b3.png)

---

## How to Add the Equal To Button

We haven't yet made the `equal to` button – so let's do that now. To start, we'll define a function called `cmd_equal()`. In this function, we'll first change the `state` of the `entry` to `normal`. Then we'll extract the text in the output screen using the `entry.get()` function and replace 'x' by '\*'. We do this because multiplication is represented by '\*' and not 'x'.

Then we'll add a `try-except` block. We'll try to evaluate the mathematical expression that we extracted using Python's built-in `eval()` function. If that's invalid, instead of throwing an error, we'll output 'Invalid' onto our screen.

```py :collapsed-lines
import tkinter as tk

# screen initialization
root = tk.Tk()

# Naming the window
root.title("Calculator")

scrollbar = tk.Scrollbar(root, orient='horizontal')

entry = tk.Entry(root, width=9, font=('Arial', 38, 'bold'), state='readonly', xscrollcommand=scrollbar.set)
entry.pack(pady=(30, 10))

scrollbar.config(command=entry.xview)
scrollbar.pack()

frame1 = tk.Frame(root)
frame1.pack(side='left', anchor='n')
frame2 = tk.Frame(root)
frame2.pack(side='left', anchor='n')
frame3 = tk.Frame(root)
frame3.pack(side='left', anchor='n')
frame4 = tk.Frame(root)
frame4.pack(side='left', anchor='n')

pixel = tk.PhotoImage(width=55, height=55)

def command(text):
    entry.config(state='normal')
    entry.insert(tk.END, text)
    entry.config(state='readonly')

def cmd_equal():
    entry.config(state='normal')
    txt = entry.get().replace('x', '*')

    try:
        result = eval(txt)

    except:
        result = 'INVALID'
    entry.delete(0, tk.END)
    entry.insert(tk.END, result)
    entry.config(state='readonly')   


def buttons(text, frame):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg="#333300", fg="white", compound="center",
                       command=lambda :command(text))
    return button


def buttons_ops(text, frame, bg, fg):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg=bg, fg=fg, activebackground="black",
                        compound="center", command=lambda:command(text))
    return button

btn1 = buttons('1',frame1).pack()
btn4 = buttons('4', frame1).pack()
btn7 = buttons('7', frame1).pack()

btn2 = buttons('2', frame2).pack()
btn5 = buttons('5', frame2).pack()
btn8 = buttons('8', frame2).pack()
btn0 = buttons_ops('0', frame2, '#333300', 'white').pack()

plus = buttons_ops('+', frame4, 'black', 'white').pack()
minus= buttons_ops('-', frame4,  'black', 'white').pack()
mul = buttons_ops('x', frame4, 'black', 'white').pack()
div = buttons_ops('/', frame4, 'black', 'white').pack()

btn3 = buttons('3', frame3).pack()
btn6 = buttons('6', frame3).pack()
btn9 = buttons('9', frame3).pack()
equal= tk.Button(frame3, text='=', font=('Arial', 20), image=pixel, bg='white', fg='black', activebackground="black",
                        compound="center", command=lambda: cmd_equal()).pack()

# This keeps the window active
root.mainloop()
```

Here, we've also used `entry.delete()`. This function will delete all the text on the output screen from the first argument's index (that is from the 0th index) to the last argument's index, that is to the end of the text (represented by `tk.END`).

Then we inserted our result onto the output screen using `entry.insert()`. An important thing to note is that we've embedded the `equal to` button below the definition of `btn9` in the same frame. This puts our `equal to` button in just the right place.

The following images show the initial and final screens, respectively.

![Calculator window showing mathematical expression](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/8051ce51-5139-4668-97e2-b5c742c687a1.png)

On clicking the equal to button:

![Calculator window showing evaluated mathematical expression](https://cdn.hashnode.com/uploads/covers/67e55054a0be57d730442ec0/1ddc6b4c-3e51-4237-b9f6-90986bff1963.png)

---

## How to Add the AC Button

Now finally, we'll define our last function: `cmd_ac()`. This function will delete everything on the output screen. We'll do this by first changing the `state` to `normal`, then using `entry.delete()`, and lastly changing the `state` back to `readonly`. Then we'll put this function in the `command()` parameter of the `ac` button.

To keep the UI from dismantling when we expand the window, we'll use the `resizable()` function. This functions takes two arguments: one corresponds to the permission to expand the width and the other to the height. To prohibit expansion of the window, we'll set both the parameters to `False`.

So the final code will be:

```py :collapsed-lines
import tkinter as tk

# screen initialization
root = tk.Tk()

# Naming the window
root.title("Calculator")

scrollbar = tk.Scrollbar(root, orient='horizontal')

entry = tk.Entry(root, width=9, font=('Arial', 38, 'bold'), state='readonly', xscrollcommand=scrollbar.set)
entry.pack(pady=(30, 10))

scrollbar.config(command=entry.xview)
scrollbar.pack()

frame1 = tk.Frame(root)
frame1.pack(side='left', anchor='n')
frame2 = tk.Frame(root)
frame2.pack(side='left', anchor='n')
frame3 = tk.Frame(root)
frame3.pack(side='left', anchor='n')
frame4 = tk.Frame(root)
frame4.pack(side='left', anchor='n')

pixel = tk.PhotoImage(width=55, height=55)

def command(text):
    entry.config(state='normal')
    entry.insert(tk.END, text)
    entry.config(state='readonly')

def cmd_ac():
    entry.config(state='normal')
    entry.delete(0, tk.END)
    entry.config(state='readonly')

def cmd_equal():
    entry.config(state='normal')
    txt = entry.get().replace('x', '*')

    try:
        result = eval(txt)

    except:
        result = 'INVALID'
    entry.delete(0, tk.END)
    entry.insert(tk.END, result)
    entry.config(state='readonly')


def buttons(text, frame):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg="#333300", fg="white", compound="center",
                       command=lambda :command(text))
    return button


def buttons_ops(text, frame, bg, fg):
    button = tk.Button(frame, text=text, font=('Arial', 20), image=pixel, bg=bg, fg=fg, activebackground="black",
                        compound="center", command=lambda:command(text))
    return button

btn1 = buttons('1',frame1).pack()
btn4 = buttons('4', frame1).pack()
btn7 = buttons('7', frame1).pack()
ac = tk.Button(frame1, text="AC", font=('Arial', 20), image=pixel, bg="#666699", fg="white", compound="center",
                        command=lambda: cmd_ac()).pack()

btn2 = buttons('2', frame2).pack()
btn5 = buttons('5', frame2).pack()
btn8 = buttons('8', frame2).pack()
btn0 = buttons_ops('0', frame2, '#333300', 'white').pack()

plus = buttons_ops('+', frame4, 'black', 'white').pack()
minus= buttons_ops('-', frame4,  'black', 'white').pack()
mul = buttons_ops('x', frame4, 'black', 'white').pack()
div = buttons_ops('/', frame4, 'black', 'white').pack()

btn3 = buttons('3', frame3).pack()
btn6 = buttons('6', frame3).pack()
btn9 = buttons('9', frame3).pack()
equal= tk.Button(frame3, text='=', font=('Arial', 20), image=pixel, bg='white', fg='black', activebackground="black",
                        compound="center", command=lambda: cmd_equal()).pack()


root.resizable(0,0) 
# This keeps the window active
root.mainloop()
```

When we hit run, this should display our final project.

---

## Wrapping Up

So now you know how to build a simple arithmetic calculator. To strengthen and build upon the concepts that you learned here, you can try to add some more functionality to this calculator. Here are some ideas for you to practice the things learnt here:

- Adding a decimal point button to the calculator to allow users work with fractional numbers.
- Adding percentage button to the calculator to allow users calculate percentages.
- Adding a delete button to the calculator which, instead of clearing entire screen, deletes one character at a time.
- Making the calculator 'computer keyboard interactive', that is, allowing input directly from the computer keyboard. (Hint for this task: changing the `state` of the `entry` object to `normal`, and adding conditions for 'invalid' expressions).

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Calculator with Tkinter in Python",
  "desc": "In this tutorial, you'll learn how to create a simple arithmetic calculator in Python with Tkinter. The project will be one of your first steps towards building an actual GUI in Python. This is a hand",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-calculator-with-tkinter-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
