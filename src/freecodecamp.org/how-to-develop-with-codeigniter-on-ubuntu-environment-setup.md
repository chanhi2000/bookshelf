---
lang: en-US
title: "How to Develop with CodeIgniter on Ubuntu – Step-by-Step Environment Setup"
description: "Article(s) > How to Develop with CodeIgniter on Ubuntu – Step-by-Step Environment Setup"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - PHP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - debian
  - ubuntu
  - php
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Develop with CodeIgniter on Ubuntu – Step-by-Step Environment Setup"
    - property: og:description
      content: "How to Develop with CodeIgniter on Ubuntu – Step-by-Step Environment Setup"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-develop-with-codeigniter-on-ubuntu-environment-setup.html
prev: /devops/linux-debian/articles/README.md
date: 2025-01-24
isOriginal: false
author:
  - name: valentine Gatwiri
    url : https://freecodecamp.org/news/author/gatwirival/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737640002689/7c78cd9c-40ef-45b3-82f6-97bc33f713d7.png
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

[[toc]]

---

<SiteInfo
  name="How to Develop with CodeIgniter on Ubuntu – Step-by-Step Environment Setup"
  desc="CodeIgniter is a popular open-source PHP framework you can use to build dynamic and robust web applications. It’s simple to use, fast, and flexible. This makes it a good option for any developer who wants to have a light yet powerful framework that w..."
  url="https://freecodecamp.org/news/how-to-develop-with-codeigniter-on-ubuntu-environment-setup"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737640002689/7c78cd9c-40ef-45b3-82f6-97bc33f713d7.png"/>

CodeIgniter is a popular open-source PHP framework you can use to build dynamic and robust web applications. It’s simple to use, fast, and flexible. This makes it a good option for any developer who wants to have a light yet powerful framework that will let them prototype or develop scalable applications fast.

Also, CodeIgnitor’s MVC (Model-View-Controller) architecture makes the process of organizing code and separating business logic from the user interface a piece of cake, yielding cleaner and maintainable projects.

Whether you’re building a small website or a complex application, CodeIgniter has a bunch of tools, libraries, and helpers that make the development process easier. They help you handle common tasks like database queries, session management, and form validation. Many devs love this tool because of its ease of use, making it an ideal framework for both beginners and experienced coders.

In this guide, I’ll walk you through the process of configuring CodeIgniter step by step, ensuring that you have a fully functional setup for your project on your local development environment.

::: note Prerequisites

Before getting started, make sure you meet the following requirements:

- Basic Knowledge of PHP: Understanding PHP syntax and basic programming concepts will help you follow along more easily.
- Web Server (for example, Apache or NGINX): CodeIgniter needs a server to run. Make sure you have a working server set up on your local machine or hosting environment.
- PHP Installed: You’ll need PHP 7.3 or higher (depending on the version of CodeIgniter you’re using).
- Database System: CodeIgniter supports several databases, but MySQL is the most commonly used. Make sure you have access to a database system and know its credentials.
- CodeIgniter Download: Download the latest version of CodeIgniter from the official website, GitHub repository, or use `composer` to install it.

:::

---

## How to Use Composer to Install CodeIgniter

Now that you understand the prerequisites and have everything set up, let’s move on to installing CodeIgniter. One of the easiest and most efficient ways to install CodeIgniter is by using Composer, a popular dependency management tool for PHP. In this section, I’ll guide you through the steps to install CodeIgniter using Composer.

First, create a new directory using `mkdir my_project` then navigate to the directory using `cd my_project`. Run the following Composer command to install CodeIgniter. You can specify the version you want (e.g., `^4.0` for the latest version of CodeIgniter 4).

```sh
composer create-project codeigniter4/appstarter .
```

This command will download and install the latest version of CodeIgniter 4 and set up the project for you:

![CodeIgnitor download via composer output.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737222358773/c0be04da-c507-41cf-b98e-8c9126146b31.png)

After the installation is complete, you should see the CodeIgniter project structure in your directory. To check if everything is working, you can start the built-in PHP server by running:

```sh
php spark serve
```

Output:

![Php spark serve output.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737224950979/8e7ccdac-ce8b-4b71-b41b-5ee02dfd9970.png)

Then, open your browser and go to `http://localhost:8080`. You should see the CodeIgniter welcome page.

![CodeIgnitor welcome page.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737225118799/c7a38536-62fa-4788-814d-cd246a973691.png)

---

## How to Install CodeIgniter Manually

If you prefer not to use Composer, or if you’re working in an environment where Composer isn’t available, you can manually install CodeIgniter. This method involves downloading the framework files directly and setting up your project manually. While it requires a few more steps than using Composer, it’s still straightforward and gives you full control over the installation process.

In this section, I’ll walk you through the steps to manually install CodeIgniter and configure it for your project.

```sh
# Download via Git:
cd /var/www/html
sudo git clone https://github.com/bcit-ci/CodeIgniter.git codeigniter
```

Or **download as ZIP (from CodeIgniter official website):** [<FontIcon icon="fas fa-globe"/>Download here](https://codeigniter.com/download). Extract it in <FontIcon icon="fas fa-folder-open"/>`/var/www/html`. Whereby you can do so using the terminal or UI.

### Extracting the ZIP File via the UI:

If you’re not comfortable using command-line tools, you can easily extract the ZIP file using your computer’s graphical interface. Here's how:

Click on `files/Other Locations/computer` to access <FontIcon icon="fas fa-folder-open"/>`/var/www/html`. Copy the `.Zip` file you downloaded earlier in the created folder and `right click`. Then click on `extract here` to unzip it.

![ZIP Extraction image.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737210782723/25317e2b-151b-491e-8e83-89c32d9cf5ee.png)

### Extracting the ZIP File via the Terminal

If you’re comfortable using the command line, you can extract the CodeIgniter ZIP file directly via the terminal. This method is especially useful for Linux and macOS users or if you're working on a remote server without a graphical user interface.

First, ensure you have `unzip` installed on your Ubuntu system:

```sh
sudo apt update
sudo apt install unzip
```

**Check your permissions** to ensure that you have the necessary access to the <FontIcon icon="fas fa-folder-open"/>`/var/www/html` directory. If needed, use `sudo` for administrative privileges.

### Steps to Extract the File

Assuming your uploaded file is currently located in `downloads/data…`, move it to <FontIcon icon="fas fa-folder-open"/>`/var/www/html`:

```sh
sudo mv /mnt/data/CodeIgniter.zip /var/www/html
```

Navigate to the `/var/www/html`directory:

```sh
cd /var/www/html
```

Extract the ZIP file by using the `unzip` command to extract the contents:

```sh
sudo unzip CodeIgniter.zip
```

After extracting, set the correct ownership and permissions for web server access:

```sh
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

- `www-data` (first part) → The **user**.
- `www-data` (second part) → The **group**.

![Extracted folder(Codeigniter-develop) image.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737212632072/6240acc1-27bd-49fe-acd4-5b3f80a92163.png)

> change `Codeigniter-develop /bcit-ci-CodeIgniter-bcb17eb/….`folder name to just codeigniter

### Verify Extraction

Visit your web server's URL (for example, `http://localhost`) to check if the contents are correctly deployed.

### Set Folder Permissions

After installing CodeIgniter, make sure you have the correct permissions for your directories, particularly `writable` and `cache` directories. This ensures that CodeIgniter can write logs, cache files, and session data.

Run the following commands to set the correct permissions:

```sh
sudo chmod -R 755 /var/www/html/codeigniter
```

### Configure the Base URL

The base URL for your project needs to be set up in <FontIcon icon="fas fa-folder-open"/>`application/config/`<FontIcon icon="fa-brands fa-php"/>`config.php`.

Open the <FontIcon icon="fa-brands fa-php"/>`config.php` file:

```sh
sudo nano /var/www/html/codeigniter/application/config/config.php
```

![Output: <FontIcon icon="fa-brands fa-php"/>`config.php` terminal image.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737213372442/259f712f-2df4-4517-a382-88966b021950.png)

Set the `base_url` as follows:

```php title="config.php"
$config['base_url'] = 'http://your-domain-or-ip/';
```

Replace `http://your-domain-or-ip/` with your actual domain or IP address where the project will be accessible.

After making changes:

- **Save the file:** Press <kbd>v</kbd>+<kbd>O</kbd> (Write Out).
- **Confirm the filename:** Press `Enter`.
- **Exit the editor:** Press <kbd>v</kbd>+<kbd>X</kbd>.

:::: note

You can also edit the files using UI by accessing them from `Other Locations//var/www/html/codeigniter`

:::

### Configure the Database (if Applicable)

If your project uses a database, you'll need to set up the database configuration in <FontIcon icon="fas fa-folder-open"/>`application/config/`<FontIcon icon="fa-brands fa-php"/>`database.php`.

To do this, open the database configuration file:

```sh
sudo nano /var/www/html/codeigniter/application/config/database.php
```

Configure the database connection by setting the following options:

```php :collapsed-lines title="database.php"
$db['default'] = array(
    'dsn'   => '',
    'hostname' => 'localhost',
    'username' => 'your-db-username',
    'password' => 'your-db-password',
    'database' => 'your-database-name',
    'dbdriver' => 'mysqli',
    'dbprefix' => '',
    'pconnect' => FALSE,
    'db_debug' => (ENVIRONMENT !== 'production'),
    'cache_on' => FALSE,
    'cachedir' => '',
    'char_set' => 'utf8',
    'dbcollat' => 'utf8_general_ci',
    'swap_pre' => '',
    'encrypt' => FALSE,
    'compress' => FALSE,
    'stricton' => FALSE,
    'failover' => array(),
    'save_queries' => TRUE
);
```

Replace `your-db-username`, `your-db-password`, and `your-database-name` with your actual database credentials.

### Set the Environment

CodeIgniter uses the environment setting to load different configuration files depending on the environment (for example, development, production).

To set the environment, open the <FontIcon icon="fa-brands fa-php"/>`index.php` file in the root directory of your project:

```sh
sudo nano /var/www/html/codeigniter/index.php
```

Locate the following line:

```php title="index.php"
define('ENVIRONMENT', 'development');
```

You can set it to `production`, `testing`, or `development` depending on your setup. For development, it should be set to `development`

### Autoload Libraries, Helpers, or Config Files

You can specify which libraries, helpers, or config files to autoload in <FontIcon icon="fas fa-folder-open"/>`application/config/`<FontIcon icon="fa-brands fa-php"/>`autoload.php`. Open the autoload configuration file:

```sh
sudo nano /var/www/html/codeigniter/application/config/autoload.php
```

Modify the autoload array to load commonly used libraries and helpers:

```php title="config/autoload.php"
$autoload['libraries'] = array('database', 'session', 'form_validation');
$autoload['helper'] = array('url', 'file');
```

### Enable Mod Rewrite (For Clean URLs)

If you want clean URLs, you need to enable `mod_rewrite` on Apache. Edit the Apache configuration file as follows:

```sh
sudo nano /etc/apache2/sites-available/000-default.conf
```

Ensure that the `AllowOverride` directive is set to `All` in the `<Directory>` section:

```xml title="000-default.conf"
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

Enable `mod_rewrite` and restart Apache:

```sh
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Verify CodeIgniter Directory Placement

If CodeIgniter is not in <FontIcon icon="fas fa-folder-open"/>`/opt/lampp/htdocs`, move it there:

```sh
sudo mv /var/www/html/codeigniter /opt/lampp/htdocs/
```

### Test CodeIgniter

Open your web browser and navigate to the base URL (`http://your-domain-or-ip`). You should see the default CodeIgniter welcome page if everything is set up correctly:

![CodeIgniter welcome page.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737218343140/7a41485a-152e-496e-9ba7-811e5c4b774b.png)

Run `curl ifconfig.me` to find your public IP. If you're hosting CodeIgniter on a local machine (for example, in your home network), use the following command to check your local IP: `hostname -I`.

---

## Troubleshooting

If you encounter any issues while setting up CodeIgniter, here are some common problems and how to resolve them:

### Set CodeIgniter as the Default App

If you want CodeIgniter to load as the default app (instead of the XAMPP landing page if you have XAMPP installed), remove or rename the default <FontIcon icon="fa-brands fa-php"/>`index.php` in the <FontIcon icon="fas fa-folder-open"/>`htdocs` directory:

```sh
sudo mv /opt/lampp/htdocs/index.php /opt/lampp/htdocs/index.php.bak
```

Move the CodeIgniter files to the root of the <FontIcon icon="fas fa-folder-open"/>`htdocs` folder:

```sh
sudo mv /opt/lampp/htdocs/codeigniter/* /opt/lampp/htdocs/
```

### Restart Apache

After making changes, restart Apache to apply the configuration:

```sh
sudo /opt/lampp/lampp restart
```

### Creating a Controller

To start developing your application, you can create a controller to handle requests.

![Application folders.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737219751160/af7240e8-2793-45b9-9cff-1f9a74add34f.png)

Create a new controller in <FontIcon icon="fas fa-folder-open"/>`application/controllers/` like this:

```php title="controllers/index.php"
<?php
class Welcome extends CI_Controller {
    public function index() {
        $this->load->view('welcome_message');
    }
}
```

Then create Views and Models. Views go into <FontIcon icon="fas fa-folder-open"/>`application/views/` and models into <FontIcon icon="fas fa-folder-open"/>`application/models/`. You can start adding your views and models accordingly.

---

## Conclusion

Setting up a development environment for CodeIgniter on Ubuntu is an essential step to unlock the full potential of this lightweight yet powerful PHP framework.

By carefully following the outlined steps—from installing prerequisites, configuring file permissions, and customizing settings to creating controllers, views, and models—you are now equipped to start building dynamic web applications.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Develop with CodeIgniter on Ubuntu – Step-by-Step Environment Setup",
  "desc": "CodeIgniter is a popular open-source PHP framework you can use to build dynamic and robust web applications. It’s simple to use, fast, and flexible. This makes it a good option for any developer who wants to have a light yet powerful framework that w...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-develop-with-codeigniter-on-ubuntu-environment-setup.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
