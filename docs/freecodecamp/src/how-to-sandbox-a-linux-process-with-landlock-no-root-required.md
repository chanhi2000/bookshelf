---
lang: en-US
title: "How to Sandbox a Linux Process with Landlock, No Root Required"
description: "Article(s) > How to Sandbox a Linux Process with Landlock, No Root Required"
icon: iconfont icon-c
category:
  - C
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c
  - clang
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Sandbox a Linux Process with Landlock, No Root Required"
    - property: og:description
      content: "How to Sandbox a Linux Process with Landlock, No Root Required"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-sandbox-a-linux-process-with-landlock-no-root-required.html
prev: /programming/c/articles/README.md
date: 2026-09-12
isOriginal: false
author:
  - name: Chris Roy
    url: https://freecodecamp.org/news/author/thechrisin/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d2e4d0c7-23b4-4d74-a41c-8102fa298e6a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/c/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Sandbox a Linux Process with Landlock, No Root Required"
  desc="Here's a program restricting itself, then trying to read two files: without landlock:   read /etc/hostname            ok   read /tmp/secret.txt          ok with landlock, /etc allowed:   read"
  url="https://freecodecamp.org/news/how-to-sandbox-a-linux-process-with-landlock-no-root-required"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d2e4d0c7-23b4-4d74-a41c-8102fa298e6a.png"/>

Here's a program restricting itself, then trying to read two files:

```text
without landlock:
  read /etc/hostname            ok
  read /tmp/secret.txt          ok
with landlock, /etc allowed:
  read /etc/hostname            ok
  read /tmp/secret.txt          FAILED (Permission denied)
```

There's no root, no container, no configuration file, and no daemon. The program asked the kernel to take away its own access to most of the filesystem, and the kernel obliged.

That's Landlock, which has been in the kernel since 2021 without most people noticing. This article builds that program from nothing, runs it, and then walks into the four surprises that catch people the first time.

::: note What You Need

To follow along, you'll need a kernel of 5.13 or newer, the standard headers, and a C compiler. Nothing else, and notably not root.

```sh
grep landlock /sys/kernel/security/lsm
ls /usr/include/linux/landlock.h
```

The first command matters. Landlock can be compiled into a kernel and still be inactive, because Linux Security Modules have to be enabled at boot. On this machine, that file reads `lockdown,capability,landlock,yama,apparmor`.

If `landlock` is missing from yours, add `lsm=landlock,` to the front of the existing list in your kernel command line and reboot. Ubuntu has shipped it enabled since 22.04, and current Fedora and Arch kernels carry it too, but the `grep` above is the only answer that counts for your machine.

Everything below was run on kernel 5.15.0-190-generic under Ubuntu 22.04.5, compiled with gcc 11.4, as an ordinary user with no sudo anywhere.

:::

---

## Where Landlock Sits

Linux Security Modules are a framework, not a policy. The kernel calls out to LSM hooks at decision points, before opening a file, creating a process, or mapping executable memory, and whatever modules are loaded get to say yes or no.

SELinux and AppArmor are the two most people have heard of, and both are administrator tools: someone with root writes a policy, the system loads it, and your program lives inside whatever that policy says.

Landlock inverts that. It's the first LSM a process can apply to itself, without privilege, at runtime. You don't need to convince an administrator that your program deserves a policy. The program asks for less than it currently has, and the kernel narrows it.

That "asks for less" is the whole design. Landlock can only ever remove access. There's no call that grants you something you didn't already have, which is precisely why it's safe to expose to unprivileged processes.

---

## Three System Calls and No Library

Landlock is three syscalls and glibc wraps none of them, so you call them directly through `syscall()`:

```c
static int create_ruleset(const struct landlock_ruleset_attr *attr)
{ return syscall(__NR_landlock_create_ruleset, attr, sizeof(*attr), 0); }

static int add_rule(int fd, const struct landlock_path_beneath_attr *pb)
{ return syscall(__NR_landlock_add_rule, fd, LANDLOCK_RULE_PATH_BENEATH, pb, 0); }

static int restrict_self(int fd)
{ return syscall(__NR_landlock_restrict_self, fd, 0); }
```

`landlock_create_ruleset` declares which kinds of access you intend to govern and returns a file descriptor representing the ruleset. `landlock_add_rule` adds an exception in the form of a directory you want to keep. Finally, `landlock_restrict_self` applies the whole thing to the calling process, permanently.

The `handled_access_fs` field in the ruleset attribute is the part people get backwards. It doesn't list what you're allowing. It lists the access types this ruleset is responsible for, and anything in that list is denied everywhere except the paths you explicitly add. Handle read access and you lose read access to the entire filesystem until you add rules back.

---

## A Program That Restricts Itself

Here is the whole thing:

```c :collapsed-lines
#define _GNU_SOURCE
#include <linux/landlock.h>
#include <sys/prctl.h>
#include <sys/syscall.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>

#define READ_RIGHTS (LANDLOCK_ACCESS_FS_READ_FILE | LANDLOCK_ACCESS_FS_READ_DIR)

static int create_ruleset(const struct landlock_ruleset_attr *attr)
{ return syscall(__NR_landlock_create_ruleset, attr, sizeof(*attr), 0); }

static int add_rule(int fd, const struct landlock_path_beneath_attr *pb)
{ return syscall(__NR_landlock_add_rule, fd, LANDLOCK_RULE_PATH_BENEATH, pb, 0); }

static int restrict_self(int fd)
{ return syscall(__NR_landlock_restrict_self, fd, 0); }

static int allow_read(int ruleset_fd, const char *path)
{
    struct landlock_path_beneath_attr pb = { .allowed_access = READ_RIGHTS };
    int rc;

    pb.parent_fd = open(path, O_PATH | O_CLOEXEC);
    if (pb.parent_fd < 0) { perror(path); return -1; }
    rc = add_rule(ruleset_fd, &pb);
    close(pb.parent_fd);
    return rc;
}

static void try_read(const char *path)
{
    int fd = open(path, O_RDONLY);

    if (fd < 0)
        printf("  read %-24s FAILED (%s)\n", path, strerror(errno));
    else
        { printf("  read %-24s ok\n", path); close(fd); }
}

int main(void)
{
    struct landlock_ruleset_attr attr = { .handled_access_fs = READ_RIGHTS };
    int ruleset_fd = create_ruleset(&attr);

    if (ruleset_fd < 0) { perror("landlock_create_ruleset"); return 1; }
    if (allow_read(ruleset_fd, "/etc") < 0) return 1;

    if (prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0)) { perror("prctl"); return 1; }
    if (restrict_self(ruleset_fd)) { perror("landlock_restrict_self"); return 1; }
    close(ruleset_fd);

    printf("with landlock, /etc allowed:\n");
    try_read("/etc/hostname");
    try_read("/tmp/secret.txt");
    return 0;
}
```

Build and run it:

```sh
gcc -Wall -o sandbox sandbox.c
echo "hunter2" > /tmp/secret.txt
./sandbox
```

```text
with landlock, /etc allowed:
  read /etc/hostname            ok
  read /tmp/secret.txt          FAILED (Permission denied)
```

Two details in there matter. The rule refers to a directory by an open file descriptor rather than a path string, opened with `O_PATH` so you get a handle without needing read permission on the directory itself. And `restrict_self` takes effect immediately for the calling process, with no way to undo it.

---

## Why `no_new_privs` is Mandatory

Take the `prctl` call out and the program stops working:

```text
landlock_restrict_self -> Operation not permitted
```

That's `EPERM`, and it's deliberate. `PR_SET_NO_NEW_PRIVS` tells the kernel that this process and its descendants can never gain privileges through `execve`, which is what stops a sandboxed process from escaping by running a setuid binary.

Without that guarantee, a restricted process could exec `sudo` or any setuid program and step outside the restrictions you just applied. Landlock refuses to apply itself at all rather than offer a sandbox with that hole in it. Set `no_new_privs` first, every time.

---

## Rulesets Intersect, They Never Widen

This is the property to get right. Apply a ruleset allowing <VPIcon icon="fas fa-folder-open"/>`/etc`, then apply a second allowing <VPIcon icon="fas fa-folder-open"/>`/tmp`, and ask what you can reach:

```text
after first ruleset:  /etc=ok               /tmp=Permission denied
after second ruleset: /etc=Permission denied  /tmp=Permission denied
```

The second ruleset didn't add <VPIcon icon="fas fa-folder-open"/>`/tmp`. It took away <VPIcon icon="fas fa-folder-open"/>`/etc`, and left you with nothing.

![Diagram showing a Landlock sandbox narrowing in three steps: with no ruleset all five directories are readable, after a ruleset allowing /etc only /etc is readable, and after a second ruleset allowing /tmp nothing is readable at all, because the two rulesets intersect and their overlap is empty](https://cdn.hashnode.com/uploads/covers/6a783a81a29db580b40f1bc8/3091ccb0-3d7e-4b52-8744-83a7b32848b9.png)

Each `restrict_self` intersects with everything already applied. The first ruleset permitted <VPIcon icon="fas fa-folder-open"/>`/etc` and denied the rest. The second permitted <VPIcon icon="fas fa-folder-open"/>`/tmp` and denied the rest. What survives is the overlap of those two, which is empty.

So a Landlock sandbox is a ratchet. Every application can only tighten, never loosen, and there's no operation anywhere in the API that widens what a restricted process may do. If you need a process to have access to two directories, both rules go into one ruleset before you apply it.

That also means you can't change your mind. A long-running process that restricts itself early can't be granted more later, by itself or by anyone else, short of starting a new process.

---

## What Your Children Inherit

Restrictions follow `fork` without asking:

```text
parent:       /etc=ok   /tmp/secret.txt=Permission denied
forked child: /etc=ok   /tmp/secret.txt=Permission denied
```

The child inherits the parent's Landlock domain exactly and there's no flag to opt out. The same holds across `execve`, which is the point of `no_new_privs`: the new program starts already inside the sandbox the old one built.

This is what makes Landlock useful for wrapping something you didn't write. Restrict yourself, then exec the thing you want contained, and it runs inside your restrictions without knowing they exist.

---

## The `exec` Trap

It also sets a trap. Take the program above, keep only <VPIcon icon="fas fa-folder-open"/>`/etc` allowed, and try to exec anything:

```text
allowed: /etc
execl(/usr/bin/cat) failed: Permission denied
```

Executing a binary requires reading it. This ruleset handles `LANDLOCK_ACCESS_FS_READ_FILE`, so the kernel checks whether <VPIcon icon="fas fa-folder-open"/>`/usr/bin/cat` may be read, finds no rule covering <VPIcon icon="fas fa-folder-open"/>`/usr`, and refuses before the program ever starts.

Add <VPIcon icon="fas fa-folder-open"/>`/usr` to the same ruleset and it works:

```text
allowed: /etc and /usr
devils-dell
```

The general lesson is that a Landlock sandbox has to include everything the process touches, and that set is larger than you think. Your binary, its interpreter, every shared library it loads, and any config it reads at startup. `ldd` on the binary is a good place to begin the list.

---

## Wrapping a Program You Didn't Write

Inheritance across `exec` is what makes Landlock useful beyond your own code. Restrict yourself, then exec whatever you want contained, and it runs inside the sandbox without cooperating or even knowing.

A usable wrapper needs one addition to the program above. Handle `LANDLOCK_ACCESS_FS_EXECUTE` alongside the read rights, allow the system directories any binary needs, then allow whatever working directory the user asked for:

```c :collapsed-lines
#define RIGHTS (LANDLOCK_ACCESS_FS_READ_FILE | LANDLOCK_ACCESS_FS_READ_DIR | \
                LANDLOCK_ACCESS_FS_EXECUTE)

static int add_path(int ruleset_fd, const char *path)
{
    struct landlock_path_beneath_attr pb = { .allowed_access = RIGHTS };
    int rc;

    pb.parent_fd = open(path, O_PATH | O_CLOEXEC);
    if (pb.parent_fd < 0)
        return -1;
    rc = syscall(__NR_landlock_add_rule, ruleset_fd,
                 LANDLOCK_RULE_PATH_BENEATH, &pb, 0);
    close(pb.parent_fd);
    return rc;
}

int main(int argc, char **argv)
{
    struct landlock_ruleset_attr attr = { .handled_access_fs = RIGHTS };
    const char *base[] = { "/usr", "/lib", "/lib64", "/bin", "/etc" };
    int fd, i;

    if (argc < 3) { fprintf(stderr, "usage: %s DIR CMD...\n", argv[0]); return 2; }

    fd = syscall(__NR_landlock_create_ruleset, &attr, sizeof(attr), 0);
    if (fd < 0) { perror("create_ruleset"); return 1; }

    for (i = 0; i < (int)(sizeof(base) / sizeof(*base)); i++)
        add_path(fd, base[i]);
    if (add_path(fd, argv[1]) < 0) { perror(argv[1]); return 1; }

    if (prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0)) { perror("prctl"); return 1; }
    if (syscall(__NR_landlock_restrict_self, fd, 0)) { perror("restrict_self"); return 1; }
    close(fd);

    execvp(argv[2], &argv[2]);
    fprintf(stderr, "%s: %s\n", argv[2], strerror(errno));
    return 1;
}
```

The loop ignores what `add_path` returns, so the same binary works on systems where <VPIcon icon="fas fa-folder-open"/>`/lib64` or <VPIcon icon="fas fa-folder-open"/>`/bin` are absent or symlinked somewhere else. The directory the user named is checked, because a typo there should be an error now rather than a puzzling denial later.

Now `cat` and `ls` can see the working directory and nothing else:

```sh
mkdir -p /tmp/work && echo "project data" > /tmp/work/notes.txt

./llrun /tmp/work cat /tmp/work/notes.txt
./llrun /tmp/work cat /tmp/secret.txt
./llrun /tmp/work ls /home
```

```text
project data
cat: /tmp/secret.txt: Permission denied
ls: cannot open directory '/home': Permission denied
```

Neither program was modified, recompiled, or asked for consent. `bwrap` and similar tools reach that outcome by building mount and user namespaces around the program. This gets there by asking one LSM for less, in about sixty lines, with nothing to install.

---

## Finding the Paths a Program Needs

The hard part of any sandbox isn't the API. It's the list. Programs open far more than you expect, and a path you forget shows up as a failure somewhere deep in a run.

Two tools build the list for you. `ldd` gives the shared libraries, which must be readable or the program never starts:

```sh
ldd /usr/bin/cat
```

```text
linux-vdso.so.1 (0x00007fff85f39000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f4f61bb5000)
/lib64/ld-linux-x86-64.so.2 (0x00007f4f61e0a000)
```

`strace` gives everything else. Run the program unrestricted first and collect what it opens:

```sh
strace -e trace=openat cat /etc/hostname 2>&1 | grep -oE '"/[^"]+"' | sort -u
```

```text
"/etc/hostname"
"/etc/ld.so.cache"
"/lib/x86_64-linux-gnu/libc.so.6"
"/usr/lib/locale/locale-archive"
```

Four paths for a program that prints one file, and only one of them is the file you asked for. The linker cache, the C library, and the locale archive are all mandatory, which is why the wrapper allows <VPIcon icon="fas fa-folder-open"/>`/usr`, <VPIcon icon="fas fa-folder-open"/>`/lib` and <VPIcon icon="fas fa-folder-open"/>`/etc` before it allows anything you chose.

Once restricted, `strace` also tells you exactly what a denial was:

```sh
strace -f -e trace=openat ./llrun /tmp/work cat /tmp/secret.txt 2>&1 | grep EACCES
```

```text
openat(AT_FDCWD, "/tmp/secret.txt", O_RDONLY) = -1 EACCES (Permission denied)
```

That's the loop. Run it, read the `EACCES` line, decide whether the path belongs in the ruleset or the program shouldn't be reaching for it, then repeat. Landlock logs nothing of its own on this kernel, so `strace` is the debugger. Kernels from 6.15 report denials through the audit subsystem, so check your version before hunting for a log that isn't there.

---

## Which ABI Version You Have

Landlock has grown since 5.13, and features you read about may not exist on your kernel. Ask it directly:

```c
int v = syscall(__NR_landlock_create_ruleset, NULL, 0,
                LANDLOCK_CREATE_RULESET_VERSION);
```

This machine reports `1`, which is the original from 5.13 and offers thirteen filesystem access rights:

```sh
grep -oE "LANDLOCK_ACCESS_FS_[A-Z_]+" /usr/include/linux/landlock.h | sort -u
```

```text
LANDLOCK_ACCESS_FS_EXECUTE      LANDLOCK_ACCESS_FS_MAKE_BLOCK
LANDLOCK_ACCESS_FS_MAKE_CHAR    LANDLOCK_ACCESS_FS_MAKE_DIR
LANDLOCK_ACCESS_FS_MAKE_FIFO    LANDLOCK_ACCESS_FS_MAKE_REG
LANDLOCK_ACCESS_FS_MAKE_SOCK    LANDLOCK_ACCESS_FS_MAKE_SYM
LANDLOCK_ACCESS_FS_READ_DIR     LANDLOCK_ACCESS_FS_READ_FILE
LANDLOCK_ACCESS_FS_REMOVE_DIR   LANDLOCK_ACCESS_FS_REMOVE_FILE
LANDLOCK_ACCESS_FS_WRITE_FILE
```

Later versions added file reparenting, truncation, network rules covering TCP bind and connect, and control over device ioctls. Each arrived in its own ABI bump, so a program that wants a newer right should query the version and degrade rather than assume. Passing a right the running kernel doesn't know about makes `landlock_create_ruleset` fail with `EINVAL`, which is a confusing error to debug if you haven't checked the version first.

---

## Conclusion

You can now sandbox a process from inside itself, with no privileges and no configuration, and you know the four surprises. `no_new_privs` comes first or nothing applies. Rulesets intersect rather than accumulate, so build one ruleset with everything in it. Children inherit, which is a feature. And read restrictions break `exec` unless the binary's path is allowed too.

There are a few directions to go from here. Add `LANDLOCK_ACCESS_FS_WRITE_FILE` to `handled_access_fs` and make a program that can read widely but write to exactly one directory. Wrap a program you didn't write by restricting yourself and then calling `execve`. Or look at how `strace` reports the denials, which is the fastest way to build the list of paths a real program actually needs.

---

## Epilogue

The interesting question about Landlock isn't what it does. It's what it can't express. A ruleset names paths, so the unit of authority is a location in the filesystem rather than a particular file you were handed. You can say this process may read below <VPIcon icon="fas fa-folder-open"/>`/etc`. You can't say this process may read the one file the user just picked, and nothing else.

That gap is what I've spent the last while on, building a capability-backed desktop OS in which authority arrives as a handle to one object rather than a rule about a location, with the Debian ecosystem still working underneath. Landlock does a great deal of the work, and the places it stops are where the design gets interesting.

::: note

I write about systems and their mysteries at [<VPIcon icon="fas fa-globe"/>thechris.in](https://thechris.in).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Sandbox a Linux Process with Landlock, No Root Required",
  "desc": "Here's a program restricting itself, then trying to read two files: without landlock:   read /etc/hostname            ok   read /tmp/secret.txt          ok with landlock, /etc allowed:   read",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-sandbox-a-linux-process-with-landlock-no-root-required.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
