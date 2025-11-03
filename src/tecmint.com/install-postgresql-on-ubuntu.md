---
lang: en-US
title: "How to Install and Use PostgreSQL 18 on Ubuntu 24.04 LTS"
description: "Article(s) > How to Install and Use PostgreSQL 18 on Ubuntu 24.04 LTS"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - debian
  - ubuntu
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Install and Use PostgreSQL 18 on Ubuntu 24.04 LTS"
    - property: og:description
      content: "How to Install and Use PostgreSQL 18 on Ubuntu 24.04 LTS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/install-postgresql-on-ubuntu.html
prev: /devops/linux-debian/articles/README.md
date: 2025-10-15
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2025/10/Install-PostgreSQL-on-Ubuntu.webp
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Install and Use PostgreSQL 18 on Ubuntu 24.04 LTS"
  desc="In this article, we will explain how to install PostgreSQL 18 on an Ubuntu 24.04 LTS server and learn essential ways to use it effectively."
  url="https://tecmint.com/install-postgresql-on-ubuntu"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2025/10/Install-PostgreSQL-on-Ubuntu.webp"/>

**PostgreSQL** (**Postgres** in short) is an open source, powerful, advanced, high-performance, and stable relational-document database system, which extends the SQL language and includes a wide range of features for secure data storage and management.

It is efficient, reliable, and scalable for handling large, complicated volumes of data and setting up enterprise-level and fault-tolerant environments, while ensuring high data integrity.

**Postgres** is also highly extensible with features such as advanced indexing, full-text search, and comes with APIs so that you can develop your own solutions to solve your data storage challenges.

In this article, we will explain how to install **PostgreSQL 18** (which was just released on **September 25, 2025**) on an **Ubuntu 24.04 LTS** server and learn essential ways to use it effectively.

---

## How to Install PostgreSQL on Ubuntu 24.04

**PostgreSQL** comes prepackaged with all **Ubuntu** versions by default. However, **Ubuntu** includes a specific “**snapshot**” of **PostgreSQL** that remains fixed for the entire lifecycle of that **Ubuntu** release.

If you want access to newer **PostgreSQL** versions, then you can use the following automated repository configuration script that automatically set up the official **PostgreSQL Apt** repository.

```sh
sudo apt install -y postgresql-common ca-certificates
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
```

Now update the package list and install **PostgreSQL** (the latest version is **PostgreSQL 18** as of today):

```sh title="Install PostgreSQL 18 in Ubuntu"
sudo apt update
sudo apt install postgresql-18 postgresql-contrib-18
#
# Reading package lists... Done
# BuiIding dependency tree... Done
# Reading state information... Done
# Note, selecting 'postgresql—18' instead of 'postgresql—contrib—18'
# The following additional packages be installed.
#   1ib11vm19 Iibpq5 Iiburing2 postgresql—18—jit postgresql—client—18 postgresql—client—common postgresql—common
# Suggested packages:
#   libpq—oauth postgresql—doc—18
# The following NEW packages be installed:
#   1ib11vm19 Iibpq5 Iiburing2 postgresql—18 postgresql—18—)it postgresqI—cIient—18
# The following packages be upgraded:
#   postgresql—client—conmon postgresql—common
# 2 upgraded, 6 newly installed, 0 to remove and 360 not upgraded.
# Need to get 48.6 MB of archives .
# After this operation, 201 MB of additional disk space be used.
# Do you want to continue? [Y/n]
```

---

## Install pgAdmin 4 for PostgreSQL Administration

If you prefer a graphical interface to manage your **PostgreSQL** databases, you can install **pgAdmin 4**, the official **PostgreSQL** management tool that allows you to manage databases, users, queries, and more – all from a web-based dashboard.

On **Ubuntu 24.04**, **pgAdmin 4** isn’t available in the default repositories, so we’ll use the official **pgAdmin** repository.

```sh
sudo apt install -y curl ca-certificates gnupg
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'
```

Once the **pgAdmin** repository has been added, you can install **pgAdmin 4** as shown.

```sh
# Install for both desktop and web modes
sudo apt install pgadmin4

# Install for desktop mode only
sudo apt install pgadmin4-desktop

# Install for web mode only 
sudo apt install pgadmin4-web 

# Configure the webserver, if you installed pgadmin4-web:
sudo /usr/pgadmin4/bin/setup-web.sh
```

After the installation, the **PostgreSQL** service should start automatically, and you can confirm its status by running:

```sh
sudo systemctl status postgresql
```

To enable PostgreSQL to start on boot (if not already enabled):

```sh
sudo systemctl enable postgresql
```

After running this, you can open `pgAdmin` in your browser at:

```plaintext
http://127.0.0.1/pgadmin4
```

![`pgAdmin` Management Tool for PostgreSQL](https://tecmint.com/wp-content/uploads/2018/07/pgAdmin-Management-Tool-for-PostgreSQL.png)

pgAdmin Management Tool for PostgreSQL

---

## How to Use PostgreSQL Roles and Databases

In **PostgreSQL**, client authentication is controlled by the <VPIcon icon="fas fa-folder-open"/>`/etc/postgresql/18/main/`<VPIcon icon="fas fa-gears"/>`pg_hba.conf` configuration file (the version number may differ based on your installation).

The default authentication method is `"peer"` for the database administrator, meaning it gets the client’s operating system user name and checks if it matches the requested database user name to allow access for local connections.

During the installation process, a system user account called `postgres` was created without a password, which is also the default database administrator user name.

```sh
sudo nano /etc/postgresql/18/main/pg_hba.conf
```

### Understanding PostgreSQL Roles

In **PostgreSQL**, database access permission management is performed via **roles**. A role can be considered as either a database user, or a group of database users, depending on how the role is set up.

The default role is also `postgres`. Importantly, database roles are conceptually fully unconnected to operating system users, but practically they may be linked (particularly for authentication purposes).

Roles can:

- Own database objects (tables, views, functions, etc.).
- Assign privileges on those objects to other roles.
- Grant membership in a role to another role (role inheritance).

### Enable Encrypted Passwords for PostgreSQL Roles

To configure roles to use encrypted passwords instead of peer authentication, you need to modify the `pg_hba.conf` file. Change the authentication method from `peer` to `scram-sha-256` (the modern secure method) or `md5` for password authentication.

```sh
sudo nano /etc/postgresql/18/main/pg_hba.conf
```

Find the lines that look like:

```conf title="/etc/postgresql/18/main/pg_hba.conf"
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     peer
```

And change to:

```conf{3} title="/etc/postgresql/18/main/pg_hba.conf"
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             postgres                                peer
local   all             all                                     scram-sha-256
```

This keeps `peer` authentication for the `postgres` user but requires passwords for other users.

```conf title="Configure PostgreSQL Roles with Encrypted Passwords (/etc/postgresql/18/main/pg_hba.conf)"
# Do NOT DISABLE !
# If you change this first entry you need to make sure that the
# database superuser can access the database using some other method.
# Noninteractive access to all databases is required during automatic
# maintenance (custom daily cronjobs, replication, and similar tasks).
#
# Database administrative login by Unix domain socket
local   all             postgres                                peer

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local” is for Unix domain docket connections only
local   all             all                                     peer
local   all             all                                     scram-sha-256
```

Then restart the **PostgreSQL** service to apply the changes:

```sh
sudo systemctl restart postgresql
```

---

## How to Use PostgreSQL on Ubuntu

Once everything is set up, you can access the **postgres** system account with the following command, where the `-i` flag tells `sudo` to run the shell specified by the target user’s password database entry as a login shell.

```sh
sudo -i -u postgres
psql    # to launch the postgres shell program
```

To access the postgres shell directly, without first accessing the postgres user account, run:

```sh
sudo -u postgres psql
```

You can quit/exit the postgres shell by typing `\q` or pressing <kbd>Ctrl</kbd>+<kbd>D</kbd>.

```psql
\q
```

```sh title="Logging into PostgreSQL System Account"
sudo -i -u postgres
psql
#
# psql (18.0 (Ubuntu 18.0-1.pgdg24.04+3))
# Type "help" for help.

sudo -u postgres psql
\q
```

### Create PostgreSQL Database Roles

Create a new user role using the following command:

```sql
CREATE ROLE tecmint;
```

To create a role with a `LOGIN` attribute (roles with the `LOGIN` attribute can be considered the same as a database users):

```sql
CREATE ROLE tecmint LOGIN;
```

Or use the `CREATE USER` command, which assumes the login function by default:

```sql
CREATE USER tecmint;
```

### Create a Role with a Password

A role can also be created with a password, which is essential if you configured the client authentication method to require encrypted passwords:

```sql
CREATE ROLE tecmint WITH LOGIN PASSWORD 'secure_password_here';
```

Or using the `CREATE USER` syntax:

```sql
CREATE USER tecmint WITH PASSWORD 'secure_password_here';
```

### Create a Role with Additional Privileges

You can create a role with superuser privileges (use carefully):

```sql
CREATE ROLE admin WITH LOGIN PASSWORD 'admin_password' SUPERUSER;
```

Or create a role that can create databases:

```sql
CREATE ROLE developer WITH LOGIN PASSWORD 'dev_password' CREATEDB;
```

### List Existing PostgreSQL Database Roles

To list the existing user roles, use any of these commands:

```sql
\du              -- shows actual users with details
```

Or:

```sql
SELECT rolname FROM pg_roles;
```

To see more detailed information:

```psql
\du+
```

### Modify PostgreSQL Database Roles

To change a role’s password:

```sql
ALTER ROLE tecmint WITH PASSWORD 'new_password';
```

To grant superuser privileges to an existing role:

```sql
ALTER ROLE tecmint WITH SUPERUSER;
```

To revoke superuser privileges:

```sql
ALTER ROLE tecmint WITH NOSUPERUSER;
```

### Drop a PostgreSQL Database Role

To drop an existing user role, use the `DROP ROLE` command:

```sql
DROP ROLE tecmint;
```

::: note

You cannot drop a role that owns database objects, you must first reassign or drop those objects.

:::

### Create a PostgreSQL Database

Once you have created a role with a particular name (for instance `tecmint` user), you can create a database which will be managed by that role:

```sql
CREATE DATABASE tecmint;
```

To create a database owned by a specific role:

```sql
CREATE DATABASE tecmint OWNER tecmint;
```

To create a database with a specific encoding:

```sql
CREATE DATABASE tecmint ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8' OWNER tecmint;
```

### Grant Privileges to a Role

After creating the database, grant all privileges to the role:

```sql
GRANT ALL PRIVILEGES ON DATABASE tecmint To tecmint;
```

Now to manage the database `tecmint`, access the postgres shell as the `tecmint` role:

```sh
psql -U tecmint -d tecmint
```

If you’re prompted for a password, enter the password you set for the role.

### Create a PostgreSQL Table

We’ll create a test table called `authors`, which stores information about `TecMint.com` authors:

```sql
CREATE TABLE authors (
    code      SERIAL PRIMARY KEY,
    name      VARCHAR(40) NOT NULL,
    city      VARCHAR(40) NOT NULL,
    joined_on DATE NOT NULL
);
```

::: note

We’re using `SERIAL` for the primary key, which auto-generates sequential numbers, which is more practical than manually assigning codes.

:::

### Insert Data into PostgreSQL Table

After creating a table, populate it with some data:

```sql
INSERT INTO authors (
  name, city, joined_on
) VALUES (
  'Ravi Saive', 'Mumbai', '2012-08-15'
), (
  'Aaron Kili', 'Nairobi', '2014-03-20'
), (
  'Matei Cezar', 'Bucharest', '2015-06-10'
);
```

### Query Data from PostgreSQL Table

To view the data stored in a table, run a `SELECT` command:

```sql
SELECT * FROM authors;
```

For specific columns:

```sql
SELECT name, city FROM authors;
```

With filtering:

```sql
SELECT * FROM authors WHERE city = 'Mumbai';
```

With ordering:

```sql
SELECT * FROM authors ORDER BY joined_on DESC;
```

### Update Data in PostgreSQL Table

To modify existing data:

```sql
UPDATE authors SET city = 'Delhi' WHERE name = 'Ravi Saive';
```

### Delete Data from PostgreSQL Table

To remove specific rows:

```sql
DELETE FROM authors WHERE name = 'Ravi Saive';
```

### List PostgreSQL Database Tables

You can list all tables in the current database with:

```sql
\dt
```

For more detailed information:

```sql
\dt+
```

To see the table structure:

```sql
\d authors
```

### Alter PostgreSQL Table Structure

To add a new column to an existing table:

```sql
ALTER TABLE authors ADD COLUMN email VARCHAR(100);
```

To drop a column:

```sql
ALTER TABLE authors DROP COLUMN email;
```

To rename a column:

```sql
ALTER TABLE authors RENAME COLUMN code To author_id;
```

### Delete/Drop a PostgreSQL Table

To delete a table in the current database:

```sql
DROP TABLE authors;
```

To drop with cascade (removes dependent objects):

```sql
DROP TABLE authors CASCADE;
```

### List All PostgreSQL Databases

To list all databases, use any of the following commands:

```sql
SELECT datname FROM pg_database;
```

Or for a detailed description:

```sql
\list
```

Or the shorthand:

```sql
\l
```

### Delete/Drop a PostgreSQL Database

If you want to delete a database:

```sql
DROP DATABASE tecmint;
```

::: warning

This permanently deletes all data in the database.

:::

### Switch to Another PostgreSQL Database

You can switch from one database to another easily:

```sql
\connect database_name
```

Or the shorthand:

```sql
\c database_name
```

---

## Configure PostgreSQL for Remote Access

By default, **PostgreSQL** only accepts connections from **localhost**.

To allow remote connections, you need to edit <VPIcon icon="fas fa-gears"/>`postgresql.conf` file.

```sh
sudo nano /etc/postgresql/18/main/postgresql.conf
```

Find the line:

```conf title="/etc/postgresql/18/main/postgresql.conf"
#listen_addresses = 'localhost'
```

Change it to:

```conf title="/etc/postgresql/18/main/postgresql.conf"
listen_addresses = '*'
```

Next, edit <VPIcon icon="fas fa-gears"/>`pg_hba.conf` file.

```sh
sudo nano /etc/postgresql/18/main/pg_hba.conf
```

Add a line to allow connections from your network (replace `192.168.1.0/24` with your network):

```conf title="/etc/postgresql/18/main/pg_hba.conf"
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             192.168.1.0/24          scram-sha-256
```

Or to allow from any IP (less secure):

```conf title="/etc/postgresql/18/main/pg_hba.conf"
host    all             all             0.0.0.0/0               scram-sha-256
```

Allow PostgreSQL through the firewall:

```sh
sudo ufw allow 5432/tcp
```

Finally, restart PostgreSQL.

```sh
sudo systemctl restart postgresql
```

---

## Basic PostgreSQL Performance Tuning

For better performance on **Ubuntu 24.04**, consider adjusting these settings in <VPIcon icon="fas fa-gears"/>`postgresql.conf`:

```sh
sudo nano /etc/postgresql/18/main/postgresql.conf
```

Recommended changes (adjust based on your server’s RAM):

```conf title="/etc/postgresql/18/main/postgresql.conf"
shared_buffers = 256MB              # 25% of RAM
effective_cache_size = 1GB          # 50-75% of RAM
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 4MB
```

After changes, restart PostgreSQL:

```sh
sudo systemctl restart postgresql
```

---

## Backup and Restore PostgreSQL Databases

To backup a single database:

```sh
pg_dump -U postgres tecmint > tecmint_backup.sql
```

To backup all databases.

```sh
pg_dumpall -U postgres > all_databases_backup.sql
```

To restore a database.

```sh
psql -U postgres tecmint < tecmint_backup.sql
```

::: details Useful PostgreSQL Commands Reference

Here’s a quick reference of commonly used **PostgreSQL** commands:

| **Command** | **Description** |
| --- | --- |
| `\l` or `\list` | List all databases |
| `\c dbname` | Connect to a database |
| `\dt` | List all tables |
| `\d tablename` | Describe table structure |
| `\du` | List all roles/users |
| `\dn` | List all schemas |
| `\df` | List all functions |
| `\dv` | List all views |
| `\timing` | Toggle query timing |
| `\x` | Toggle expanded display |
| `\i filename` | Execute commands from a file |
| `\q` | Quit psql |
| `\h` | Help on SQL commands |
| `\?` | Help on psql commands |

:::

---

## Conclusion

That’s it! In this article, we have explained how to install and use the **PostgreSQL** database management system on **Ubuntu 24.04 LTS**.

We covered installation, user management, database operations, remote access configuration, performance tuning, and backup strategies. You can send us your queries or thoughts in the comments below.

For more information, refer to the [<VPIcon icon="iconfont icon-postgresql"/>PostgreSQL 18 Official Documentation](https://postgresql.org/docs/18/), or explore [**useful websites for learning PostgreSQL**](/tecmint.com/learn-postgresql-database-system.md).

<!-- ToDO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install and Use PostgreSQL 18 on Ubuntu 24.04 LTS",
  "desc": "In this article, we will explain how to install PostgreSQL 18 on an Ubuntu 24.04 LTS server and learn essential ways to use it effectively.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/install-postgresql-on-ubuntu.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
