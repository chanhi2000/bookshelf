---
lang: en-US
title: "How To Install and Secure phpMyAdmin on Ubuntu"
description: "Article(s) > How To Install and Secure phpMyAdmin on Ubuntu"
icon: iconfont icon-phpmyadmin
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - PHP
  - Data Sceince
  - MySQL
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - devops
  - linux
  - debian
  - ubuntu
  - php
  - data-science
  - sql
  - mysql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Install and Secure phpMyAdmin on Ubuntu"
    - property: og:description
      content: "How To Install and Secure phpMyAdmin on Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-and-secure-phpmyadmin-on-ubuntu.html
prev: /devops/linux-debian/articles/README.md
date: 2022-04-27
isOriginal: false
author:
  - name: Anish Singh Walia
    url: https://digitalocean.comundefined
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
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
  "title": "PHP > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php/articles/README.md",
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
  name="How To Install and Secure phpMyAdmin on Ubuntu"
  desc="Install and secure phpMyAdmin on Ubuntu with step-by-step instructions. Secure MySQL databases with SSL/TLS and Apache authentication. "
  url="https://digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

## Introduction

While many users need the functionality of a database management system like MySQL, they may not feel comfortable interacting with the system solely from the MySQL prompt.

[<VPIcon icon="iconfont icon-phpmyadmin"/>phpMyAdmin](https://phpmyadmin.net/) was created so that users can interact with MySQL through a web interface. In this guide, we’ll discuss how to install and secure phpMyAdmin so that you can safely use it to manage your databases on an Ubuntu system.

::: note

This tutorial has been validated and tested on Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, and Ubuntu 25.04. All commands and steps in this guide work consistently across these Ubuntu versions.

:::

::: important Key Takeaways

- phpMyAdmin provides a web-based interface for managing [<VPIcon icon="fa-brands fa-digital-ocean" />MySQL databases](https://digitalocean.com/products/managed-databases-mysql), eliminating the need to work directly from the MySQL command line
- Installation requires a [**LAMP stack (Linux, Apache, MySQL, PHP)**](/digitalocean.com/how-to-install-lamp-stack-on-ubuntu.md) and can be completed using Ubuntu’s default package repositories
- Security is critical when deploying phpMyAdmin, as it handles sensitive database credentials and executes SQL queries
- Always use [**SSL/TLS encryption**](/digitalocean.com/how-to-secure-apache-with-let-s-encrypt-on-ubuntu#step-4-obtaining-an-ssl-certificate.md) when accessing phpMyAdmin remotely, never over plain HTTP connections
- Implementing Apache `.htaccess` authentication adds an additional security layer beyond MySQL credentials
- The installation process automatically configures Apache and creates a dedicated phpMyAdmin database user

:::

::: note Prerequisites

In order to complete this guide, you will need:

- An Ubuntu server. This server should have a non-root user with administrative privileges and a firewall configured with `ufw`. To set this up, follow our [**initial server setup guide for Ubuntu**](/digitalocean.com/initial-server-setup-with-ubuntu.md).
- A LAMP (Linux, Apache, MySQL, and PHP) stack installed on your Ubuntu server. If this is not completed yet, you can follow this guide on [**installing a LAMP stack on Ubuntu**](/digitalocean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu.md).

Additionally, there are important security considerations when using software like phpMyAdmin since it:

- Communicates directly with your MySQL installation
- Handles authentication using MySQL credentials
- Executes and returns results for arbitrary SQL queries

For these reasons, and because it is a widely deployed PHP application that is frequently targeted for attack, you should never run phpMyAdmin on remote systems over a plain HTTP connection.

If you do not have an existing domain configured with an SSL/TLS certificate, you can follow this guide on securing [**Apache with Let’s Encrypt on Ubuntu**](/digitalocean.com/how-to-secure-apache-with-let-s-encrypt-on-ubuntu.md). This will require you to [<VPIcon icon="fa-brands fa-digital-ocean"/>register a domain name](https://docs.digitalocean.com/tutorials/dns-registrars/), [<VPIcon icon="fa-brands fa-digital-ocean"/>create DNS records for your server](https://docs.digitalocean.com/products/networking/dns/), and [**set up an Apache Virtual Host**](/digitalocean.com/how-to-install-the-apache-web-server-on-ubuntu-22-04.md#step-5-setting-up-virtual-hosts-recommended). For more information on configuring Apache, see our guide on [**installing the Apache web server on Ubuntu**](/digitalocean.com/how-to-install-the-apache-web-server-on-ubuntu-22-04.md).

:::

---

## Step 1 — Installing phpMyAdmin

You can use APT to install phpMyAdmin from the default Ubuntu repositories.

As your non-root sudo user, update your server’s package index if you haven’t done so recently:

```sh
sudo apt update
```

Following that you can install the `phpmyadmin` package. Along with this package, the [<VPIcon icon="iconfont icon-phpmyadmin"/>official documentation also recommends](https://docs.phpmyadmin.net/en/latest/require.html) that you install a few PHP extensions onto your server to enable certain functionalities and improve performance.

If you followed the prerequisite [**LAMP stack installation tutorial**](/digitalocean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu.md), several of these modules will have been installed along with the `php` package. However, it’s recommended that you also install these packages:

- `php-mbstring`: A module for managing non-ASCII strings and convert strings to different encodings
- `php-zip`: This extension supports uploading `.zip` files to phpMyAdmin
- `php-gd`: Enables support for the [<VPIcon icon="fa-brands fa-wikipedia-w"/>GD Graphics Library](https://en.wikipedia.org/wiki/GD_Graphics_Library)
- `php-json`: Provides PHP with support for JSON serialization
- `php-curl`: Allows PHP to interact with different kinds of servers using different protocols

Run the following command to install these packages onto your system. Please note, though, that the installation process requires you to make some choices to configure phpMyAdmin correctly. We’ll walk through these options shortly:

```sh
sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl
```

Here are the options you should choose when prompted in order to configure your installation correctly:

- For the server selection, choose `apache2`

::: warning

When the prompt appears, “apache2” is highlighted, but **not** selected. If you do not hit <kbd>SPACE</kbd> to select Apache, the installer **will not** move the necessary files during installation. Hit <kbd>SPACE</kbd>, <kbd>TAB</kbd>, and then <kbd>ENTER</kbd> to select Apache.

:::

- Select `Yes` when asked whether to use `dbconfig-common` to set up the database
- You will then be asked to choose and confirm a MySQL application password for phpMyAdmin

::: note

Assuming you installed MySQL by following [**Step 2 of the prerequisite LAMP stack tutorial**](/digitalocean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu.md#step-2-installing-mysql), you may have decided to enable the Validate Password plugin. As of this writing, enabling this component will trigger an error when you attempt to set a password for the **phpmyadmin** user:

![<VPIcon icon="fa-brands fa-digital-ocean"/>phpMyAdmin password validation error](https://assets.digitalocean.com/articles/phpmyadmin_2004/pma_vpp_error.png)

To resolve this, select the **abort** option to stop the installation process. Then, open up your MySQL prompt:

```sh
sudo mysql
```

Or, if you enabled password authentication for the **root** MySQL user, run this command and then enter your password when prompted:

```sh
mysql -u root -p
```

From the prompt, run the following command to disable the Validate Password component. Note that this won’t actually uninstall it, but just stop the component from being loaded on your MySQL server:

```sql
UNINSTALL COMPONENT "file://component_validate_password";
```

Following that, you can close the MySQL client:

```sql
exit
```

Then try installing the `phpmyadmin` package again and it will work as expected:

```sh
sudo apt install phpmyadmin
```

Once phpMyAdmin is installed, you can open the MySQL prompt once again with `sudo mysql` or `mysql -u root -p` and then run the following command to re-enable the Validate Password component:

```sql
INSTALL COMPONENT "file://component_validate_password";
```

:::

The installation process adds the phpMyAdmin Apache configuration file into the `/etc/apache2/conf-enabled/` directory, where it is read automatically. To finish configuring Apache and PHP to work with phpMyAdmin, the only remaining task in this section of the tutorial is to is explicitly enable the `mbstring` PHP extension, which you can do by typing:

```sh
sudo phpenmod mbstring
```

Afterwards, restart Apache for your changes to be recognized:

```sh
sudo systemctl restart apache2
```

phpMyAdmin is now installed and configured to work with Apache. However, before you can log in and begin interacting with your MySQL databases, you will need to ensure that your MySQL users have the privileges required for interacting with the program.

---

## Step 2 — Adjusting User Authentication and Privileges

When you install phpMyAdmin onto your server, it automatically creates a database user called **phpmyadmin**, which performs certain underlying processes for the program. Rather than logging in as this user with the administrative password you set during installation, it’s recommended that you log in as either your **root** MySQL user or as a user dedicated to managing databases through the phpMyAdmin interface.

### Configuring Password Access for the MySQL Root Account

In Ubuntu systems running MySQL 5.7 (and later versions), the **root** MySQL user is set to authenticate using the `auth_socket` plugin by default rather than with a password. This allows for some greater security and usability in many cases, but it can also complicate things when you need to allow an external program like phpMyAdmin to access the user.

In order to log in to phpMyAdmin as your **root** MySQL user, you will need to switch its authentication method from `auth_socket` to one that makes use of a password, if you haven’t already done so. To do this, open up the MySQL prompt from your terminal:

```sh
sudo mysql
```

Next, check which authentication method each of your MySQL user accounts use with the following command:

```sql
SELECT user,authentication_string,plugin,host FROM mysql.user;
--
-- +------------------+------------------------------------------------------------------------+-----------------------+-----------+
-- | user             | authentication_string                                                  | plugin                | host      |
-- +------------------+------------------------------------------------------------------------+-----------------------+-----------+
-- | debian-sys-maint | $A$005$I:jOry?]Sy<|qhQRj3fBRQ43i4UJxrpm.IaT6lOHkgveJjmeIjJrRe6         | caching_sha2_password | localhost |
-- | mysql.infoschema | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
-- | mysql.session    | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
-- | mysql.sys        | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
-- | phpmyadmin       | $A$005$?#{Z?`gN!c2az)}V-INCWXSuVdqB9zWteH1IkZfTe/rOLgVhSzEMM9R3G6K9    | caching_sha2_password | localhost |
-- | root             |                                                                        | auth_socket           | localhost |
-- +------------------+------------------------------------------------------------------------+-----------------------+-----------+
-- 6 rows in set (0.00 sec
```

This example output indicates that the **root** user does in fact authenticate using the `auth_socket` plugin. To configure the **root** account to authenticate with a password, run the following `ALTER USER` command. Be sure to change `password` to a strong password of your choosing:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'password';
```

::: note

The previous `ALTER USER` statement sets the **root** MySQL user to authenticate with the `caching_sha2_password` plugin. [<VPIcon icon="iconfont icon-mysql"/>Per the official MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password), `caching_sha2_password` is MySQL’s preferred authentication plugin, as it provides more secure password encryption than the older, but still widely used, `mysql_native_password`.

However, some versions of PHP don’t work reliably with `caching_sha2_password`. [PHP has reported that this issue was fixed as of PHP 7.4](https://php.watch/articles/PHP-7.4-MySQL-8-server-gone-away-fix), but if you encounter an error when trying to log in to phpMyAdmin later on, you may want to set **root** to authenticate with `mysql_native_password` instead:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

:::

Then, check the authentication methods employed by each of your users again to confirm that **root** no longer authenticates using the `auth_socket` plugin:

```sql
SELECT user,authentication_string,plugin,host FROM mysql.user;
--
-- +------------------+------------------------------------------------------------------------+-----------------------+-----------+
-- | user             | authentication_string                                                  | plugin                | host      |
-- +------------------+------------------------------------------------------------------------+-----------------------+-----------+
-- | debian-sys-maint | $A$005$I:jOry?]Sy<|qhQRj3fBRQ43i4UJxrpm.IaT6lOHkgveJjmeIjJrRe6         | caching_sha2_password | localhost |
-- | mysql.infoschema | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
-- | mysql.session    | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
-- | mysql.sys        | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
-- | phpmyadmin       | $A$005$?#{Z?`gN!c2az)}V-INCWXSuVdqB9zWteH1IkZfTe/rOLgVhSzEMM9R3G6K9    | caching_sha2_password | localhost |
-- | root             | $A$005$3y�y|Z?'_[} ZyVHuESVwNmjKWOH/ndETwS.Kty0IH7UfiXjOfVvyWroy4a.   | caching_sha2_password | localhost |
-- +------------------+------------------------------------------------------------------------+-----------------------+-----------+
-- 6 rows in set (0.00 sec
```

This output shows that the **root** user will authenticate using a password. You can now log in to the phpMyAdmin interface as your **root** user with the password you’ve set for it here.

### Configuring Password Access for a Dedicated MySQL User

Alternatively, some may find that it better suits their workflow to connect to phpMyAdmin with a dedicated user. To do this, open up the MySQL shell once again:

```sh
sudo mysql
```

If you have password authentication enabled for your **root** user, as described in the previous section, you will need to run the following command and enter your password when prompted in order to connect:

```sh
mysql -u root -p
```

From there, create a new user and give it a strong password:

```sql
CREATE USER 'sammy'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'password';
```

::: note

Again, depending on what version of PHP you have installed, you may want to set your new user to authenticate with `mysql_native_password` instead of `caching_sha2_password`:

```sql
ALTER USER 'sammy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

:::

Then, grant your new user appropriate privileges. For example, you could grant the user privileges to all tables within the database, as well as the power to add, change, and remove user privileges, with this command:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;
```

Following that, exit the MySQL shell:

```sql
exit
```

You can now access the web interface by visiting your server’s domain name or public IP address followed by `/phpmyadmin`:

```plaintext
https://your_domain_or_IP/phpmyadmi
```

![<VPIcon icon="fa-brands fa-digital-ocean"/>phpMyAdmin login screen](https://assets.digitalocean.com/articles/phpmyadmin_2004/pma_sammy_login_small.png)

Log in to the interface, either as **root** or with the new username and password you just configured.

When you log in, you’ll be taken to phpMyAdmin’s user interface:

![<VPIcon icon="fa-brands fa-digital-ocean"/>phpMyAdmin user interface](https://assets.digitalocean.com/articles/phpmyadmin_2204/pma_home_sammy_2204.png)

Now that you’re able to connect and interact with phpMyAdmin, all that’s left to do is harden your system’s security to protect it from attackers.

---

## Step 3 — Securing Your phpMyAdmin Instance

Because of its ubiquity, phpMyAdmin is a popular target for attackers, and you should take extra care to prevent unauthorized access. One way of doing this is to place a gateway in front of the entire application by using Apache’s built-in `.htaccess` authentication and authorization functionalities.

To do this, you must first enable the use of `.htaccess` file overrides by editing your phpMyAdmin installation’s Apache configuration file.

Use your preferred text editor to edit the `phpmyadmin.conf` file that has been placed in your Apache configuration directory. Here, we’ll use `nano`:

```sh
sudo nano /etc/apache2/conf-available/phpmyadmin.conf
```

Add an `AllowOverride All` directive within the `<Directory /usr/share/phpmyadmin>` section of the configuration file, like this:

/etc/apache2/conf-available/phpmyadmin.conf

```sh
<Directory /usr/share/phpmyadmin>
    Options SymLinksIfOwnerMatch
    DirectoryIndex index.php
    AllowOverride All
    . . 
```

When you have added this line, save and close the file. If you used `nano` to edit the file, do so by pressing `CTRL + X`, `Y`, and then <kbd>ENTER</kbd>.

To implement the changes you made, restart Apache:

```sh
sudo systemctl restart apache2
```

Now that you have enabled the use of `.htaccess` files for your application, you need to create one to actually implement some security.

In order for this to be successful, the file must be created within the application directory. You can create the necessary file and open it in your text editor with root privileges by typing:

```sh
sudo nano /usr/share/phpmyadmin/.htaccess
```

Within this file, enter the following information:

/usr/share/phpmyadmin/.htaccess

```sh
AuthType Basic
AuthName "Restricted Files"
AuthUserFile /etc/phpmyadmin/.htpasswd
Require valid-use
```

Here is what each of these lines mean:

- `AuthType Basic`: This line specifies the authentication type that you are implementing. This type will implement password authentication using a password file.
- `AuthName`: This sets the message for the authentication dialog box. You should keep this generic so that unauthorized users won’t gain any information about what is being protected.
- `AuthUserFile`: This sets the location of the password file that will be used for authentication. This should be outside of the directories that are being served. We will create this file shortly.
- `Require valid-user`: This specifies that only authenticated users should be given access to this resource. This is what actually stops unauthorized users from entering.

When you are finished, save and close the file.

The location that you selected for your password file was `/etc/phpmyadmin/.htpasswd`. You can now create this file and pass it an initial user with the `htpasswd` utility:

```sh
sudo htpasswd -c /etc/phpmyadmin/.htpasswd username
```

You will be prompted to select and confirm a password for the user you are creating. Afterwards, the file is created with the hashed password that you entered.

If you want to enter an additional user, you need to do so **without** the `-c` flag, like this:

```sh
sudo htpasswd /etc/phpmyadmin/.htpasswd additionaluser
```

Then restart Apache to put `.htaccess` authentication into effect:

```sh
sudo systemctl restart apache2
```

Now, when you access your phpMyAdmin subdirectory, you will be prompted for the additional account name and password that you just configured:

```sh
https://domain_name_or_IP/phpmyadmi
```

![<VPIcon icon="fa-brands fa-digital-ocean"/>phpMyAdmin apache password](https://assets.digitalocean.com/articles/phpmyadmin_2004/pma_htaccess_small.png)

After entering the Apache authentication, you’ll be taken to the regular phpMyAdmin authentication page to enter your MySQL credentials. By adding an extra set of non-MySQL credentials, you’re providing your database with an additional layer of security. This is desirable since phpMyAdmin has been vulnerable to security threats in the past.

---

## Frequently Asked Questions

::: details Why am I getting a 404 error when accessing phpMyAdmin?

A 404 error typically means Apache isn’t configured to serve phpMyAdmin. During installation, make sure you selected `apache2` as your web server when prompted. If you missed this step, you may need to manually create a symbolic link or check that the phpMyAdmin configuration file exists in <VPIcon icon="fas fa-folder-open"/>`/etc/apache2/conf-enabled/`. After making changes, restart Apache with `sudo systemctl restart apache2` and check the Apache error logs if issues persist.

:::

::: details How do I fix a “Cannot connect to the database” error in phpMyAdmin?

This error usually indicates that MySQL isn’t running or your credentials are incorrect. First, verify MySQL is running with `sudo systemctl status mysql`. If it’s not running, start it with `sudo systemctl start mysql`. Then, ensure you’re using the correct MySQL username and password. If you’re using the root user, make sure you’ve configured password authentication as described in Step 2 of this tutorial.

:::

::: details Is it safe to use phpMyAdmin on a production server?

phpMyAdmin can be used safely in production when properly secured. Always use HTTPS with SSL/TLS certificates (never plain HTTP), implement Apache `.htaccess` authentication as shown in this tutorial, restrict access by IP address if possible, and keep phpMyAdmin updated. Consider using [<VPIcon icon="fa-brands fa-digital-ocean" />DigitalOcean Managed Databases](https://digitalocean.com/products/managed-databases) for production workloads, which provides built-in security features and eliminates the need to manage database infrastructure.

:::

::: details What should I do if phpMyAdmin shows a blank white screen?

A blank screen usually indicates a PHP error. Check the Apache error logs with `sudo tail -f /var/log/apache2/error.log` to identify the specific issue. Common causes include missing PHP extensions. Ensure you’ve installed all required PHP modules (`php-mbstring`, `php-zip`, `php-gd`, `php-json`, `php-curl`) and enabled the `mbstring` extension with `sudo phpenmod mbstring`, then restart Apache.

:::

::: details Can I use phpMyAdmin with MariaDB instead of MySQL?

Yes, phpMyAdmin works with both MySQL and MariaDB. The installation and configuration process is identical. MariaDB is a drop-in replacement for MySQL, so all the commands and steps in this tutorial work the same way whether you’re using MySQL or MariaDB.

:::

---

## Conclusion

You should now have phpMyAdmin configured and ready to use on your Ubuntu server. Using this interface, you can create databases, users, and tables, as well as perform the usual operations like deleting and modifying structures and data.

For production environments, consider using [<VPIcon icon="fa-brands fa-digital-ocean" />DigitalOcean Managed Databases](https://digitalocean.com/products/managed-databases), which provides automated backups, high availability, and enhanced security without the need to manage database infrastructure yourself. If you’re setting up a new server, our [**initial server setup guide for Ubuntu**](/digitalocean.com/initial-server-setup-with-ubuntu.md) will help you configure the foundation for your database management setup.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Install and Secure phpMyAdmin on Ubuntu",
  "desc": "Install and secure phpMyAdmin on Ubuntu with step-by-step instructions. Secure MySQL databases with SSL/TLS and Apache authentication. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-and-secure-phpmyadmin-on-ubuntu.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
