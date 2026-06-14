---
lang: en-US
title: "Initial Server Setup with Ubuntu"
description: "Article(s) > Initial Server Setup with Ubuntu"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Initial Server Setup with Ubuntu"
    - property: og:description
      content: "Initial Server Setup with Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-ubuntu.html
prev: /devops/linux-debian/articles/README.md
date: 2022-04-26
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

[[toc]]

---

<SiteInfo
  name="Initial Server Setup with Ubuntu"
  desc="Learn how to securely set up a new Ubuntu server with user accounts, SSH keys, firewall rules, and basic hardening steps. "
  url="https://digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

When you first create a new [<VPIcon icon="fa-brands fa-digital-ocean" />Ubuntu server](https://digitalocean.com/products/linux-distribution/ubuntu), you should perform some important configuration steps as part of the initial setup. These steps will increase the security and usability of your server and will give you a solid foundation for subsequent actions.

This tutorial has been validated on Ubuntu 22.04 LTS, 24.04 LTS, and 24.10. The commands use default packages that remain stable across current interim releases and upcoming 25.x builds that ship with `apt`, OpenSSH, and UFW defaults.

::: important Key Takeaways

- **Log in as root:** Learn how to securely access your Ubuntu server for the first time.
- **Create a non-root user:** Add a regular user account with `sudo` privileges to minimize security risks of daily root usage.
- **Set up SSH key authentication:** Configure [**SSH keys**](/digitalocean.com/how-to-configure-ssh-key-based-authentication-on-a-linux-server.md) for secure, passwordless logins, and copy your public key to the new user.
- **Configure the firewall with UFW:** Enable and test the [**Uncomplicated Firewall (UFW)**](/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu.md) to restrict access, making sure to keep SSH open to prevent lockout.
- **Validate access before exiting root:** Confirm that your new user can use `sudo` and connect via SSH before closing the root session to avoid being locked out.
- **Best practices apply to multiple environments:** These initial steps apply to cloud VMs, [<VPIcon icon="fa-brands fa-digital-ocean" />Droplets](https://digitalocean.com/products/droplets), VPS, and bare metal servers.

::: info

Deploy your applications from GitHub using [<VPIcon icon="fa-brands fa-digital-ocean" />DigitalOcean App Platform](https://digitalocean.com/products/app-platform). Let DigitalOcean focus on scaling your app.

:::

---

## Step 1 - Logging in as root

To log into your server, you will need to know your **server’s public IP address**. You will also need the password or the private key for the **root** user’s account if you installed an [**SSH key**](/digitalocean.com/how-to-configure-ssh-key-based-authentication-on-a-linux-server.md) for authentication. If you have not already logged into your server, you may want to follow our guide on [<VPIcon icon="fa-brands fa-digital-ocean"/>how to Connect to Droplets with SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/), which covers this process in detail.

If you are not connected to your server currently, log in as the **root** user using the following command. Substitute the highlighted `your_server_ip` portion of the command with your server’s public IP address:

```sh
ssh root@your_server_ip
```

Accept the warning about host authenticity if it appears. If your server uses password authentication, provide your **root** password to log in. If you use an SSH key that is passphrase protected, you may need to enter the passphrase the first time you use the key each session. If this is your first time logging into the server with a password, you may also need to change the **root** password. Follow the instructions to change the password if you receive a prompt.

### About root

The **root** user is the administrative user in a Linux environment with elevated privileges. Because of the heightened privileges of the **root** account, you are *discouraged* from using it regularly. The **root** account can make very destructive changes, even by accident.

The next step is setting up a new user account with reduced privileges for day-to-day use. Later, we’ll show you how to temporarily gain increased privileges for the times when you need them.

---

## Step 2 - Creating a New User

Once you log in as **root**, you’ll be able to add the new user account. In the future, we’ll log in with this new account instead of **root**.

This example creates a new user called **sammy**, but you should replace that with a username that you like:

```sh
adduser sammy
```

You will be asked a few questions, starting with the account password.

Enter a strong password and, optionally, fill in any additional information you would like. This information is not required, and you can press <kbd>ENTER</kbd> in any field you wish to skip.

---

## Step 3 - Granting Administrative Privileges

Now you have a new user account with regular account privileges. However, you will sometimes need to perform administrative tasks as the **root** user.

To avoid logging out of your regular user and logging back in as the **root** account, you can set up what is known as *superuser* or **root** privileges for your user’s regular account. These privileges will allow your normal user to run commands with administrative privileges by putting the word `sudo` before the command.

To add these privileges to your new user, you will need to add the user to the **sudo** system group. By default on Ubuntu, users who are members of the **sudo** group are allowed to use the `sudo` command.

As **root**, run this command to add your new user to the **sudo** group (substitute the highlighted `sammy` username with your new user):

```sh
usermod -aG sudo sammy
```

You can now type `sudo` before commands to run them with superuser privileges when logged in as your regular user.

---

## Step 4 - Setting Up a Firewall

Ubuntu servers can use the [**UFW firewall**](/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu.md) to ensure only connections to certain services are allowed. You can set up a basic [<VPIcon icon="fa-brands fa-digital-ocean" />firewall](https://digitalocean.com/products/cloud-firewalls) using this application.

::: note

If your servers are running on DigitalOcean, you can optionally use [<VPIcon icon="fa-brands fa-digital-ocean"/>DigitalOcean Cloud Firewalls](https://docs.digitalocean.com/products/networking/firewalls/) instead of the UFW firewall. We recommend using only one firewall at a time to avoid conflicting rules that may be difficult to debug.

:::

Applications can register their profiles with UFW upon installation. These profiles allow UFW to manage these applications by name. [**OpenSSH**](/digitalocean.com/how-to-create-ssh-keys-with-openssh-on-macos-or-linux.md), the service that allows you to connect to your server, has a profile registered with UFW.

You can examine the list of installed UFW profiles by typing:

```sh
ufw app list
#
# Available applications:
#   penSSH
```

You will need to make sure that the firewall allows SSH connections so that you can log into your server next time. Allow these connections by typing:

```sh
ufw allow OpenSSH
```

Now enable the firewall by typing:

```sh
ufw enable
```

Type `y` and press <kbd>ENTER</kbd> to proceed. You can see that SSH connections are still allowed by typing:

```sh
ufw status
#
# Status: active
# 
# To                         Action      From
# --                         ------      ----
# OpenSSH                    ALLOW       Anywhere
# OpnSSH (v6)                ALLOW       Anywhere (v6)
```

**The firewall is currently blocking all connections except for SSH**. If you install and configure additional services, you will need to adjust the firewall settings to allow the new traffic into your server. You can learn some common UFW operations in our [***UFW Essentials* guide**](/digitalocean.com/ufw-essentials-common-firewall-rules-and-commands.md).

To add HTTP access later, allow only the services you need:

```sh
ufw allow 80/tcp
ufw allow 443/tcp
```

Refer to [**How to Set Up a Firewall with UFW on Ubuntu**](/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu.md) for common patterns like [**rate limiting**](/digitalocean.com/build-api-rate-limiter-using-valkey.md) and [**service-specific rules**](/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu#step-4-enabling-ufw.md).

---

## Step 5 - Enabling External Access for Your Regular User

Now that you have a regular user for daily use, you will need to make sure that you can SSH into the account directly.

::: note

Until verifying that you can log in and use `sudo` with your new user, we recommend staying logged in as **root**. If you have problems connecting, you can troubleshoot and make any necessary changes as **root**. If you use a [<VPIcon icon="fa-brands fa-digital-ocean" />DigitalOcean Droplet](https://digitalocean.com/products/droplets) and experience problems with your **root** SSH connection, you can [<VPIcon icon="fa-brands fa-digital-ocean"/>regain access to Droplets using the Recovery Console](https://docs.digitalocean.com/products/droplets/resources/recovery-console/).

:::

Configuring SSH access for your new user depends on whether your server’s **root** account uses a password or SSH keys for authentication.

### If the root Account Uses Password Authentication

If you logged in to your **root** account *using a password* then password authentication is *enabled* for SSH. You can SSH to your new user account by opening up a new terminal session and using SSH with your new username:

```sh
ssh <SAMMY>@<YOUR_SERVER_IP>
```

After entering your regular user’s password, you will be logged in. Remember, if you need to run a command with administrative privileges, type `sudo` before it like this:

```sh
sudo <COMMAND_TO_RUN>
```

You will receive a prompt for your regular user’s password when using `sudo` for the first time each session (and periodically afterward).

To enhance your server’s security, **we strongly recommend setting up SSH keys instead of using password authentication**. Follow our guide on [**setting up SSH keys on Ubuntu**](/digitalocean.com/how-to-set-up-ssh-keys-on-ubuntu-22-04.md) to learn how to configure key-based authentication.

### If the root Account Uses SSH Key Authentication

If you logged in to your **root** account *using SSH keys*, then password authentication is *disabled* for SSH. To log in as your regular user with an SSH key, you must add a copy of your local public key to your new user’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`authorized_keys` file.

Since your public key is already in the **root** account’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`authorized_keys` file on the server, you can copy that file and directory structure to your new user account using your current session.

The simplest way to copy the files with the correct ownership and permissions is with the [**`rsync` command**](/digitalocean.com/how-to-copy-files-with-rsync-over-ssh.md). This command will copy the **root** user’s <VPIcon icon="fas fa-folder-open"/>`.ssh` directory, preserve the permissions, and modify the file owners, all in a single command. Make sure to change the highlighted portions of the command below to match your regular user’s name:

::: note

The `rsync` command treats sources and destinations that end with a trailing slash differently than those without a trailing slash. When using `rsync` below, ensure that the source directory (<VPIcon icon="fas fa-folder-open"/>`~/.ssh`) **does not** include a trailing slash (check to make sure you are not using <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`).

If you accidentally add a trailing slash to the command, `rsync` will copy the *contents* of the **root** account’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory to the `sudo` user’s home directory instead of copying the entire <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory structure. The files will be in the wrong location and SSH will not be able to find and use them.

:::

```sh
rsync --archive --chown=sammy:sammy ~/.ssh /home/sammy
```

Now, open up a new terminal session on your local machine, and use SSH with your new username:

```sh
ssh <SAMMY>@<YOUR_SERVER_IP>
```

You should be connected to your server with the new user account without using a password. Remember, if you need to run a command with administrative privileges, type `sudo` before the command like this:

```sh
sudo <COMMAND_TO_RUN>
```

You will be prompted for your regular user’s password when using `sudo` for the first time each session (and periodically afterward).

---

## FAQs

### 1. Can Ubuntu be used as a server?

**Absolutely.** Ubuntu is one of the most popular operating systems for servers worldwide and is designed for a wide range of scenarios, from lightweight [<VPIcon icon="fa-brands fa-digital-ocean" />VPS instances](https://digitalocean.com/products/droplets) to enterprise-grade [<VPIcon icon="fa-brands fa-digital-ocean" />clusters](https://digitalocean.com/products/kubernetes).

**Key advantages of Ubuntu Server:**

| Feature | Description |
| --- | --- |
| Open-source & Free | No license fee required. |
| LTS Support | Long-term support releases receive 5 years of updates. |
| Cloud-ready | Optimized images for major clouds (DigitalOcean, AWS, GCP). |
| DevOps Friendly | Ships with `OpenSSH`, `apt`, and `systemd`. |
| Broad Hardware Support | Runs on x86, ARM, PPC, and more. |

**Sample server tasks Ubuntu handles well:**

- Web hosting (Apache, Nginx)
- Databases (PostgreSQL, MySQL, MongoDB)
- Application servers (Node.js, Python, Java)
- Container orchestration (Docker, Kubernetes)
- File storage & backups

::: tip Example

To check your Ubuntu version:

```sh
lsb_release -a
# OR
ca /etc/os-release
```

:::

::: info

For more on SSH and package management, see: [**OpenSSH Key Guide**](/digitalocean.com/how-to-create-ssh-keys-with-openssh-on-macos-or-linux.md).

:::

### 2. Is Ubuntu Server free?

**Yes.** Ubuntu Server is completely free to download, install, and use for any purpose—personal, educational, or commercial. There are no licensing costs or subscription fees.

If you’re looking for a simple and reliable way to get started, consider deploying an [<VPIcon icon="fa-brands fa-digital-ocean" />Ubuntu Droplet on DigitalOcean](https://digitalocean.com/products/droplets). DigitalOcean provides pre-configured Ubuntu server images so you can launch secure, production-ready servers in just a few clicks—perfect for both beginners and experts.

::: note

You only need Ubuntu Pro if you require extended security maintenance, compliance features, or enterprise support. For most users and typical workloads, the free version of Ubuntu Server is more than sufficient.

:::

### 3. Which Ubuntu version should I pick for a new server?

::: tip Recommendation

Use a Long Term Support (**LTS**) release. LTS versions are production-ready and receive updates for five years.

:::

**Popular LTS versions:**

| Release | Release Date | End of Support | Notes |
| --- | --- | --- | --- |
| Ubuntu 24.04 LTS | April 2024 | April 2029 | Latest; recommended for new installs |
| Ubuntu 22.04 LTS | April 2022 | April 2027 | Widely used; highly stable |

**Check your current version:**

```sh
ls_release -cs   # Shows the codename (e.g., 'jammy' for 22.04)
```

This guide and its commands are validated for both 24.04 LTS and 22.04 LTS.

### 4. Should I disable password authentication for SSH?

**Yes, for strong security.**

**Once you’ve set up SSH key authentication** and confirmed you can log in, disabling password authentication for SSH reduces your server’s exposure to brute-force attacks.

**Steps:**

1. Open the SSH config:

```sh
sudo nano /etc/ssh/sshd_config
```

2. Find and set:

```ini title="/etc/ssh/sshd_config"
PasswordAuthentication no
```

3. Restart SSH:

```sh
sudo systemctl reload sshd
```

::: important

Always keep another way to access the server, like DigitalOcean’s Droplet Console or backup access, before making this change.

:::

### 5. Do I need to change the default SSH port?

**Changing the SSH port from 22 is optional** and not a substitute for proper SSH key authentication or firewall configuration.

**Pros & Cons:**

| Changing Port 22 | Effects |
| --- | --- |
| Slightly reduces scans | Automated bots may bypass non-22 ports |
| NOT a security substitute | Attackers can still find open ports |
| Requires firewall update | UFW or firewalld rules need changing |

**If you change the port:**

1. Edit `/etc/ssh/sshd_config`:

```ini title="/etc/ssh/sshd_config"
Port 2277   # Example port; use a port >1024 that's not in use
```

2. Update UFW rules:

```sh
sudo ufw allow 2277/tcp
```

3. Connect using:

```sh
ssh -p 2277 user@your_server_ip
```

4. Document your new port to avoid lockout.

Use it as an extra step, not your primary defense.

---

## Conclusion

Congratulations! You have completed the essential initial server setup process with Ubuntu. By following these steps, you’ve greatly improved your server’s security and laid the groundwork for future configuration. You now have a non-root user account with sudo privileges for safer daily administration, a [**firewall (UFW)**](/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu.md) configured to restrict all traffic except what you explicitly allow, and secure SSH key authentication in place—significantly reducing your risk of unauthorized access.

With these best practices in place, your Ubuntu server is ready for [**web hosting**](/digitalocean.com/how-to-install-lamp-stack-on-ubuntu.md) and [**application deployment**](/digitalocean.com/set-up-configure-application-server-ubuntu-24-04.md), and any further customization you need. The setup completed in this tutorial is a baseline requirement for nearly every Linux server project, and understanding these fundamentals will help you confidently manage infrastructure in the cloud or on-premises.

Remember to keep track of your new credentials, maintain regular updates, and continue learning to keep your systems secure and maintainable.

---

## Next Steps

At this point, you have a solid foundation for your server. You can install any of the software you need on your server now.

If you’d like to get more familiar with [**Linux commands**](/digitalocean.com/linux-commands.md), you can check our [**Linux Command Line Primer**](/digitalocean.com/a-linux-command-line-primer.md).

Looking for next steps on SSH and firewall hardening? Review [**SSH Essentials: Working with SSH Servers, Clients, and Keys**](/digitalocean.com/ssh-essentials-working-with-ssh-servers-clients-and-keys.md), [**How To Use SSH to Connect to a Remote Server**](/digitalocean.com/how-to-use-ssh-to-connect-to-a-remote-server.md), and [**Understanding the SSH Encryption and Connection Process**](/digitalocean.com/understanding-the-ssh-encryption-and-connection-process.md).

::: tip Try this next

Create a [<VPIcon icon="fa-brands fa-digital-ocean" />DigitalOcean Droplet](https://digitalocean.com/products/droplets) with [**Ubuntu 24.04 LTS**](/digitalocean.com/set-up-configure-application-server-ubuntu-24-04.md), apply these steps, then add a managed database or deploy via [<VPIcon icon="fa-brands fa-digital-ocean" />App Platform](https://digitalocean.com/products/app-platform). Explore [<VPIcon icon="fa-brands fa-digital-ocean" />DigitalOcean’s Ubuntu distribution page](https://digitalocean.com/products/linux-distribution/ubuntu) for current images and release notes.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Initial Server Setup with Ubuntu",
  "desc": "Learn how to securely set up a new Ubuntu server with user accounts, SSH keys, firewall rules, and basic hardening steps. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-ubuntu.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
