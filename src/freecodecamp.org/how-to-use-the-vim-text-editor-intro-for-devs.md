---
lang: en-US
title: "How to Use the Vim Text Editor - An Introduction for Developers"
description: "Article(s) > How to Use the Vim Text Editor - An Introduction for Developers"
icon: iconfont icon-vim
category: 
  - Shell
  - Vim
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - sh
  - shell
  - vi
  - vim
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Vim Text Editor - An Introduction for Developers"
    - property: og:description
      content: "How to Use the Vim Text Editor - An Introduction for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-vim-text-editor-intro-for-devs.html
prev: /tool/vim/articles/README.md
date: 2025-02-05
isOriginal: false
author:
  - name: Tanishka Makode
    url : https://freecodecamp.org/news/author/tanishkamakode/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738684583892/739ec0fa-e8a2-4f08-a265-7fa5034c932d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Vim > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/vim/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the Vim Text Editor - An Introduction for Developers"
  desc="Imagine a carpenter without tools, a writer without a pen, or a chef without a knife—this is like trying to imagine a developer or sysadmin without a reliable text editor. For devs, text editors are the ultimate multitools, shaping how we create, man..."
  url="https://freecodecamp.org/news/how-to-use-the-vim-text-editor-intro-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738684583892/739ec0fa-e8a2-4f08-a265-7fa5034c932d.png"/>

Imagine a carpenter without tools, a writer without a pen, or a chef without a knife—this is like trying to imagine a developer or sysadmin without a reliable text editor.

For devs, text editors are the ultimate multitools, shaping how we create, manage, and transform raw data into meaningful output.

While modern editors like VS Code and Sublime Text have gained popularity for their sleek interfaces, there’s something timeless about the simplicity and power of classic tools.

Loved by some and feared by others, Vim is a text editor that has stood the test of time. Born from its predecessor Vi, Vim (Vi Improved) offers unparalleled speed, versatility, and control.

In this tutorial, you’ll learn what makes Vim so special. We’ll explore its commands, text filtering, and string manipulation capabilities to help you harness its true power.

---

## Text Editors in Linux

Linux provides a variety of text editors, each designed for different types of users - from beginners to advanced developers.

Editors like **Nano** are great for newcomers who need a simple, user-friendly experience in the terminal. Nano displays helpful commands at the bottom of the screen, making it easy to navigate without a steep learning curve.

**Gedit**, the default editor for the GNOME desktop environment, offers a clean, graphical interface ideal for basic text editing. On the other hand, **Kate** caters to KDE desktop users and provides a more feature-rich experience, with multiple windows, syntax highlighting, and an integrated terminal.

**Emacs** is a versatile and highly customizable editor that can be turned into an entire development environment, ideal for power users who want more than just a text editor.

**VS Code** and **Atom** are modern, graphical editors that offer a rich set of features, including extensions, debugging tools, and Git integration, making them favorites among developers.

### Why Do Many Devs Prefer Vim?

Despite the wide range of text editors available in Linux, Vim stands out as the preferred choice for many users, especially those who need a lightweight, fast, and highly efficient editing environment.

Vim, an improved version of the classic Vi editor, is available on nearly every Linux distribution and can be used in both graphical and terminal-based environments. Its popularity stems from its exceptional speed and efficiency.

Vim is entirely keyboard-driven, allowing you to perform complex editing tasks quickly without the need for a mouse. This makes it incredibly useful for remote work, where you may have to rely on minimal system resources.

The power of Vim lies in its **modal editing** system, which separates the text input and command modes, which you’ll learn soon. This lets you execute precise actions with a few keystrokes. Whether you're navigating a file, searching for a string, or performing complex text manipulations, Vim enables you to do it all without taking your hands off the keyboard.

Because Vim (or Vi) is pre-installed on most Linux systems, it’s often the go-to option for developers and system administrators, who rely on its ubiquity and powerful features. In short, Vim’s combination of speed, versatility, and efficiency makes it the editor of choice for many Linux users looking to boost their productivity.

---

## How to Open the Vim Editor

Opening a file in Vim is straightforward and efficient. To start editing any file, simply use the following command in your terminal:

```sh
vim <FILENAME>
```

Here, replace `<FILENAME>` with the name of the file you want to open. If the file doesn't exist, Vim will create a new file with that name. Once executed, Vim will open the file and allow you to start editing right away.

Example:

```sh
vim data.txt # A file that doesn't exist yet, so Vim creates a new file named data.txt
```

When you execute the command `vim data.txt`, Vim opened a new file named <FontIcon icon="fas fa-file-lines"/>`data.txt` because a file with this name did not previously exist in the current directory. In Vim, this is indicated by the message at the bottom of the editor, which reads: <FontIcon icon="fas fa-file-lines"/>`data.txt [NEW]`

![Creating a new file using vim command](https://cdn.hashnode.com/res/hashnode/image/upload/v1736790675984/98007e6c-cc90-42be-b853-f239f4f2e819.png)

If the file you want to edit already exists, you can open it in Vim by using the same command. You’ll be able to see its contents and make edits as needed. If you don’t see the `[New]` message at the bottom (as shown for new files), it confirms the file already exists.

---

## Modes in Vim

Vim has several modes, but the most commonly used ones are:

- **Normal Mode (Command Mode)** - Used for navigation and executing commands.
- **Insert Mode** - Used for typing and editing text.

When you open a file in Vim, it starts in Command Mode by default. This mode allows you to navigate, execute commands, and perform various operations without directly modifying the text. To edit the text in the file, you need to switch to Insert Mode.

### What is Command Mode?

Command Mode is the default mode in Vim. In this mode, you can navigate through the file using the arrow keys and cut, copy, paste, or delete the content and execute commands like saving or quitting.

To switch to Command Mode from any other mode, press the <kbd>Esc</kbd> key.

::: tip Example

If you are in Insert Mode and need to return to Command Mode to save or navigate, press <kbd>Esc</kbd>.

![Vim in command mode](https://cdn.hashnode.com/res/hashnode/image/upload/v1736791773096/298ef4f6-6fba-493d-b05c-0564290862a1.png)

:::

In the above image, `"hello.txt" 1L, 1B"` indicates that the file <FontIcon icon="fas fa-file-lines"/>`hello.txt` is open and is currently in Command Mode, which is the default mode when you open Vim. 1L Represents 1 line in the file (currently the file is empty, so there’s just one blank line). 1B Represents 1 byte (the file is currently empty)

### What is Insert Mode?

Insert Mode allows you to edit or type text in the file, similar to a traditional text editor. You can insert new lines, modify existing text, and make changes directly.

Press `i` while in Command Mode. This switches to Insert Mode and places the cursor at the current position, allowing you to start typing.

![Editor switched to INSERT mode](https://cdn.hashnode.com/res/hashnode/image/upload/v1736791793215/93d1ff39-9015-4209-8903-e29d1ccfb7c1.png)

In the above image, `-- INSERT --` indicates that the editor has been switched to Insert Mode, allowing you to type and edit text directly in the file.

Quick glance: When you open a file, always check the bottom of the terminal to determine your current mode. If the bottom line displays file-related information, you are in Command Mode. If the bottom line explicitly says `-- INSERT --`, you are in Insert Mode. If you want to go from **Command Mode to Insert Mode:** Press <kbd>i</kbd>. And from **Insert Mode to Command Mode:** Press <kbd>Esc</kbd>.

---

## Basic Vim Commands

Below are some essential commands to help you manage files efficiently in Vim.

::: note

Before using these commands, ensure you're in command mode by pressing <kbd>Esc</kbd>.

:::

### 1. Save Changes

To save the changes made to a file, use the following command:

```sh
:w
```

This writes (saves) the current file without exiting Vim.

### 2. Save Changes and Quit

If you're done editing and want to save changes and exit Vim simultaneously, use:

```sh
:wq
```

This command writes the changes and then quits the editor.

### 3. Quit Without Saving Changes

If you wish to exit without saving any changes, you can use:

```sh
:q
```

This command will close the file if no changes have been made since the last save.

### 4. Force Quit Without Saving Changes

In case you've made changes to the file but want to exit without saving them, you can force quit with:

```sh
:q!
```

The `!` overrides any unsaved changes and closes the file immediately.

---

## Cut, Copy, Paste, and Delete Commands (Plus Others)

### How to Position the Cursor for Text Manipulation

Before using any of the commands listed below (copy, cut, paste, and delete), it's important to understand where to place the cursor.

- **Copy (Yank), Cut, Delete:** For most operations, the cursor needs to be placed **at the starting point of the text** you want to act upon. This means if you're copying or cutting a word, place the cursor at the **beginning** of the word. If you're working with a line, the cursor should be anywhere on that line. For paragraph-based operations, position the cursor anywhere within the paragraph.
- **Paste:** The text will be pasted at the cursor's **current position**. So, ensure your cursor is placed where you want the copied or cut content to appear.

For example, Let’s say I have a <FontIcon icon="fas fa-file-lines"/>`file.txt` that has the following content -

```plaintext title="file.txt"
Hey readers,  
In this blog, we're learning Vim. This file is for demonstration purposes,
where we'll explore various editing commands like cut, copy, paste, and delete. Let's dive in!  

Vim is a powerful text editor that comes pre-installed on most Unix-based systems.
Mastering Vim can significantly boost your efficiency as a developer.  

To start with, let's learn some basic navigation and text manipulation commands.
Stay tuned as we break down each command with examples!
```

All the commands mentioned below will use this file as reference to explain examples.

### 1. Copy (Yank)

In Vim, copying is called "yanking." Use the following commands to copy text. The cursor's position is important to ensure the correct text is copied.

| Command | Description | Example |
| ---: | :--- | :--- |
| `yl` | Copies a letter from the current cursor position (cursor must be on the left of the letter you want to copy) | If your cursor is on the left of **"H"** in `Hey readers,` and you type `yl`, Vim will copy **"H"** (only one character). |
| `yw` | Copies a word (cursor must be at the beginning of the word) | If your cursor is on the left of **"blog,"** in the sentence, Typing `yw` will copy **"blog,"** (including the comma). |
| `yy` | Copies the entire line (cursor can be anywhere on the line) | If your cursor is at any position on line 1 **Hey readers,** Typing `yy` will copy the entire line |
| `2yy` | Copies two lines, including the current cursor line (cursor can be anywhere on the first line) | If your cursor is at any position on line 1 **Hey readers,** Typing `2yy` will copy the entire line along with the next line. |
| `y{` | Copies the rest of the paragraph above the line where the cursor currently is (and including that line) | If your cursor is anywhere inside this paragraph 2 (Vim is a powerful text editor…), Typing `y{` will copy everything from the start of this paragraph up to the cursor position. |
| `y}` | Copies the rest of the paragraph below the line where the cursor currently is (and including that line) | If your cursor is anywhere inside this paragraph 2 (Vim is a powerful text editor…), Typing `y}` will copy everything from the current cursor position down to the end of the paragraph. |
| `yG` | Copies everything from the current line to the end of the file (cursor must be at the line where you want the copy operation to start) | If your cursor is at the beginning of this line “**Vim is a powerful text editor…”,** typing yG will copy this line and everything below it until the end of the file |

### 2. Cut (Change)

Cutting in Vim is known as "changing" the text. The cut operation replaces the text. Just like with copying, the cursor's position is important when using cut commands.

| Command | Description | Example |
| --- | --- | --- |
| `cl` | Cuts a letter from the current cursor position (cursor must be on the left of the letter you want to cut) | If your cursor is on the **"H"** in `"Hey readers,"` and you type `cl`, Vim will delete **"H"** and switch to insert mode, allowing you to type a replacement. |
| `cw` | Cuts a word (cursor must be at the beginning of the word) | If your cursor is on the **"blog,"** in the sentence, typing `cw` will delete **"blog,"** (including the comma) and switch to insert mode, allowing you to type a replacement. |
| `caw` | Cuts a word along with trailing whitespace (cursor must be at the beginning of the word) | If your cursor is anywhere inside **"blog,"**, typing `caw` will delete **" blog,"** (including the preceding space) and switch to insert mode. |
| `cc` | Cuts the entire line (cursor can be anywhere on the line) | If your cursor is at any position on line 1 (`Hey readers,`), typing `cc` will delete the whole line and switch to insert mode. |
| `2cc` | Cuts two lines, including the current cursor line (cursor can be anywhere on the first line) | If your cursor is at any position on line 1 (`Hey readers,`), typing `2cc` will delete this line along with the next line and switch to insert mode. |
| `c{` | Cuts the text in the paragraph above the cursor’s location | If your cursor is anywhere inside paragraph 2 (`Vim is a powerful text editor…`), typing `c{` will delete everything from the cursor position to the start of the paragraph and switch to insert mode. |
| `c}` | Cuts the text in the paragraphs below the cursor’s location | If your cursor is anywhere inside paragraph 2 (`Vim is a powerful text editor…`), typing `c}` will delete everything from the cursor position to the end of the paragraph and switch to insert mode. |
| `cG` | Cuts everything from the current line to the end of the file (cursor must be at the line where you want the cut operation to start) | If your cursor is at the beginning of this line (`Vim is a powerful text editor…`), typing `cG` will delete this line and everything below it until the end of the file, then switch to insert mode. |

### 3. Paste

To paste the copied or cut text, use the following commands. The pasted text will appear at the **current cursor position**.

| Command | Description |
| --- | --- |
| `p` (Lowercase) | Pastes the copied or cut text **after** the cursor |
| `P` (Uppercase) | Pastes the copied or cut text **before** the cursor |

### 4. Delete

Deleting text in Vim allows you to remove unwanted text while remaining in command mode. The cursor must be positioned correctly to delete the intended text. Once deleted, you can still paste the deleted text to a new location.

| Command | Description | Example |
| --- | --- | --- |
| `dl` | Deletes a letter from the current cursor position (cursor must be on the left of the letter you want to delete) | If your cursor is on **"H"** in `"Hey readers,"` and you type `dl`, Vim will delete **"H"**. |
| `dw` | Deletes a word (cursor must be at the beginning of the word) | If your cursor is on **"blog,"** in the sentence, typing `dw` will delete **"blog,"** (including the comma). |
| `daw` | Deletes a word along with trailing whitespace (cursor must be at the beginning of the word) | If your cursor is anywhere inside **"blog,"**, typing `daw` will delete **" blog,"** (including the preceding space). |
| `dd` | Deletes the entire line (cursor can be anywhere on the line) | If your cursor is at any position on line 1 (`Hey readers,`), typing `dd` will delete the whole line. |
| `2dd` | Deletes two lines, including the current cursor line (cursor can be anywhere on the first line) | If your cursor is at any position on line 1 (`Hey readers,`), typing `2dd` will delete this line along with the next line. |
| `d{` | Deletes the paragraph above the cursor (cursor can be anywhere in the paragraph you want to delete) | If your cursor is anywhere inside paragraph 2 (`Vim is a powerful text editor…`), typing `d{` will delete everything from the cursor position to the start of the paragraph. |
| `d}` | Deletes the paragraph below the cursor (cursor can be anywhere in the paragraph you want to delete) | If your cursor is anywhere inside paragraph 2 (`Vim is a powerful text editor…`), typing `d}` will delete everything from the cursor position to the end of the paragraph. |
| `dG` | Deletes everything from the current line to the end of the file (cursor must be at the line where you want the delete operation to start) | If your cursor is at the beginning of this line (`Vim is a powerful text editor…`), typing `dG` will delete this line and everything below it until the end of the file. |

### 5. Other Useful Commands

| Commands | Description |
| --- | --- |
| `gg` | Moves the cursor to the first line of the file |
| `G` | Moves the cursor to the last line of the file |
| `:se nu` | Sets line numbers in the file |
| `:se nonu` | Removes line numbers from the file |
| `:u` | Undoes the last action |
| `:10` | Jumps to line 10 (for example) |

::: note

**Delete** removes text but doesn’t store it in the system clipboard by default. The text goes into Vim’s unnamed register, meaning it can be pasted within Vim but not outside it. **Cut** explicitly stores text in the clipboard so you can paste it outside Vim as well.

:::

---

## Search and Replace Commands

Vim provides powerful search and replace functionality that allows you to find specific words or patterns and replace them efficiently. Understanding how to search and replace text is key to improving your productivity when editing large files.

Below is a breakdown of the various search and replace commands in Vim.

### Search Commands

- **Search Forward** (`/`): When you want to search for a word or pattern below the cursor, use the `/` command. This will search forward in the file.
- **Search Backward** (`?`): Similarly, if you want to search for a word or pattern above the cursor, use the `?` command. This will search backward in the file.

After performing a search, you can navigate through the search results:

- `n`: Go to the next match in the same direction (forward if `/`, backward if `?`).
- `N`: Go to the previous match in the opposite direction (backward if `/`, forward if `?`).

### Replace Commands

Once you've located the word or pattern you want to replace, Vim provides several commands for replacing text.

| Command (In command mode) | Description |
| --- | --- |
| `/search_word` | Searches for the given word and moves the cursor to its first occurrence below the current cursor position. |
| `:s/search_word/replace_word` | Replaces the first occurrence of `search_word` with `replace_word` in the current line. |
| `:s/search_word/replace_word/g` | Replaces all occurrences of `search_word` with `replace_word` in the current line. |
| `:%s/search_word/replace_word` | Replaces the first occurrence of `search_word` with `replace_word` in the entire file. |
| `:%s/search_word/replace_word/g` | Replaces all occurrences of `search_word` with `replace_word` in the entire file. |

Here’s an example:

![In Vim, the `/Tanishka` pattern searches for an exact, case-sensitive match of the word "Tanishka."](https://cdn.hashnode.com/res/hashnode/image/upload/v1736795075490/1ecbc6f4-65ef-46a9-841d-dbb3251f8ec7.png)

![To replace "Tanishka" with another word, like "Linux," you can use the substitution command like this: `:s/Tanishka/Linux`:](https://cdn.hashnode.com/res/hashnode/image/upload/v1736794982127/c9dffdba-c250-4601-8e3b-950d875908f8.png)

![By default, this command replaces only the first occurrence of "Tanishka" in the line where the cursor is located.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736794997175/9831423d-4aab-43a1-9b06-408fb5dd4828.png)

![If you want to replace all occurrences of "Tanishka" in the same line, you need to add the `g` (global) flag after the replacement string like this: `:s/Tanishka/Linux/g`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736795009744/c53d0de2-b7b4-4154-baaa-3d28fb3c29db.png)

![This ensures that every instance of "Tanishka" in the current line is replaced with "Linux."](https://cdn.hashnode.com/res/hashnode/image/upload/v1736795017539/dac817e5-8130-44d4-8f09-d887e42cc859.png)

Similarly, the `%` symbol is used to specify the **entire file** when performing a substitution. Here's how it works in combination with the substitution command:

1. **Replace the first occurrence in each line of the file:**
    - `:%s/Tanishka/Linux`: This command replaces only the first occurrence of "Tanishka" in each line of the file.
2. **Replace all occurrences in the entire file:**
    - `:%s/Tanishka/Linux/g`: The addition of the `g` (global) flag ensures that all occurrences of "Tanishka" in every line of the file are replaced with "Linux."

---

## How to Read Files using `more` and `less`

### The `cat` command

The cat command is often used to read file content.

For example:

```sh
cat file.txt # Displays content of file
```

While the `cat` command is a straightforward tool for viewing file contents, its simplicity often falls short when working with large files or when precise navigation is required. That’s where the `more` and `less` commands come into play, offering enhanced functionality for viewing and navigating text efficiently.

### The `more` Command

The `more` command allows you to view files one screen at a time, making it a significant upgrade from `cat` when dealing with large files. But it comes with limitations in terms of backward navigation and advanced features.

Here’s the syntax for `more`:

```sh
more <FILENAME>
```

And here’s an example:

```sh
more file.txt # Displays content of file.txt one page at a time
```

Keys used while viewing:

1. <kbd>Spacebar</kbd>: Moves forward by one page
2. <kbd>Enter</kbd>: Moves forward by one line
3. <kbd>b</kbd>: Moves back by one page
4. <kbd>q</kbd>: Quit and exit file content

### The `less` Command

The `less` command is often considered a superior alternative to `more` due to its advanced navigation capabilities and flexibility. Unlike `more`, `less` allows both forward and backward navigation, making it ideal for reviewing large files or logs.

Here’s its syntax:

```sh
less <FILENAME>
```

And here’s an example:

```sh
less file.txt # Displays content of file.txt one page at a time
```

Keys used while viewing:

1. <kbd>Spacebar</kbd>: Moves forward by one page
2. <kbd>Enter</kbd>: Moves forward by one line
3. <kbd>b</kbd>: Moves back by one page
4. <kbd><FontIcon icon="fas fa-arrow-up"/></kbd>/<kbd><FontIcon icon="fas fa-arrow-down"/></kbd> arrow key: Moves up or down by one line
5. <kbd>q</kbd>: Quit and exit less

The only major difference between the `more` and `less` commands is that the less command allows bidirectional navigation, so it’s typically more convenient to use.

---

## Text Filters

A **text filter** in Linux is a command-line utility that processes text data by modifying, extracting, or formatting it before outputting the result.

### Horizontal filters

Horizontal filtering focuses on extracting, manipulating, or displaying specific lines of a file or command output. Common tools include `head`, `tail`, and `grep`.

#### 1. `head`

The head command displays the first few lines of a file. By default, it shows the first 10 lines. Here’s its syntax:

```sh
head [OPTIONS] <FILENAME>
```

::: tip Example

And here’s an example of how to use it:

```sh
head file.txt # Displays first ten lines from file.txt
head -n 5 file.txt # Displays first five lines from file.txt
```

:::

#### 2. `tail`

The tail command displays the last few lines of a file. By default, it shows the last 10 lines. Here’s its syntax:

```sh
tail [OPTIONS] <FILENAME>
```

::: tip Example

And here’s an example:

```sh
tail file.txt # Displays last ten lines from file.txt
tail -n 5 file.txt # Displays last five lines from file.txt
```

:::

#### 3. `grep`

The grep command searches for patterns within a file or input. It filters out lines that match a given pattern. Here’s its syntax:

```sh
grep [OPTIONS] [PATTERN] <FILENAME>
```

Options:

- `-i`: Case-insensitive search.
- `-v`: Invert the match (exclude matching lines).
- `-n`: Show line numbers of matches.

::: tip Example

```sh
grep Tanishka data.txt # Displays lines that have 'Tanishka' in them
grep -i Tanishka data.txt # Displays lines that have 'Tanishka' irrespective of case
grep -v Tanishka data.txt # Displays lines that do not have 'Tanishka' in them
grep -n Tanishka data.txt # Displays lines that have 'Tanishka' in them along with number line
```

:::

### Vertical Filters

1. `cut`: The cut command displays selected parts of lines from each file based on delimiters, byte positions, or character fields. Here’s its syntax:

```sh
cut [OPTION] <FILENAME>
```

It also comes with various options:

- `-c`: Extract specific characters.
- `-b`: Extract specific bytes.
- `-d`: Specify a custom delimiter (default is tab).
  - `cut -d ":" -f 2 file.txt` → Second field separated by `:`.
- `-f`: Extract specific fields.
  - `cut -d "," -f 1,3 file.csv` → Fields 1 and 3 from a CSV.

::: tipe Example

```sh
cut -c 1-10 Sample.txt # Displays characters from position 1 to 10
cut -c 5 Sample.txt # Displays character at position 5
cut -c 3,5 Sample.txt # Displays characters from position 3 and 5 only
cut -d " " -f 1 Sample.txt # Displays first field separated by a space
cut -d " " -f 2 Sample.txt # Displays second field separated by a space
cut -d " " -f 3 Sample.txt # Displays third field separated by a space
cut -d " " -f 1-3 Sample.txt # Displays first to third fields separated by a space
cut -d " " -f 1,3 Sample.txt # Displays first and third fields separated by a space
cut -d ":" -f 5 /etc/passwd # Displays fifth field separated by : in /etc/passwd
```

:::

---

## Text Summarization Tool: `wc`

The `wc` (word count) command is used to display the number of lines, words, characters, or bytes in a file or input. It is a simple yet powerful utility you can use to summarize text content.

Here’s its syntax:

```sh
wc [OPTION] <FILENAME>
```

And here are its options:

- `-l`: Displays the number of lines.
- `-w`: Displays the number of words.
- `-c`: Displays the number of bytes.
- `-m`: Displays the number of characters (useful for multibyte characters).
- `-L`: Displays the length of the longest line.

::: tip Example

```sh
wc Sample.txt # Displays line count, word count, and byte count in Sample.txt
wc -w Sample.txt # Displays number of words in Sample.txt
wc -l Sample.txt # Displays number of lines in Sample.txt
wc -L Sample.txt # Displays number of characters in longest line in Sample.txt

wc -c Sample.txt # Displays number of bytes in Sample.txt (Actual storage size)
wc -m Sample.txt # Displays number of characters in Sample.txt (Actual number of characters regardless of enoing)

# ABCD😄
wc -c above.txt # "ABCD" = 4 bytes + "😄" = 4 bytes. 4 + 4 = 8 bytes
wc -m above.txt # "ABC" = 4 + "😄" = 1 byte. 4 + 1 = 5 bytes
```

:::

---

## Final Words

In this article, we covered the basics of using Vim, a powerful and flexible text editor. We started with how to open a file in Vim and then you learned about its modes. You also learned how to navigate through files, edit text, and use features like search and replace to save time. We also explored a helpful summarization tool.

If you're new to Linux and want to build a strong foundation, check [**my previous article**](/freecodecamp.org/guide-to-rhel-linux-basics.md) where I cover the basics of Linux, including essential commands and tips for beginners. It’s a perfect starting point to complement what you’ve learned about Vim here!

Keep practising these commands, and soon they'll become second nature to you. Mastery comes with repetition, so continue experimenting and applying these fundamentals in real-world scenarios.

Stay tuned for more articles. Get ready to take your RHEL skills to the next level.

<SiteInfo
  name="Tanishka Makode | Twitter | Linktree"
  desc="Let's connect!"
  url="https://linktr.ee/tanishkamakode/"
  logo="https://assets.production.linktr.ee/profiles/_next/static/logo-assets/favicon-16x16.png"
  preview="https://linktr.ee/og/image/tanishkamakode.jpg"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Vim Text Editor - An Introduction for Developers",
  "desc": "Imagine a carpenter without tools, a writer without a pen, or a chef without a knife—this is like trying to imagine a developer or sysadmin without a reliable text editor. For devs, text editors are the ultimate multitools, shaping how we create, man...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-vim-text-editor-intro-for-devs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
