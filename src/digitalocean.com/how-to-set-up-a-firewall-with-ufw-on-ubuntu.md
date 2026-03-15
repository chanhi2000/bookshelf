---
lang: en-US
title: "How to Set Up a Firewall with UFW on Ubuntu"
description: "Article(s) > How to Set Up a Firewall with UFW on Ubuntu"
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
      content: "Article(s) > How to Set Up a Firewall with UFW on Ubuntu"
    - property: og:description
      content: "How to Set Up a Firewall with UFW on Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu.html
prev: /devops/linux-debian/articles/README.md
date: 2024-02-28
isOriginal: false
author:
  - name: Brian Boucheron
    url: https://digitalocean.comundefined
cover: https://doimages.nyc3.cdn.digitaloceanspaces.com/007BlogBanners2024/linux-hosting(spraytan).png
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
  name="How to Set Up a Firewall with UFW on Ubuntu"
  desc="Learn how to set up and manage a firewall on Ubuntu using UFW. This guide covers installation, configuration, and essential rules to secure your server. "
  url="https://digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://doimages.nyc3.cdn.digitaloceanspaces.com/007BlogBanners2024/linux-hosting(spraytan).png"/>

## Introduction

[<VPIcon icon="fa-brands fa-ubuntu"/>UFW, or Uncomplicated Firewall](https://help.ubuntu.com/community/UFW), is an interface for [**`iptables`**](/digitalocean.com/iptables-essentials-common-firewall-rules-and-commands.md) designed to make firewall configuration more straightforward. While the underlying `iptables` system is powerful and flexible, it can be challenging for beginners to learn and use correctly. UFW simplifies this process, making it a good choice for users who need to secure their network without mastering complex firewall rules. It provides an accessible way to implement essential network security on an Ubuntu system.

This tutorial explains how to set up a firewall with UFW on Ubuntu. You will learn how to configure default policies, allow and deny specific connections by port or service, and manage firewall rules. We will cover essential steps, such as enabling SSH access before activating the firewall, checking the status of your rules, and resetting the configuration if needed. The guide also includes security best practices for effective, long-term firewall management.

::: important Key Takeaways

- UFW, or Uncomplicated Firewall, serves as a user-friendly interface for `iptables` to simplify firewall configuration on Ubuntu systems.
- For a secure foundation, UFW’s default policies should be set to deny all incoming traffic and allow all outgoing traffic.
- It is essential to create a rule allowing [**SSH connections**](/digitalocean.com/understanding-the-ssh-encryption-and-connection-process.md) before enabling the firewall to prevent being locked out of your server.
- You can activate the firewall and configure it to start on boot by running the `sudo ufw enable` command.
- Firewall rules can be defined to allow or deny connections based on application profiles, service names, port numbers, or specific IP addresses.
- The `sudo ufw status verbose` command allows you to check if the firewall is active and review the list of configured rules.
- Firewall rules can be removed by referencing their rule number or by specifying the original rule definition.
- The principle of least privilege should be applied by only opening the specific ports required for your applications to work correctly.
- Enabling UFW logs is a best practice for monitoring network traffic and identifying potential malicious activity.
- For automated threat response, UFW can be integrated with an [<VPIcon icon="fas fa-globe"/>Intrusion Prevention System](https://geeksforgeeks.org/ethical-hacking/intrusion-prevention-system-ips/) like [**Fail2ban**](/digitalocean.com/how-fail2ban-works-to-protect-services-on-a-linux-server.md) to dynamically block attackers.

:::

::: note Prerequisites

If you are using [**Ubuntu version 20.04**](/digitalocean.com/initial-server-setup-with-ubuntu-20-04.md) or below, we recommend you upgrade to a newer version. This [**collection of guides**](/digitalocean.com/collections/ubuntu-lts-upgrades.md) will help you in upgrading your Ubuntu version.

To follow this tutorial, you will need:

- A server running Ubuntu, along with a non-root user with `sudo` privileges. For guidance on how to set these up, please choose your distribution from this list and follow our [**Initial Server Setup Guide**](/digitalocean.com/collections/initial-server-setup.md).
- UFW is installed by default on Ubuntu. If it has been uninstalled for some reason, you can install it with `sudo apt install ufw`.

:::

---

## Step 1 — Making Sure IPv6 is Enabled

In recent versions of Ubuntu, IPv6 is enabled by default. In practice that means most firewall rules added to the server will include both an IPv4 and an IPv6 version, the latter identified by `v6` within the output of UFW’s status command. To make sure IPv6 is enabled, you can check your UFW configuration file at <VPIcon icon="fas fa-folder-open"/>`/etc/default/ufw`. Open this file using `nano` or your favorite command line editor:

```sh
sudo nano /etc/default/ufw
```

Then make sure the value of `IPV6` is set to `yes`. It should look like this:

```sh title="/etc/default/ufw excerpt"
IPV6=yes
```

Save and close the file. If you’re using `nano`, you can do that by typing <kbd>CTRL</kbd>+<kbd>X</kbd>, then <kbd>Y</kbd> and <kbd>ENTER</kbd> to confirm.

When UFW is enabled in a later step of this guide, it will be configured to write both IPv4 and IPv6 firewall rules.

---

## Step 2 — Setting Up Default Policies

If you’re just getting started with UFW, a good first step is to check your default firewall policies. These rules control how to handle traffic that does not explicitly match any other rules.

By default, UFW is set to deny all incoming connections and allow all outgoing connections. This means anyone trying to reach your server would not be able to connect, while any application within the server would be able to reach the outside world. You can then create specific `allow` rules as exceptions to this `deny` policy.

To make sure you’ll be able to follow along with the rest of this tutorial, you’ll now set up your UFW default policies for incoming and outgoing traffic.

To set the default UFW incoming policy to `deny`, run:

```sh
sudo ufw default deny incoming
#
# Default incoming policy changed to 'deny'
# (be sure to update your rules accordingly
```

To set the default UFW outgoing policy to `allow`, run:

```sh
sudo ufw default allow outgoing
#
# Default outgoing policy changed to 'allow'
# (be sure to update your rules accordingly
```

These commands set the defaults to deny incoming and allow outgoing connections. These firewall defaults alone might suffice for a personal computer, but servers typically need to respond to incoming requests from outside users. We’ll look into that next.

---

## Step 3 — Allowing SSH Connections

If you were to enable your UFW firewall now, it would deny all incoming connections. This means that you’ll need to create rules that explicitly allow legitimate incoming connections — SSH or HTTP connections, for example — if you want your server to respond to those types of requests. If you’re using a cloud server, you will probably want to allow incoming SSH connections so you can connect to and manage your server.

### Allowing the OpenSSH UFW Application Profile

Upon installation, most applications that rely on network connections will register an application profile within UFW, which enables users to quickly allow or deny external access to a service. You can check which profiles are currently registered in UFW with:

```sh
sudo ufw app list
#
# Available applications:
#  OpenSS
```

To enable the OpenSSH application profile, run:

```sh
sudo ufw allow OpenSSH
#
# Rule added
# Rule added (v6)
```

This will create firewall rules to allow all connections on port `22`, which is the port that the SSH daemon listens on by default.

### Allowing SSH by Service Name

Another way to configure UFW to allow incoming SSH connections is by referencing its service name: `ssh`.

```sh
sudo ufw allow ssh
#
# Rule added
# Rule added (v6)
```

UFW knows which ports and protocols a service uses based on the <VPIcon icon="fas fa-folder-open"/>`/etc/services` file.

### Allowing SSH by Port Number

Alternatively, you can write the equivalent rule by specifying the port instead of the application profile or service name. For example, this command works the same as the previous examples:

```sh
sudo ufw allow 22
#
# Rule added
# Rule added (v6)
```

If you configured your SSH daemon to use a different port, you will have to specify the appropriate port. For example, if your SSH server is listening on port `2222`, you can use this command to allow connections on that port:

```sh
sudo ufw allow 2222
#
# Rule added
# Rule added (v6)
```

Now that your firewall is configured to allow incoming SSH connections, you can enable it.

### Rate Limiting

To protect services like SSH from automated brute-force attacks, UFW includes a rate-limiting feature. When you apply a rate limit to a service, UFW tracks the frequency of connection attempts from each source IP address. If an IP address makes too many connections in a short period, UFW will temporarily block it. This is a more intelligent approach than simply allowing or denying traffic, as it distinguishes between normal use and behavior that is likely malicious.

To enable rate limiting for a service, you use the `limit` command instead of `allow`. The most common use case is securing SSH.

```sh
sudo ufw limit ssh
```

This single command creates a rule that allows SSH connections, but with a condition: if an IP address attempts to initiate six or more connections within 30 seconds, UFW will deny further connections from that IP. It’s a simple and effective way to add an extra layer of security to services exposed to the internet.

---

## Step 4 — Enabling UFW

Your firewall should now be configured to allow SSH connections. To verify which rules were added so far, even when the firewall is still disabled, you can use:

```sh
sudo ufw show added
#
# Added user rules (see 'ufw status' for running firewall):
# ufw allow OpenSS
```

After confirming that you have a rule to allow incoming SSH connections, you can enable the firewall with:

```sh
sudo ufw enable
#
# Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
# Firewall is active and enabled on system startu
```

You will receive a warning that says the command may disrupt existing SSH connections. You already set up a firewall rule that allows SSH connections, so it should be fine to continue. Respond to the prompt with <kbd>y</kbd> and hit <kbd>ENTER</kbd>.

The firewall is now active. Run the `sudo ufw status verbose` command to see the rules that are set. The rest of this tutorial covers how to use UFW in more detail, like allowing or denying different kinds of connections.

---

## Step 5 — Allowing Other Connections

At this point, you should allow all of the other connections that your server needs to respond to. The connections that you should allow depend on your specific needs. You already know how to write rules that allow connections based on an application profile, a service name, or a port; you already did this for SSH on port `22`. You can also do this for:

- HTTP on port 80, which is what unencrypted web servers use, using `sudo ufw allow http` or `sudo ufw allow 80`
- HTTPS on port 443, which is what encrypted web servers use, using `sudo ufw allow https` or `sudo ufw allow 443`
- Apache with both HTTP and HTTPS, using `sudo ufw allow ‘Apache Full’`
- Nginx with both HTTP and HTTPS, using `sudo ufw allow ‘Nginx Full’`

Don’t forget to check which application profiles are available for your server with `sudo ufw app list`.

There are several other ways to allow connections, aside from specifying a port or known service name. We’ll see some of these next.

### Specific Port Ranges

You can specify port ranges with UFW. Some applications use multiple ports, instead of a single port.

For example, to allow X11 connections, which use ports `6000`-`6007`, use these commands:

```sh
sudo ufw allow 6000:6007/tcp
sudo ufw allow 6000:6007/udp
```

When specifying port ranges with UFW, you must specify the protocol (`tcp` or `udp`) that the rules should apply to. We haven’t mentioned this before because not specifying the protocol automatically allows both protocols, which is OK in most cases.

### Specific IP Addresses

When working with UFW, you can also specify IP addresses within your rules. For example, if you want to allow connections from a specific IP address, such as a work or home IP address of `203.0.113.4`, you need to use the `from` parameter, providing then the IP address you want to allow:

```sh
sudo ufw allow from 203.0.113.4
#
# Rule adde
```

You can also specify a port that the IP address is allowed to connect to by adding `to any port` followed by the port number. For example, If you want to allow `203.0.113.4` to connect to port `22` (SSH), use this command:

```sh
sudo ufw allow from 203.0.113.4 to any port 22
#
# Rule adde
```

### Subnets

If you want to allow a subnet of IP addresses, you can do so using [<VPIcon icon="fa-brands fa-wikipedia-w"/>CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#:~:text=CIDR%20notation%20is%20a%20compact,bits%20in%20the%20network%20mask.) to specify a netmask. For example, if you want to allow all of the IP addresses ranging from `203.0.113.1` to `203.0.113.254` you could use this command:

```sh
sudo ufw allow from 203.0.113.0/24
#
# Rule adde
```

Likewise, you may also specify the destination port that the subnet `203.0.113.0/24` is allowed to connect to. Again, we’ll use port `22` (SSH) as an example:

```sh
sudo ufw allow from 203.0.113.0/24 to any port 22
#
# Rule adde
```

### Connections to a Specific Network Interface

If you want to create a firewall rule that only applies to a specific network interface, you can do so by specifying “allow in on” followed by the name of the network interface.

You may want to look up your network interfaces before continuing. To do so, use this command:

```sh
ip addr
#
#  Excerpt2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state
# . . .
# 3: eth1: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default
# . . 
```

The highlighted output indicates the network interface names. They are typically named something like `eth0` or `enp3s2`.

So, if your server has a public network interface called `eth0`, you could allow HTTP traffic (port `80`) to it with this command:

```sh
sudo ufw allow in on eth0 to any port 80
#
# Rule added
# Rule added (v6)
```

Doing so would allow your server to receive HTTP requests from the public internet.

Or, if you want your [**MySQL**](/digitalocean.com/how-to-install-mysql-on-ubuntu-20-04.md) database server (port `3306`) to listen for connections on the private network interface `eth1`, for example, you could use this command:

```sh
sudo ufw allow in on eth1 to any port 3306
#
# Rule added
# Rule added (v6)
```

This would allow other servers on your private network to connect to your MySQL database.

---

## Step 6 — Denying Connections

If you haven’t changed the default policy for incoming connections, UFW is configured to deny all incoming connections. Generally, this simplifies the process of creating a secure firewall policy by requiring you to create rules that explicitly allow specific ports and IP addresses through.

However, sometimes you will want to deny specific connections based on the source IP address or subnet, perhaps because you know that your server is being attacked from there. Also, if you want to change your default incoming policy to **allow** (which is not recommended), you would need to create **deny** rules for any services or IP addresses that you don’t want to allow connections for.

To write **deny** rules, you can use the commands previously described, replacing **allow** with **deny**.

For example, to deny HTTP connections, you could use this command:

```sh
sudo ufw deny http
#
# Rule added
# Rule added (v6)
```

Or if you want to deny all connections from `203.0.113.4` you could use this command:

```sh
sudo ufw deny from 203.0.113.4
#
# Rule adde
```

In some cases, you may also want to block outgoing connections from the server. To deny all users from using a port on the server, such as port `25` for SMTP traffic, you can use `deny out` followed by the port number:

```sh
sudo ufw deny out 25
#
# Rule added
# Rule added (v6)
```

This will block all outgoing SMTP traffic on the server.

---

## Step 7 — Deleting Rules

Knowing how to delete firewall rules is just as important as knowing how to create them. There are two different ways to specify which rules to delete: by rule number or by its human-readable denomination (similar to how the rules were specified when they were created).

### Deleting a UFW Rule By Number

To delete a UFW rule by its number, first you’ll want to obtain a numbered list of all your firewall rules. The UFW status command has an option to display numbers next to each rule, as demonstrated here:

```sh
sudo ufw status numbered
#
# Numbered Output:Status: active
# 
#      To                         Action      From
#      --                       ------    ----
# [ 1] 22                         ALLOW IN    15.15.15.0/24
# [ 2] 80                         ALLOW IN    Anywher
```

If you decide that you want to delete rule number **2**, the one that allows port 80 (HTTP) connections, you can specify it in a UFW delete command like this:

```sh
sudo ufw delete 2
#
# Deleting:
#  allow 80
# Proceed with operation (y|n)? y
# Rule delete
```

This will prompt for a confirmation then delete rule 2, which allows HTTP connections.

**Important:** Using `ufw status numbered` lists IPv4 and IPv6 rules separately. Deleting a rule by its number will only remove that single entry. You must identify and delete the corresponding (`v6`) rule separately. In contrast, deleting a rule by name (e.g., `sudo ufw delete allow http`) removes both IPv4 and IPv6 rules automatically.

### Deleting a UFW Rule By Name

Instead of using rule numbers, you may also refer to a rule by its human-readable denomination, which is based on the type of rule (typically `allow` or `deny`) and the service name or port number that was the target for this rule, or the application profile name in case that was used. For example, if you want to delete an `allow` rule for an application profile called `Apache Full` that was previously enabled, you can use:

```sh
sudo ufw delete allow "Apache Full"
#
# Rule deleted
# Rule deleted (v6)
```

The `delete` command works the same way for rules that were created referencing a service by its name or port. For example, if you previously set a rule to allow HTTP connections with `sudo ufw allow http`, this is how you could delete said rule:

```sh
sudo ufw delete allow http
#
# Rule deleted
# Rule deleted (v6)
```

Because service names are interchangeable with port numbers when specifying rules, you could also refer to the same rule as `allow 80`, instead of `allow http`:

```sh
sudo ufw delete allow 80
#
# Rule deleted
# Rule deleted (v6)
```

When deleting UFW rules by name, both IPv4 and IPv6 rules are deleted if they exist.

---

## Step 8 — Checking UFW Status and Rules

At any time, you can check the status of UFW with this command. If UFW is disabled, which it is by default, you’ll see something like this:

```sh
sudo ufw status verbose
#
# Status: inactive
```

If UFW is active, which it should be if you followed Step 3, the output will say that it’s active and it will list any rules that are set. For example, if the firewall is set to allow SSH (port `22`) connections from anywhere, the output might look something like this:

```plaintext title="output"
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                       ------    ----
22/tcp                     ALLOW IN    Anywher
```

Use the `status` command if you want to check how UFW has configured the firewall.

---

## Step 9 — Disable or Reset Firewall

If you decide you don’t want to use the UFW firewall, you can deactivate it with this command:

```sh
sudo ufw disable
#
# Firewall stopped and disabled on system startu
```

Any rules that you created with UFW will no longer be active. You can always run `sudo ufw enable` if you need to activate it later.

If you already have UFW rules configured but you decide that you want to start over, you can use the `reset` command:

```sh
sudo ufw reset
#
# Resetting all rules to installed defaults. This may disrupt existing ssh
# connections. Proceed with operation (y|n)? y
# Backing up 'user.rules' to '/etc/ufw/user.rules.20210729_170353'
# Backing up 'before.rules' to '/etc/ufw/before.rules.20210729_170353'
# Backing up 'after.rules' to '/etc/ufw/after.rules.20210729_170353'
# Backing up 'user6.rules' to '/etc/ufw/user6.rules.20210729_170353'
# Backing up 'before6.rules' to '/etc/ufw/before6.rules.20210729_170353'
# Backing up 'after6.rules' to '/etc/ufw/after6.rules.20210729_170353
```

This will disable UFW and delete any rules that were previously defined. This should give you a fresh start with UFW. Keep in mind that the default policies will remain as last set; you may need to reset them manually.

Deploy your frontend applications from GitHub using [<VPIcon icon="fa-brands fa-digital-ocean" />DigitalOcean App Platform](https://digitalocean.com/products/app-platform). Let DigitalOcean focus on scaling your app.

---

## Security Best Practices for Firewall Management

Configuring your firewall is the first step toward securing your server. However, maintaining that security requires ongoing attention and adherence to established best practices. A firewall is not a “set it and forget it” tool. Proper management ensures it remains an effective defense against unauthorized access.

### Apply the Principle of Least Privilege

The most fundamental concept in firewall security is the [<VPIcon icon="fas fa-globe"/>principle of least privilege](https://cyberark.com/what-is/least-privilege/). This principle dictates that you should only grant the minimum level of access necessary for a service to function and deny all other connections by default.

UFW is designed around this concept. Its default policy for incoming traffic is `deny`, which is the correct starting point. Every `allow` rule you add should be a deliberate decision to open a specific path for legitimate traffic.

::: tip Practical Application

- **Be Specific:** Instead of opening a wide range of ports, only open the exact ports your applications require. For a standard web server, this would be `sudo ufw allow http` and `sudo ufw allow https`.
- **Limit by Source:** If a service should only be accessible from a specific location, restrict the rule to that source IP address. For example, to allow access to a [**MySQL**](/digitalocean.com/create-insert-table-mysql.md) database on port `3306` only from your application server at `203.0.113.100`:

```sh
sudo ufw allow from 203.0.113.100 to any port 3306
```

:::

### Regularly Audit Your Firewall Rules

Server requirements change over time. Services are added, removed, or reconfigured. A firewall rule that was necessary six months ago might now be an unnecessary security risk. It is important to audit your firewall rules periodically.

::: tip Practical Steps for Auditing

1. **List Your Rules:** Set a recurring reminder (e.g., quarterly) to review your configuration. Use the `numbered` status to get a clear, ordered list.

```sh
sudo ufw status numbered
```

**2. Evaluate Each Rule:**

For every rule in the list, ask the following questions:

- Is the service associated with this port still running and in use?
- Is the level of access (e.g., from `Anywhere` vs. a specific IP) still appropriate?
- Could this rule be made more restrictive without breaking functionality?

**3. Remove Unnecessary Rules:**

If a rule is no longer needed, delete it. For instance, if you no longer need FTP access, which was rule number `[5]` in your list:

```sh
sudo ufw delete 5
```

:::

### Enable and Monitor UFW Logs

A firewall’s logs provide valuable information about the traffic reaching your server, including malicious attempts that were blocked. Without monitoring these logs, you are missing a critical source of security intelligence.

You can enable logging with a simple command:

```sh
sudo ufw logging on
```

By default, UFW logs are written to <VPIcon icon="fas fa-folder-open"/>`/var/log/`<VPIcon icon="fas fa-file-lines"/>`ufw.log`. A log entry for a blocked packet contains key information you can use to identify patterns.

| Field | Description | Example |
| --- | --- | --- |
| `UFW BLOCK` | The action taken by UFW. | `UFW BLOCK` |
| `SRC=` | The **source IP address** where the packet originated. | `203.0.113.10` |
| `DST=` | The **destination IP address** (your server). | `your_server_ip` |
| `PROTO=` | The network protocol used. | `TCP` |
| `DPT=` | The **destination port** the packet was trying to reach. | `22` |

Regularly check these logs for suspicious activity, such as a single IP address repeatedly attempting to connect to many different blocked ports, which indicates a port scan.

### Integrate with an Intrusion Prevention System

While UFW is excellent for enforcing a static ruleset, it does not dynamically react to active threats. For automated, responsive protection, you should integrate UFW with an [<VPIcon icon="fas fa-globe"/>Intrusion Prevention System (IPS)](https://geeksforgeeks.org/ethical-hacking/intrusion-prevention-system-ips/) like [**Fail2ban**](/digitalocean.com/how-fail2ban-works-to-protect-services-on-a-linux-server.md).

Fail2ban monitors log files for patterns of malicious behavior, such as repeated failed login attempts, and automatically creates temporary firewall rules to block the offending IP addresses. When configured to work with UFW, Fail2ban will use UFW commands to block attackers, creating a powerful, automated defense system. This combination allows UFW to handle the baseline security policy while Fail2ban deals with active threats in real time.

### Pay Attention to Both IPv4 and IPv6

A common oversight is configuring firewall rules for IPv4 traffic while forgetting about IPv6. Modern Ubuntu distributions enable IPv6 by default, and if your server has an IPv6 address, it could represent an unsecured attack surface if your firewall rules do not account for it.

By default, UFW is configured to apply rules to both IPv4 and IPv6. You can verify this by checking the main configuration file:

```sh
sudo grep "IPV6" /etc/default/ufw
#
# IPV6=ye
```

When you add a rule like `sudo ufw allow http`, UFW creates a rule for both protocols. You can see this in the status output:

```sh
sudo ufw allow http
#
# To                         Action      From
# --                       ------    ----
# . . .
# 80/tcp                     ALLOW       Anywhere
# . . .
# 80/tcp (v6)                ALLOW       Anywhere (v6
```

::: tip Best Practice

- **Be Explicit:** Always verify that your rules are applied to both protocols. When auditing your ruleset, look for the `(v6)` entries to ensure there is parity.
- **Disable if Unused:** If your server or network does not use IPv6, the most secure approach is to disable it entirely at the kernel level. This eliminates it as a potential vector. If you only want to disable it for UFW, you can set `IPV6=no` in <VPIcon icon="fas fa-folder-open"/>`/etc/default/ufw`.

:::

### Restrict Outgoing Traffic

By default, UFW allows all outgoing traffic from your server. This is a permissive stance that is convenient but not maximally secure. For servers in high-security environments, a stricter policy is to deny all outgoing traffic by default and only allow the specific connections your server needs to initiate.

This approach can prevent a compromised server from communicating with an attacker’s command-and-control server, exfiltrating data, or being used to attack other systems.

::: tip Practical Application

This is an advanced technique and requires careful planning to avoid breaking essential services like DNS resolution or package updates.

**1. Change the Default Outgoing Policy:**

```sh
sudo ufw default deny outgoing
```

**2. Allow Essential Outgoing Connections:**

You must then explicitly allow traffic for services the server depends on.

```sh
# Allow DNS queries
sudo ufw allow out 53

# Allow access to package repositories and web APIs
sudo ufw allow out to any port 80 proto tcp
sudo ufw allow out to any port 443 proto tcp

# Allow NTP for time synchronization
sudo ufw allow out 123/udp
```

:::

You must tailor these rules to the specific needs of your server’s applications.

### Test Rules Before and After Applying

Applying an incorrect firewall rule can cause a service outage or lock you out of your server. It is a best practice to test your ruleset before putting it into production and to verify it afterward.

::: tip Practical Steps for Testing:

- **Use a Staging Environment:** Whenever possible, test complex rule changes on a non-production server that mirrors your production environment.
- **Perform a Dry Run:** UFW has a `--dry-run` option that shows you what changes would be made without actually applying them. This is a safe way to check for syntax errors and see how your command will alter the ruleset.

```sh
sudo ufw --dry-run enable
```

- **Verify with an External Port Scan:** After applying your rules, use a tool like `nmap` from an external machine to confirm the server’s state. This check verifies that ports you intend to be open are accessible and ports you intend to be closed are not.

```sh
# This command checks the state of ports 22, 80, and 443 from an external machine
nmap -p 22,80,443 your_server_ip
```

The output should show `open` for allowed ports and `closed` or `filtered` for blocked ports, matching your expectations.

:::

---

## FAQs

::: details 1. What is UFW in Ubuntu?

**UFW**, short for **Uncomplicated Firewall**, is the default firewall management tool for Ubuntu. It is designed to be a user-friendly interface for the more complex `iptables` packet filtering system. UFW provides a simple way to configure and manage firewall rules without needing to learn the intricate syntax of `iptables`. Its primary goal is to make essential firewall tasks easy for users of all experience levels.

:::

::: details 2. How do I enable UFW on Ubuntu?

You can enable UFW with a single command. However, before you enable it, you must first create a rule to allow SSH connections. If you fail to allow SSH traffic, **you will be locked out of your server** upon enabling the firewall.

1. First, allow SSH traffic:

```sh
sudo ufw allow ssh
```

2. Then, enable the firewall:

```sh
sudo ufw enable
```

The system will ask for confirmation because enabling the firewall may disrupt existing connections. Type <kbd>y</kbd> and press <kbd>ENTER</kbd>.

:::

::: details 3. How do I check if UFW is running?

To check the current status of UFW and see its list of rules, use the `status` command. If the firewall is active, the output will show `Status: active` and list the configured rules:

```sh
sudo ufw status
#
# Status: active
# 
# To                         Action      From
# --                       ------    ----
# 22/tcp                     ALLOW       Anywhere
# 80/tcp                     ALLOW       Anywhere
# 22/tcp (v6)                ALLOW       Anywhere (v6)
# 80/tcp (v6)                ALLOW       Anywhere (v6
```

If it is inactive, the output will be `Status: inactive`.

:::

::: details 4. How do I allow a port through UFW?

You can allow traffic on a specific port using the `allow` command. You should specify both the port number and the protocol (usually `tcp` or `udp`).

For example, to allow incoming HTTP traffic on port `80`:

```sh
sudo ufw allow 80/tcp
```

Alternatively, UFW often knows the standard ports for common services, so you can use the service name instead:

```sh
sudo ufw allow http
```

:::

::: details 5. What happens if I block SSH in UFW?

If you block the SSH port (port `22` by default) in UFW, **you will immediately lose your remote connection to the server**. The firewall will drop any new SSH connection attempts, effectively locking you out.

To fix this, you would need to access your server through an alternative method, such as a direct physical connection or a web-based console provided by your cloud hosting provider. From there, you would need to log in and either disable the firewall or add a rule to allow SSH traffic again.

:::

::: details 6. Can I use UFW with fail2ban?

**Yes**, UFW and Fail2ban work very well together and are often used as a combined security solution.

Fail2ban is an application that monitors server logs for signs of automated attacks, such as repeated failed login attempts. When it detects a malicious IP address, it can automatically create a temporary UFW `deny` rule to block that IP. This provides an automated defense system where UFW acts as the firewall and Fail2ban acts as the intrusion prevention service.

:::

::: details 7. How do I reset UFW rules?

To completely reset UFW to its default state, you can use the `reset` command. This command will disable the firewall and delete all existing rules. This action is irreversible.

```sh
sudo ufw reset
```

You will be prompted to confirm the action, as it will tear down your entire firewall configuration.

:::

---

## Conclusion

Your firewall is now active and configured, providing a secure foundation for your server. By setting the default policy to deny incoming connections, you have implemented the principle of least privilege, a core security concept. You have learned to create specific exceptions for necessary services like SSH and can now add rules based on application profiles, port numbers, or source IP addresses to allow legitimate traffic while blocking everything else.

Remember that firewall management is an ongoing process. As your server’s needs change, you should periodically audit your rules to remove any that are no longer necessary and ensure your configuration remains secure. To explore more advanced rules and common configurations, check out the following tutorials:

- [**UFW Essentials: Common Firewall Rules and Commands**](/digitalocean.com/ufw-essentials-common-firewall-rules-and-commands.md)
- [**How To Setup a Firewall with UFW on an Ubuntu and Debian Cloud Server**](/digitalocean.com/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server.md)
- [**Linux Open Port: Step-by-Step Guide to Managing Firewall Ports**](/digitalocean.com/opening-a-port-on-linux.md)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up a Firewall with UFW on Ubuntu",
  "desc": "Learn how to set up and manage a firewall on Ubuntu using UFW. This guide covers installation, configuration, and essential rules to secure your server. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
