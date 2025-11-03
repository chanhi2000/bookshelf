---
lang: en-US
title: "10 MySQL Interview Questions Every DBA Must Know"
description: "Article(s) > 10 MySQL Interview Questions Every DBA Must Know"
icon: iconfont icon-mysql
category:
  - Data Science
  - MySQL
  - Article(s)
tag:
  - blog
  - tecmint.com
  - data-science
  - sql
  - mysql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 10 MySQL Interview Questions Every DBA Must Know"
    - property: og:description
      content: "10 MySQL Interview Questions Every DBA Must Know"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/mysql-database-interview-linux.html
prev: /data-science/mysql/articles/README.md
date: 2025-10-07
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/01/mysql-interview-questions-linux.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "MySQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mysql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="10 MySQL Interview Questions Every DBA Must Know"
  desc="In this article, we cover MySQL interview questions for Linux users including installation, configuration, backups, monitoring, and troubleshooting tips."
  url="https://tecmint.com/mysql-database-interview-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/01/mysql-interview-questions-linux.webp"/>

In our previous articles, we’ve covered [**MySQL interview questions for beginners and intermediate users**](https://tecmint.com/mysql-interview-questions.md), and the response has been overwhelming. Today, we’re taking a different approach – focusing specifically on **MySQL Database Interview Questions** tailored for Linux users.

Now, some of you might be wondering why we’re separating Linux users from the rest. Well, the reason is simple. In most production environments, **MySQL** runs on Linux servers, and interviewers expect you to know more than just **SQL** queries.

They want to see if you understand how MySQL interacts with the Linux operating system, how to troubleshoot performance issues at the OS level, and how to manage databases through the command line.

We received several emails from our readers asking for questions that combine both **MySQL** and **Linux** knowledge. One reader specifically mentioned, “***Your questions are good, but they don’t cover the system administration side of MySQL which is crucial for DBA roles.***” Fair point. That’s exactly what we’re addressing today.

These questions are designed for those of you who are preparing for **Database Administrator** positions, **DevOps** roles, or **Backend Developer** interviews where Linux proficiency is expected.

Whether you’re a fresher trying to land your first job or an experienced professional looking to switch companies, these questions will help you prepare better.

---

## 1. How do you install MySQL on a Linux system, and what’s the difference between installing via package manager and source compilation?

This is often the first question interviewers ask to gauge your practical experience. When you install **MySQL** using a package manager like [**`apt`**](/tecmint.com/apt-command-in-linux.md) (<VPIcon icon="fa-brands fa-ubuntu"/>/<VPIcon icon="fa-brands fa-debian"/>) or [**yum**](/tecmint.com/20-linux-yum-yellowdog-updater-modified-commands-for-package-mangement.md) (<VPIcon icon="fa-brands fa-centos"/>/<VPIcon icon="fa-brands fa-redhat"/>), you get pre-compiled binaries that are easy to install and update.

```sh
sudo apt-get install mysql-server  # For Ubuntu/Debian
sudo yum install mysql-server      # For CentOS/RHEL
```

Source compilation, on the other hand, gives you more control over features and optimization but requires more time and expertise. You download the source code, configure it with specific options, compile it, and then install it.

Most production environments prefer package managers for ease of maintenance, but knowing source compilation shows you understand MySQL at a deeper level.

---

## 2. Where are MySQL configuration files located in Linux, and which file takes precedence?

This is a tricky one because the location varies depending on your Linux distribution, generally, **MySQL** reads configuration from multiple locations in this order:

```sh
/etc/my.cnf
/etc/mysql/my.cnf
~/.my.cnf (user-specific configuration)
```

The later files can override settings from earlier ones. In **Ubuntu**, you’ll often find the main configuration at <VPIcon icon="fas fa-folder-open"/>`/etc/mysql/mysql.conf.d/`<VPIcon icon="fas fa-gears"/>`mysqld.cnf`. Knowing this helps you troubleshoot configuration issues quickly, especially when settings don’t seem to apply even after you’ve edited a config file.

---

## 3. How do you check if MySQL service is running on Linux?

There are multiple ways to verify this, and interviewers want to see if you know more than one method:

```sh
sudo systemctl status mysql       # For systemd-based systems
sudo service mysql status         # Traditional method
ps aux | grep mysqld              # Check running processes
netstat -tlnp | grep 3306         # Check if MySQL port is listening
```

Each command gives you different information. The [**`ps` command**](/tecmint.com/ps-command-examples-for-linux-process-monitoring.md) shows you the actual MySQL process, while [**`netstat`**](/tecmint.com/20-netstat-commands-for-linux-network-management.md) confirms the port is open and listening for connections.

---

## 4. What’s the difference between stopping MySQL with systemctl and killing the mysqld process?

Now, this question separates those who’ve actually managed production databases from those who’ve only worked in development. Using `systemctl stop mysql` or `service mysql stop` sends a graceful shutdown signal to MySQL, allowing it to close all connections properly, flush data to disk, and shut down cleanly.

Killing the process with `kill -9` is like pulling the power plug – it’s an immediate termination that can corrupt your database files, especially if transactions were in progress. However, `kill -15 (SIGTERM)` is acceptable as it allows MySQL to shut down gracefully, similar to the service command.

---

## 5. How do you find MySQL error logs in Linux?

Error logs are your best friend when troubleshooting and the default location is typically `/var/log/mysql/error.log`, but you can verify this by checking your MySQL configuration or running this query inside MySQL:

```sql
SHOW VARIABLES LIKE 'log_error';
```

From the Linux side, you can [**tail the log file**](/tecmint.com/tail-command-linux.md) to see real-time errors:

```sh
sudo tail -f /var/log/mysql/error.log
```

Some of our readers mentioned that in their interviews, they were asked to diagnose a MySQL issue using only the error log. So knowing how to read and interpret these logs is crucial.

---

## 6. How do you check MySQL disk usage on Linux?

You need to know where MySQL stores its data (usually `/var/lib/mysql/`) and how to check disk usage:

```sh
sudo du -sh /var/lib/mysql/              # Total MySQL data size
sudo du -sh /var/lib/mysql/*             # Size per database
df -h                                    # Overall disk usage
```

Inside MySQL, you can also query the information schema:

```sql
SELECT table_schema AS "Database", 
       ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)" 
FROM information_schema.tables 
GROUP BY table_schema;
```

---

## 7. What’s the significance of the MySQL socket file, and where is it located?

The socket file (usually `/var/run/mysqld/mysqld.sock` or `/tmp/mysql.sock`) is used for local connections between the MySQL client and server on the same machine, which is faster than TCP/IP connections because it doesn’t involve network overhead.

If this file is missing or has the wrong permissions, you’ll get the infamous “**_Can’t connect to local MySQL server through socket_**” error. We’ve seen many developers struggle with this after system reboots or permission changes.

---

## 8. How do you backup a MySQL database from the Linux command line?

The most common method is using [**`mysqldump` command**](/tecmint.com/mysql-backup-and-restore-commands-for-database-administration.md):

```sh
mysqldump -u username -p database_name > backup.sql
```

For all databases:

```sh
mysqldump -u username -p --all-databases > all_databases.sql
```

But experienced DBAs also know about physical backups using tools like **Percona XtraBackup**, which allows hot backups without locking tables. Some interviewers dive deeper and ask about automated backup scripts using cron jobs, which brings us to the next question.

---

## 9. How would you schedule automatic MySQL backups using cron?

You’d create a backup script and schedule it with cron:

```sh
crontab -e
```

Then add a line like:

```sh
0 2 * * * /usr/bin/mysqldump -u root -pYourPassword --all-databases > /backup/mysql_$(date +\%Y\%m\%d).sql
```

This runs a backup every day at 2 AM. However, a good answer also mentions that storing passwords in cron jobs is a security risk, and you should use the `~/.my.cnf` file with proper permissions instead.

---

## 10. How do you monitor MySQL performance on Linux?

Interviewers love this question because it tests multiple skills. At the OS level, you can use:

```sh
top                    # Check CPU and memory usage
iostat                 # Check disk I/O
vmstat                 # Check system performance
```

For MySQL-specific monitoring:

```sql
SHOW PROCESSLIST;                    # See running queries
SHOW STATUS;                         # Server status variables
SHOW ENGINE INNODB STATUS;           # InnoDB specific stats
```

Tools like **mytop**, **innotop**, or **pt-query-digest** from **Percona Toolkit** are also worth mentioning.

We’ve noticed that many candidates know the SQL commands but struggle with the Linux-side monitoring tools. Both are equally important in production environments.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "10 MySQL Interview Questions Every DBA Must Know",
  "desc": "In this article, we cover MySQL interview questions for Linux users including installation, configuration, backups, monitoring, and troubleshooting tips.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/mysql-database-interview-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
