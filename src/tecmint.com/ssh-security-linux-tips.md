---
lang: en-US
title: "20 Essential SSH Configurations and Security Tips for Linux"
description: "Article(s) > 20 Essential SSH Configurations and Security Tips for Linux"
icon: iconfont icon-shell
category:
  - Shell
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 20 Essential SSH Configurations and Security Tips for Linux"
    - property: og:description
      content: "20 Essential SSH Configurations and Security Tips for Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/ssh-security-linux-tips.html
prev: /programming/sh/articles/README.md
date: 2025-10-06
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/03/SSH-Security-Settings.webp
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

[[toc]]

---

<SiteInfo
  name="20 Essential SSH Configurations and Security Tips for Linux"
  desc="In this guide, we’ll cover essential SSH security tips every Linux beginner should know to keep their servers secure, efficient, and running smoothly."
  url="https://tecmint.com/ssh-security-linux-tips"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/03/SSH-Security-Settings.webp"/>

**SSH (Secure Shell)** is one of the most important tools for Linux system administrators and developers, as it allows you to securely log in to remote machines, run command-line programs, manage files, transfer data, forward ports, and even run GUI apps remotely.

But here’s the catch → using **SSH** with default settings isn’t always safe, because hackers constantly scan the internet for open SSH ports and weak logins. That’s why learning how to properly configure and [**secure SSH is a must**](/tecmint.com/ssh-security-best-practices.md).

In this guide, we’ll cover essential SSH configurations and security tips every Linux beginner should know to keep their servers secure, efficient, and running smoothly.

---

## 1. How to Change the Default SSH Port Number

By default, SSH listens on port `22`, which makes it a common target for automated bot attacks. One simple way to reduce such attacks is by changing SSH to a non-standard port.

To do this, open the SSH configuration file with a text editor:

```sh
sudo nano /etc/ssh/sshd_config
```

Look for the line that says:

```sh
#Port 22
```

Uncomment it (remove the `#`) and change it to a custom port number, for example:

```sh
Port 2200
```

After saving the file, restart the SSH service to apply the changes:

```sh
sudo systemctl restart ssh     # Debian/Ubuntu
sudo systemctl restart sshd    # RHEL/CentOS
```

::: important

On **Debian/Ubuntu** the SSH service is named `ssh`, and on **RHEL/CentOS** it is `sshd`. Always use the correct name when restarting or checking the service.

:::

Next, update your firewall rules to allow traffic on the new port.

::: code-tabs#sh

@tab:active On FirewallD

```sh
sudo firewall-cmd --permanent --zone=public --add-port=2200/tcp
sudo firewall-cmd --reload
```

@tab On UFW

```sh
sudo ufw allow 2200/tcp
```

:::

In newer **OpenSSH** versions, changing the port in `sshd_config` may not work because SSH is managed via **systemd** sockets.

Create a systemd socket override (replace **ListenStream** with your desired port):

```sh
sudo mkdir -p /etc/systemd/system/ssh.socket.d
sudo bash -c 'cat > /etc/systemd/system/ssh.socket.d/listen.conf <<EOF
[Socket]
ListenStream=
ListenStream=2200
EOF'
```

Reload systemd and restart the SSH service:

```sh
sudo systemctl daemon-reload
sudo systemctl restart ssh     # Debian/Ubuntu
sudo systemctl restart sshd    # RHEL/CentOS
```

Update your firewall rules (same as above).

---

## 2. How to Disable Root SSH Login

Allowing direct root login over **SSH** is risky because it gives attackers a single target for brute-force attacks. A safer approach is to log in as a normal user and then use `sudo` for administrative tasks.

To disable root login, find the following line in your SSH configuration file.

```sh
PermitRootLogin yes
```

and change it to:

```sh
PermitRootLogin no
```

Save the file and restart the SSH service to apply the change:

```sh
sudo systemctl restart sshd
```

---

## 3. How to Log in to a Linux Server Without an SSH Password

Password-based SSH logins can be convenient but are less secure and can be cumbersome for repeated access.

A safer and more efficient approach is [**SSH key-based authentication**](/tecmint.com/ssh-passwordless-login-using-ssh-keygen-in-5-easy-steps.md), which allows you to log in without entering a password.

First, generate a pair of SSH keys on your local machine:

```sh
ssh-keygen -t rsa -b 4096
```

Next, copy your public key to the remote server:

```sh
ssh-copy-id user@remote-server
```

Once the key is installed, you can log in to the server without a password:

```sh
ssh user@remote-server
```

---

## 4. How to Allow Only Specific Users to SSH on Linux

To improve SSH security, you can restrict access so that only certain users or groups can log in, which is useful for preventing unauthorized accounts from attempting SSH connections.

To allow specific users, add the following line to your SSH configuration file.

```sh
AllowUsers alice bob
```

Or, to allow entire groups, use:

```sh
AllowGroups admins devops
```

After making these changes, restart the SSH service:

```sh
sudo systemctl restart sshd
```

From now on, only the specified users (`alice` and `bob`) or groups (`admins` and `devops`) will be able to log in via SSH, helping to tighten server security.

---

## 5. How to Show a Welcome or Warning Message on SSH Login

Displaying a message when users log in via SSH can be useful for welcoming users or showing legal/security warnings.

One simple option is to edit the **Message of the Day** (**MOTD**) file:

```sh
sudo nano /etc/motd
```

For a more formal or legal warning, you can create a banner in `/etc/issue.net`:

```sh
sudo nano /etc/issue.net
```

Then, tell SSH to display this banner by adding or editing the following line in the SSH configuration file:

```sh
Banner /etc/issue.net
```

Finally, restart the SSH service to apply the changes:

```sh
sudo systemctl restart sshd
```

Now, whenever someone logs in via SSH, they will see your custom welcome or warning message.

---

## 6. How to Trace Failed SSH Login Attempts

Monitoring [**failed SSH login attempts**](/tecmint.com/find-failed-ssh-login-attempts-in-linux.md) is essential for detecting unauthorized access attempts and improving server security.

On [**Debian-based distributions**](/tecmint.com/debian-based-linux-distributions.md), you can check the logs with:

```sh
sudo grep "Failed password" /var/log/auth.log
```

On [**RHEL-based distributions**](/tecmint.com/redhat-based-linux-distributions.md), use:

```sh
sudo grep "Failed password" /var/log/secure
```

For real-time monitoring of SSH login activity, you can use the [**`journalctl` command**](/tecmint.com/manage-systemd-logs-using-journalctl.md):

```sh
sudo journalctl -u sshd -f
```

---

## 7. How to Restrict SSH Access by IP Address in Linux

Restricting SSH access to specific IP addresses adds an extra layer of security by allowing only trusted machines to connect.

You can configure this directly in the SSH configuration file by specifying a user and their allowed IP address:

```conf
AllowUsers user@192.168.1.100
```

Alternatively, you can enforce IP restrictions at the firewall level. For example, with **UFW**, allow access only from a specific IP address to port `22`:

::: code-tabs#sh

@tab:active On FirewallD

```sh
sudo firewall-cmd --permanent --zone=public \
--add-rich-rule='rule family="ipv4" source address="192.168.1.100" port protocol="tcp" port="22" accept'
sudo firewall-cmd --reload
```

@tab On UFW

```sh
sudo ufw allow from 192.168.1.100 to any port 22
```

:::

---

## 8. How to Set Idle Timeout for SSH Sessions

Idle SSH sessions can pose a security risk if a user forgets to log out, leaving the connection open for potential misuse.

You can automatically disconnect inactive sessions by setting an idle timeout in the SSH configuration file.

```sh
ClientAliveInterval 300
ClientAliveCountMax 0
```

::: info

- `ClientAliveInterval 300` → Sends a “**keep-alive**” message every 300 seconds (5 minutes).
- `ClientAliveCountMax 0` → Disconnects the session if no response is received.

:::

With these settings, any idle SSH session will automatically terminate after 5 minutes, reducing the risk of unattended open sessions.

---

## 9. How to Enable Two-Factor Authentication (2FA) for SSH Login

Adding two-factor authentication (**2FA**) to SSH significantly increases security by requiring a second verification step in addition to your password.

On **Debian**/**Ubuntu** systems, you can use **Google Authenticator**.

```sh
sudo apt install libpam-google-authenticator
```

Then, set up 2FA for your user account by running:

```sh
google-authenticator
```

Next, enable the PAM module for SSH by editing:

```sh
sudo nano /etc/pam.d/sshd
```

Add the following line:

```sh
auth required pam_google_authenticator.so
```

Finally, allow challenge-response authentication in the SSH configuration file:

```sh
ChallengeResponseAuthentication yes
```

Restart the SSH service to apply the changes:

```sh
sudo systemctl restart sshd
```

Now, each SSH login will require both your password and a time-based verification code, greatly improving your server’s security.

---

## 10. How to Limit SSH Connections with Fail2ban

**Fail2ban** is a powerful tool that helps [**protect your server from brute-force attacks**](/tecmint.com/prevent-ssh-brute-force-login-attacks.md) by temporarily banning IP addresses that fail login attempts multiple times.

To set it up, first install **Fail2ban** on **Debian**/**Ubuntu** systems:

```sh
sudo apt install fail2ban
```

Next, enable the SSH jail by creating or editing the local configuration file:

```sh
sudo nano /etc/fail2ban/jail.local
```

Add the following lines to configure protection for SSH:

```toml title="/etc/fail2ban/jail.local"
[sshd]
enabled = true
port = ssh
maxretry = 3
```

Finally, restart Fail2ban to apply the changes:

```sh
sudo systemctl restart fail2ban
```

With **Fail2ban** enabled, repeated failed login attempts will automatically trigger temporary bans, greatly reducing the risk of brute-force attacks.

---

## 11. How to Configure Key-Based SSH Authentication in Linux

Key-based authentication is a secure method to log in to SSH without using passwords. It relies on a cryptographic key pair, making brute-force attacks nearly impossible.

First, generate a key pair on your local machine using the modern and secure **Ed25519** algorithm is recommended:

```sh
ssh-keygen -t ed25519
```

Next, copy your public key to the remote server:

```sh
ssh-copy-id user@server
```

Once key-based authentication is working, you can further improve security by disabling password logins in the SSH configuration file.

```sh
PasswordAuthentication no
```

Restart the SSH service to apply the change:

```sh
sudo systemctl restart sshd
```

After this, only users with the correct private key can log in, providing a strong layer of protection against unauthorized access.

---

## 12. How to Allow or Deny SSH Access Using hosts.allow and hosts.deny

Linux provides a simple way to control access to services using **TCP** wrappers, which rely on the <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`hosts.allow` and <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`hosts.deny` files.

First, allow trusted IPs in <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`hosts.allow`:

```plaintext title="/etc/hosts.allow"
sshd: 192.168.1.100
```

Then, deny all other IPs by editing <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`hosts.deny`:

```plaintext title="/etc/hosts.deny"
sshd: ALL
```

With this setup, only the IP address `192.168.1.100` can connect via SSH, while all other attempts are blocked.

---

## 13. How to Check and Monitor Active SSH Sessions on Linux

Monitoring active SSH sessions helps you keep track of who is logged in and detect any unauthorized access. To see a list of currently logged-in users, you can use simple commands like:

```sh
who
OR
w
```

If you need to terminate a specific user’s session, you can use `pkill` with their username:

```sh
sudo pkill -u username
```

Regularly checking active sessions ensures you have control over who is connected to your server and helps maintain security.

---

## 14. How to Set Up SSH Tunneling (Port Forwarding) on Linux

SSH tunneling, or port forwarding, allows you to securely route network traffic from your local machine to a remote server, which is useful for accessing services behind a firewall or encrypting otherwise insecure connections.

For local port forwarding, you can forward a port on your local machine to a port on the remote server.

```sh
ssh -L 8080:localhost:80 user@remote-server
```

::: info

- `8080` → The local port on your machine.
- `localhost:80` → The destination on the remote server.
- `user@remote-server` → Your SSH login credentials.

:::

After running this command, any traffic sent to `localhost:8080` on your local machine will be securely forwarded to port `80` on the remote server.

---

## 15. How to Enable Verbose Logging for SSH Troubleshooting

When troubleshooting SSH connection issues, detailed logs can help identify the root cause, such as authentication problems or network delays. SSH provides a built-in verbose mode that shows step-by-step information about the connection process.

To enable verbose logging, simply run:

```sh
ssh -vvv user@server
```

- The `-vvv` flag increases the verbosity level, providing comprehensive details about each stage of the SSH connection.
- You can also use fewer vs (`-v` or `-vv`) for less detailed output.

Verbose mode is invaluable for diagnosing SSH problems, helping you quickly pinpoint configuration errors, network issues, or authentication failures.

---

## 16. How to Secure SSH with Strong Ciphers and Protocols

Securing SSH connections involves ensuring that only strong encryption algorithms and protocols are used. By default, SSH supports multiple protocols and ciphers, some of which are outdated and vulnerable.

You can [**harden your SSH server**](/tecmint.com/linux-server-hardening-security-tips.md) by explicitly specifying secure options in the configuration file:

```plaintext
Protocol 2
Ciphers aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-512,hmac-sha2-256
KexAlgorithms curve25519-sha256@libssh.org
```

- **Protocol 2** → Ensures only the secure SSHv2 protocol is used.
- **Ciphers** → Specifies strong encryption algorithms for data transfer.
- **MACs** → Sets secure message authentication codes to verify data integrity.
- **KexAlgorithms** → Chooses secure key exchange algorithms.

After making these changes, restart SSH to apply them:

```sh
sudo systemctl restart sshd
```

---

## 17. How to Limit SSH Access to a Specific Port Range

Restricting SSH access to a specific port range adds another layer of security by controlling which ports are allowed for connections, which can help reduce exposure to automated attacks on unused ports.

On systems using **UFW (Uncomplicated Firewall)**, you can allow a range of ports with the following command:

```sh
sudo ufw allow 1024:1040/tcp
```

For FirewallD users, the equivalent would be:

```sh
sudo firewall-cmd --permanent --add-port=1024-1040/tcp
sudo firewall-cmd --reload
```

This configuration permits SSH connections only on ports `1024` to `1040`, blocking access on all other ports.

---

## 18. How to Change SSH Connection Timeout in Linux

Limiting the time SSH waits for a user to log in helps prevent brute-force attacks and reduces the window for unauthorized access attempts, which can be configured using the `LoginGraceTime` setting in the SSH server configuration file.

Add or modify the following line, which will set the maximum time (in seconds) SSH will wait for a successful login before disconnecting.

```sh
LoginGraceTime 30
```

After saving the file, restart the SSH service to apply the change:

```sh
sudo systemctl restart sshd
```

---

## 19. How to Enable SSH Compression for Faster Connections

Enabling compression in SSH can improve connection speed, especially when transferring large amounts of data over slower networks. SSH can compress data before sending it, reducing the amount of traffic sent over the network.

To use compression on a per-connection basis, simply add the `-C` flag when connecting:

```sh
ssh -C user@server
```

For a permanent solution, you can enable compression in the SSH client configuration file.

```sh
Compression yes
```

Once enabled, SSH will automatically compress data for all connections, making transfers faster while still maintaining encryption and security.

---

## 20. How to Configure SSH Aliases for Easier Access

Managing multiple SSH connections can be cumbersome if you have to remember IP addresses, ports, and usernames for each server. Using SSH aliases simplifies this process by allowing you to create shortcuts for frequently accessed servers.

To set up an alias, edit your SSH client configuration file and add an entry like this:

```plaintext
Host myserver
  HostName 192.168.1.50
  User alice
  Port 2200
```

After saving the file, you can connect simply by running:

```sh
ssh myserver
```

---

## 21. How to Forward GUI Applications Over SSH (X11 Forwarding)

SSH can do more than just command-line access; it can also forward graphical applications from a remote server to your local machine using X11 forwarding, which allows you to run GUI apps on the server as if they were running locally.

To enable X11 forwarding, connect with the `-X` option:

```sh
ssh -X user@server
```

Once connected, you can launch GUI applications, such as:

```sh
gedit
```

The application’s window will appear on your local machine, while all processing happens on the remote server.

::: tip

Ensure X11 forwarding is allowed in the SSH server configuration file.

:::

```sh
X11Forwarding yes
```

---

## Final Thoughts

**SSH** is an essential tool for anyone managing Linux servers, and using it correctly can make your work both easier and more secure.

By following the tips in this guide, you can protect your servers from unauthorized access, simplify your logins with key-based authentication and aliases, and monitor activity with tools like **fail2ban** and session timeouts.

Start with the basics, such as changing the default port, disabling root login, and setting up key-based login, and then gradually explore advanced features like two-factor authentication, SSH tunneling, and verbose logging.

Mastering these practices will help you manage servers efficiently, stay safe from attacks, and work like a confident Linux administrator.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "20 Essential SSH Configurations and Security Tips for Linux",
  "desc": "In this guide, we’ll cover essential SSH security tips every Linux beginner should know to keep their servers secure, efficient, and running smoothly.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/ssh-security-linux-tips.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
