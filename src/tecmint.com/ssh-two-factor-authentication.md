---
lang: en-US
title: "How to Setup Two-Factor Authentication For SSH In Linux"
description: "Article(s) > How to Setup Two-Factor Authentication For SSH In Linux"
icon: fa-brands fa-linux
category:
  - DevOps
  - Linux
  - Fedora
  - Debian
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - fedora
  - debian
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Setup Two-Factor Authentication For SSH In Linux"
    - property: og:description
      content: "How to Setup Two-Factor Authentication For SSH In Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/ssh-two-factor-authentication.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-16
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2013/04/SSH-Two-Factor-Google-Authentication.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Fedora > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
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
  name="How to Setup Two-Factor Authentication For SSH In Linux"
  desc="The Google Authenticator is an open-source module that includes implementations of one-time passcodes (TOTP) verification tokens developed by Google."
  url="https://tecmint.com/ssh-two-factor-authentication"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2013/04/SSH-Two-Factor-Google-Authentication.png"/>

By default, **SSH** already uses secure data communication between remote machines, but if you want to add an extra security layer to your SSH connections, you can add a **Google Authenticator** (**two-factor authentication**) module that allows you to enter a random one-time password (**TOTP**) verification code while connecting to **SSH** servers. You’ll have to enter the verification code from your **smartphone** or **PC** when you connect.

The **Google Authenticator** is an open-source module that includes implementations of one-time passcodes (**TOTP**) verification tokens developed by **Google**.

It supports several mobile platforms, as well as [**PAM (Pluggable Authentication Module)**](/tecmint.com/configure-pam-in-centos-ubuntu-linux.md). These one-time passcodes are generated using open standards created by the **OATH** **Initiative for Open Authentication**.

In this article, I will show you how to set up and configure **SSH** for two-factor authentication under [**RedHat-based**](/tecmint.com/redhat-based-linux-distributions.md) and [**Debian-based**](/tecmint.com/debian-based-linux-distributions.md) Linux distributions such as Fedora, CentOS Stream, Rocky Linux, and AlmaLinux, Ubuntu, Debian, and Mint.

---

## Installing Google Authenticator in Linux

Open the machine that you want to set up two-factor authentication, and install the following **PAM** libraries along with the development libraries that are needed for the **PAM** module to work correctly with the **Google Authenticator** module.

On [**RedHat-based Systems**](/tecmint.com/redhat-based-linux-distributions.md) (RHEL, CentOS Stream, Rocky Linux, AlmaLinux), you need to enable the [**EPEL repository**](/tecmint.com/install-epel-repo-rhel-rocky-almalinux.md) and install the required packages:

```sh
sudo dnf install epel-release -y
sudo dnf install google-authenticator qrencode-libs -y
```

On [**Debian-based systems**](/tecmint.com/debian-based-linux-distributions.md), install the Google Authenticator PAM module using the following [**`apt` command**](/tecmint.com/apt-command-in-linux.md).

```sh
sudo apt install libpam-google-authenticator -y
```

---

## Generate Google Authentication Tokens

Once installed, run the following command as the user you want to secure.

```sh
google-authenticator
```

It will prompt you with a series of questions. Simply type `"y"` (**yes**) as the answer in most situations. If something goes wrong, you can run the command again to reset the settings.

After these questions, you will get your secret key and emergency codes. Write down these details somewhere, as we’ll need the secret key later to set up the **Google Authenticator** app.

You may see output like this:

```plaintext :collapsed-lines title="output"
Do you want authentication tokens to be time-based (y/n) y
Warning: pasting the following URL into your browser exposes the OTP secret to Google:
https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/root@tecmint%3Fsecret%3DCYZF2YF7HFGX55ZEPQYLHOO5JM%26issuer%3Dtecmint

Failed to use libqrencode to show QR code visually for scanning.
Consider typing the OTP secret into your app manually.

Your new secret key is: CYZF2YF7HFGX55ZEPQYLHOM
Enter code from app (-1 to skip): -1
Code confirmation skipped

Your emergency scratch codes are:
83714291
53083200
80975623
57217008
77496339
```

Continue answering `"y"` to all configuration prompts:

```plaintext title="output"
Do you want me to update your "/root/.google_authenticator" file (y/n) y
Do you want to disallow multiple uses of the same authentication token? (y/n) y
Do you want to increase the window to about 4min? (y/n) y
Do you want to enable rate-limiting? (y/n) y
```

![Generate Google Auth Tokens](https://tecmint.com/wp-content/uploads/2013/04/Generate-Google-Auth-Tokens.png)

---

## Configuring SSH to Use Google Authenticator in Linux

Open the **PAM** configuration file <VPIcon icon="fas fa-folder-open"/>`/etc/pam.d/`<VPIcon icon="fas fa-file-lines"/>`sshd` and add the following line at the top or before any <VPIcon icon="fas fa-file-lines"/>`pam_permit.so` line:

```sh
auth required pam_google_authenticator.so nullok
```

![Configure PAM for SSH](https://tecmint.com/wp-content/uploads/2013/04/Configure-PAM-in-SSH.png)

::: note

If **SELinux** is enabled, move the <VPIcon icon="fas fa-file-lines"/>`.google_authenticator` file to a location with proper SELinux context (like <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`) and specify the full path:

:::

```sh
auth required pam_google_authenticator.so secret=/home//.ssh/.google_authenticator nullok
```

Next, open the **SSH** configuration file <VPIcon icon="fas fa-folder-open"/>`/etc/ssh/`<VPIcon icon="fas fa-file-lines"/>`sshd_config` and make sure these lines are set:

```sh title="/etc/ssh/sshd_config"
UsePAM yes
ChallengeResponseAuthentication yes
```

![Configure SSH for Google Auth](https://tecmint.com/wp-content/uploads/2013/04/Configure-SSH-for-Google-Auth.png)

You may optionally enforce both 2FA and key/password authentication:

```sh title="/etc/ssh/sshd_config"
AuthenticationMethods publickey,keyboard-interactive
```

Finally, restart the **SSH** service to take new changes.

```sh
sudo systemctl restart sshd
```

---

## Configuring the Google Authenticator App

Launch the **Google Authenticator** app on your smartphone. Press **+** and choose “**Enter a setup key**“. If you don’t have this app, you can download and install the [<VPIcon icon="fa-brands fa-google"/>Google Authenticator](https://support.google.com/accounts/bin/answer.py?hl=en&answer=1066447) app on your **Android/iPhone/Blackberry** devices.

Add your account ‘**Name**‘ and enter the ‘**secret key**‘ generated earlier.

![SSH Secret Key](https://tecmint.com/wp-content/uploads/2013/04/SSH-Secret-Key.jpeg)

It will generate a one-time password (**verification code**) that will constantly change every **30 seconds** on your phone.

![SSH Google Auth Code](https://tecmint.com/wp-content/uploads/2013/04/SSH-Auth-Code.jpeg)

Now, try to log in via **SSH**, you will be prompted with a **Google Authenticator code** (**Verification code**) and **Password** whenever you attempt to log in via **SSH**. You have only **30 seconds** to enter this verification code; if you miss it will regenerate a new verification code.

```plaintext title="output"
login as: tecmint
Access denied
Using keyboard-interactive authentication.
Verification code:
Using keyboard-interactive authentication.
Password:
Last login: Tue Apr 23 13:58:29 2022 from 172.16.25.125
```

If you don’t have a smartphone, you can also use the “[<VPIcon icon="fa-brands fa-firefox"/>Authenticator](https://addons.mozilla.org/en-US/firefox/addon/auth-helper.md)” Firefox add-on or a desktop TOTP app like [<VPIcon icon="fas fa-globe"/>KeePassXC](https://keepassxc.org) or [<VPIcon icon="fas fa-globe"/>Authenticator App](https://flathub.org/apps/com.belmoussaoui.Authenticator) for Linux.

::: important

The two-factor authentication works with password-based SSH login. If you are using any [**private/public key SSH session**](/tecmint.com/ssh-passwordless-login-using-ssh-keygen-in-5-easy-steps.md), it will ignore two-factor authentication and log you in directly.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Setup Two-Factor Authentication For SSH In Linux",
  "desc": "The Google Authenticator is an open-source module that includes implementations of one-time passcodes (TOTP) verification tokens developed by Google.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/ssh-two-factor-authentication.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
