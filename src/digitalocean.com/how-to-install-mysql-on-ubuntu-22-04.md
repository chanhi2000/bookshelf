---
lang: en-US
title: "Step-by-Step MySQL Installation on Ubuntu"
description: "Article(s) > Step-by-Step MySQL Installation on Ubuntu"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Data Science
  - MySQL
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - devops
  - linux
  - debian
  - ubuntu
  - data-science
  - sql
  - mysql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Step-by-Step MySQL Installation on Ubuntu"
    - property: og:description
      content: "Step-by-Step MySQL Installation on Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-mysql-on-ubuntu-22-04.html
prev: /devops/linux-debian/articles/README.md
date: 2022-04-27
isOriginal: false
author: Mark Drake
cover: https://community-cdn-digitalocean-com.global.ssl.fastly.net/M1bswVs7zkuTaBacgsKxDCB4
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="Step-by-Step MySQL Installation on Ubuntu"
  desc="Install and secure MySQL on Ubuntu with copy-paste commands, service management, firewall rules, and tests to get running fast. "
  url="https://digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-22-04"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://community-cdn-digitalocean-com.global.ssl.fastly.net/M1bswVs7zkuTaBacgsKxDCB4"/>

## Introduction

[<VPIcon icon="iconfont icon-mysql"/>MySQL](https://mysql.com/) is an open-source database management system, commonly installed as part of the popular [**LAMP**](/digitaloccean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-22-04) (Linux, Apache, MySQL, PHP/Python/Perl) stack. It implements the relational model and uses Structured Query Language (better known as SQL) to manage its data.

This MySQL on Ubuntu installation guide ensures you follow secure, production-ready steps from start to finish.

---

## Key Takeaways

- **Install MySQL Quickly:** Update your package index and run `sudo apt install mysql-server` to install MySQL from [Ubuntu’s official repositories](https://help.ubuntu.com/community/Repositories/Ubuntu). This will automatically set up and start the MySQL service. Check that MySQL is running with `sudo systemctl status mysql`. These simple commands get you a working database server on Ubuntu in just a few minutes.
- **Secure and Configure Root:** Use `sudo mysql` to access the MySQL shell, then `ALTER USER` to set a strong password for the root account. Run `sudo mysql_secure_installation` to remove insecure defaults, disable remote root access, and enforce password policies. These steps are essential for protecting your database from unauthorized users and security threats.
- **Create a Dedicated User:** After installation, create a new MySQL user for your applications using `CREATE USER` and `GRANT` commands. Avoid using the root account for daily tasks. A dedicated user with only the permissions needed for your app reduces the risk of accidental changes and improves overall database security.
- **Manage MySQL Service:** Use `sudo systemctl start mysql` to start, `sudo systemctl stop mysql` to stop, and `sudo systemctl restart mysql` to restart the MySQL service as needed. To ensure MySQL always starts after a reboot, enable it with `sudo systemctl enable mysql`. Regularly check service status and logs to keep your database reliable and available.
- **Configure UFW Firewall:** By default, MySQL listens only on localhost, blocking remote connections. If you need remote access, restrict it to trusted IPs with `sudo ufw allow from <YOUR_IP> to any port 3306`. Always avoid opening port 3306 to the whole internet—this keeps your database safe from unauthorized access and brute-force attacks.
- **Enable on Boot Made Simple:** Wondering how to enable MySQL to start on boot in Ubuntu? Use `sudo systemctl enable mysql` to ensure the database service automatically comes online after every reboot, keeping your apps running without manual intervention.

This tutorial will go over how to install MySQL version 8.0 on an Ubuntu server (tested on 22.04 and later). By completing it, you will have a working relational database that you can use to build your next website or application.

1-click deploy a MySQL database using [<VPIcon icon="iconfont icon-digitalocean"/>DigitalOcean Managed Databases](https://digitalocean.com/products/managed-databases). Let DigitalOcean focus on scaling, maintenance, and upgrades for your database.

::: note Prerequisites

To follow this tutorial, you will need:

- **Ubuntu server (22.04 or later, x86_64) with a non-root sudo user and SSH access.** If needed, set this up first with the [**Initial Server Setup with Ubuntu**](/digitalocean.com/initial-server-setup-with-ubuntu-22-04.md).
- **Network + APT access.** Ensure outbound access to Ubuntu repositories; run `sudo apt update && sudo apt upgrade -y` beforehand.
- **Firewall configured with UFW.** Allow SSH; keep MySQL local-only by default. If remote access is required later, you will add an IP-restricted rule for port **3306**.
- **Port availability.** Confirm no other service is bound to **3306** (`sudo ss -lntp | grep 3306 || true`).
- **System resources.** Minimum ~1 GB RAM and 1 GB free disk for MySQL data and logs (more for production workloads).
- **Time sync + basic tools.** Enable system time sync (`systemd-timesyncd`) and have editors/log tools available (e.g., `nano`, `less`, `journalctl`).
- **Backups/maintenance window (if upgrading or removing).** Back up existing databases and plan downtime before changes that affect running services.

**Note:** This tutorial is tested and compatible with Ubuntu **22.04 LTS**, Ubuntu **24.04 LTS**, and Ubuntu **25.04**. All commands and configurations work across these versions with minimal differences noted where applicable.

---

## Step 1 — How to Install MySQL on Ubuntu

With the prerequisites in place, begin by installing MySQL from [<VPIcon icon="fa-brands fa-ubuntu"/>Ubuntu’s APT repositories](https://packages.ubuntu.com/). This approach is fast, stable, and supported on Ubuntu (22.04 and later), so you can get a working server without extra repos or manual builds. In the next few commands you’ll install the server package, ensure the service is running locally, and prepare the system for secure configuration in the following step.

This section guides you through installing MySQL on Ubuntu (22.04 and later) using APT so you have a running database server ready for configuration. You’ll learn how to install MySQL Server on Ubuntu and ensure the service is active, laying the foundation for a secure and functional deployment.

On modern Ubuntu versions (22.04 and later), you can install MySQL using the APT package repository. At the time of this writing, the version of MySQL available in the default Ubuntu repository is from the MySQL 8.x series (on Ubuntu 22.04 and 24.04). Exact version may vary depending on your Ubuntu release. This process covers installing MySQL on Ubuntu and will help you install the MySQL server efficiently and securely.

To install it, update the package index on your server if you’ve not done so recently:

```sh
sudo apt update
```

Then install the `mysql-server` package:

```sh
sudo apt install mysql-server
```

Ensure that the server is running using the `systemctl start` command:

```sh
sudo systemctl start mysql.service
```

These commands will install and start MySQL, but will not prompt you to set a password or make any other configuration changes. Because this leaves your installation of MySQL insecure, we will address this next.

For reference, you can review the [<VPIcon icon="iconfont icon-mysql"/>official MySQL installation documentation](https://dev.mysql.com/doc/refman/8.0/en/installing.html) to understand the available installation methods and version notes.

---

## Step 2 — How to Configure MySQL on Ubuntu

Here you will configure security settings and configure the MySQL root password on Ubuntu to protect your database from unauthorized access. This step is crucial for hardening your MySQL installation and ensuring only trusted users can access your data.

For fresh installations of MySQL, you’ll want to run the database management system’s included security script. This script changes some of the less secure default options for things like disallowing remote **root** logins and removing sample users. Importantly, you’ll also configure the MySQL root password on Ubuntu, which is essential for database security.

::: warning

As of July 2022, an error will occur when you run the `mysql_secure_installation` script without some further configuration. The reason is that this script will attempt to set a password for the installation’s **root** MySQL account but, by default on Ubuntu installations, this account is not configured to connect using a password.

On Ubuntu 24.04, the default behavior is the same as 22.04: the root account uses `auth_socket`. Adjust authentication before running `mysql_secure_installation`.

Prior to July 2022, this script would silently fail after attempting to set the **root** account password and continue on with the rest of the prompts. However, as of this writing the script will return the following error after you enter and confirm a password:

```plaintext title="output"
... Failed! Error: SET PASSWORD has no significance for user 'root'@'localhost' as the authentication method used doesn't store authentication data in the MySQL server. Please consider using ALTER USER instead if you want to change authentication parameters.

New password:
```

This will lead the script into a recursive loop which you can only get out of by closing your terminal window.

Because the `mysql_secure_installation` script performs a number of other actions that are useful for keeping your MySQL installation secure, it’s still recommended that you run it before you begin using MySQL to manage your data. To avoid entering this recursive loop, though, you’ll need to first adjust how your **root** MySQL user authenticates.

First, open up the MySQL prompt:

```sh
sudo mysql
```

Then run the following `ALTER USER` command to change the **root** user’s authentication method to one that uses a password. The following example changes the authentication method to `mysql_native_password`:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

After making this change, exit the MySQL prompt:

```sh
exit
```

Following that, you can run the `mysql_secure_installation` script without issue.

:::

Run the security script with `sudo`:

```sh
sudo mysql_secure_installation

```

This will take you through a series of prompts where you can make some changes to your MySQL installation’s security options. The first prompt will ask whether you’d like to set up the [<VPIcon icon="iconfont icon-mysql"/>Validate Password Plugin](https://dev.mysql.com/doc/mysql-secure-deployment-guide/5.7/en/secure-deployment-password-validation.html), which can be used to test the password strength of new MySQL users before deeming them valid.

If you elect to set up the Validate Password Plugin, any MySQL user you create that authenticates with a password will be required to have a password that satisfies the policy you select:

```plaintext title="output"
Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

Press y|Y for Yes, any other key for No: Y

There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:
 2
```

Regardless of whether you choose to set up the Validate Password Plugin, the next prompt will be to set a password for the MySQL **root** user. Enter and then confirm a secure password of your choice:

```plaintext title="output"
Please set the password for root here.

New password:

Re-enter new password:
```

Note that even though you’ve set a password for the **root** MySQL user, this user is not currently configured to authenticate with a password when connecting to the MySQL shell.

If you used the Validate Password Plugin, you’ll receive feedback on the strength of your new password. Then the script will ask if you want to continue with the password you just entered or if you want to enter a new one. Assuming you’re satisfied with the strength of the password you just entered, enter `Y` to continue the script:

```plaintext title="output"
Estimated strength of the password: 100
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y
```

From there, you can press <kbd>Y</kbd> and then <kbd>ENTER</kbd> to accept the defaults for all the subsequent questions. This will remove some anonymous users and the test database, disable remote root logins, and load these new rules so that MySQL immediately respects the changes you have made.

::: note

Once the security script completes, you can then reopen MySQL and change the **root** user’s authentication method back to the default, `auth_socket`. To authenticate as the **root** MySQL user using a password, run this command:

```sh
mysql -u root -p
```

Then go back to using the default authentication method using this command:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket;
```

This will mean that you can once again connect to MySQL as your **root** user using the `sudo mysql` command.

:::

Once the script completes, your MySQL installation will be secured. You can now move on to creating a dedicated database user with the MySQL client.

---

## Step 3 — How to Create a Dedicated MySQL User and Granting Privileges

This section explains how to create a non-root MySQL user with the minimum privileges required for applications, improving security and manageability. By setting up dedicated users, you avoid exposing the powerful root account for daily operations.

Upon installation, MySQL creates a **root** user account which you can use to manage your database. This user has full privileges over the MySQL server, meaning it has complete control over every database, table, user, and so on. Because of this, it’s best to avoid using this account outside of administrative functions. This step outlines how to use the **root** MySQL user to create a new user account and grant it privileges.

In Ubuntu systems running MySQL 5.7 (and later versions), the **root** MySQL user is set to authenticate using the `auth_socket` plugin by default rather than with a password. This plugin requires that the name of the operating system user that invokes the MySQL client matches the name of the MySQL user specified in the command, so you must invoke `mysql` with `sudo` privileges to gain access to the **root** MySQL user:

```sh
sudo mysql
```

::: note

If you installed MySQL with another tutorial and enabled password authentication for **root**, you will need to use a different command to access the MySQL shell. The following will run your MySQL client with regular user privileges, and you will only gain administrator privileges within the database by authenticating:

```sh
mysql -u root -p
```

:::

Once you have access to the MySQL prompt, you can create a new user with a `CREATE USER` statement. These follow this general syntax:

```sql
CREATE USER 'username'@'host' IDENTIFIED WITH authentication_plugin BY 'password';
```

After `CREATE USER`, you specify a username. This is immediately followed by an `@` sign and then the hostname from which this user will connect. If you only plan to access this user locally from your Ubuntu server, you can specify `localhost`. Wrapping both the username and host in single quotes isn’t always necessary, but doing so can help to prevent errors.

You have several options when it comes to choosing your user’s authentication plugin. The `auth_socket` plugin mentioned previously can be convenient, as it provides strong security without requiring valid users to enter a password to access the database. But it also prevents remote connections, which can complicate things when external programs need to interact with MySQL.

As an alternative, you can leave out the `WITH authentication_plugin` portion of the syntax entirely to have the user authenticate with MySQL’s default plugin, `caching_sha2_password`. The MySQL documentation recommends this plugin, [<VPIcon icon="iconfont icon-mysql"/>caching_sha2_password](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password), for users who want to log in with a password due to its strong security features.

Run the following command to create a user that authenticates with `caching_sha2_password`. Be sure to change `sammy` to your preferred username and `password` to a strong password of your choosing:

```sql
CREATE USER 'sammy'@'localhost' IDENTIFIED BY 'password';
```

::: note

There is a known issue with some versions of PHP that causes problems with `caching_sha2_password`. If you plan to use this database with a PHP application — phpMyAdmin, for example — you may want to create a user that will authenticate with the older, though still secure, `mysql_native_password` plugin instead:

```sql
CREATE USER 'sammy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

If you aren’t sure, you can always create a user that authenticates with `caching_sha2_password` and then `ALTER` it later on with this command:

```sql
ALTER USER 'sammy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

:::

After creating your new user, you can grant them the appropriate privileges. The general syntax for granting user privileges is as follows:

```sql
GRANT PRIVILEGE ON database.table TO 'username'@'host';
```

The `PRIVILEGE` value in this example syntax defines what actions the user is allowed to perform on the specified `database` and `table`. You can grant multiple privileges to the same user in one command by separating each with a comma. You can also grant a user privileges globally by entering asterisks (`*`) in place of the database and table names. In SQL, asterisks are special characters used to represent “all” databases or tables.

To illustrate, the following command grants a user global privileges to `CREATE`, `ALTER`, and `DROP` databases, tables, and users, as well as the power to `INSERT`, `UPDATE`, and `DELETE` data from any table on the server. It also grants the user the ability to query data with `SELECT`, create foreign keys with the `REFERENCES` keyword, and perform `FLUSH` operations with the `RELOAD` privilege. However, you should only grant users the permissions they need, so feel free to adjust your own user’s privileges as necessary.

You can find the full list of available privileges in [<VPIcon icon="iconfont icon-mysql"/>the official MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#privileges-provided-summary).

Run this `GRANT` statement, replacing `sammy` with your own MySQL user’s name, to grant these privileges to your user:

```sql
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, INDEX, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'sammy'@'localhost' WITH GRANT OPTION;
```

Note that this statement also includes `WITH GRANT OPTION`. This will allow your MySQL user to grant any permissions that it has to other users on the system.

::: warning

Some users may want to grant their MySQL user the `ALL PRIVILEGES` privilege, which will provide them with broad superuser privileges akin to the **root** user’s privileges, like so:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;
```

Such broad privileges **should not be granted lightly**, as anyone with access to this MySQL user will have complete control over every database on the server.

:::

Following this, it’s good practice to run the `FLUSH PRIVILEGES` command. This will free up any memory that the server cached as a result of the preceding `CREATE USER` and `GRANT` statements:

```sql
FLUSH PRIVILEGES;
```

Then you can exit the MySQL client:

```sh
exit
```

In the future, to log in as your new MySQL user, you’d use a command like the following:

```sh
mysql -u sammy -p
```

The `-p` flag will cause the MySQL client to prompt you for your MySQL user’s password in order to authenticate.

Finally, let’s test the MySQL installation.

---

## Step 4 — How to Test MySQL

This step verifies your MySQL installation by checking its status and performing simple operations to ensure it is working properly. You’ll confirm that the MySQL service is running and that you can connect, create databases, and interact with the server as expected.

To verify MySQL is running, check its status:

```sh
systemctl status mysql.service
#
# ● mysql.service - MySQL Community Server
#      Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
#      Active: active (running) since Mon 2022-04-11 16:04:39 UTC; 2h 36min ago
#     Process: 2593 ExecStartPre=/usr/share/mysql/mysql-systemd-start pre (code=exited, status=0/SUCCESS)
#    Main PID: 2601 (mysqld)
#      Status: "Server is operational"
#       Tasks: 38 (limit: 1119)
#      Memory: 354.3M
#         CPU: 19.944s
#      CGroup: /system.slice/mysql.service
#              └─2601 /usr/sbin/mysqld
```

::: note

Version numbers and output may differ slightly depending on your Ubuntu repository version and MySQL package updates.

:::

If MySQL isn’t running, start it with:

```sh
sudo systemctl start mysql
```

To further test, connect with `mysqladmin` as your MySQL user (replace `sammy` with your username):

```sh
mysqladmin -p -u sammy version
#
# mysqladmin  Ver 8.0.28-0ubuntu4 for Linux on x86_64 ((Ubuntu))
# Copyright (c) 2000, 2022, Oracle and/or its affiliates.
# 
# Oracle is a registered trademark of Oracle Corporation and/or its
# affiliates. Other names may be trademarks of their respective
# owners.
# 
# Server version          8.0.28-0ubuntu4
# Protocol version        10
# Connection              Localhost via UNIX socket
# UNIX socket             /var/run/mysqld/mysqld.sock
# Uptime:                 2 hours 31 min 57 sec
# 
# Threads: 2  Questions: 25  Slow queries: 0  Opens: 160  Flush tables: 3  Open tables: 79  Queries per second avg: 0.000
```

To test database creation and listing, use:

```sh
mysql -u sammy -p -e "CREATE DATABASE appdb; SHOW DATABASES;"
#
# Enter password:
# Database
# appdb
# information_schema
# mysql
# performance_schema
# sys
```

This confirms you can create and list databases, and that MySQL is up and running.

---

## How to Connect to MySQL from Applications

Once MySQL is running, test application connectivity to confirm everything works end-to-end.

### Python Example

```sh
pip install mysql-connector-python
```

```py
import mysql.connector
cnx = mysql.connector.connect(host="localhost", user="app", password="•••", database="appdb")
cur = cnx.cursor(); cur.execute("SELECT 1"); print(cur.fetchone()); cur.close(); cnx.close()
```

### Node.js Example

```sh
npm install mysql2
```

```js
const mysql = require('mysql2/promise');
(async () => {
  const conn = await mysql.createConnection({host:'localhost', user:'app', password:'•••', database:'appdb'});
  const [rows] = await conn.execute('SELECT 1 AS ok'); console.log(rows[0]); await conn.end();
})();
```

### PHP Example (PDO)

```php
<?php
$pdo = new PDO('mysql:host=localhost;dbname=appdb','app','•••');
var_dump($pdo->query('SELECT 1 AS ok')->fetch());
```

These examples validate that your application can connect to MySQL and run queries, closing the loop from installation to real usage.

::: tip Best Practices

- **Use environment variables or a secrets manager** (not hard-coded strings) for database credentials.
- **Enable SSL/TLS** for production connections; require `REQUIRE SSL` on users that connect over the network.
- **Apply least privilege**: per-app users with `GRANT` limited to the specific database (avoid `*.*`).
- **Rotate credentials** and revoke unused accounts; audit `mysql.user` regularly.
- **Use parameterized queries/ORM binding** to prevent SQL injection; never concatenate user input.
- **Back up and monitor**: scheduled dumps or physical backups, error logs, replication status, and disk utilization.

:::

---

## Managing the MySQL Service

Learn how to start, stop, restart, and enable MySQL to start on boot in Ubuntu so you can control uptime and reliability. Service management is essential for maintaining your MySQL server’s availability and ensuring it recovers automatically after reboots.

MySQL on [<VPIcon icon="iconfont icon-digitalocean"/>Ubuntu](https://digitalocean.com/community/tags/ubuntu) (22.04 and later) uses `systemd` for service management. Use the following commands to control the MySQL service, including how to start MySQL and enable it to start on boot in Ubuntu:

```sh
sudo systemctl start mysql     # Start MySQ
sudo systemctl stop mysql      # Stop MySQL
sudo systemctl restart mysql   # Restart MySQL
# Check MySQL status
sudo systemctl status mysql
#
# ● mysql.service - MySQL Community Server
#      Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
#      Active: active (running) since ...
#      ...
sudo systemctl enable mysql   # Enable MySQL to start on boot
sudo systemctl disable mysql  # Disable MySQL from starting on boot
```

These commands allow you to start, stop, restart, check the status of, and control auto-start for the MySQL service using standard `systemd` utilities on Ubuntu (22.04 and 24.04).

---

## How to Configure the MySQL Firewall Rules (UFW)

Configure your [**MySQL UFW Firewall settings**](/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu.md) to control remote access and reduce attack surface. Limiting network access to your MySQL server is a critical security measure, especially when running production databases.

By default, MySQL listens only on `localhost` (127.0.0.1), making it inaccessible from remote hosts, which is secure for most use cases. If you need to allow remote access (for example, from another server), you must explicitly allow traffic on port 3306 using mysql ufw firewall rules.

```sh
# Allow remote access from a specific IP
sudo ufw allow from <YOUR_IP> to any port 3306 

# Check UFW status and rules
sudo ufw status
```

::: tip Security best practice

Only allow trusted IP addresses to access MySQL port 3306. Avoid using `sudo ufw allow 3306` without an IP restriction, as this exposes your database to the entire internet and poses a significant security risk.

For most applications, keeping MySQL bound to localhost is safest. Only open port 3306 if you require remote connections and always restrict access to specific IPs.

:::

---

## Common Use Cases for MySQL on Ubuntu (22.04 and later)

Understand the primary scenarios where MySQL shines on Ubuntu, from LAMP stack deployments to analytics. This section explores how MySQL is used on Ubuntu (22.04 and later) in web applications, business systems, analytics, and more.

MySQL is a foundational database engine for countless workloads on Ubuntu (22.04 and later), from small projects to global-scale enterprise deployments. Its flexibility, performance, and open-source nature make it a top choice for developers and system architects. Below are some of the most important and high-impact scenarios where MySQL excels on Ubuntu (22.04 and later), along with expert insights and best practices:

### LAMP/LEMP Web Applications

MySQL is the “M” in the classic [**LAMP stack**](/digitalocean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-22-04.md) (Linux, Apache/Nginx, MySQL, PHP/Python/Perl). This stack underpins millions of websites, from personal blogs to high-traffic e-commerce platforms. MySQL’s ACID compliance, robust transaction support, and mature SQL implementation make it ideal for handling user authentication, session management, content storage, and transactional business logic. On Ubuntu, MySQL integrates seamlessly with both Apache and Nginx, and is easily managed via systemd and APT.

::: tip HQ Tip

For high-availability web applications, consider MySQL replication (master-slave or group replication) and automated failover with tools like MHA or Orchestrator. Use connection pooling (e.g., [<VPIcon icon="fas fa-globe"/>ProxySQL](https://proxysql.com/), [<VPIcon icon="iconfont icon-mysql"/>MySQL Router](https://mysql.com/products/enterprise/router.html)) to maximize throughput.

:::

### WordPress, Drupal, and CMS Hosting

The majority of popular content management systems—including [<VPIcon icon="iconfont icon-digitalocean"/>WordPress](https://digitalocean.com/solutions/wordpress-hosting), [<VPIcon icon="iconfont icon-digitalocean"/>Joomla](https://digitalocean.com/solutions/joomla-hosting), and [<VPIcon icon="iconfont icon-digitalocean"/>Drupal](https://digitalocean.com/solutions/drupal-hosting)—use MySQL as their default backend. MySQL stores all site content, user data, plugin settings, and metadata, making it the backbone of dynamic websites. On Ubuntu (22.04 and later), MySQL’s security features (like `mysql_secure_installation`, granular user privileges, and SSL support) help ensure a hardened CMS deployment.

::: tip HQ Tip

For large or high-traffic CMS sites, optimize MySQL’s InnoDB buffer pool, enable slow query logging, and use caching plugins at the application level. Regularly back up your MySQL data using `mysqldump` or logical/physical backup tools like Percona XtraBackup.

:::

### Internal Business Applications

MySQL is widely used for internal business tools such as HR management systems, ticketing platforms, inventory control, and CRM dashboards. Running MySQL on Ubuntu gives organizations full control over their data, supports compliance with regulatory requirements (GDPR, HIPAA, etc.), and allows for custom security policies. MySQL’s role-based access control and audit plugins can help enforce least-privilege access and track data changes.

::: tip HQ Tip

For sensitive internal data, enable encrypted connections (TLS/SSL), use encrypted tablespaces (InnoDB), and restrict network access to trusted hosts only. Consider using MySQL Enterprise Audit or open-source alternatives for compliance logging.

:::

### Analytics, Data Warehousing, and Reporting

MySQL’s support for complex queries, indexing, and partitioning makes it suitable for analytics pipelines, reporting dashboards, and log/event storage. While not a full data warehouse, MySQL can power business intelligence tools (e.g., [<VPIcon icon="iconfont icon-grafana"/>Grafana](https://grafana.com/), [<VPIcon icon="fas fa-globe"/>Metabase](https://metabase.com/), [<VPIcon icon="fas fa-globe"/>Superset](https://superset.apache.org/)) and ETL workflows. Features like window functions, CTEs, and JSON support (in MySQL 8+) enable advanced data transformations directly in SQL.

::: tip HQ Tip

For analytics workloads, use columnar storage engines (e.g., MySQL HeatWave, MariaDB ColumnStore) or integrate MySQL with external analytics platforms. Regularly analyze and optimize slow queries, and consider sharding or read replicas for scaling.

:::

### E-commerce and Transactional Systems

MySQL is a proven choice for e-commerce platforms ([<VPIcon icon="iconfont icon-digitalocean"/>Magento](https://digitalocean.com/solutions/magento-hosting), [<VPIcon icon="fas fa-globe"/>WooCommerce](https://woocommerce.com/), custom carts) due to its transactional integrity, foreign key support, and ability to handle high volumes of concurrent reads and writes. On Ubuntu, MySQL can be tuned for write-heavy workloads and integrated with payment gateways, inventory systems, and order management tools.

::: tip HQ Tip

Enable binary logging for point-in-time recovery, use strong password policies, and monitor for deadlocks and long-running transactions. For PCI DSS compliance, ensure encrypted connections and regular vulnerability patching.

:::

### Microservices, APIs, and Cloud-Native Apps

Modern microservices and RESTful APIs often use MySQL as a persistent store, leveraging its mature drivers for Go, Python, Node.js, Java, and more. MySQL’s JSON data type and flexible indexing make it suitable for semi-structured data and hybrid workloads. On Ubuntu, MySQL can be containerized ([<VPIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/), [<VPIcon icon="iconfont icon-digitalocean"/>Kubernetes](https://digitalocean.com/products/kubernetes)) or managed via cloud services.

::: tip HQ Tip

For cloud-native deployments, use MySQL Operator for Kubernetes, automate backups and failover, and monitor with Prometheus exporters. Consider managed MySQL offerings for simplified scaling and maintenance.

:::

These use cases demonstrate why MySQL remains one of the world’s most trusted open-source relational databases. Its combination of stability, scalability, security features, and a vast ecosystem—along with first-class support on Ubuntu—make it a future-proof choice for developers, sysadmins, and data professionals. Whether you’re building a simple website or a mission-critical enterprise system, MySQL on Ubuntu (22.04 and later) provides the flexibility and reliability you need to succeed.

---

## How to Troubleshoot Common MySQL Issues

Use this section to diagnose common errors such as port conflicts, authentication failures, and service startup issues. Troubleshooting is essential for resolving problems that may arise during or after your MySQL Ubuntu installation.

MySQL is a robust database system, but you may occasionally encounter issues during installation, configuration, or day-to-day operation. Below is an expanded guide to help you diagnose and resolve some of the most common MySQL problems on Ubuntu (22.04 and 24.04).

### Common Problems, Causes, and Solutions

::: details Port 3306 already in use

Another process/service is using port 3306

**Solution**

Identify the process (`sudo lsof -i :3306`, `sudo netstat -tulpn | grep 3306`); stop the conflicting service or change MySQL’s `port` in `/etc/mysql/mysql.conf.d/mysqld.cnf`; then restart MySQL (`sudo systemctl restart mysql`). [<VPIcon icon="iconfont icon-mysql"/>Docs](https://dev.mysql.com/doc/refman/8.0/en/server-options.html#option_mysqld_port) |

:::

::: details Access denied for user

Incorrect username/password, user lacks privileges, or wrong host

**Solution**

Verify username/password/host; list users and hosts (`SELECT User,Host FROM mysql.user;`); grant required privileges (e.g., `GRANT ALL PRIVILEGES ON dbname.* TO 'user'@'host';`); run `FLUSH PRIVILEGES;`. [<VPIcon icon="iconfont icon-mysql"/>Docs](https://dev.mysql.com/doc/refman/8.0/en/access-denied.html)

:::

::: details Authentication plugin mismatch error

MySQL user uses a plugin (e.g., `caching_sha2_password`) not supported by client

**Solution**

Check current plugin (`SELECT user,host,plugin FROM mysql.user;`); switch if needed (e.g., `ALTER USER 'user'@'host' IDENTIFIED WITH mysql_native_password BY 'password';`); `FLUSH PRIVILEGES;`; ensure your client supports the chosen plugin. [<VPIcon icon="iconfont icon-mysql"/>Docs](https://dev.mysql.com/doc/refman/8.0/en/authentication-plugins.html)

:::

::: details MySQL service fails to start

Corrupted data, misconfiguration, insufficient permissions/resources

**Solution**

Inspect logs (`sudo journalctl -u mysql`, `sudo less /var/log/mysql/error.log`); fix config errors under `/etc/mysql/`, ensure disk/memory/permissions are sufficient, repair tables if required (`mysqlcheck --all-databases --repair -u root -p`); restart MySQL. [<VPIcon icon="iconfont icon-mysql"/>Docs](https://dev.mysql.com/doc/refman/8.0/en/problems.html)

:::

::: details Can’t connect to MySQL server

MySQL not running, firewall blocking, or wrong bind-address

**Solution**

Confirm service is running (`sudo systemctl status mysql`); start if stopped (`sudo systemctl start mysql`); review firewall (`sudo ufw status`) and allow remote access only from trusted IPs (`sudo ufw allow from <YOUR_IP> to any port 3306` when needed); verify `bind-address` in `/etc/mysql/mysql.conf.d/mysqld.cnf` (`127.0.0.1` for local-only, `0.0.0.0` for remote). |

:::

::: details Database corruption or table errors

Unexpected shutdowns, disk issues, or software bugs

**Solution**

Review error logs for corruption indicators; repair with `mysqlcheck --all-databases --repair -u root -p`; for InnoDB, consider forced recovery per docs; always back up before repair. [<VPIcon icon="iconfont icon-mysql"/>InnoDB Recovery Docs](https://dev.mysql.com/doc/refman/8.0/en/forcing-innodb-recovery.html) |

:::

::: details Slow queries or performance issues

Unoptimized queries, missing indexes, insufficient resources

**Solution**

Enable slow query log (set `slow_query_log = 1` in `/etc/mysql/mysql.conf.d/mysqld.cnf`); analyze with `mysqldumpslow /var/log/mysql/mysql-slow.log`; add indexes, optimize queries, consider more resources; use `EXPLAIN` to inspect plans. [<VPIcon icon="iconfont icon-mysql"/>Docs](https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html)

:::

### General Troubleshooting Steps

#### 1. Check MySQL Service Status

```sh
sudo systemctl status mysql
```

#### 2. Review Log Files

- <VPIcon icon="fas fa-folder-open"/>`/var/log/mysql/error.log`
- Use `journalctl -u mysql` for systemd logs

#### 3. Test Connection Locally and Remotely

- Local: `mysql -u root -p`
- Remote: `mysql -h <server_ip> -u user -p`

#### 4. Check Firewall and Network Settings

- Ensure UFW or other firewalls allow MySQL traffic if remote access is needed.

#### 5. Validate Configuration Files

- Syntax errors in <VPIcon icon="fas fa-folder-open"/>`/etc/mysql/mysql.conf.d/` can prevent startup.

#### 6. Restart MySQL After Changes

```sh
sudo systemctl restart mysql
```

#### 7. Backup Before Major Changes

- Always back up your databases before making significant configuration or repair attempts.

::: info More Resources

- [<VPIcon icon="iconfont icon-mysql"/>MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)
- [<VPIcon icon="iconfont icon-mysql"/>MySQL Error Message Reference](https://dev.mysql.com/doc/refman/8.0/en/server-error-reference.html)
- [<VPIcon icon="iconfont icon-digitalocean"/>DigitalOcean MySQL Tutorials](https://digitalocean.com/community/tags/mysql)

:::

If you encounter an issue not listed here, consult the MySQL documentation or search for the specific error message. The MySQL community forums and Stack Overflow are also excellent resources for troubleshooting complex or unusual problems.

---

## How to Use the MCP Server for MySQL (Claude Code)

Expose your Ubuntu MySQL instance (22.04 and later) to Claude Code via the open‑source [MCP Server for MySQL (<VPIcon icon="iconfont icon-github" />`benborla/mcp-server-mysql`)](https://github.com/benborla/mcp-server-mysql). The server runs alongside Claude and acts as a controlled adapter to your database: read‑only by default, explicit write flags for INSERT/UPDATE/DELETE, and sensible limits for timeouts, pooling, and rate‑limiting. For production, run it over a **local socket** or a **locked‑down TCP channel** (SSH tunnel or TLS) and use a **least‑privilege** MySQL user.

::: info What this gives you

- **Schema introspection**: list tables/columns, types, keys.
- **Safe query execution**: read‑only transactions by default; optional writes behind flags.
- **Operational controls**: pool size, timeouts, rate limits, logging/metrics.
- **Flexible connectivity**: TCP, Unix socket, or SSH tunnel to remote hosts.

:::

::: note Prerequisites for Using MySQL MCP Server

- Node.js **v20+** installed and on `PATH`.
- Claude Code CLI installed (`claude` available in your shell).
- A MySQL 8.x server on this host (preferred) or reachable over the network.
- A **least‑privilege** MySQL user (e.g., `app@appdb`) with privileges scoped to the target database.
- Keep port **3306** closed to the public internet; open only to trusted IPs if you must ( `sudo ufw allow from <YOUR_IP> to any port 3306`).

### Quick Start (Claude Code CLI)

#### Option A — Local TCP (localhost)

```sh
# Install the MCP server
npm install -g @benborla29/mcp-server-mysql

# Add to Claude Code in read‑only mode (recommended)
claude mcp add mcp_server_mysql \
-e MYSQL_HOST="127.0.0.1" \
-e MYSQL_PORT="3306" \
-e MYSQL_USER="app" \
-e MYSQL_PASS="••••••••" \
-e MYSQL_DB="appdb" \
-e MYSQL_SSL="true" \
-e ALLOW_INSERT_OPERATION="false" \
-e ALLOW_UPDATE_OPERATION="false" \
-e ALLOW_DELETE_OPERATION="false" \
-- npx @benborla29/mcp-server-mysql
```

#### Option B — Unix Socket (local MySQL)

```sh
claude mcp add mcp_server_mysql \
-e MYSQL_SOCKET_PATH="/var/run/mysqld/mysqld.sock" \
-e MYSQL_USER="app" \
-e MYSQL_PASS="••••••••" \
-e MYSQL_DB="appdb" \
-- npx @benborla29/mcp-server-mysql
```

#### Option C — SSH Tunnel to a Remote DB

Create a local tunnel that forwards your laptop’s port 3306 to the remote server’s 3306:

```sh
ssh -N -L 3306:127.0.0.1:3306 user@db-host
```

Then point the MCP server at `127.0.0.1:3306` as in **Option A**. For persistent tunnels, use a systemd **user** service or a tool like `autossh`.

#### Scope (where the config lives)

```sh
# Local (default): only for current project
claude mcp add mcp_server_mysql [options]

# User scope: available to all projects
claude mcp add mcp_server_mysql -s user [options]

# Project scope: shared via .mcp.json with the team
claude mcp add mcp_server_mysql -s project [options]
```

### Enabling Writes (Optional, Risky)

By default, all queries run in **read‑only** transactions. If you truly need writes, enable flags explicitly and use a dedicated, scoped user:

```sh
-e ALLOW_INSERT_OPERATION="true" \
-e ALLOW_UPDATE_OPERATION="true" \
-e ALLOW_DELETE_OPERATION="true"
```

Pair this with database‑scoped grants only (avoid `*.*`).

### Multi‑DB Mode and Schema Permissions

To let Claude switch between databases, omit `MYSQL_DB`:

```sh
claude mcp add mcp_server_mysql_multi \
-e MYSQL_HOST="127.0.0.1" \
-e MYSQL_PORT="3306" \
-e MYSQL_USER="app" \
-e MYSQL_PASS="••••••••" \
-e MULTI_DB_WRITE_MODE="false" \
-- npx @benborla29/mcp-server-mysql
```

In multi‑DB mode, use fully qualified names (`db.table`) or `USE db;`. For granular control across environments:

```sh
SCHEMA_INSERT_PERMISSIONS=development:true,test:true,production:false
SCHEMA_UPDATE_PERMISSIONS=development:true,test:true,production:false
SCHEMA_DELETE_PERMISSIONS=development:false,test:true,production:false
SCHEMA_DDL_PERMISSIONS=development:false,test:true,production:false
```

### TLS/SSL Guidance

Enable TLS when your server supports it:

```sh
-e MYSQL_SSL="true"
```

Use trusted certificates on the server side; prefer TLS or an SSH tunnel over raw public TCP. Validate CA trust where required by your platform or managed database.

### Verification

```sh
# List configured servers
claude mcp list

# Inspect configuration for your server
claude mcp get mcp_server_mysql

# Inside Claude Code chat, check status
/mcp
```

Run a simple read query (e.g., `SELECT 1`) through the MCP tool to confirm end‑to‑end access.

### Troubleshooting (Claude Code + MySQL) Issues

#### Cannot connect

Verify MySQL is running (`systemctl status mysql`), credentials, and firewall/UFW. Check that the tunnel (if any) is active.

#### Auth plugin mismatch

Ensure your MySQL user uses a client‑supported plugin (`caching_sha2_password` recommended). Adjust with:

```sql
ALTER USER 'app'@'localhost' IDENTIFIED WITH mysql_native_password BY 'StrongPassword';
FLUSH PRIVILEGES;
```

#### `PATH`/`NODE_PATH` issues (local repo runs)

set explicit paths in the Claude config so `node` and global modules resolve.

#### Module errors (e.g., dotenv)

run with extra package if needed:

```sh
npx -y -p @benborla29/mcp-server-mysql -p dotenv mcp-server-mysql
```

#### Rate limits/timeouts

tune `MYSQL_POOL_SIZE`, `MYSQL_QUERY_TIMEOUT`, `MYSQL_RATE_LIMIT`, and enable logs/metrics with `MYSQL_ENABLE_LOGGING=true`.

### Security Checklist (Ops)

- Keep **3306** closed to the internet; allow specific IPs only if required.
- Use **least‑privilege** users scoped to a single database; rotate passwords.
- Prefer **TLS** or **SSH tunnels**; avoid plaintext public TCP.
- Leave write flags **disabled** unless absolutely necessary.
- Enable logging/metrics for auditability; monitor slow queries and errors.

::: info Repo

Source, changelog, and issues are maintained at [github.com/benborla/mcp-server-mysql (<VPIcon icon="iconfont icon-github" />`benborla/mcp-server-mysql`)](https://github.com/benborla/mcp-server-mysql).

:::

---

## FAQs

::: details 1. How do I install MySQL on Ubuntu? (22.04 and later)

Use the APT package manager to install MySQL on Ubuntu (22.04 and later):

```sh
sudo apt update && sudo apt install mysql-server
sudo systemctl status mysql
```

This installs MySQL from Ubuntu’s default repositories and starts the service. Verify the UNIX socket path and listening ports if needed:

```sh
sudo ss -lntp | grep 3306 || true
sudo mysql -e "SELECT @@socket, @@port;"
```

If the service is inactive, start it and re-check status. Keep your system current with `sudo apt update && sudo apt upgrade`, and consider enabling unattended upgrades on production servers.

:::

::: details 2. How do I start, stop, or restart MySQL?

Control MySQL with systemd to manage uptime:

```sh
sudo systemctl start mysql
sudo systemctl stop mysql
sudo systemctl restart mysql
```

Use restart after configuration changes; use stop for maintenance windows or backups. Confirm the new state and recent log entries:

```sh
systemctl status mysql --no-pager
journalctl -u mysql -n 50 --no-pager
```

If MySQL fails to start, check <VPIcon icon="fas fa-folder-open"/>`/var/log/mysql/`<VPIcon icon="fas fa-file-lines"/>`error.log` for config errors, fix them, and try `sudo systemctl daemon-reload && sudo systemctl start mysql`.

:::

::: details 3. How do I configure the MySQL root password on Ubuntu?

Set a secure root password to protect access:

```sh
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'StrongPassword';
exit
sudo mysql_secure_installation
```

This switches the root account to password authentication and runs the hardening script. Validate the plugin and authentication method:

```sh
sudo mysql -e "SELECT user, host, plugin FROM mysql.user WHERE user='root';"
```

If your client requires `caching_sha2_password` or another plugin, adjust the `ALTER USER` accordingly. Always keep root for administration only, and create a separate least-privilege user for applications. Re-run `sudo mysql_secure_installation` if you change policies later.

:::

::: details 4. How do I check the MySQL server status and version?

Check whether MySQL is running and view version details:

```sh
systemctl status mysql
mysql -V
mysqladmin -p -u root version
```

The first command shows whether the service is active; the latter two print client and server details (protocol, uptime). For deeper health checks, query server variables and engine status:

```sh
mysql -u root -p -e "SHOW VARIABLES LIKE 'version%'; SHOW GLOBAL STATUS LIKE 'Uptime';"
```

If version strings differ between client and server, ensure your client tools match the server repo to avoid incompatibilities. Track uptime and error counts to catch restarts or crashes early.

:::

::: details 5. How do I enable MySQL to start on boot in Ubuntu?

To enable automatic startup on system boot:

```sh
sudo systemctl enable mysql
```

You can disable it later with:

```sh
sudo systemctl disable mysql
```

Enable ensures MySQL comes up automatically after reboots; disable is useful for maintenance or single-user scenarios. Confirm the unit is enabled and view dependencies:

```sh
systemctl is-enabled mysql
systemctl list-dependencies mysql | head -20
```

For cloud images, also verify that your instance initialization (cloud-init/systemd) does not override service policy.

:::

::: details 6. How do I safely uninstall MySQL?

To remove MySQL completely:

```sh
sudo systemctl stop mysql
sudo apt purge mysql-server mysql-client mysql-common
sudo rm -rf /var/lib/mysql /etc/mysql
sudo apt autoremove
```

Before purging, back up any data you may need, then remove packages and residual configuration. Validate that no MySQL processes or sockets remain:

```sh
ps aux | grep -i mysqld | grep -v grep || true
sudo ss -lntp | grep 3306 || true
```

If you plan to reinstall, run `sudo apt update` and consider cleaning APT cache with `sudo apt autoclean`. Recreate <VPIcon icon="fas fa-folder-open"/>`/etc/mysql` via the package post-install and re-secure with `mysql_secure_installation` on the fresh install.

:::

:::: details 7. How do I use the MCP server with MySQL on Ubuntu? (22.04 and later)

Use the open‑source MCP Server for MySQL to let Claude Code inspect schemas and run queries safely. Install Node.js v20+ and the Claude Code CLI. Then install the server globally and register it in read‑only mode, pointing at your local MySQL (TCP) or the Unix socket. For remote databases, create an SSH tunnel and target `127.0.0.1:3306`. Verify with `claude mcp list` and `/mcp` inside Claude. Always use a least‑privilege DB user, keep port 3306 closed to the internet, prefer TLS, and enable write flags only when required.

```sh
npm install -g @benborla29/mcp-server-mysql
claude mcp add mcp_server_mysql \
-e MYSQL_HOST="127.0.0.1" -e MYSQL_PORT="3306" \
-e MYSQL_USER="app" -e MYSQL_PASS="••••••••" -e MYSQL_DB="appdb" \
-e ALLOW_INSERT_OPERATION="false" -e ALLOW_UPDATE_OPERATION="false" -e ALLOW_DELETE_OPERATION="false" \
-- npx @benborla29/mcp-server-mysql
```

::: tip

Use `-e MYSQL_SOCKET_PATH="/var/run/mysqld/mysqld.sock"` to connect via the local Unix socket. See the [GitHub Repository for MCP Server for MySQL - Claude Code Edition (<VPIcon icon="iconfont icon-github" />`benborla/mcp-server-mysql`)](https://github.com/benborla/mcp-server-mysql) for full documentation.

:::

::::

::: info Further Learning and References

To go beyond the basics and fine‑tune your MySQL deployment, explore these advanced resources:

- **MySQL Documentation:** [<VPIcon icon="iconfont icon-mysql"/>Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/) – official source for configuration options, tuning, and advanced features.
- **Performance Tuning:** Learn about query optimization, indexing, and monitoring slow queries.
- **Replication & HA:** Explore MySQL replication, group replication, and failover orchestration tools for high availability.
- **Security Hardening:** Review encryption (InnoDB tablespaces, SSL/TLS) and audit plugins for compliance.
- **Backup & Recovery:** Study point‑in‑time recovery and Percona XtraBackup for robust disaster recovery.

These resources will help you scale, secure, and optimize MySQL beyond the initial installation.

:::

---

## Conclusion

You now have a secure, production‑ready MySQL 8.x installation on Ubuntu (22.04 and 24.04) with a least‑privilege app user, service management in place, and UFW guidance to keep access local‑only by default. Before you move to production, finalize three items: enable automatic backups, enforce TLS for any remote connections, and monitor logs/slow queries for early warning signals. If you’re upgrading or maintaining older hosts, review the baseline/changes in our Ubuntu 20.04 guide for context and safe migration steps.

Here are a few examples of next steps you can take:

- [**Set up a LAMP stack**](/digitalocean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-22-04.md) or [**a LEMP stack**](/digitalocean.com/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-22-04.md)
- [**Practice running queries with SQL**](/digitalocean.com/introduction-to-queries-mysql.md)
- [**Manage your MySQL installation with phpMyAdmin**](/digitalocean.com/how-to-install-and-secure-phpmyadmin-on-ubuntu-22-04.md)
- [**SQLite vs MySQL vs PostgreSQL: A Comparison**](/digitalocean.com/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems.md) — choose the right database engine for your project.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Step-by-Step MySQL Installation on Ubuntu",
  "desc": "Install and secure MySQL on Ubuntu with copy-paste commands, service management, firewall rules, and tests to get running fast. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-mysql-on-ubuntu-22-04.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
