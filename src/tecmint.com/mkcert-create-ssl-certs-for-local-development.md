---
lang: en-US
title: "mkcert: Make Locally-Trusted Development Certificates on Linux"
description: "Article(s) > mkcert: Make Locally-Trusted Development Certificates on Linux"
icon: fa-brands fa-fedora
category:
  - DevOps
  - Linux
  - Fedora
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - fedora
  - redhat
  - centos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > mkcert: Make Locally-Trusted Development Certificates on Linux"
    - property: og:description
      content: "mkcert: Make Locally-Trusted Development Certificates on Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/mkcert-create-ssl-certs-for-local-development.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-21
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2025/07/mkcert-Create-Trusted-SSL-Certificates-for-Local-Development.webp
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

[[toc]]

---

<SiteInfo
  name="mkcert: Make Locally-Trusted Development Certificates on Linux"
  desc="In this article, you'll learn how to use mkcert to generate locally trusted HTTPS certificates for local development environments in Linux."
  url="https://tecmint.com/mkcert-create-ssl-certs-for-local-development"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2025/07/mkcert-Create-Trusted-SSL-Certificates-for-Local-Development.webp"/>

If you’ve ever tried to set up **HTTPS** locally for development, you’ve probably run into a wall of complexity. Generating a self-signed certificate, getting your browser to trust it, and dealing with the warnings can be a real pain, that’s where `mkcert` comes in.

`mkcert` is a simple tool that lets developers and sysadmins create locally-trusted SSL certificates for development and testing, which eliminates the annoying browser warnings, and yes, it’s free, open-source, and works beautifully on Linux.

In this guide, I’ll walk you through what `mkcert` is, how it works, how to install it, and how to use it effectively in a Linux environment.

::: important Why Do We Need HTTPS Locally?

Before we get into `mkcert`, let’s take a quick look at why you’d even want **HTTPS** in your development environment.

- **Modern Web Apps Need HTTPS**: Many APIs, service workers, cookies, and browser features require secure connections. Without **HTTPS**, your app may behave differently in dev vs. production.
- **Matching Production Environments**: If your production setup uses **HTTPS** (which it should), it’s smart to test everything under the same conditions during development.
- **Browser Compatibility and Testing**: **Chrome**, **Firefox**, and [**other modern browsers**](/tecmint.com/linux-web-browsers.md) enforce stricter security policies on insecure origins (HTTP).

:::

But here’s the catch: browsers hate self-signed certs, and they throw scary warnings unless the cert is signed by a trusted certificate authority (**CA**).

---

## What is mkcert?

`mkcert` is a command-line tool that makes locally trusted development certificates.

It does this by:

- Creating its own Certificate Authority (CA) on your system
- Making your OS and browsers trust this local CA
- Generating TLS certificates signed by this CA, so browsers trust them

In simple terms, `mkcert` acts like your personal **Certificate Authority (CA)**, and your browser treats the certificates it generates as valid, no warnings, no browser hacks, just clean, trusted HTTPS for your local development.

---

## Installing mkcert on Linux

Before you install `mkcert`, you need to make sure the necessary system libraries are available, which help `mkcert` integrate with your system’s certificate store, particularly for Firefox support (which uses the **NSS** database).

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install libnss3-tools
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install nss-tools
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/packagename
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add packagename
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S nss
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install mozilla-nss-tools
```

<!-- @tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install packagename
``` -->

:::

Next, there are two main ways to install `mkcert`: using your Linux distribution’s package manager or by downloading the binary manually. Choose whichever method fits your setup.

### Option A: Install mkcert via Package Manager

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install mkcert
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install mkcert
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/mkcert
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add mkcert
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S mkcert
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install mkcert
```

<!-- @tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install mkcert
``` -->

:::

### Option B: Manual Installation (for Other Distros)

If `mkcert` is not available in your distro’s repositories, or you prefer the latest release, you can manually download and install the binary.

First, download the [latest mkcert binary (<VPIcon icon="iconfont icon-github"/>`FiloSottile/mkcert`)](https://github.com/FiloSottile/mkcert/releases) from **GitHub**:

```sh
wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
```

Then move it to a directory in your system’s `PATH` and make it executable:

```sh
sudo mv mkcert-v1.4.4-linux-amd64 /usr/local/bin/mkcert
sudo chmod +x /usr/local/bin/mkcert
```

Finally, verify the installation by checking the version:

```sh
mkcert --version
```

If you see the version number, `mkcert` is now ready to use on your Linux machine.

---

## Trusting the Local Certificate Authority

Once you’ve installed `mkcert`, the next step is to create and trust a local Certificate Authority (CA), which is a one-time setup that ensures any certificate you generate using `mkcert` will be automatically trusted by your system and browser.

To get started, simply run the following command in your terminal:

```sh
mkcert -install
```

The above command generates a new local CA and stores it in your home directory at <VPIcon icon="fas fa-folder-open"/>`~/.local/share/mkcert` and then, it adds this CA to your Linux system’s trust store so that the operating system recognizes any certificates signed by it as valid.

If you have the `libnss3-tools` package installed (which you should if you’re using **Firefox**), `mkcert` will also add the CA to Firefox’s internal certificate database, which means Firefox will trust your development certificates without complaints.

When the command completes, you’ll see output similar to this:

```plaintext title="output"
Created a new local CA at "/home/you/.local/share/mkcert"
The local CA is now installed in the system trust store!
```

Your system is now configured to trust any **TLS/SSL** certificates generated by `mkcert`, which eliminates the usual browser warnings you get with self-signed certificates and sets the foundation for secure, trusted HTTPS during local development.

---

## Creating Local Certificates with mkcert

Now comes the fun part, actually generating a local SSL certificate using `mkcert`. Let’s say you’re developing a web app and want to serve it over **HTTPS** at `myapp.local`.

You can generate a certificate for that domain by simply running the following command:

```sh
mkcert myapp.local
```

Once executed, `mkcert` will generate two files in your current directory: `myapp.local.pem`, which is the certificate, and `myapp.local-key.pem`, which is the private key.

These files can be used directly with local web servers such as **Nginx**, **Apache**, or even lightweight dev servers like Python’s `http.server` when configured to support **SSL**.

If you’re working with more complex development environments that involve multiple domains, subdomains, or even localhost access, `mkcert` allows you to generate a certificate that covers all of them in a single command.

::: tip For example:

```sh
mkcert myapp.local "*.myapp.local" localhost 127.0.0.1 ::1
```

:::

The above command generates a certificate that’s valid for `myapp.local`, any subdomain like `api.myapp.local`, and also `localhost` and its IP equivalents `127.0.0.1` for IPv4 and `::1` for IPv6. 

---

## Using mkcert with a Local Nginx Server

Let’s walk through a practical example of using `mkcert` to serve a local web app over **HTTPS** using **Nginx**. Imagine you have a local development server running at `http://localhost:3000`, and you want to access it securely at `https://myapp.local`.

First, you need to map the domain `myapp.local` to your local machine. Open the <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-liens"/>`hosts` file with your [**favorite text editor**](/tecmint.com/linux-command-line-editors.md).

```sh
sudo nano /etc/hosts
```

and add the following line, which tells your system to resolve `myapp.local` to the local loopback interface.

```plaintext title="/etc/hosts"
127.0.0.1 myapp.local
```

Next, generate a development certificate for that domain using `mkcert`, which will create two files in your current directory: `myapp.local.pem` (the certificate) and `myapp.local-key.pem` (the private key).

```sh
mkcert myapp.local
```

Now, configure **Nginx** to use these certificates by opening your Nginx configuration (typically located in <VPIcon icon="fas fa-folder-open"/>`/etc/nginx/sites-available/` or <VPIcon icon="fas fa-folder-open"/>`/etc/nginx/conf.d/`) and create or update a server block like this:

```conf /etc/nginx/conf.d/nginx.conf
server {
    listen 443 ssl;
    server_name myapp.local;

    ssl_certificate /path/to/myapp.local.pem;
    ssl_certificate_key /path/to/myapp.local-key.pem;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

Be sure to replace `/path/to/` with the actual path to the certificate and key files generated by `mkcert`.

Once the configuration is in place, reload or restart Nginx to apply the changes:

```sh
sudo systemctl restart nginx
```

Now open your browser and visit `https://myapp.local`. You should see your app running securely over **HTTPS**, with no certificate warnings, just like it would in a real production environment.

### Security Note

**Security Note**: `mkcert` is strictly intended for development and testing purposes. Certificates generated by `mkcert` should never be used in production environments, as the tool creates a local Certificate Authority (CA) that is not recognized by global systems or browsers.

Additionally, the private key for this CA is stored in plain text on your local machine, which poses a security risk if misused. For any production deployment, always use a trusted certificate authority such as **Let’s Encrypt** to ensure proper validation and security compliance.

---

## How to Uninstall mkcert and Remove the Local CA

If you ever need to clean up your system or remove `mkcert` entirely, the process is simple. First, you can remove the locally installed Certificate Authority (CA) by running the command:

```sh
mkcert -uninstall
```

This command deletes the mkcert-generated root CA from your system’s trust store, as well as from Firefox’s NSS database (if applicable). It ensures that any certificates signed by `mkcert` are no longer recognized as trusted by your browsers or local tools.

If you manually installed `mkcert` (for example, by downloading the binary directly), you should also remove the executable from your system.

```sh
sudo rm /usr/local/bin/mkcert
```

This deletes the `mkcert` binary from your local machine. After running both commands, `mkcert` and its **CA** will be completely removed from your system, leaving no residual trust configurations behind.

---

## Conclusion

Setting up **HTTPS** for local development doesn’t have to be complicated. With `mkcert`, developers and sysadmins get a quick, reliable way to generate locally-trusted certificates without the browser warnings, and without wrestling with OpenSSL or complex certificate chains.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "mkcert: Make Locally-Trusted Development Certificates on Linux",
  "desc": "In this article, you'll learn how to use mkcert to generate locally trusted HTTPS certificates for local development environments in Linux.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/mkcert-create-ssl-certs-for-local-development.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
