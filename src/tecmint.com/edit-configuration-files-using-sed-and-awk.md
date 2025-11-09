---
lang: en-US
title: "How to Use sed and awk to Modify Config Files in Linux"
description: "Article(s) > How to Use sed and awk to Modify Config Files in Linux"
icon: iconfont icon-shell
category:
  - Shell
  - Tool
  - sed
  - awk
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
  - sed
  - awk
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use sed and awk to Modify Config Files in Linux"
    - property: og:description
      content: "How to Use sed and awk to Modify Config Files in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/edit-configuration-files-using-sed-and-awk.html
prev: /programming/sh/articles/README.md
date: 2025-07-17
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2025/07/edit-configuration-files-using-sed-and-awk.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "awk > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/awk/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "sed > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/sed/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use sed and awk to Modify Config Files in Linux"
  desc="In this article, you’ll learn how to use sed and awk to parse, edit, and automate changes in Linux configuration files with simple examples."
  url="https://tecmint.com/edit-configuration-files-using-sed-and-awk"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2025/07/edit-configuration-files-using-sed-and-awk.webp"/>

Linux configuration files are often plain text, which makes them easily editable using command-line tools. Among the most powerful of these are [**`sed`**](/tecmint.com/linux-sed-command-tips-tricks.md) and [**`awk`**](/tecmint.com/use-linux-awk-command-to-filter-text-string-in-files.md).

While beginners may rely on manual editing with [**`vi`**](/tecmint.com/vi-editor-usage.md) or [**`nano`**](/tecmint.com/learn-nano-text-editor-in-linux.md), experienced system administrators frequently turn to these tools for automated parsing and rewriting of configuration files.

These tools allow you to match patterns, extract fields, and even make real-time changes to configuration files all from the command line or scripts.

In this article, we will explore how to use `sed` and `awk` to read, parse, and rewrite config files effectively. We’ll walk through practical examples that can help automate tedious tasks like updating IP addresses, changing parameters, or extracting values.

Let’s begin with a simple example: replacing a configuration parameter using `sed`.

---

## Example 1: Updating a Parameter with sed Command

Suppose you want to update the `ListenPort` directive in a config file such as <VPIcon icon="fas fa-folder-open"/>`/etc/ssh/`<VPIcon icon="fas fa-file-lines"/>`sshd_config`, you can do this with:

```sh
sed -i 's/^#\?ListenPort.*/ListenPort 2222/' /etc/ssh/sshd_config
```

::: info Here’s what this does:

- `-i` tells `sed` to edit the file in-place.
- `^#\?` matches lines that may or may not begin with a comment (`#`).
- `ListenPort.*` matches the rest of the line, whether it’s the default or a custom value.
- The entire line is replaced with `ListenPort 2222`.

:::

This approach confirms that even if the directive is commented out or already set to another value, it will be updated cleanly.

---

## Example 2: Extracting Values with awk Command

To extract specific values from a configuration file, `awk` is an excellent choice. For example, if you want to retrieve the value of the `PermitRootLogin` directive from the SSH configuration file, use:

```sh
awk '$1 == "PermitRootLogin" { print $2 }' /etc/ssh/sshd_config
```

::: info Here’s what this does:

- `$1 == "PermitRootLogin"` matches lines where the first field is exactly `PermitRootLogin`.
- `{ print $2 }` prints the second field, which is the actual value assigned to that directive.

:::

This command scans the file for any line that starts with `PermitRootLogin` and prints the corresponding value, typically `yes`, `no`, or `prohibit-password`.

---

## Example 3: Removing a Parameter Line Using sed Command

For example, if you need to delete any line that starts with `UseDNS` in the `/etc/ssh/sshd_config` file, you can do so quickly and efficiently using `sed` command.

```sh
sed -i '/^UseDNS/d' /etc/ssh/sshd_config
```

::: info What this does:

- `^UseDNS` matches lines that begin with UseDNS.
- The `d` command tells `sed` to delete those lines.
- The `-i` flag applies the changes directly to the file.

:::

This is handy when a deprecated or unwanted configuration is present in multiple places, and you want it to remove.

---

## Example 4: Generating a Report with awk Command

Suppose you have a custom configuration file that lists services alongside their status, like this:

```sh
apache2 running  
mysql stopped  
nginx running  
ssh running
```

You can use awk to quickly generate a summary of all services that are currently running.

```sh
awk '$2 == "running" { print $1 }' /etc/myapp/services.conf
```

::: info Here’s what it does:

- `$2 == "running"` matches lines where the second field is “**running**“.
- `{ print $1 }` outputs the service name.

:::

This produces a list of only the services that are currently running. You can expand on this by adding counters or saving the output to a log file for monitoring scripts.

---

## Example 5: Inserting a Line Before or After a Match Using sed

If you need to add a new line after a specific directive in a config file, use `sed` like this:

```sh
sed -i '/^PermitRootLogin/a Banner /etc/issue.net' /etc/ssh/sshd_config
```

::: info Here’s what it does:

- `/^PermitRootLogin/` matches the line containing `PermitRootLogin`.
- `a` appends the line after the match.
- Banner `/etc/issue.net` is the line being inserted.

:::

This is helpful when you want to keep related config options grouped together logically.

---

## Bonus: Combining awk and sed in Shell Scripts

Advanced users can even combine `awk` and `sed` in bash scripts to automate bulk configuration tasks. For example, parsing all `.conf` files in a directory and rewriting a particular parameter across each file — for example, updating a directive like `MaxConnections` to a new value.

Here’s a simple script that does exactly that:

```sh
#!/bin/bash

# Define the new value for the parameter
NEW_VALUE=500

# Loop through all .conf files in /etc/myapp/
for file in /etc/myapp/*.conf; do
  # Check if the file contains the MaxConnections directive
  if awk '$1 == "MaxConnections"' "$file" > /dev/null; then
    # Use sed to replace the existing value
    sed -i 's/^MaxConnections.*/MaxConnections '"$NEW_VALUE"'/' "$file"
    echo "Updated MaxConnections in $file"
  else
    # If the directive doesn't exist, append it to the end
    echo "MaxConnections $NEW_VALUE" >> "$file"
    echo "Added MaxConnections to $file"
  fi
done
```

::: info Here’s what this script does:

- `NEW_VALUE` to hold the updated parameter value.
- It loops through each `.conf` file in the `/etc/myapp/` directory.
- `awk` checks if the directive `MaxConnections` already exists.
- If it exists, `sed` updates the value in place.
- If not, the directive is appended to the end of the file.

:::

This kind of script is incredibly useful for managing large environments where multiple config files need consistent updates without manually editing each one.

---

## Wrapping Up

Both `sed` and `awk` are indispensable tools for Linux admins managing systems at scale. By mastering them, you can avoid repetitive manual edits and ensure your configuration changes are reliable and repeatable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use sed and awk to Modify Config Files in Linux",
  "desc": "In this article, you’ll learn how to use sed and awk to parse, edit, and automate changes in Linux configuration files with simple examples.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/edit-configuration-files-using-sed-and-awk.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
