---
lang: en-US
title: "How to Set Up SSH Keys on Ubuntu 18.04"
description: "Article(s) > How to Set Up SSH Keys on Ubuntu 18.04"
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
      content: "Article(s) > How to Set Up SSH Keys on Ubuntu 18.04"
    - property: og:description
      content: "How to Set Up SSH Keys on Ubuntu 18.04"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-set-up-ssh-keys-on-ubuntu-1804.html
prev: /devops/linux-debian/articles/README.md
date: 2018-04-28
isOriginal: false
author:
  - name: Hanif Jetha
    url : https://digitalocean.com//community/users/choomigo
cover: https://community-cdn-digitalocean-com.global.ssl.fastly.net/qo9KtH9GERzVvAJKeiuSTgCi
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
  name="How to Set Up SSH Keys on Ubuntu 18.04"
  desc="SSH-key-based authentication provides a more secure alternative to password-based authentication. In this tutorial we’ll learn how to set up SSH key-based au… "
  url="https://digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://community-cdn-digitalocean-com.global.ssl.fastly.net/qo9KtH9GERzVvAJKeiuSTgCi"/>

SSH, or secure shell, is an encrypted protocol used to administer and communicate with servers. When working with an Ubuntu server, chances are you will spend most of your time in a terminal session connected to your server through SSH.

In this guide, we’ll focus on setting up SSH keys for an Ubuntu 18.04 installation. SSH keys provide a secure way of logging into your server and are recommended for all users.

---

## Step 1 — Creating the RSA Key Pair

The first step is to create a key pair on the client machine (usually your local computer).

By default `ssh-keygen` will create a 2048-bit RSA key pair, which is secure enough for most use cases (you may optionally pass in the `-b 4096` flag to create a larger 4096-bit key).

After entering the command, you should receive the following output:

```sh
ssh-keygen
#
# Generating public/private rsa key pair.
# Enter file in which to save the key (/your_home/.ssh/id_rsa):
```

Press <kbd>ENTER</kbd> to save the key pair into the <VPIcon icon="fas fa-folder-open"/>`.ssh/` subdirectory in your home directory, or specify an alternate path.

If you’ve previously generated an SSH key pair, you may receive the following prompt:

```plaintext title="output"
/home/your_home/.ssh/id_rsa already exists.
Overwrite (y/n)?
```

If you choose to overwrite the key on disk, you will **not** be able to authenticate using the previous key anymore. Be very careful when selecting yes, as this is a destructive process that cannot be reversed.

The next prompt will ask you to enter a secure passphrase:

```plaintext title="output"
Enter passphrase (empty for no passphrase):
```

Here you have the option to enter a secure passphrase, which is highly recommended. A passphrase adds a layer of security to prevent unauthorized users from logging in. To learn more about security, consult our tutorial on [**How To Configure SSH Key-Based Authentication on a Linux Server**](/digitalocean.com/how-to-configure-ssh-key-based-authentication-on-a-linux-server.md).

All together, the `ssh-keygen` command will return output like the following:

```plaintext title="output"
Your identification has been saved in /your_home/.ssh/id_rsa.
Your public key has been saved in /your_home/.ssh/id_rsa.pub.
The key fingerprint is:
a9:49:2e:2a:5e:33:3e:a9:de:4e:77:11:58:b6:90:26 username@remote_host
The key's randomart image is:
+--[ RSA 2048]----+
|     ..o         |
|   E o= .        |
|    o. o         |
|        ..       |
|      ..S        |
|     o o.        |
|   =o.+.         |
|. =++..          |
|o=++.            |
+-----------------+
```

You now have a public and private key that you can use to authenticate. The next step is to place the public key on your server so that you can use SSH-key-based authentication to log in.

---

## Step 2 — Copying the Public Key to Ubuntu Server

The quickest way to copy your public key to the Ubuntu host is to use a utility called `ssh-copy-id`. Due to its simplicity, this method is highly recommended if available. If you do not have `ssh-copy-id` available to you on your client machine, you may use one of the two alternate methods provided in this section (copying via password-based SSH, or manually copying the key).

### Copying Public Key Using `ssh-copy-id`

The `ssh-copy-id` tool is included by default in many operating systems, so you may have it available on your local system.

::: note

For this method to work, you must already have password-based SSH access to your server.

:::

To use the utility, you specify the remote host that you would like to connect to, and the user account that you have password-based SSH access to. This is the account to which your public SSH key will be copied.

You may receive the following message:

```sh
ssh-copy-id username@remote_host
#
# The authenticity of host '203.0.113.1 (203.0.113.1)' can't be established.
# ECDSA key fingerprint is fd:fd:d4:f9:77:fe:73:84:e1:55:00:ad:d6:6d:22:fe.
# Are you sure you want to continue connecting (yes/no)? yes
```

This means that your local computer does not recognize the remote host. This will happen the first time you connect to a new host. Write “yes” and press <kbd>ENTER</kbd> to continue.

Next, the utility will scan your local account for the <VPIcon icon="fas fa-key"/>`id_rsa.pub` key that you created earlier. When it finds the key, it will prompt you for the password of the remote user’s account:

```plaintext title="output"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
username@203.0.113.1's password:
```

Write in the password (nothing will be displayed for security purposes) and press <kbd>ENTER</kbd>. The utility will connect to the account on the remote host using the password you provided. It will then copy the contents of your <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`id_rsa.pub` key into a file in the remote account’s home <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory called <VPIcon icon="fas fa-key"/>`authorized_keys`.

You should receive the following output:

```plaintext title="authorized_keys"
Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'username@203.0.113.1'"
and check to make sure that only the key(s) you wanted were added.
```

At this point, your <VPIcon icon="fas fa-key"/>`id_rsa.pub` key has been uploaded to the remote account. You can continue on to [**Step 3**](#step-3-authenticate-to-ubuntu-server-using-ssh-keys).

### Copying Public Key Using SSH

If you do not have `ssh-copy-id` available, but you have password-based SSH access to an account on your server, you can upload your keys using a conventional SSH method. **Remember, this will only work if you have password-based SSH access to your server.**

You can do this by using the `cat` command to read the contents of the public SSH key on your local computer and piping that through an SSH connection to the remote server.

On the other side, you can make sure that the <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory exists and has the correct permissions under the account you’re using.

You can then output the content you piped over into a file called <VPIcon icon="fas fa-key"/>`authorized_keys` within this directory. Use the `>>` redirect symbol to append the content instead of overwriting it. This will let you add keys without destroying previously added keys.

You may receive the following message

```sh
cat ~/.ssh/id_rsa.pub | ssh username@remote_host "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"
#
# The authenticity of host '203.0.113.1 (203.0.113.1)' can't be established.
# ECDSA key fingerprint is fd:fd:d4:f9:77:fe:73:84:e1:55:00:ad:d6:6d:22:fe.
# Are you sure you want to continue connecting (yes/no)? yes
```

This means that your local computer does not recognize the remote host. This will happen the first time you connect to a new host. Write “yes” and press <kbd>ENTER</kbd> to continue.

After, you should be prompted to enter the remote user account’s password:

```plaintext title="output"
username@203.0.113.1's password:
```

After entering your password, the contents of your <VPIcon icon="fas fa-key"/>`id_rsa.pub` key will be copied to the end of the <VPIcon icon="fas fa-key"/>`authorized_keys` file of the remote user’s account. Continue on to [Step 3](#step-3-authenticate-to-ubuntu-server-using-ssh-keys) if this was successful.

### Copying Public Key Manually

If you do not have password-based SSH access to your server available, you will have to complete the process manually.

This section outlines how to manually append the content of your <VPIcon icon="fas fa-key"/>`id_rsa.pub` file to the <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`authorized_keys` file on your remote machine.

To display the contents of your <VPIcon icon="fas fa-key"/>`id_rsa.pub` run the following command on your local computer.

This will return the key’s content in the command’s output:

```sh
cat ~/.ssh/id_rsa.pub
#
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCqql6MzstZYh1TmWWv11q5O3pISj2ZFl9HgH1JLknLLx44+tXfJ7mIrKNxOOwxIxvcBF8PXSYvobFYEZjGIVCEAjrUzLiIxbyCoxVyle7Q+bqgZ8SeeM8wzytsY+dVGcBxF6N4JS+zVk5eMcV385gG3Y6ON3EG112n6d+SMXY0OEBIcO6x+PnUSGHrSgpBgX7Ks1r7xqFa7heJLLt2wWwkARptX7udSq05paBhcpB0pHtA1Rfz3K2B+ZVIpSDfki9UVKzT8JUmwW6NNzSgxUfQHGwnW7kj4jp4AT0VZk3ADw497M2G/12N0PPB5CnhHf7ovgy6nL1ikrygTKRFmNZISvAcywB9GVqNAVE+ZHDSCuURNsAInVzgYo9xgJDW8wUw2o8U77+xiFxgI5QSZX3Iq7YLMgeksaO4rBJEa54k8m5wEiEE1nUhLuJ0X/vh2xPff6SQ1BL/zkOhvJCACK6Vb15mDOeCSq54Cr7kvS46itMosi/uS66+PujOO+xt/2FWYepz6ZlN70bRly57Q06J+ZJoc9FfBCbCyYH7U/ASsmY095ywPsBo1XQ9PqhnN1/YOorJ068foQDNVpm146mUpILVxmq41Cj55YKHEazXGsdBIbXWhcrRf4G2fJLRcGUr9q8/lERo9oxRm5JFX6TCmj6kmiFqv+Ow9gI0x8GvaQ== demo@test
```

Access your remote host using whichever method you have available.

Once you have access to your account on the remote server, you should make sure the <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory exists. This command will create the directory if necessary, or do nothing if it already exists:

```sh
mkdir -p ~/.ssh

```

Now you can create or modify the <VPIcon icon="fas fa-key"/>`authorized_keys` file within this directory. You can add the contents of your <VPIcon icon="fas fa-key"/>`id_rsa.pub` file to the end of the <VPIcon icon="fas fa-key"/>`authorized_keys` file, creating it if necessary. For this command, substitute the `public_key_string` with the output from the `cat ~/.ssh/`<VPIcon icon="fas fa-key"/>`id_rsa.pub` command that you executed on your local system. It should start with `ssh-rsa AAAA...`:

```sh
echo public_key_string >> ~/.ssh/authorized_keys

```

Finally, ensure that the <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory and <VPIcon icon="fas fa-key"/>`authorized_keys` file have the appropriate permissions set:

```sh
chmod -R go= ~/.ssh
```

This recursively removes all “group” and “other” permissions for the <VPIcon icon="fas fa-folder-open"/>`~/.ssh/` directory.

If you’re using the **root** account to set up keys for a user account, it’s also important that the <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory belongs to the user and not to **root**. In this tutorial our user is named sammy but you should substitute the appropriate username into the following command:

```sh
chown -R sammy:sammy ~/.ssh
```

Now you can attempt passwordless authentication with your Ubuntu server.

---

## Step 3 — Authenticating to Ubuntu Server Using SSH Keys

If you’ve successfully completed one of the procedures in [Step 2](#copying-public-key-using-ssh-copy-id), you should be able to log into the remote host *without* the remote account’s password.

If this is your first time connecting to this host (if you used the manual method), you may receive something like this:

```sh
ssh username@remote_host
#
# The authenticity of host '203.0.113.1 (203.0.113.1)' can't be established.
# ECDSA key fingerprint is fd:fd:d4:f9:77:fe:73:84:e1:55:00:ad:d6:6d:22:fe.
# Are you sure you want to continue connecting (yes/no)? yes
```

This means that your local computer does not recognize the remote host. Write “yes” and then press <kbd>ENTER</kbd> to continue.

If you did not supply a passphrase for your private key, you will be logged in immediately. If you supplied a passphrase for the private key when you created the key, you will be prompted to enter it (note that your keystrokes will not display in the terminal session for security). After authenticating, a new shell session should open for you with the configured account on the Ubuntu server.

If key-based authentication was successful, continue on to learn how to further secure your system by disabling password authentication.

---

## Step 4 — Disabling Password Authentication on your Server

If you were able to log into your account using SSH without a password, you have successfully configured SSH-key-based authentication to your account. However, your password-based authentication mechanism is still active, meaning that your server is still exposed to brute-force attacks.

Before completing the steps in this section, make sure that you either have SSH-key-based authentication configured for the **root** account on this server, or preferably, that you have SSH-key-based authentication configured for a non-**root** account on this server with `sudo` privileges. This step will lock down password-based logins, ensuring that you will still be able to get administrative access is crucial.

Once you’ve confirmed that your remote account has administrative privileges, log into your remote server with SSH keys, either as **root** or with an account with `sudo` privileges. Then, open up the SSH daemon’s configuration file:

```sh
sudo nano /etc/ssh/sshd_config
```

Inside the file, search for a directive called `PasswordAuthentication`. This may be commented out with a `#` at the beginning of the line. Uncomment the line by removing the `#`, and set the value to `no`. This will disable your ability to log in via SSH using account passwords:

```plaintext title="/etc/ssh/sshd_config"
...
PasswordAuthentication no
...
```

Save and close the file when you’re finished by pressing <kbd>CTRL</kbd>+<kbd>X</kbd>, then <kbd>Y</kbd> and <kbd>ENTER</kbd> to exit `nano`. To activate these changes, you need to restart the `sshd` service:

```sh
sudo systemctl restart ssh
```

As a precaution, open up a new terminal window and test that the SSH service is functioning correctly before closing the current session:

```sh
ssh username@remote_host
```

Once you’ve verified that your SSH service is functioning properly, you can safely close all current server sessions.

The SSH daemon on your Ubuntu server now only responds to SSH-key-based authentication and password-based authentication has been disabled.

---

## Conclusion

You should now have SSH-key-based authentication configured on your server, allowing you to sign in without providing an account password.

If you’d like to learn more about working with SSH, take a look at our [**SSH Essentials Guide**](/digitalocean.com/ssh-essentials-working-with-ssh-servers-clients-and-keys.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up SSH Keys on Ubuntu 18.04",
  "desc": "SSH-key-based authentication provides a more secure alternative to password-based authentication. In this tutorial we’ll learn how to set up SSH key-based au… ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-set-up-ssh-keys-on-ubuntu-1804.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
