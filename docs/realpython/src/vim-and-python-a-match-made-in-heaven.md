---
lang: en-US
title: "VIM and Python - A Match Made in Heaven"
description: "Article(s) > VIM and Python - A Match Made in Heaven"
icon: iconfont icon-vim
category:
  - Shell
  - Vim
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - linux
  - shell
  - cli
  - vi
  - vim
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > VIM and Python - A Match Made in Heaven"
    - property: og:description
      content: "VIM and Python - A Match Made in Heaven"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/vim-and-python-a-match-made-in-heaven.html
prev: /tool/vim/articles/README.md
date: 2018-06-01
isOriginal: false
author:
  - name: Aldren Santos
    url : https://realpython.com/team/asantos/
  - name: Joanna Jablonski (jablonskidev)
    url : https://realpython.com/team/jjablonski/
  - name: Michael Herman (mjhea0)
    url : https://realpython.com/team/mherman/
cover: https://files.realpython.com/media/VIM-and-Python-A-Match-Made-in-Heaven_Watermarked.de11c69564a4.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Vim > Article(s)",
  "desc": "Article(s)",
  "link": "/tools/vim/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="VIM and Python - A Match Made in Heaven"
  desc="This article details how to set up a powerful VIM environment for Python development."
  url="https://realpython.com/vim-and-python-a-match-made-in-heaven"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/VIM-and-Python-A-Match-Made-in-Heaven_Watermarked.de11c69564a4.jpg"/>

It has come to my attention that somebody ‘round these parts has been preaching the gospel of [**Sublime Text 3**](/realpython.com/setting-up-sublime-text-3-for-full-stack-python-development.md). As the resident senior developer (err, old fogey), I feel it’s my duty to tell you about the only TRUE Python development environment you will ever need: [<VPIcon icon="iconfont icon-vim"/>VIM](https://vim.org/).

That’s right. VIM is ubiquitous and fast, and it never crashes. It can also do just about anything!

On the down side though, VIM can be a pain to configure, but fear not. **This article will show you how to get a powerful VIM environment set up in a way that is geared towards wrangling Python day in and day out.**

![Vim IDE](https://files.realpython.com/media/vim-ide.90be624b30bf.png)

::: note

To get the most out of this article, you should have at least a basic understanding of how to use VIM and its command modes. If you’re just getting started, check out [<VPIcon icon="fas fa-globe"/>this resource](http://vim-adventures.com) or [<VPIcon icon="fas fa-globe"/>this one](https://openvim.com). You’ll want to spend some time with VIM and get the basics down before moving on.

:::

---

## Installing

Since VIM comes pre-installed on a number of [<VPIcon icon="fa-brands fa-wikipedia-w"/>unix](https://en.wikipedia.org/wiki/Unix-like) systems, let’s first check to see if it’s installed:

```sh
vim --version
```

If it is installed, you should see something like:

```plaintext :collapsed-lines title="output"
VIM - Vi IMproved 7.3 (2010 Aug 15, compiled Nov  5 2014 21:00:28)
Compiled by root@apple.com
Normal version without GUI.  Features included (+) or not (-):
-arabic +autocmd -balloon_eval -browse +builtin_terms +byte_offset +cindent
-clientserver -clipboard +cmdline_compl +cmdline_hist +cmdline_info +comments
-conceal +cryptv +cscope +cursorbind +cursorshape +dialog_con +diff +digraphs
-dnd -ebcdic -emacs_tags +eval +ex_extra +extra_search -farsi +file_in_path
+find_in_path +float +folding -footer +fork() -gettext -hangul_input +iconv
+insert_expand +jumplist -keymap -langmap +libcall +linebreak +lispindent
+listcmds +localmap -lua +menu +mksession +modify_fname +mouse -mouseshape
-mouse_dec -mouse_gpm -mouse_jsbterm -mouse_netterm -mouse_sysmouse
+mouse_xterm +multi_byte +multi_lang -mzscheme +netbeans_intg -osfiletype
+path_extra -perl +persistent_undo +postscript +printer -profile +python/dyn
-python3 +quickfix +reltime -rightleft +ruby/dyn +scrollbind +signs
+smartindent -sniff +startuptime +statusline -sun_workshop +syntax +tag_binary
+tag_old_static -tag_any_white -tcl +terminfo +termresponse +textobjects +title
 -toolbar +user_commands +vertsplit +virtualedit +visual +visualextra +viminfo
+vreplace +wildignore +wildmenu +windows +writebackup -X11 -xfontset -xim -xsmp
 -xterm_clipboard -xterm_save
 system vimrc file: "$VIM/vimrc"
 user vimrc file: "$HOME/.vimrc"
 user exrc file: "$HOME/.exrc"
 fall-back for $VIM: "/usr/share/vim"
Compilation: gcc -c -I. -D_FORTIFY_SOURCE=0 -Iproto -DHAVE_CONFIG_H -arch i386 -arch x86_64 -g -Os -pipe
Linking: gcc -arch i386 -arch x86_64 -o vim -lncurses
```

At this point, you want to check two things:

1. The VIM version should be higher than 7.3.
2. `+python` should show up in the list of features, so you know Python is supported.

If both of these checks pass, then move right along to [VIM Extensions](#vim-extensions). If not, it’s time to [<VPIcon icon="iconfont icon-vim"/>install/upgrade](https://vim.org/download.php).

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>

Grab [<VPIcon icon="iconfont icon-homebrew"/>Homebrew](http://brew.sh/), if you don’t already have it, and run:

```sh
brew update
brew install vim
```

@tab <VPIcon icon="fa-brands fa-linux"/>

For Debian or Ubuntu, you can try:

```sh
sudo apt-get remove vim-tiny
sudo apt-get update
sudo apt-get install vim
```

For other flavors of Linux, check the docs from your package manager. Here is a link to get you started: [<VPIcon icon="fas fa-globe"/>Install Vim](http://oss.sgi.com/LDP/HOWTO/Vim-HOWTO/introduction.html).

@tab <VPIcon icon="fa-brands fa-windows"/>

There are many different ways to install VIM on Windows. Start with the [<VPIcon icon="iconfont icon-vim"/>official docs](https://vim.org/download.php#pc).

:::

---

## Verifying Your VIM Install

Make sure you have installed VIM > 7.3 with Python support. Again, run `vim --version` to verify this. If you want to check the specific version of Python used in VIM, run `:python import sys; print(sys.version)` from within VIM:

```plaintext title="output"
2.7.6 (default, Sep  9 2014, 15:04:36)
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)]
```

This should output your current version of Python. If you get an error, then you don’t have Python support and you either need to reinstall or recompile if you’re building from source.

With VIM installed, let’s look at how to customize VIM for Python development.

---

## VIM Extensions

VIM can do a lot of what developers need right out of the box. However, it is also massively extensible, and there are some pretty killer extensions that make it behave more like a “modern” IDE. The very first thing you need is a good extension manager.

::: note

Extensions in VIM are often referred to as bundles or [<VPIcon icon="iconfont icon-vim"/>plugins](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin).

:::

### Vundle

VIM has several extension managers, but the one I strongly recommend is [Vundle](https://github.com/gmarik/Vundle.vim). Think of it as [pip](https://realpython.com/what-is-pip/) for VIM. It makes installing and updating packages trivial.

Let’s get Vundle installed:

```sh
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

This command downloads the Vundle plugin manager and chucks it in your VIM bundles directory. Now you can manage all your extensions from the <VPIcon icon="iconfont icon-vim"/>`.vimrc` [configuration file (<VPIcon icon="iconfont icon-github"/>`amix/vimrc`)](https://github.com/amix/vimrc).

Add the file to your user’s home directory:

```sh
touch ~/.vimrc
```

Now set up Vundle in your <VPIcon icon="iconfont icon-vim"/>`.vimrc` by adding the following to the top of the file:

```vim title=".vimrc"
set nocompatible              " required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" add all your plugins here (note older versions of Vundle
" used Bundle instead of Plugin)

" ...

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
```

That’s it. You’re now set up to use Vundle. Afterward, you can add the plugins you want to install, then fire up VIM and run:

```vim
:PluginInstall
```

This command tells Vundle to work its magic—downloading all the plugins and installing/updating them for you.

![Vim plugin installation](https://files.realpython.com/media/vim-plugininstall.321b07d92560.png)

::: note

If you are a Windows user, check out the [Windows Installation Instructions (<VPIcon icon="iconfont icon-github"/>`gmarik/Vundle.vim`)](https://github.com/gmarik/Vundle.vim/wiki/Vundle-for-Windows).

<SiteInfo
  name="Vundle for Windows"
  desc="Vundle, the plug-in manager for Vim. Contribute to VundleVim/Vundle.vim development by creating an account on GitHub."
  url="https://github.com/VundleVim/Vundle.vim/wiki/Vundle-for-Windows/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/edabdc5f5534369fec059130599bd73d6760d91ac505940d9adb11387c60a1cf/VundleVim/Vundle.vim"/>

:::

---

## Let’s Make an IDE

We couldn’t possibly list all the VIM features, but let’s look at a quick list of some of the powerful out-of-the-box features perfect for Python development.

### Ditch the Mouse

Probably the most important feature of VIM is that it doesn’t require a mouse (except for the graphical variants of VIM). At first, this may seem like a horrible idea, but after you invest the time—and it does take time—to learn the [<VPIcon icon="fa-brands fa-stack-overflow"/>key combinations](http://stackoverflow.com/a/5400978/1799408), you will speed up your overall workflow!

### Split Layouts

If you open a file with `:sp <filename>`, you split the layout vertically (opening the new file below the current file). If you reverse the keys to `:vs <filename>`, you get a horizontal split (opening the new file to the right of your current file).

![Split layouts in VIM](https://files.realpython.com/media/split-layouts.e69dbe4a8c03.png)

You can nest splits as well, so you can have splits inside of splits, horizontal and vertical, to your heart’s content. As we all know, we often need to look at several files at once when developing.

::: tip Pro Tip #1

Make sure to utilize tab completion to find files after typing `:sp`.

:::

::: tip Pro Tip #2

You can also specify different areas of the screen where the splits should occur by adding the following lines to the <VPIcon icon="iconfont icon-vim"/>`.vimrc` file:

```vim title=".vimrc"
set splitbelow
set splitright
```

:::

::: tip Pro Tip #3

Want to move between the splits without using the mouse? If you simply add the following to <VPIcon icon="iconfont icon-vim"/>`.vimrc`, you’ll be able to jump between splits with just one key combination:

```vim title=".vimrc"
"split navigations
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
```

Key combos:

- <kbd>Ctrl</kbd>+<kbd>J</kbd> move to the split below
- <kbd>Ctrl</kbd>+<kbd>K</kbd> move to the split above
- <kbd>Ctrl</kbd>+<kbd>L</kbd> move to the split to the right
- <kbd>Ctrl</kbd>+<kbd>H</kbd> move to the split to the left

In other words, press <kbd>Ctrl</kbd> plus the standard VIM movement key to move to a specific pane.

But wait—what is the `nnoremap` thing? In a nutshell, `nnoremap` remaps one key combination to another. The `no` part means remap the key in normal mode as opposed to visual mode. Basically, `nnoremap <C-J> <C-W><C-j>` says, in normal mode when I hit `<C-J>`, do `<C-W><C-j>` instead. More info can be found [<VPIcon icon="fa-brands fa-stack-overflow"/>here](http://stackoverflow.com/questions/3776117/what-is-the-difference-between-the-remap-noremap-nnoremap-and-vnoremap-mapping).

<SiteInfo
  name="What is the difference between the remap, noremap, nnoremap and vnoremap mapping commands in Vim?"
  desc="What is the difference between the remap, noremap, nnoremap and vnoremap mapping commands in Vim?"
  url="https://stackoverflow.com/questions/3776117/what-is-the-difference-between-the-remap-noremap-nnoremap-and-vnoremap-mapping/"
  logo="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
  preview="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"/>

:::

### Buffers

While VIM can do tabs, many users prefer [<VPIcon icon="fas fa-globe"/>buffers](http://vim.wikia.com/wiki/Vim_buffer_FAQ) and splits. You can think of a [<VPIcon icon="fa-brands fa-stack-overflow"/>buffer](http://stackoverflow.com/questions/26708822/why-do-vim-experts-prefer-buffers-over-tabs) as a recently opened file. VIM provides easy access to recent buffers. Just type `:b <buffer name or number>` to switch to an open buffer. (Auto-complete works here as well.) You can also use `:ls` to list all buffers.

::: tip Pro Tip #4

At the end of the `:ls` output, VIM will prompt with `Hit enter to continue`. You can instead type `:b <buffer number>` and pick the buffer immediately while you still have the list displayed. Doing so will save you a keystroke, and you won’t have to remember the buffer number.

:::

### Code Folding

Most “modern” IDEs provide a way to collapse (or [<VPIcon icon="fas fa-globe"/>fold](http://vim.wikia.com/wiki/Folding)) methods and classes, showing you just the class/method definition lines instead of all the code.

You can enable that in <VPIcon icon="iconfont icon-vim"/>`.vimrc` with the following lines:

```vim title=".vimrc"
" Enable folding
set foldmethod=indent
set foldlevel=99
```

This works all right, but you have to type `za` to fold (and unfold). The space key would be much better. So add this line to your <VPIcon icon="iconfont icon-vim"/>`.vimrc` file as well:

```vim title=".vimrc"
" Enable folding with the spacebar
nnoremap <space> za
```

Now you can easily hide portions of your code that you’re not currently working on.

The initial command, `set foldmethod=indent`, creates folds based upon line indents. This, however, often creates more folds than you really want. But have no fear! There are several extensions that attempt to rectify that. We recommend [<VPIcon icon="iconfont icon-github"/>`tmhedberg/SimpylFold`](https://github.com/tmhedberg/SimpylFold). Install it with Vundle by adding the following line to <VPIcon icon="iconfont icon-vim"/>`.vimrc`:

```vim title=".vimrc"
Plugin 'tmhedberg/SimpylFold'
```

::: note

Don’t forget to install the plugin - `:PluginInstall`.

:::

::: tip Pro Tip #5

Try this if you want to see the docstrings for folded code:

```vim title=".vimrc"
let g:SimpylFold_docstring_preview=1
```

:::

### Python Indentation

Of course, for code folding to work based on indentations, you want your indents to be correct. Again, VIM falls short a bit out of the box because it doesn’t handle auto-indent after a function definition. You can do two things with indentation:

1. Get indentation to follow PEP 8 standards.
2. Better handle auto-indentation.

::: tabs

@tab:active PEP 8

To add the proper PEP 8 indentation, add the following to your <VPIcon icon="iconfont icon-vim"/>`.vimrc`:

```vim title=".vimrc"
au BufNewFile,BufRead *.py
    \ set tabstop=4
    \ set softtabstop=4
    \ set shiftwidth=4
    \ set textwidth=79
    \ set expandtab
    \ set autoindent
    \ set fileformat=unix
```

This will give you the standard four spaces when you hit tab, ensure your line length doesn’t go beyond 80 characters, and store the file in a Unix format so you don’t get a bunch of conversion issues when checking into [**GitHub**](/realpython.com/python-git-github-intro.md) and/or sharing with other users.

For full stack development, you can use another `au` command for each filetype:

```vim title=".vimrc"
au BufNewFile,BufRead *.js, *.html, *.css
    \ set tabstop=2
    \ set softtabstop=2
    \ set shiftwidth=2
```

This way, you can have different settings for different filetypes. There is also a plugin called [<VPIcon icon="fas fa-globe"/>ftypes](http://vim.wikia.com/wiki/Keep_your_vimrc_file_clean) that will allow you to have a separate file for each filetype you want to maintain settings for, so use that if you see fit.

@tab Auto-Indentation

`autoindent` will help, but in some cases (like when a function signature spans multiple lines), it doesn’t always do what you want, especially when it comes to conforming to PEP 8 standards. To fix that, you can use the [<VPIcon icon="iconfont icon-github"/>`vim-scripts/indentpython.vim`](https://github.com/vim-scripts/indentpython.vim) extension:

```vim title=".vimrc"
Plugin 'vim-scripts/indentpython.vim'
```

:::

### Flagging Unnecessary Whitespace

You also want to avoid extraneous whitespace. You can have VIM flag that for you so that it’s easy to spot and then remove:

```vim title=".vimrc"
au BufRead,BufNewFile *.py,*.pyw,*.c,*.h match BadWhitespace /\s\+$/
```

This will mark extra whitespace as bad and probably color it red.

### UTF-8 Support

For the most part, you should be using UTF-8 when working with Python, especially if you’re working with Python 3. Make sure VIM knows that with the following line:

```vim title=".vimrc"
set encoding=utf-8
```

### Auto-Complete

The best plugin for Python auto-complete is [<VPIcon icon="iconfont icon-github"/>`Valloric/YouCompleteMe`](https://github.com/Valloric/YouCompleteMe). Again, use Vundle to install:

```vim title=".vimrc"
Bundle 'Valloric/YouCompleteMe'
```

Under the hood, YouCompleteMe uses a few different auto-completers (including [<VPIcon icon="iconfont icon-github"/>`davidhalter/jedi`](https://github.com/davidhalter/jedi) for Python), and it needs some C libraries to be installed for it to work correctly. The docs have very good [installation instructions (<VPIcon icon="iconfont icon-github"/>`Valloric/YouCompleteMe`)](https://github.com/Valloric/YouCompleteMe#mac-os-x-super-quick-installation), so I won’t repeat them here, but be sure you follow them.

It works out of the box pretty well, but let’s add a few customizations:

```vim title=".vimrc"
let g:ycm_autoclose_preview_window_after_completion=1
map <leader>g  :YcmCompleter GoToDefinitionElseDeclaration<CR>
```

The first line ensures that the auto-complete window goes away when you’re done with it, and the second defines a shortcut for goto definition.

::: note

My leader key is mapped to space, so `space-g` will goto definition of whatever I’m currently on. That’s helpful when I’m exploring new code.

:::

### Virtualenv Support

One issue with the goto definition above is that VIM, by default, doesn’t know anything about virtualenv, so you have to make VIM and YouCompleteMe aware of your virtualenv by adding the following lines of code to <VPIcon icon="iconfont icon-vim"/>`.vimrc`:

```vim title=".vimrc"
"python with virtualenv support
py << EOF
import os
import sys
if 'VIRTUAL_ENV' in os.environ:
  project_base_dir = os.environ['VIRTUAL_ENV']
  activate_this = os.path.join(project_base_dir, 'bin/activate_this.py')
  execfile(activate_this, dict(__file__=activate_this))
EOF
```

This determines if you are running inside a virtualenv, switches to that specific virtualenv, and then sets up your system path so that YouCompleteMe will find the appropriate site packages.

### Syntax Checking/Highlighting

You can have VIM check your syntax on each save with the [<VPIcon icon="iconfont icon-github"/>`vim-syntastic/syntastic`](https://github.com/vim-syntastic/syntastic) extension:

```vim title=".vimrc"
Plugin 'vim-syntastic/syntastic'
```

Also add PEP 8 checking with this nifty little plugin:

```vim title=".vimrc"
Plugin 'nvie/vim-flake8'
```

Finally, make your code look pretty:

```vim title=".vimrc"
let python_highlight_all=1
syntax on
```

### Color Schemes

Color schemes work in conjunction with the basic color scheme that you are using. Check out [<VPIcon icon="iconfont icon-github"/>`altercation/vim-colors-solarized`](https://github.com/altercation/vim-colors-solarized) for GUI mode, and [<VPIcon icon="iconfont icon-github"/>`jnurmine/Zenburn`](https://github.com/jnurmine/Zenburn) for terminal mode:

```vim title=".vimrc"
Plugin 'jnurmine/Zenburn'
Plugin 'altercation/vim-colors-solarized'
```

Then, just add a bit of logic to define which scheme to use based upon the VIM mode:

```vim title=".vimrc"
if has('gui_running')
  set background=dark
  colorscheme solarized
else
  colorscheme zenburn
endif
```

Solarized also ships with a dark and light theme. To make switching between them very easy (by pressing F5) add:

```vim title=".vimrc"
call togglebg#map("<F5>")
```

### File Browsing

If you want a proper file tree, then [<VPIcon icon="iconfont icon-github"/>`scrooloose/nerdtree`](https://github.com/scrooloose/nerdtree) is the way to go:

```vim title=".vimrc"
Plugin 'scrooloose/nerdtree'
```

If you want to use tabs, utilize [<VPIcon icon="iconfont icon-github"/>`jistr/vim-nerdtree-tabs`](https://github.com/jistr/vim-nerdtree-tabs):

```vim title=".vimrc"
Plugin 'jistr/vim-nerdtree-tabs'
```

Want to hide `.pyc` files? Then add the following line:

```vim title=".vimrc"
let NERDTreeIgnore=['.pyc$', '\~$'] "ignore files in NERDTree
```

### Super Searching

Want to search for basically anything from VIM? Check out [<VPIcon icon="iconfont icon-github"/>`kien/ctrlp.vim`](https://github.com/kien/ctrlp.vim):

```vim title=".vimrc"
Plugin 'kien/ctrlp.vim'
```

As you might expect, pressing <kbd>Ctrl</kbd>+<kbd>P</kbd> will enable the search, so you can just start typing. If your search matches anything close to the file you’re looking for, it will find it. Oh, and it’s not just files: it will find tags as well! For more, check out this [<VPIcon icon="fa-brands fa-youtube"/>YouTube video](http://youtu.be/9XrHk3xjYsw).

<VidStack src="youtube/9XrHk3xjYsw" />

### Line Numbering

Turn on line numbers on the side of the screen with:

```vim title=".vimrc"
set nu
```

### Git Integration

Want to perform basic git commands without leaving the comfort of VIM? Then [<VPIcon icon="iconfont icon-github"/>`tpope/vim-fugitive`](https://github.com/tpope/vim-fugitive) is the way to go:

```vim title=".vimrc"
Plugin 'tpope/vim-fugitive'
```

![VIM fugitive plugin screenshot](https://files.realpython.com/media/fugitive.3ec5e0c0d29a.png)

See it in action on [<VPIcon icon="fas fa-globe"/>VIMcasts](http://vimcasts.org/episodes/fugitive-vim---a-complement-to-command-line-git/).

### Powerline

[<VPIcon icon="iconfont icon-github"/>`powerline/powerline`](https://github.com/powerline/powerline) is a status bar that displays things like the current virtualenv, git branch, files being edited, and much more.

![The Powerline plugin for VIM (screenshot)](https://files.realpython.com/media/powerline.de2002d13317.png)

It’s written in Python, and it supports a number of other environments like zsh, bash, tmux, and IPython:

```vim title=".vimrc"
Plugin 'Lokaltog/powerline', {'rtp': 'powerline/bindings/vim/'}
```

Take a look at the [<VPIcon icon="fas fa-globe"/>official docs](http://powerline.readthedocs.org/en/latest/) for all the configuration options.

### System Clipboard

Vim usually has its own clipboard and ignores the system keyboards, but sometimes you might want to cut, copy, and/or paste to/from other applications outside of VIM. On OS X, you can access your system clipboard with this line:

```vim title=".vimrc"
set clipboard=unnamed
```

### VIM in the Shell

Finally, once you’ve mastered VIM and its keyboard shortcuts, you’ll often find yourself getting annoyed with the lack of those same shortcuts in the shell. Fear not: most shells have a VI mode. To turn it on for your shell, add the following line to `~/.inputrc`:

```vim title=".vimrc"
set editing-mode vi
```

Now, you will be able to use VIM key combos not only in the shell but also in the Python interpreter and any other tool that uses GNU Readline (most database shells). Now you have VIM everywhere!

---

## Conclusion

That’s more or less it (for Python development, at least). There are a ton of other extensions that you can use, as well as alternatives to everything detailed in this post. What are some of your favorite extensions? How have you configured VIM to match your personality?

Here is a link to my current [VIM config (<VPIcon icon="iconfont icon-github"/>`j1z0/vim-config`)](https://github.com/j1z0/vim-config/blob/master/vimrc). Got one of your own? Please share!

Thanks for reading!

::: info Resources

```component VPCard
{
  "title": "Vimcasts - Free screencasts about the text editor Vim",
  "desc": "Learn essential Vim skills",
  "link": "http://vimcasts.org/",
  "logo": "http://vimcasts.org/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "Vimdoc : the online source for Vim documentation",
  "desc": "",
  "link": "https://vimdoc.sourceforge.net/",
  "logo": "https://vimdoc.sourceforge.net/images/vim_shortcut.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "OpenVim - Interactive Vim tutorial",
  "desc": "",
  "link": "https://openvim.com/",
  "logo": "https://openvim.com/icon.png",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "Learn Vimscript the Hard Way",
  "desc": "",
  "link": "https://learnvimscriptthehardway.stevelosh.com/",
  "logo": "",
  "background": "rgba(255,255,255,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "VIM and Python - A Match Made in Heaven",
  "desc": "This article details how to set up a powerful VIM environment for Python development.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/vim-and-python-a-match-made-in-heaven.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
